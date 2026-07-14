import torch
import torch.nn as nn
import torchvision.models as models
import torchvision.transforms as transforms
import numpy as np
import cv2
from PIL import Image
import io
import uuid
import os

class GradCAMGenerator:
    def __init__(self):
        self.device = torch.device(
            "cuda" if torch.cuda.is_available() else "cpu"
        )

        # Use ResNet50 for GRAD-CAM
        self.model = models.resnet50(
            weights=models.ResNet50_Weights.IMAGENET1K_V1
        )
        self.model.fc = nn.Linear(self.model.fc.in_features, 2)
        self.model.to(self.device)
        self.model.eval()

        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            )
        ])

        # Store gradients and activations
        self.gradients = None
        self.activations = None

        # Register hooks on last conv layer
        target_layer = self.model.layer4[-1]
        target_layer.register_forward_hook(self._save_activation)
        target_layer.register_backward_hook(self._save_gradient)

    def _save_activation(self, module, input, output):
        self.activations = output.detach()

    def _save_gradient(self, module, grad_input, grad_output):
        self.gradients = grad_output[0].detach()

    def generate(self, image_bytes, predicted_class):
        """Generate GRAD-CAM heatmap and save to file"""
        try:
            # Load and preprocess image
            image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
            original = np.array(image.resize((224, 224)))
            tensor = self.transform(image).unsqueeze(0).to(self.device)

            # Forward pass
            output = self.model(tensor)
            class_idx = 1 if predicted_class == "Stroke Detected" else 0

            # Backward pass
            self.model.zero_grad()
            output[0, class_idx].backward()

            # Generate heatmap
            weights = self.gradients.mean(dim=(2, 3), keepdim=True)
            cam = (weights * self.activations).sum(dim=1).squeeze()
            cam = torch.relu(cam)
            cam = cam.cpu().numpy()
            cam = cv2.resize(cam, (224, 224))

            # Normalize
            if cam.max() != cam.min():
                cam = (cam - cam.min()) / (cam.max() - cam.min())

            # Apply colormap
            heatmap = cv2.applyColorMap(
                np.uint8(255 * cam),
                cv2.COLORMAP_JET
            )
            heatmap = cv2.cvtColor(heatmap, cv2.COLOR_BGR2RGB)

            # Overlay on original
            overlay = (0.6 * original + 0.4 * heatmap).astype(np.uint8)

            # Save heatmap
            filename = f"heatmap_{uuid.uuid4().hex[:8]}.png"
            save_path = os.path.join("heatmaps", filename)
            Image.fromarray(overlay).save(save_path)

            return filename

        except Exception as e:
            print(f"GRAD-CAM generation error: {e}")
            return "default_heatmap.png"