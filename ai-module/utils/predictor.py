import torch
import torchvision.transforms as transforms
from PIL import Image
import io
from utils.model_loader import ModelLoader
from utils.ensemble import EnsembleModel

class StrokePredictor:
    """
    Main prediction pipeline
    Author: Sri Bhargava — Inference Pipeline
    """

    def __init__(self):
        self.device = torch.device(
            "cuda" if torch.cuda.is_available() else "cpu"
        )

        # Load models
        loader = ModelLoader()
        self.cnn, self.resnet, self.efficientnet = \
            loader.load_trained_models()
        self.trained = loader.models_are_trained()

        # Ensemble
        self.ensemble = EnsembleModel()

        # Preprocessing
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            )
        ])

        status = "trained" if self.trained else "untrained"
        print(f"StrokePredictor ready! Models: {status}")

    def _preprocess(self, image_bytes):
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        return self.transform(image).unsqueeze(0).to(self.device)

    def _get_confidence(self, model, tensor):
        with torch.no_grad():
            output = model(tensor)
            probs = torch.softmax(output, dim=1)
            return round(probs[0][1].item() * 100, 2)

    def predict(self, image_bytes):
        """Full inference pipeline"""
        tensor = self._preprocess(image_bytes)

        cnn_conf = self._get_confidence(self.cnn, tensor)
        resnet_conf = self._get_confidence(self.resnet, tensor)
        eff_conf = self._get_confidence(self.efficientnet, tensor)

        result = self.ensemble.predict(cnn_conf, resnet_conf, eff_conf)
        result["models_trained"] = self.trained

        return result