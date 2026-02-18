const mongoose = require('mongoose');

const pgSchema = mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    contact: { type: String, required: true },
    features: [{ type: String }],
    price: { type: Number, required: true },
    photos: [{ type: String }],
    amenities: [{ type: String }], // Added as per functional requirements
}, { timestamps: true });

const PG = mongoose.model('PG', pgSchema);
module.exports = PG;
