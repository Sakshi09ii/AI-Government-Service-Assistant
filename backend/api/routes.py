from fastapi import APIRouter
from pydantic import BaseModel

from llm.engine import LLMEngine

router = APIRouter()

engine = LLMEngine()


class ChatRequest(BaseModel):
    query: str
    context: str = ""


class ChatResponse(BaseModel):
    response: str


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):

    answer = engine.generate_response(
        query=request.query,
        context=request.context
    )

    return ChatResponse(
        response=answer
    )