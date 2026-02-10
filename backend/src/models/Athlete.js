const mongoose = require('mongoose');
const User = require('./User');

const athleteSchema = new mongoose.Schema({
    // Sport
    sport: {
        type: String,
        required: true,
        trim: true,
    },

    // Age
    age: {
        type: Number,
        required: true,
        min: 5,
        max: 120,
    },

    // Current coach (reference to Coach model)
    currentCoach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coach',
        default: null,
    },

    // Bio/Description
    bio: {
        type: String,
        maxlength: 500,
        default: '',
    },
});

// Create Athlete model as a discriminator of User
const Athlete = User.discriminator('athlete', athleteSchema);

module.exports = Athlete;