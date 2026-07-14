from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
import os

from utils.predictor import StrokePredictor
from utils.gradcam import GradCAMGenerator

app = FastAPI(
    title="StrokeXAI - AI Detection API",
    description="Explainable AI for Stroke Detection using Ensemble CNN",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve heatmap images
os.makedirs("heatmaps", exist_ok=True)
os.makedirs("uploads", exist_ok=True)
app.mount("/heatmaps", StaticFiles(directory="heatmaps"), name="heatmaps")

# Initialize predictor
predictor = StrokePredictor()
gradcam_gen = GradCAMGenerator()

@app.get("/")
def root():
    return {
        "message": "StrokeXAI AI Module is running!",
        "models": ["CNN", "ResNet50", "EfficientNet", "Ensemble"],
        "status": "ready"
    }

@app.get("/health")
def health():
    return {"status": "healthy", "ai_module": "running"}

@app.post("/analyze")
async def analyze_scan(file: UploadFile = File(...)):
    try:
        # Validate file type
        if not file.content_type.startswith("image/"):
            raise HTTPException(
                status_code=400,
                detail="Only image files are accepted"
            )

        # Read image bytes
        image_bytes = await file.read()

        # Run prediction
        result = predictor.predict(image_bytes)

        # Generate GRAD-CAM heatmap
        heatmap_path = gradcam_gen.generate(
            image_bytes,
            result["predicted_class"]
        )

        return {
            "status": "success",
            "result": result["predicted_class"],
            "confidence": result["ensemble_confidence"],
            "cnn_confidence": result["cnn_confidence"],
            "resnet_confidence": result["resnet_confidence"],
            "efficientnet_confidence": result["efficientnet_confidence"],
            "ensemble_confidence": result["ensemble_confidence"],
            "heatmap_url": f"http://localhost:8000/heatmaps/{heatmap_path}",
            "message": "Analysis completed successfully"
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        )

@app.post("/analyze-demo")
async def analyze_demo(file: UploadFile = File(...)):
    """Demo endpoint with simulated results for testing"""
    try:
        image_bytes = await file.read()

        # Simulated results for demo
        import random
        cnn = round(random.uniform(82, 96), 2)
        resnet = round(random.uniform(85, 97), 2)
        efficientnet = round(random.uniform(87, 98), 2)
        ensemble = round((cnn + resnet + efficientnet) / 3, 2)

        predicted = "Stroke Detected" if ensemble > 50 else "No Stroke"

        heatmap_path = gradcam_gen.generate(image_bytes, predicted)

        return {
            "status": "success",
            "result": predicted,
            "confidence": ensemble,
            "cnn_confidence": cnn,
            "resnet_confidence": resnet,
            "efficientnet_confidence": efficientnet,
            "ensemble_confidence": ensemble,
            "heatmap_url": f"http://localhost:8000/heatmaps/{heatmap_path}",
            "message": "Demo analysis completed"
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Demo analysis failed: {str(e)}"
        )

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)