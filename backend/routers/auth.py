from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class AuthRequest(BaseModel):
    email: str
    password: str

class SignupRequest(BaseModel):
    email: str
    password: str
    fullName: str
    phone: str
    village: str
    state: str
    occupation: str = ""
    aadhaar: str = ""

@router.post("/auth/login")
def login_mock(request: AuthRequest):
    return {"status": "success", "user": {"email": request.email, "id": "mock-user-123"}}

@router.post("/auth/signup")
def signup_mock(request: SignupRequest):
    return {"status": "success", "user": {"email": request.email, "id": "mock-user-123"}}
