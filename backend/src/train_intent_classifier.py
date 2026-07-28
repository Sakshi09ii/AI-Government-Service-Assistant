# ============================================================
# Government Public Service Chatbot
# File: 04_train_intent_classifier.py
# Purpose: Train the Intent Classification Model using TF-IDF + SVM
# ============================================================

# Import required libraries

import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.svm import SVC
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report,
    confusion_matrix
)

import joblib

# ============================================================
# Step 1: Load the Intent Dataset
# ============================================================

# Load the cleaned intent dataset
dataset = pd.read_csv("data/Final_Intent_Dataset_500.csv")

# Display the first 5 rows
print("\nFirst 5 Rows of Dataset:")
print(dataset.head())

# Display basic information
print("\nDataset Information:")
print(dataset.info())

# Display dataset shape
print("\nDataset Shape:")
print(dataset.shape)

# Display column names
print("\nColumn Names:")
print(dataset.columns)

# Check for missing values
print("\nMissing Values:")
print(dataset.isnull().sum())


# ============================================================
# STEP 2 : Load the Intent Dataset
# ============================================================

# Load the cleaned intent dataset
dataset = pd.read_csv("data/Final_Intent_Dataset_500.csv")
print("=" * 60)
print("Intent Dataset Loaded Successfully")
print("=" * 60)

# Display first 5 rows
print("\nFirst 5 Rows:")
print(dataset.head())

# Display dataset shape
print("\nDataset Shape:")
print(dataset.shape)

# Display column names
print("\nColumn Names:")
print(dataset.columns.tolist())

# Display dataset information
print("\nDataset Information:")
print(dataset.info())

# Check missing values
print("\nMissing Values:")
print(dataset.isnull().sum())

# ============================================================
# STEP 3 : Separate Features and Labels
# ============================================================

# X contains the user queries (input)
X = dataset["query"]

# y contains the corresponding intents (output)
y = dataset["intent"]

print("\n" + "=" * 60)
print("Features (X)")
print("=" * 60)
print(X.head())

print("\n" + "=" * 60)
print("Labels (y)")
print("=" * 60)
print(y.head())

# ============================================================
# STEP 4 : Check Intent Distribution
# ============================================================

print("\n" + "=" * 60)
print("Intent Distribution")
print("=" * 60)

intent_counts = dataset["intent"].value_counts()

print(intent_counts)

# ============================================================
# STEP 5 : Encode Intent Labels
# ============================================================

label_encoder = LabelEncoder()

y_encoded = label_encoder.fit_transform(y)

print("\n" + "=" * 60)
print("Encoded Labels")
print("=" * 60)

for original, encoded in zip(label_encoder.classes_, range(len(label_encoder.classes_))):
    print(f"{original} --> {encoded}")


    # ============================================================
# STEP 6 : Split Dataset into Training and Testing Sets
# ============================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y_encoded,
    test_size=0.20,
    random_state=42,
    stratify=y_encoded
)

print("\n" + "=" * 60)
print("Dataset Split Completed")
print("=" * 60)

print(f"Training Samples : {len(X_train)}")
print(f"Testing Samples  : {len(X_test)}")

# ============================================================
# STEP 7 : TF-IDF Vectorization
# ============================================================

# Create TF-IDF Vectorizer
tfidf_vectorizer = TfidfVectorizer()

# Learn vocabulary from training data
X_train_tfidf = tfidf_vectorizer.fit_transform(X_train)

# Transform testing data using same vocabulary
X_test_tfidf = tfidf_vectorizer.transform(X_test)

print("\n" + "=" * 60)
print("TF-IDF Vectorization Completed")
print("=" * 60)

print(f"Training Matrix Shape : {X_train_tfidf.shape}")
print(f"Testing Matrix Shape  : {X_test_tfidf.shape}")

# ============================================================
# STEP 8 : Train the SVM Classifier
# ============================================================

# Create SVM model
svm_model = SVC(kernel="linear")

# Train the model
svm_model.fit(X_train_tfidf, y_train)

print("\n" + "=" * 60)
print("SVM Model Training Completed")
print("=" * 60)

# ============================================================
# STEP 9 : Model Prediction
# ============================================================

# Predict intents for test dataset
y_pred = svm_model.predict(X_test_tfidf)

print("\n" + "=" * 60)
print("Prediction Completed")
print("=" * 60)

print("\nFirst 10 Predictions:\n")

for actual, predicted in list(zip(y_test, y_pred))[:10]:
    actual_label = label_encoder.inverse_transform([actual])[0]
    predicted_label = label_encoder.inverse_transform([predicted])[0]

    print(f"Actual: {actual_label:<25} Predicted: {predicted_label}")

# ============================================================
# STEP 10 : Model Evaluation
# ============================================================

accuracy = accuracy_score(y_test, y_pred)

precision = precision_score(
    y_test,
    y_pred,
    average="weighted"
)

recall = recall_score(
    y_test,
    y_pred,
    average="weighted"
)

f1 = f1_score(
    y_test,
    y_pred,
    average="weighted"
)

print("\n" + "=" * 60)
print("Model Performance")
print("=" * 60)

print(f"Accuracy  : {accuracy:.4f}")
print(f"Precision : {precision:.4f}")
print(f"Recall    : {recall:.4f}")
print(f"F1 Score  : {f1:.4f}")

# ============================================================
# STEP 11 : Classification Report
# ============================================================

print("\n" + "=" * 60)
print("Classification Report")
print("=" * 60)

print(
    classification_report(
        y_test,
        y_pred,
        target_names=label_encoder.classes_
    )
)

# ============================================================
# STEP 12 : Confusion Matrix
# ============================================================

cm = confusion_matrix(y_test, y_pred)

print("\n" + "=" * 60)
print("Confusion Matrix")
print("=" * 60)

print(cm)

# ============================================================
# STEP 13 : Save Model
# ============================================================

joblib.dump(svm_model, "models/svm_model.pkl")
joblib.dump(tfidf_vectorizer, "models/tfidf_vectorizer.pkl")
joblib.dump(label_encoder, "models/label_encoder.pkl")

print("\n" + "=" * 60)
print("Models Saved Successfully")
print("=" * 60)