from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.services.groq_service import get_chat_response

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    language: str = "en"

class ChatResponse(BaseModel):
    reply: str

@router.post("/chat", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest):
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    reply = get_chat_response(request.message, request.language)
    return ChatResponse(reply=reply)
