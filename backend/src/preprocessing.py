# ==========================================
# Government Public Service Chatbot
# Module 04 : Text Preprocessing
# ==========================================

import re
import string


from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer


def preprocess_text(text):
    """
    Cleans the user query before sending it to the AI model.
    """

    # Convert to lowercase
    text = text.lower()

    # Remove punctuation
    text = re.sub(f"[{re.escape(string.punctuation)}]", "", text)

    # Tokenize sentence
    tokens = word_tokenize(text)

    # Load stopwords
    stop_words = set(stopwords.words("english"))

    # Remove stopwords
    tokens = [word for word in tokens if word not in stop_words]

    # Lemmatization
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(word) for word in tokens]

    # Convert list back to sentence
    clean_text = " ".join(tokens)

    return clean_text


# ==========================================
# Testing
# ==========================================

if __name__ == "__main__":

    query = input("Enter your query: ")

    cleaned_query = preprocess_text(query)

    print("\nOriginal Query:")
    print(query)

    print("\nCleaned Query:")
    print(cleaned_query)