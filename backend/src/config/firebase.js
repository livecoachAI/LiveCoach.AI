const admin = require('firebase-admin');
const config = require('./environment');
const path = require('path');

let firebaseApp;

const initializeFirebase = () => {
    try {
        // Path to service account key
        const serviceAccountPath = path.resolve(config.firebaseServiceAccountPath);

        // Load the service account key
        const serviceAccount = require(serviceAccountPath);

        // Initialize Firebase Admin
        firebaseApp = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });

        console.log('Firebase Admin initialized successfully');

    } catch (error) {
        console.error('Firebase Admin initialization error:', error.message);
        console.error('Make sure serviceAccountKey.json is in the root folder');
        process.exit(1);
    }
};

const getFirebaseAdmin = () => {
    if (!firebaseApp) {
        throw new Error('Firebase Admin not initialized');
    }
    return admin;
};


const getFirebaseAuth = () => {
    if (!firebaseApp) {
        throw new Error('Firebase Admin not initialized');
    }
    return admin.auth();
};

module.exports = {
    initializeFirebase,
    getFirebaseAdmin,
    getFirebaseAuth,
};