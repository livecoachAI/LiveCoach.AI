#!/bin/bash
# Script to help extract Firebase credentials from serviceAccountKey.json

if [ ! -f "serviceAccountKey.json" ]; then
    echo "❌ Error: serviceAccountKey.json not found!"
    echo "Please place your Firebase service account key in the backend directory"
    exit 1
fi

echo "📋 Firebase Service Account Credentials"
echo "======================================"
echo ""
echo "Copy these values to Vercel Environment Variables:"
echo ""

echo "1️⃣ FIREBASE_PROJECT_ID:"
jq -r '.project_id' serviceAccountKey.json
echo ""

echo "2️⃣ FIREBASE_PRIVATE_KEY_ID:"
jq -r '.private_key_id' serviceAccountKey.json
echo ""

echo "3️⃣ FIREBASE_CLIENT_EMAIL:"
jq -r '.client_email' serviceAccountKey.json
echo ""

echo "4️⃣ FIREBASE_CLIENT_ID:"
jq -r '.client_id' serviceAccountKey.json
echo ""

echo "5️⃣ FIREBASE_CLIENT_X509_CERT_URL:"
jq -r '.client_x509_cert_url' serviceAccountKey.json
echo ""

echo "6️⃣ FIREBASE_PRIVATE_KEY:"
echo "⚠️  Copy this ENTIRE key (with line breaks) to Vercel:"
echo ""
jq -r '.private_key' serviceAccountKey.json
echo ""

echo "✅ All credentials extracted!"
echo "Now go to Vercel Dashboard > Project Settings > Environment Variables"
