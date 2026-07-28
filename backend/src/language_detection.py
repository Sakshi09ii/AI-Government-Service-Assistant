# ==========================================
# Government Public Service Chatbot
# Module 02 : Language Detection
# ==========================================

from langdetect import detect

def detect_language(query):

    language = detect(query)

    language_names = {
        "en": "English",
        "hi": "Hindi",
        "mr": "Marathi"
    }

    if language not in language_names:
      language = "en"

    return language, language_names.get(language, "English")
if __name__ == "__main__":

    query = input("Enter your query: ")

    language_code, language_name = detect_language(query)

    print("\nLanguage Code :", language_code)
    print("Language Name :", language_name)
    