const admin = require('firebase-admin');
const config = require('./environment');

// Prevent re-initialization in serverless (Vercel safe)
if (!admin.apps.length) {
    try {
        const {
            projectId,
            privateKeyId,
            privateKey,
            clientEmail,
            clientId,
            clientX509CertUrl,
        } = config.firebase;

        if (!projectId) throw new Error('FIREBASE_PROJECT_ID is missing');
        if (!privateKey) throw new Error('FIREBASE_PRIVATE_KEY is missing');
        if (!clientEmail) throw new Error('FIREBASE_CLIENT_EMAIL is missing');

        admin.initializeApp({
            credential: admin.credential.cert({
                type: 'service_account',
                project_id: projectId,
                private_key_id: privateKeyId,
                private_key: privateKey, // already fixed in environment.js
                client_email: clientEmail,
                client_id: clientId,
                auth_uri: 'https://accounts.google.com/o/oauth2/auth',
                token_uri: 'https://oauth2.googleapis.com/token',
                auth_provider_x509_cert_url: 'https://www.googleapis.com/googleapis2/v1/certs',
                client_x509_cert_url: clientX509CertUrl,
            }),
        });

        console.log('✅ Firebase Admin initialized');
    } catch (error) {
        console.error('❌ Firebase Admin initialization error:', error.message);
        throw error; // let Vercel fail properly
    }
}

module.exports = admin;
