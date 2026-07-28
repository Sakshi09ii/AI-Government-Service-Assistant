# ==========================================
# Government Public Service Chatbot
# Module 03 : Translation
# ==========================================

from deep_translator import GoogleTranslator


def translate_to_english(query):

    translated = GoogleTranslator(
        source="auto",
        target="en"
    ).translate(query)

    return translated


if __name__ == "__main__":

    query = input("Enter your query: ")

    translated_query = translate_to_english(query)

    print("\nTranslated Query:")
    print(translated_query)