#  Road Damage Segmentation

An AI-powered web application for detecting and segmenting road damage such as potholes and cracks from road images.

The project uses a YOLO segmentation model with a FastAPI backend and a simple web-based frontend.

---

##  Project Overview

Road damage can affect vehicle safety and road maintenance.

This project uses Computer Vision to automatically analyze road images and identify damaged areas.

The system can:

- Detect road damage
- Segment the damaged area
- Display the original image
- Display the AI-generated result
- Show the detected damage and confidence
- Download the processed result

---

##  AI Model

The project uses:

**YOLO Segmentation**

The trained model is stored in:

models/best.pt

## Technologies
- Python
- YOLO / Ultralytics
- FastAPI
- OpenCV
- HTML
- CSS
- JavaScript
- Git
- GitHub



##  Project Structure
Road-Damage-Segmentation/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── models/
│   └── best.pt
│
├── main.py
├── requirements.txt
├── .gitignore
└── README.md

Installation 

1. Clone the repository
   git clone https://github.com/rawan24yasser/Road-Damage-Segmentation.


2. Move into the project directory
   cd Road-Damage-Segmentation


3. Create a virtual environment
   python -m venv venv


4. Activate the virtual environment on Windows
   venv\Scripts\activate


5. Install the required libraries
   pip install -r requirements.txt


 Running the Backend

   Start the FastAPI server using:
    python -m uvicorn main:app --reload

   The backend will run at:
    http://127.0.0.1:8000


Running the Frontend
  Open the frontend folder.
  Run index.html using Live Server.
Then:
 1-Choose a road image from your device.
 2-Click Analyze Image.
 3-The image is sent to the FastAPI backend.
 4-The YOLO segmentation model processes the image.
 5-The AI result is returned to the frontend.
 6-The processed image is displayed in the AI Result section.

 System Workflow
Road Image
     ↓
Frontend
     ↓
FastAPI Backend
     ↓
YOLO Segmentation Model
     ↓
Road Damage Detection & Segmentation
     ↓
Processed Result
     ↓
AI Result


API Endpoint

  The main prediction endpoint is:
  POST /predict
   It receives an uploaded image and returns the AI-generated segmentation result.


Future Improvements
  1-Real-time road damage detection from video
  2-Improve model accuracy
  3-Add more road damage categories
  4-Mobile-friendly interface
  5-Cloud deployment
  6-Automatic damage severity estimation
  7-Road damage statistics and analytics
  8-Real-time camera detection


 Author
  Rawan Yasser
GitHub:
  https://github.com/rawan24yasser