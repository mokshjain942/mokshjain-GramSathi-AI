from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ProfileUpdateRequest(BaseModel):
    full_name: str
    phone: str
    village: str
    state: str
    occupation: str = ""
    aadhaar: str = ""

@router.put("/profile")
def update_profile_endpoint(request: ProfileUpdateRequest):
    return {"status": "success", "profile": request}
