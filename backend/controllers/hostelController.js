const Hostel = require('../models/Hostel');
console.log('Hostel Controller Loaded');

// @desc    Get all Hostels with filters
// @route   GET /api/hostels
const getHostels = async (req, res) => {
    try {
        const { location, price, amenities } = req.query;
        let query = {};

        if (location) query.location = { $regex: location, $options: 'i' };
        if (price) query.price = { $lte: Number(price) };
        if (amenities) query.amenities = { $all: amenities.split(',') };

        const hostels = await Hostel.find(query).populate('owner', 'name email');
        res.json(hostels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single Hostel by ID
// @route   GET /api/hostels/:id
const getHostelById = async (req, res) => {
    try {
        const hostel = await Hostel.findById(req.params.id).populate('owner', 'name email contact');
        if (hostel) {
            res.json(hostel);
        } else {
            res.status(404).json({ message: 'Hostel not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a Hostel
// @route   POST /api/hostels
const createHostel = async (req, res) => {
    console.log('DEBUG: ENTERING createHostel');
    console.log('DEBUG: req.body is:', req.body);
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            console.log('DEBUG: req.body is EMPTY or UNDEFINED');
        }
        const body = req.body || {};
        const name = body.name;
        const location = body.location;
        const contact = body.contact;
        const features = body.features;
        const price = body.price;
        const amenities = body.amenities;

        if (!name) {
            return res.status(400).json({ message: 'Hostel name is required. Body might be empty. Check FormData.' });
        }

        // Extract Cloudinary URLs from req.files
        const photoUrls = req.files ? req.files.map(file => file.path) : [];

        const hostel = new Hostel({
            owner: req.user._id,
            name,
            location,
            contact,
            features: typeof features === 'string' ? features.split(',').map(s => s.trim()) : features,
            price,
            photos: photoUrls,
            amenities: typeof amenities === 'string' ? amenities.split(',').map(s => s.trim()) : amenities
        });
        const createdHostel = await hostel.save();
        res.status(201).json(createdHostel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a Hostel
// @route   PUT /api/hostels/:id
const updateHostel = async (req, res) => {
    try {
        const hostel = await Hostel.findById(req.params.id);
        if (hostel) {
            if (hostel.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(401).json({ message: 'Not authorized' });
            }

            const updateData = { ...req.body };
            if (req.files && req.files.length > 0) {
                updateData.photos = req.files.map(file => file.path);
            }

            if (typeof updateData.features === 'string') updateData.features = updateData.features.split(',').map(s => s.trim());
            if (typeof updateData.amenities === 'string') updateData.amenities = updateData.amenities.split(',').map(s => s.trim());

            Object.assign(hostel, updateData);
            const updatedHostel = await hostel.save();
            res.json(updatedHostel);
        } else {
            res.status(404).json({ message: 'Hostel not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a Hostel
// @route   DELETE /api/hostels/:id
const deleteHostel = async (req, res) => {
    try {
        const hostel = await Hostel.findById(req.params.id);
        if (hostel) {
            if (hostel.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(401).json({ message: 'Not authorized' });
            }
            await hostel.deleteOne();
            res.json({ message: 'Hostel removed' });
        } else {
            res.status(404).json({ message: 'Hostel not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getHostels, getHostelById, createHostel, updateHostel, deleteHostel };
