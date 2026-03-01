const express = require('express');
const router = express.Router();
const gigController = require('../controllers/gig.controller');

// Import the 'Security Guard' tools your team already made
const { verifyFirebaseToken, attachUser, requireRole } = require('../middleware/auth');

// 1. Route for Athletes (and Coaches) to view all gigs
// This only requires being logged in
router.get('/', gigController.getAllGigs);

// 2. Route for Coaches ONLY to create a new gig
// Note how we use 'requireRole('coach')' here!
router.post(
    '/create', 
    verifyFirebaseToken, // Checks if the user is logged into Firebase
    attachUser,          // Finds the user in your MongoDB
    requireRole('coach'), // Ensures the user has the 'coach' role
    gigController.createGig
);

module.exports = router;