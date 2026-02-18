const mongoose = require('mongoose');

const hostelSchema = mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    contact: { type: String, required: true },
    features: [{ type: String }],
    price: { type: Number, required: true },
    photos: [{ type: String }],
    amenities: [{ type: String }],
}, { timestamps: true });

const Hostel = mongoose.model('Hostel', hostelSchema);
module.exports = Hostel;
