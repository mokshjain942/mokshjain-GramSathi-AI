import sys
import os
import types

# Resolve directories
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.abspath(os.path.join(current_dir, ".."))

# Add directories to Python module search path
sys.path.insert(0, parent_dir)
sys.path.insert(0, current_dir)

# Mock 'backend' module in sys.modules if it is not importable (e.g., when root is set to 'backend')
try:
    import backend
except ImportError:
    backend_mock = types.ModuleType("backend")
    backend_mock.__path__ = [current_dir]
    sys.modules["backend"] = backend_mock

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Import Routers
from backend.routers import (
    auth,
    chat,
    schemes,
    hospitals,
    businesses,
    emergency,
    map as map_router,
    announcements,
    profile,
    education
)

app = FastAPI(
    title="GramSathi AI API",
    description="Backend API supporting rural digital empowerment features.",
    version="1.0.0"
)

# Configure CORS so our React frontend can query the APIs
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for hackathon simplicity
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers under '/api' prefix
app.include_router(auth.router, prefix="/api", tags=["Authentication"])
app.include_router(chat.router, prefix="/api", tags=["AI Chatbot"])
app.include_router(schemes.router, prefix="/api", tags=["Government Schemes"])
app.include_router(hospitals.router, prefix="/api", tags=["Healthcare"])
app.include_router(businesses.router, prefix="/api", tags=["Local Businesses"])
app.include_router(emergency.router, prefix="/api", tags=["Emergency Hotlines"])
app.include_router(map_router.router, prefix="/api", tags=["Village Map"])
app.include_router(announcements.router, prefix="/api", tags=["Notice Board"])
app.include_router(profile.router, prefix="/api", tags=["User Profiles"])
app.include_router(education.router, prefix="/api", tags=["Digital Education"])

@app.get("/")
def root_endpoint():
    return {
        "status": "online",
        "project": "GramSathi AI",
        "tagline": "Empowering Every Village, One Click at a Time",
        "docs_url": "/docs"
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
