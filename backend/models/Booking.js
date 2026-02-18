const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    propertyType: { type: String, enum: ['PG', 'Hostel'], required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'propertyType' },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
    paymentStatus: { type: String, enum: ['Paid', 'Not Paid'], default: 'Not Paid' },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
