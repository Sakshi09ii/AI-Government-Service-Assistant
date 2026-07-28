# ==========================================
# Government Public Service Chatbot
# Module 05 : Intent Prediction
# ==========================================


import joblib

from src.preprocessing import preprocess_text
from src.query_normalizer import normalize_query

# ==========================================
# Load Saved Models
# ==========================================

svm_model = joblib.load("models/svm_model.pkl")
tfidf_vectorizer = joblib.load("models/tfidf_vectorizer.pkl")
label_encoder = joblib.load("models/label_encoder.pkl")

def predict_intent(query):

# ==========================================
# Preprocess Query
# ==========================================

     clean_query = preprocess_text(query)

     print("\nClean Query:")
     print(clean_query)

# ==========================================
# Convert into TF-IDF
# ==========================================

     query_vector = tfidf_vectorizer.transform([clean_query])

# ==========================================
# Predict Intent
# ==========================================

     prediction = svm_model.predict(query_vector)

     intent = label_encoder.inverse_transform(prediction)

# ==========================================
# Display Result
# ==========================================

     return intent[0]

if __name__ == "__main__":

    print("=" * 60)
    print("Models Loaded Successfully")
    print("=" * 60)

    query = input("\nEnter your query: ")

    intent = predict_intent(query)

    print("\nPredicted Intent:")
    print(intent) 