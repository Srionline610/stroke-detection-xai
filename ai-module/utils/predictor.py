import torch
import torch.nn as nn
import torchvision.transforms as transforms
import torchvision.models as models
from PIL import Image
import numpy as np
import io

class StrokePredictor:
    def __init__(self):
        self.device = torch.device(
            "cuda" if torch.cuda.is_available() else "cpu"
        )
        print(f"Using device: {self.device}")

        # Image preprocessing
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            )
        ])

        # Load models
        self.cnn_model = self._build_cnn()
        self.resnet_model = self._build_resnet()
        self.efficientnet_model = self._build_efficientnet()

        print("All models loaded successfully!")

    def _build_cnn(self):
        """Simple CNN model"""
        model = nn.Sequential(
            nn.Conv2d(3, 32, 3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, 3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(64, 128, 3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.AdaptiveAvgPool2d((7, 7)),
            nn.Flatten(),
            nn.Linear(128 * 7 * 7, 512),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(512, 2)
        )
        model.to(self.device)
        model.eval()
        return model

    def _build_resnet(self):
        """ResNet50 pretrained model"""
        model = models.resnet50(
            weights=models.ResNet50_Weights.IMAGENET1K_V1
        )
        # Modify final layer for binary classification
        model.fc = nn.Linear(model.fc.in_features, 2)
        model.to(self.device)
        model.eval()
        return model

    def _build_efficientnet(self):
        """EfficientNet B3 pretrained model"""
        model = models.efficientnet_b3(
            weights=models.EfficientNet_B3_Weights.IMAGENET1K_V1
        )
        # Modify final layer for binary classification
        model.classifier[1] = nn.Linear(
            model.classifier[1].in_features, 2
        )
        model.to(self.device)
        model.eval()
        return model

    def _preprocess(self, image_bytes):
        """Preprocess image for model input"""
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        tensor = self.transform(image).unsqueeze(0)
        return tensor.to(self.device)

    def _get_confidence(self, model, tensor):
        """Get prediction confidence from model"""
        with torch.no_grad():
            output = model(tensor)
            probabilities = torch.softmax(output, dim=1)
            confidence = probabilities[0][1].item() * 100
        return round(confidence, 2)

    def predict(self, image_bytes):
        """Run ensemble prediction on image"""
        tensor = self._preprocess(image_bytes)

        # Get individual model predictions
        cnn_conf = self._get_confidence(self.cnn_model, tensor)
        resnet_conf = self._get_confidence(self.resnet_model, tensor)
        efficientnet_conf = self._get_confidence(
            self.efficientnet_model, tensor
        )

        # Ensemble — weighted average
        ensemble_conf = round(
            (cnn_conf * 0.25 +
             resnet_conf * 0.35 +
             efficientnet_conf * 0.40),
            2
        )

        predicted_class = (
            "Stroke Detected" if ensemble_conf > 50 else "No Stroke"
        )

        return {
            "predicted_class": predicted_class,
            "cnn_confidence": cnn_conf,
            "resnet_confidence": resnet_conf,
            "efficientnet_confidence": efficientnet_conf,
            "ensemble_confidence": ensemble_conf
        }