from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO

import tempfile
import shutil
import base64
import cv2
import os
import uuid


# =========================
# FastAPI App
# =========================

app = FastAPI(
    title="Road Damage Segmentation API",
    description="AI API for detecting cracks and potholes in road images"
)


# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# Load Model
# =========================

model = YOLO("models/best.pt")


# =========================
# Prediction
# =========================

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    # Create a file path in Windows TEMP folder
    input_path = os.path.join(
        tempfile.gettempdir(),
        f"road_damage_{uuid.uuid4()}.jpg"
    )

    try:

        # Save uploaded image
        with open(input_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Make sure uploaded file is closed
        await file.close()

        # =========================
        # Run YOLO Segmentation
        # =========================

        results = model.predict(
            source=input_path,
            conf=0.25,
            save=False
        )

        result = results[0]

        # =========================
        # Draw Segmentation
        # =========================

        annotated_image = result.plot()

        # =========================
        # Convert to JPEG
        # =========================

        success, encoded_image = cv2.imencode(
            ".jpg",
            annotated_image
        )

        if not success:
            return {
                "success": False,
                "message": "Could not encode result image"
            }

        # =========================
        # Convert to Base64
        # =========================

        image_base64 = base64.b64encode(
            encoded_image.tobytes()
        ).decode("utf-8")

        # =========================
        # Return Result
        # =========================

        return {
            "success": True,
            "image": image_base64
        }

    finally:

        # Delete temporary file
        try:
            if os.path.exists(input_path):
                os.remove(input_path)
        except PermissionError:
            pass