import torch

class EnsembleModel:
    """
    Ensemble of CNN + ResNet50 + EfficientNet B3
    Combines predictions using Weighted Average + Majority Voting
    Author: Sri Bhargava — Ensemble Architecture
    """

    def __init__(self):
        # Weights based on expected model performance
        # EfficientNet gets highest weight (best accuracy)
        self.weights = {
            "cnn": 0.25,
            "resnet": 0.35,
            "efficientnet": 0.40
        }

    def weighted_average(self, cnn_conf, resnet_conf, eff_conf):
        """Weighted average of all model confidences"""
        return round(
            cnn_conf * self.weights["cnn"] +
            resnet_conf * self.weights["resnet"] +
            eff_conf * self.weights["efficientnet"],
            2
        )

    def majority_voting(self, cnn_conf, resnet_conf, eff_conf):
        """At least 2 models must agree"""
        votes = sum([
            1 if cnn_conf > 50 else 0,
            1 if resnet_conf > 50 else 0,
            1 if eff_conf > 50 else 0
        ])
        return votes >= 2

    def predict(self, cnn_conf, resnet_conf, eff_conf):
        """Final ensemble prediction"""
        weighted = self.weighted_average(
            cnn_conf, resnet_conf, eff_conf
        )
        majority = self.majority_voting(
            cnn_conf, resnet_conf, eff_conf
        )

        # Both must agree for stroke detection
        is_stroke = (weighted > 50) and majority
        predicted = "Stroke Detected" if is_stroke else "No Stroke"

        return {
            "predicted_class": predicted,
            "ensemble_confidence": weighted,
            "cnn_confidence": cnn_conf,
            "resnet_confidence": resnet_conf,
            "efficientnet_confidence": eff_conf,
            "majority_voting_result": majority,
            "strategy": "Weighted Average + Majority Voting",
            "weights": self.weights
        }

    def compare_all_models(self, cnn_conf, resnet_conf, eff_conf):
        """Model comparison for dashboard"""
        ensemble_conf = self.weighted_average(
            cnn_conf, resnet_conf, eff_conf
        )
        return [
            {
                "model": "CNN",
                "confidence": cnn_conf,
                "prediction": "Stroke Detected"
                if cnn_conf > 50 else "No Stroke",
                "weight": self.weights["cnn"]
            },
            {
                "model": "ResNet50",
                "confidence": resnet_conf,
                "prediction": "Stroke Detected"
                if resnet_conf > 50 else "No Stroke",
                "weight": self.weights["resnet"]
            },
            {
                "model": "EfficientNet B3",
                "confidence": eff_conf,
                "prediction": "Stroke Detected"
                if eff_conf > 50 else "No Stroke",
                "weight": self.weights["efficientnet"]
            },
            {
                "model": "Ensemble (Final)",
                "confidence": ensemble_conf,
                "prediction": "Stroke Detected"
                if ensemble_conf > 50 else "No Stroke",
                "weight": 1.0
            }
        ]