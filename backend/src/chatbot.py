# ==========================================
# Government Public Service Chatbot
# Main Chatbot
# ==========================================

import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from language_detection import detect_language
from translation import translate_to_english
from preprocessing import preprocess_text
from query_normalizer import normalize_query
from intent_prediction import predict_intent
from scheme_search import find_scheme
from llm.engine import LLMEngine
from voice_input import listen
from voice_output import speak

# ==========================================
# Initialize LLM
# ==========================================

engine = LLMEngine()

# ==========================================
# Take User Input
# ==========================================

print("=" * 50)
print("Government Public Service Chatbot")
print("=" * 50)

print("\nChoose Input Method")
print("1. Text")
print("2. Voice")

choice = input("\nEnter your choice (1 or 2): ")

if choice == "1":
    query = input("\nAsk your question: ")

elif choice == "2":
    query = listen()
    print(f"\nYou said: {query}")

else:
    print("Invalid choice.")
    exit()
# ==========================================
# Detect Language
# ==========================================

language_code, language_name = detect_language(query)

print("Language Code:", language_code)
print("Language Name:", language_name)

# ==========================================
# Translate Query
# ==========================================

if language_code == "en":
    translated_query = query
else:
    translated_query = translate_to_english(query)

# ==========================================
# Preprocess Query
# ==========================================

clean_query = preprocess_text(translated_query)
clean_query = normalize_query(clean_query)

# ==========================================
# Predict Intent
# ==========================================

intent = predict_intent(clean_query)

print("\nPredicted Intent:")
print(intent)

# ==========================================
# Retrieve Scheme
# ==========================================

scheme, score = find_scheme(clean_query)

if score < 0.30:

    response = engine.generate_response(
        query=query
    )

    print("\n" + "=" * 60)
    print("Government Public Service Chatbot")
    print("=" * 60)

    print("\nResponse:\n")
    print(response)

    exit()

# ==========================================
# Create Context
# ==========================================

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

# ==========================================
# Generate Response using Ollama
# ==========================================

response = engine.generate_response(
    query=query,
    context=context,
    update_context=True
)

# ==========================================
# Display Response
# ==========================================

print("\n" + "=" * 60)
print("Government Public Service Chatbot")
print("=" * 60)

print("\nResponse:\n")
print(response)

# Speak the response
if choice == "2":
    speak(response)

print(f"\nSimilarity Score : {round(score,3)}")