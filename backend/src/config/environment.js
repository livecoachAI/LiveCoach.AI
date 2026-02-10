require('dotenv').config();

const config = {
    // Server
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',

    // Database
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/coaching-app',

    // Firebase
    firebaseServiceAccountPath: process.env.FIREBASE_SERVICE_ACCOUNT_PATH,

    // CORS
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:8081',

    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development',
};

// Validate required environment variables
const requiredEnvVars = [
    'MONGODB_URI',
    'FIREBASE_SERVICE_ACCOUNT_PATH'
];

requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
        console.error(`Error: ${varName} is not defined in .env file`);
        process.exit(1);
    }
});

module.exports = config;