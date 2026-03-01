const Gig = require('../models/Gig');
const { successResponse, errorResponse } = require('../utils/response');

const createGig = async (req, res, next) => {
    try {
        // Use the manual ID for testing as you planned
        const coachId = req.user._id;

        // 1. Get ALL the fields your frontend is now sending
        const { name, location, price, billingCycle, phone, email, sport } = req.body;

        // 2. Map them into the new Gig object
        const newGig = new Gig({
            coachId,
            name,           // Now included
            location,       // Now included
            price,
            billingCycle,   // Now included
            phone,          // Now included
            email,          // Now included
            sport
        });

        await newGig.save(); 

        return successResponse(res, 201, 'Gig created successfully!', newGig);
    } catch (error) {
        // This will now catch any other validation issues
        next(error); 
    }
};



// 2. Function for Athletes to see all gigs
const getAllGigs = async (req, res, next) => {
    try {
        // We find all gigs and 'populate' the coach details so we know who made them
        const gigs = await Gig.find().populate('coachId', 'firstName lastName email');
        
        return successResponse(res, 200, 'Gigs retrieved successfully', gigs);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createGig,
    getAllGigs
};