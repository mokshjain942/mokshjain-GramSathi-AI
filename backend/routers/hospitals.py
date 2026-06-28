from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
import backend.services.supabase_service as db_service

router = APIRouter()

class Hospital(BaseModel):
    name: str
    name_hi: str
    type: str
    address: str
    timings: str
    doctor: str
    phone: str

class HospitalResponse(BaseModel):
    hospitals: List[Hospital]
    tip: str
    tip_hi: str

@router.get("/hospitals", response_model=HospitalResponse)
def get_hospitals_endpoint():
    return HospitalResponse(
        hospitals=db_service.MOCK_HOSPITALS,
        tip="Wash hands thoroughly before meals and filter drinking water.",
        tip_hi="भोजन से पहले अपने हाथ अच्छी तरह धोएं और पीने के पानी को छानकर पिएं।"
    )
