from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
import backend.services.supabase_service as db_service

router = APIRouter()

class EmergencyContact(BaseModel):
    name: str
    name_hi: str
    designation: str
    operator: str
    phone: str
    icon: str

@router.get("/emergency", response_model=List[EmergencyContact])
def get_emergency_endpoint():
    return db_service.MOCK_EMERGENCY
