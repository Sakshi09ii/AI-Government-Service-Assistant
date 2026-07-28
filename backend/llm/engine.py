"""
LLM Engine

Coordinates the complete conversation flow.
"""

from llm.client import OllamaClient
from llm.prompts import PromptBuilder
from memory.memory_manager import MemoryManager


class LLMEngine:

    def __init__(self):

        self.client = OllamaClient()

        self.memory = MemoryManager(max_history=10)

        self.prompt_builder = PromptBuilder()

    def generate_response(
        self,
        query,
        context="",
        update_context=False
    ):
        
        # Update current service context if a new one is received
        if update_context and context:
            self.memory.set_context(context)

        # Always use the latest stored context
        current_context = self.memory.get_context()

        # Build prompt using previous history
        messages = self.prompt_builder.build_prompt(

            query=query,

            context=current_context,

            history=self.memory.get_history()

        )

        # Generate response
        response = self.client.chat(messages)

        # Save current conversation
        self.memory.add_message("user", query)
        self.memory.add_message("assistant", response)

        return response

    def clear_chat(self):

        self.memory.clear()