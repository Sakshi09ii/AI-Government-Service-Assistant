"""
Conversation Memory Manager

Stores and manages conversation history
for the LLM.
"""

from multiprocessing import context
from typing import List, Dict


class MemoryManager:
    """
    Handles conversation memory.

    Responsibilities:
    - Store messages
    - Retrieve messages
    - Clear conversation
    - Limit history size
    """

    def __init__(self, max_history: int = 10):
        self.max_history = max_history
        self.history: List[Dict[str, str]] = []
        self.current_context = ""

    def add_message(self, role: str, content: str):
        """
        Add a message to conversation history.
        """

        self.history.append({
            "role": role,
            "content": content
        })

        # Keep only recent messages
        if len(self.history) > self.max_history:
            self.history = self.history[-self.max_history:]

    def get_history(self):
        """
        Return conversation history.
        """

        return self.history

    def clear(self):
        """
        Clear conversation history.
        """

        self.history.clear()

    def set_context(self, context):
    
        self.current_context = context


    def get_context(self):

        return self.current_context

    def message_count(self):
        """
        Return number of stored messages.
        """

        return len(self.history)