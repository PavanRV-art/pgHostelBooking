const express = require('express');
const { createBooking, getMyBookings, updateBookingToPaid } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createBooking);
router.get('/mybookings', protect, getMyBookings);
router.put('/:id/pay', protect, updateBookingToPaid);

module.exports = router;
