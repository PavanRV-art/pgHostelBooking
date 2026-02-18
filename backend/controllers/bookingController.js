const mongoose = require('mongoose');
const Booking = require('../models/Booking');

// @desc    Create new booking
// @route   POST /api/bookings
const createBooking = async (req, res) => {
    try {
        const { propertyId, propertyType } = req.body;

        const booking = new Booking({
            user: req.user._id,
            propertyId,
            propertyType,
        });

        const createdBooking = await booking.save();
        res.status(201).json(createdBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).populate({
            path: 'propertyId',
            model: req.query.type || 'PG' // Default to PG if not specified, though refPath should handle it if populated correctly. 
            // Actually, with refPath, we might need a more complex populate or just separate queries if it fails.
            // Let's use a simpler approach for now or ensure refPath works.
        });

        // Manual population if refPath is tricky with polymorphic refs in Mongoose sometimes
        const populatedBookings = await Promise.all(bookings.map(async (booking) => {
            const model = mongoose.model(booking.propertyType);
            const property = await model.findById(booking.propertyId);
            return { ...booking._doc, propertyId: property };
        }));

        res.json(populatedBookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update booking payment status
// @route   PUT /api/bookings/:id/pay
const updateBookingToPaid = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (booking) {
            booking.paymentStatus = 'Paid';
            booking.status = 'Confirmed';
            const updatedBooking = await booking.save();
            res.json(updatedBooking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Note: Added mongoose import for the manual population if needed, but I'll fix the controller file content.
module.exports = { createBooking, getMyBookings, updateBookingToPaid };
