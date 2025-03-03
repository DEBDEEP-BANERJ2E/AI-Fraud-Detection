import os
import sys
import pandas as pd
import xgboost as xgb
import pickle
import mysql.connector
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder

# Ensure a user_id argument is provided
if len(sys.argv) < 2:
    print("Error: No user ID provided.")
    sys.exit(1)

selected_user = sys.argv[1]  # Get user_id from command-line argument

# Load dataset
csv_file = "sample_fraud_dataset.csv"
df = pd.read_csv(csv_file)

# Encode categorical variables
label_encoders = {}
categorical_columns = ['merchant', 'location', 'transaction_type']
for col in categorical_columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Ensure necessary columns exist
if 'is_fraud' not in df.columns:
    raise KeyError("Dataset does not contain 'is_fraud' column.")

# Drop non-numeric columns before training
non_numeric_columns = ['user_id', 'transaction_id']
df = df.drop(columns=[col for col in non_numeric_columns if col in df.columns])

# Define features and labels
X = df.drop(columns=['is_fraud'])
y = df['is_fraud']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = xgb.XGBClassifier(eval_metric='logloss')
model.fit(X_train, y_train)

# Save initial model
with open('fraud_model.pkl', 'wb') as f:
    pickle.dump(model, f)

# Connect to database
db_config = {
    "host": os.getenv("DB_HOST", "localhost"),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASS", "Deb@070104"),
    "database": os.getenv("DB_NAME", "fraud_detection")
}
conn = mysql.connector.connect(**db_config)
cursor = conn.cursor()

# Validate if user ID exists in the database
cursor.execute("SELECT COUNT(*) FROM transactions WHERE user_id = %s", (selected_user,))
if cursor.fetchone()[0] == 0:
    print("Error: The entered user ID does not exist or has no transactions.")
    cursor.close()
    conn.close()
    sys.exit(1)

# Fetch transaction data for the given user ID
query = "SELECT * FROM transactions WHERE user_id = %s"
cursor.execute(query, (selected_user,))
db_data = cursor.fetchall()
columns = [desc[0] for desc in cursor.description]
db_df = pd.DataFrame(db_data, columns=columns)

# Drop invalid columns
invalid_columns = ['id', 'timestamp', 'device_id', 'ip_address']
db_df = db_df.drop(columns=[col for col in invalid_columns if col in db_df.columns], errors='ignore')

# Encode categorical variables in new data (handle unseen categories)
for col, le in label_encoders.items():
    if col in db_df.columns:
        db_df[col] = db_df[col].map(lambda x: le.transform([x])[0] if x in le.classes_ else -1)

# Ensure new data contains only numeric types
db_df = db_df.select_dtypes(include=['int64', 'float64'])

# Merge new data with training data if it's not empty
if not db_df.empty:
    X_train_updated = pd.concat([X_train, db_df], ignore_index=True)
    y_train_updated = pd.concat([y_train, pd.Series([0] * len(db_df))], ignore_index=True)  # Assuming new data is not fraud

    # Retrain model
    model.fit(X_train_updated, y_train_updated)

    # Save updated model
    with open('fraud_model.pkl', 'wb') as f:
        pickle.dump(model, f)

# Predict fraud risk
if not db_df.empty:
    # Ensure new transaction data contains all expected features
    expected_features = X_train.columns
    for feature in expected_features:
        if feature not in db_df.columns:
            db_df[feature] = 0  # Assign a default value for missing features

    # Sample a record and ensure feature order matches training data
    random_record = db_df.sample(n=1)[expected_features]

    # Predict fraud risk
    fraud_risk_score = model.predict_proba(random_record)[:, 1]

    print(f"Fraud Risk Score for selected transaction: {fraud_risk_score[0]:.4f}")

# Close database connection
cursor.close()
conn.close()
