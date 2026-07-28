# ==========================================
# Government Public Service Chatbot
# Module 06 : Scheme Search
# ==========================================

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from rapidfuzz import process, fuzz

# ==========================================
# Load Dataset
# ==========================================

df = pd.read_csv("data/cleaned_government_schemes.csv")

# ==========================================
# Create Search Text
# ==========================================

df["search_text"] = (
    df["scheme_name"].fillna("") + " " +
    df["tags"].fillna("") + " " +
    df["clean_text"].fillna("")
)

# ==========================================
# Create TF-IDF Model
# ==========================================

vectorizer = TfidfVectorizer(
    ngram_range=(1,2),
    stop_words="english"
)

tfidf_matrix = vectorizer.fit_transform(df["search_text"])

# ==========================================
# Common Scheme Aliases
# ==========================================

ALIASES = {

    "pm kisan":"pradhan mantri kisan samman nidhi",
    "pm-kisan":"pradhan mantri kisan samman nidhi",
    "kisan":"pradhan mantri kisan samman nidhi",

    "pm awas":"pradhan mantri awas yojana",
    "pmawas":"pradhan mantri awas yojana",
    "awas":"pradhan mantri awas yojana",

    "ayushman":"ayushman bharat",
    "abha":"ayushman bharat",

    "mudra":"pradhan mantri mudra yojana",

    "skill india":"skill india",

    "startup india":"startup india",

    "ujjwala":"pradhan mantri ujjwala yojana"
}


# ==========================================
# Scheme Search
# ==========================================

def find_scheme(query):

    query = query.lower().strip()

    # ======================================
    # STEP 0 : Apply Aliases
    # ======================================

    if query in ALIASES:
        query = ALIASES[query]

    # ======================================
    # STEP 1 : Keyword Match
    # ======================================

    query_words = set(query.split())

    best_scheme = None
    best_overlap = 0

    for _, row in df.iterrows():

        scheme_name = str(row["scheme_name"]).lower()

        scheme_words = set(scheme_name.split())

        overlap = len(query_words & scheme_words)

        if overlap > best_overlap:
            best_overlap = overlap
            best_scheme = row

    # If at least 2 words match, return it
    if best_scheme is not None and best_overlap >= 2:
        return best_scheme, 1.0

    # ======================================
    # STEP 2 : Fuzzy Match
    # ======================================

    scheme_names = df["scheme_name"].fillna("").tolist()

    best_match = process.extractOne(
        query,
        scheme_names,
        scorer=fuzz.token_sort_ratio
    )

    if best_match:

        matched_name = best_match[0]
        fuzzy_score = best_match[1] / 100

        if fuzzy_score >= 0.85:

            scheme = df[
                df["scheme_name"] == matched_name
            ].iloc[0]

            return scheme, fuzzy_score

    # ======================================
    # STEP 3 : TF-IDF Search
    # ======================================

    query_vector = vectorizer.transform([query])

    similarity = cosine_similarity(
        query_vector,
        tfidf_matrix
    )

    best_index = similarity.argmax()

    best_score = similarity[0][best_index]

    return df.iloc[best_index], float(best_score)

# ==========================================
# Testing
# ==========================================

if __name__ == "__main__":

    while True:

        query = input("\nEnter Scheme Name : ")

        scheme,score = find_scheme(query)

        print("\nMatched Scheme :")
        print(scheme["scheme_name"])

        print("\nSimilarity :",round(score,3))

    print("\nMatched Scheme:")
    print(scheme["scheme_name"])
