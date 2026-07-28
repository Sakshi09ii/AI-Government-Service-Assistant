"""
Ollama Client

Responsible for communicating with the local
Ollama server.
"""

from ollama import Client

from llm.config import (
    OLLAMA_HOST,
    OLLAMA_MODEL,
)

class OllamaClient:

    def __init__(self):

        self.client = Client(
            host=OLLAMA_HOST
        )

        self.model = OLLAMA_MODEL

    def chat(
        self,
        messages,
        temperature=0.3
    ):

        response = self.client.chat(

            model=self.model,

            messages=messages,

            options={
                "temperature": temperature
            }

        )

        return response["message"]["content"]