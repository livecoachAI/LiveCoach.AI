//Firebase Service - Handles interactions with Firebase Authentication
const { getFirebaseAuth } = require('../config/firebase');
const logger = require('../utils/logger');

//Verify Firebase ID Token
const verifyIdToken = async (token) => {
    try {
        const decodedToken = await getFirebaseAuth().verifyIdToken(token);
        return { success: true, data: decodedToken };
    } catch (error) {
        logger.error('Token verification failed:', error.message);
        return { success: false, error: error.message };
    }
};

//Get Firebase User by UID
const getUserByUid = async (uid) => {
    try {
        const userRecord = await getFirebaseAuth().getUser(uid);
        return { success: true, data: userRecord };
    } catch (error) {
        logger.error('Error fetching Firebase user:', error.message);
        return { success: false, error: error.message };
    }
};

//Update Email Verification Status
const updateEmailVerification = async (uid, verified) => {
    try {
        await getFirebaseAuth().updateUser(uid, {
            emailVerified: verified,
        });
        return { success: true };
    } catch (error) {
        logger.error('Error updating email verification:', error.message);
        return { success: false, error: error.message };
    }
};

//Delete Firebase User
const deleteFirebaseUser = async (uid) => {
    try {
        await getFirebaseAuth().deleteUser(uid);
        logger.success('Firebase user deleted:', uid);
        return { success: true };
    } catch (error) {
        logger.error('Error deleting Firebase user:', error.message);
        return { success: false, error: error.message };
    }
};

//Create Custom Token for Firebase Authentication
const createCustomToken = async (uid) => {
    try {
        const customToken = await getFirebaseAuth().createCustomToken(uid);
        return { success: true, token: customToken };
    } catch (error) {
        logger.error('Error creating custom token:', error.message);
        return { success: false, error: error.message };
    }
};

module.exports = {
    verifyIdToken,
    getUserByUid,
    updateEmailVerification,
    deleteFirebaseUser,
    createCustomToken,
};