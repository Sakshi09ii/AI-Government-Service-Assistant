"""
Configuration settings for the LLM Module.
"""

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# -----------------------------
# Ollama Configuration
# -----------------------------

OLLAMA_HOST = os.getenv(
    "OLLAMA_HOST",
    "http://localhost:11434"
)

OLLAMA_MODEL = os.getenv(
    "OLLAMA_MODEL",
    "llama3.2:3b"
)

# -----------------------------
# LLM Parameters
# -----------------------------

TEMPERATURE = 0.3

TOP_P = 0.9

MAX_HISTORY = 5