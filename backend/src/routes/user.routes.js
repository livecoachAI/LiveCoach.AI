// User routes for profile management and public user info
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyFirebaseToken, attachUser, requireRole } = require('../middleware/auth');
const { updateProfileValidationRules, checkValidation } = require('../middleware/validation');

// Get current user's profile
router.get(
    '/profile',
    verifyFirebaseToken,
    attachUser,
    userController.getProfile
);

// Update current user's profile
router.put(
    '/profile',
    verifyFirebaseToken,
    attachUser,
    updateProfileValidationRules(),
    checkValidation,
    userController.updateProfile
);

// Delete current user's profile
router.delete(
    '/profile',
    verifyFirebaseToken,
    attachUser,
    userController.deleteProfile
);

// Get public user info by user ID (only for coaches and athletes)
router.get(
    '/:userId',
    verifyFirebaseToken,
    userController.getUserById
);

module.exports = router;