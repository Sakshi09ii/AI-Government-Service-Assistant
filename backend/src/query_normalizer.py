# ==========================================
# Query Normalization
# ==========================================

import re

def normalize_query(query):

    query = query.lower().strip()

    replacements = {
        "pm kisan": "pradhan mantri kisan samman nidhi",
        "pm awas": "pradhan mantri awas yojana",
        "pmay": "pradhan mantri awas yojana",
        "pmuy": "pradhan mantri ujjwala yojana",
        "skill india": "pradhan mantri kaushal vikas yojana"
    }

    # Replace abbreviations
    for old, new in replacements.items():
        query = query.replace(old, new)

    # Add 'bharat' only if it isn't already there
    if "ayushman" in query and "ayushman bharat" not in query:
        query = query.replace("ayushman", "ayushman bharat")

    # Remove duplicate words
    words = query.split()

    cleaned = []

    for word in words:
        if word not in cleaned:
            cleaned.append(word)

    query = " ".join(cleaned)

    return query


if __name__ == "__main__":

    query = input("Enter Query: ")

    print(normalize_query(query))