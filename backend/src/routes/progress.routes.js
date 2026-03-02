const express = require('express');
const router = express.Router();
const { getAthleteSessionDates } = require('../controllers/progress.controller');


// Route: GET /api/sessions/dates/:athleteId
router.get('/dates/:userId', getAthleteSessionDates);

module.exports = router;