# AI Service

Computer vision and AI analysis service for LiveCoach.AI using FastAPI, YOLOv8, and Google Gemini.


## Manual Setup

```bash
# Set Python version
pyenv local 3.11.7

# Remove existing venv if it exists
rm -rf venv

# Create virtual environment
python3.11 -m venv venv

# Activate (macOS/Linux)
source venv/bin/activate

#Activate Windows
.\venv\Scripts\Activate

# Install dependencies
pip install -r requirements.txt
```

## Requirements

- Python 3.11.7
- pyenv (for Python version management)
- pip (included with Python)

## Running the Service

After setup, the virtual environment will be active. To run the service:

```bash
python3 main.py
```

## Reactivating the Environment

If you close your terminal, reactivate the environment with:

```bash
source venv/bin/activate
```

## Dependencies

See `requirements.txt` for all dependencies including:
- FastAPI & Uvicorn (API framework)
- PyTorch & TorchVision (ML framework)
- YOLOv8 (Computer vision)
- Google Generative AI (Gemini integration)
- OpenCV (Video processing)

## To seed models data to mongodb
python -m scripts.seed_models_to_mongo