"""
Prompt Builder

Creates the message list that will be sent to Ollama.
"""

from pathlib import Path


class PromptBuilder:

    def __init__(self):

        # Get project root directory
        base_dir = Path(__file__).resolve().parent.parent

        # Load system prompt
        prompt_file = base_dir / "prompts" / "system_prompt.txt"

        with open(prompt_file, "r", encoding="utf-8") as file:
            self.system_prompt = file.read()

    def build_prompt(self, query, context="", history=None):

        if history is None:
            history = []

        messages = []

        # -----------------------------
        # System Prompt
        # -----------------------------
        messages.append({
            "role": "system",
            "content": self.system_prompt
        })

        # -----------------------------
        # Government Knowledge Base Context
        # -----------------------------
        if context:
            messages.append({
                "role": "system",
                "content": f"""
Verified Government Information

The following information has been retrieved from the Government Knowledge Base.

Use ONLY the information provided below while answering.

If the answer is not available in this information,
politely reply:

"I couldn't find verified information for that request."

Do not invent or assume any facts.

----------------------------------------

{context}

----------------------------------------
"""
            })

        # -----------------------------
        # Previous Conversation
        # -----------------------------
        messages.extend(history)

        # -----------------------------
        # Current User Query
        # -----------------------------
        messages.append({
            "role": "user",
            "content": query
        })

        return messages