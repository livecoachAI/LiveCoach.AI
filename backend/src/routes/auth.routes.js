const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyFirebaseToken } = require('../middleware/auth');
const {
    athleteValidationRules,
    coachValidationRules,
    checkValidation
} = require('../middleware/validation');

//POST /api/auth/register
router.post(
    '/register',
    (req, res, next) => {
        // Dynamically apply validation based on role
        const rules = req.body.role === 'athlete'
            ? athleteValidationRules()
            : coachValidationRules();

        Promise.all(rules.map(validation => validation.run(req)))
            .then(() => next());
    },
    checkValidation,
    authController.register
);

// Login Endpoint
router.post(
    '/login',
    verifyFirebaseToken,
    authController.login
);

// Verify Token Endpoint
router.get(
    '/verify',
    verifyFirebaseToken,
    authController.verifyToken
);

// Check User Existence Endpoint
router.post(
    '/check-user',
    authController.checkUserExists
);

// Complete Onboarding Endpoint
router.post(
    '/complete-onboarding',
    verifyFirebaseToken,
    authController.completeOnboarding
);

module.exports = router;