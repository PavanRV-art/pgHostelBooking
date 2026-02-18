const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');

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

            // Fetch extra details for the email
            try {
                const user = await User.findById(booking.user);

                // Polymorphic fetch for property
                const PropertyModel = mongoose.model(booking.propertyType);
                const property = await PropertyModel.findById(booking.propertyId);

                if (user && property) {
                    const emailOptions = {
                        email: user.email,
                        subject: `Booking Confirmed: ${property.name}`,
                        html: `
                            <div style="font-family: Arial, sans-serif; padding: 40px; color: #333; line-height: 1.6;">
                                <h1 style="color: #2563eb; margin-bottom: 20px;">StayBanglore</h1>
                                <p>Hi <b>${user.name}</b>,</p>
                                <p>Great news! Your payment for <b>${property.name}</b> has been received and your booking is now <b>Confirmed</b>.</p>
                                <div style="background: #f8fafc; padding: 25px; border-radius: 15px; border: 1px solid #e2e8f0; margin: 30px 0;">
                                    <h3 style="margin-top: 0; color: #1e293b;">Booking Summary</h3>
                                    <p style="margin: 5px 0;"><b>Property:</b> ${property.name}</p>
                                    <p style="margin: 5px 0;"><b>Type:</b> ${booking.propertyType}</p>
                                    <p style="margin: 5px 0;"><b>Location:</b> ${property.location}</p>
                                    <p style="margin: 5px 0;"><b>Monthly Rent:</b> ₹${property.price}</p>
                                    <p style="margin: 5px 0;"><b>Booking ID:</b> #${booking._id.toString().slice(-8).toUpperCase()}</p>
                                </div>
                                <p>You can view your stay details anytime in your <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/bookings" style="color: #2563eb; text-decoration: none; font-weight: bold;">Elite Dashboard</a>.</p>
                                <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
                                <p style="font-size: 12px; color: #94a3b8;">
                                    This is an automated confirmation. For support, reply to this email or visit our help center.
                                </p>
                            </div>
                        `
                    };
                    await sendEmail(emailOptions);
                    console.log(`Confirmation email sent to ${user.email}`);
                }
            } catch (emailError) {
                console.error('Email sending failed:', emailError.message);
                // We don't want to fail the whole request just because the email failed
            }

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
