import torch
import torch.nn as nn
import torchvision.models as models
import os

class ModelLoader:
    """
    Loads trained .pt models for inference
    Author: Sri Bhargava — Model Loading & Inference Pipeline
    """

    def __init__(self, models_dir="models"):
        self.models_dir = models_dir
        self.device = torch.device(
            "cuda" if torch.cuda.is_available() else "cpu"
        )
        print(f"ModelLoader using: {self.device}")

    def _build_cnn(self):
        model = nn.Sequential(
            nn.Conv2d(3, 32, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
            nn.Conv2d(32, 64, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
            nn.Conv2d(64, 128, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
            nn.AdaptiveAvgPool2d((7, 7)),
            nn.Flatten(),
            nn.Linear(128 * 7 * 7, 512),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(512, 2)
        )
        return model

    def _build_resnet(self):
        model = models.resnet50(
            weights=None
        )
        model.fc = nn.Linear(model.fc.in_features, 2)
        return model

    def _build_efficientnet(self):
        model = models.efficientnet_b3(
            weights=None
        )
        model.classifier[1] = nn.Linear(
            model.classifier[1].in_features, 2
        )
        return model

    def load_trained_models(self):
        """
        Load trained .pt models from disk
        Falls back to untrained if .pt not found
        """
        cnn = self._build_cnn()
        resnet = self._build_resnet()
        efficientnet = self._build_efficientnet()

        # Load CNN weights
        cnn_path = os.path.join(self.models_dir, "cnn_best.pt")
        if os.path.exists(cnn_path):
            cnn.load_state_dict(
                torch.load(cnn_path, map_location=self.device)
            )
            print("✅ CNN model loaded from trained weights")
        else:
            print("⚠️ CNN using untrained weights — train first!")

        # Load ResNet weights
        resnet_path = os.path.join(self.models_dir, "resnet50_best.pt")
        if os.path.exists(resnet_path):
            resnet.load_state_dict(
                torch.load(resnet_path, map_location=self.device)
            )
            print("✅ ResNet50 loaded from trained weights")
        else:
            print("⚠️ ResNet50 using untrained weights — train first!")

        # Load EfficientNet weights
        eff_path = os.path.join(
            self.models_dir, "efficientnet_b3_best.pt"
        )
        if os.path.exists(eff_path):
            efficientnet.load_state_dict(
                torch.load(eff_path, map_location=self.device)
            )
            print("✅ EfficientNet B3 loaded from trained weights")
        else:
            print("⚠️ EfficientNet using untrained weights — train first!")

        # Move to device and set eval mode
        cnn = cnn.to(self.device).eval()
        resnet = resnet.to(self.device).eval()
        efficientnet = efficientnet.to(self.device).eval()

        return cnn, resnet, efficientnet

    def models_are_trained(self):
        """Check if trained models exist"""
        return all([
            os.path.exists(
                os.path.join(self.models_dir, "cnn_best.pt")
            ),
            os.path.exists(
                os.path.join(self.models_dir, "resnet50_best.pt")
            ),
            os.path.exists(
                os.path.join(self.models_dir, "efficientnet_b3_best.pt")
            )
        ])