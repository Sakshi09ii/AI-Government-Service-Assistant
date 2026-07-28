from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from src.language_detection import detect_language
from src.translation import translate_to_english
from src.preprocessing import preprocess_text
from src.query_normalizer import normalize_query
from src.intent_prediction import predict_intent
from src.scheme_search import find_scheme
from llm.engine import LLMEngine

app = FastAPI(title="Government Public Service AI API")

# Allow Next.js frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = LLMEngine()


class ChatRequest(BaseModel):
    query: str
    context: str = ""


class ChatResponse(BaseModel):
    response: str


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):

    query = request.query

    language_code, language_name = detect_language(query)

    if language_code == "en":
        translated_query = query
    else:
        translated_query = translate_to_english(query)

    clean_query = preprocess_text(translated_query)
    clean_query = normalize_query(clean_query)

    intent = predict_intent(clean_query)

    scheme, score = find_scheme(clean_query)

    if score < 0.30:

        response = engine.generate_response(
            query=query
        )

        return ChatResponse(response=response)

    context = f"""
Scheme Name:
{scheme["scheme_name"]}

Benefits:
{scheme["benefits"]}

Eligibility:
{scheme["eligibility"]}

Documents:
{scheme["documents"]}

Application Process:
{scheme["application"]}
"""

    response = engine.generate_response(
        query=query,
        context=context,
        update_context=True
    )

    return ChatResponse(response=response)