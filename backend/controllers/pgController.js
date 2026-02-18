const PG = require('../models/PG');
console.log('PG Controller Loaded');

// @desc    Get all PGs with filters
// @route   GET /api/pg
const getPGs = async (req, res) => {
    try {
        const { location, price, amenities } = req.query;
        let query = {};

        if (location) query.location = { $regex: location, $options: 'i' };
        if (price) query.price = { $lte: Number(price) };
        if (amenities) query.amenities = { $all: amenities.split(',') };

        const pgs = await PG.find(query).populate('owner', 'name email');
        res.json(pgs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single PG by ID
// @route   GET /api/pg/:id
const getPGById = async (req, res) => {
    try {
        const pg = await PG.findById(req.params.id).populate('owner', 'name email contact');
        if (pg) {
            res.json(pg);
        } else {
            res.status(404).json({ message: 'PG not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a PG
// @route   POST /api/pg
const createPG = async (req, res) => {
    console.log('DEBUG: ENTERING createPG');
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
            return res.status(400).json({ message: 'Property name is required. Body might be empty. Check FormData.' });
        }

        // Extract Cloudinary URLs from req.files
        const photoUrls = req.files ? req.files.map(file => file.path) : [];

        const pg = new PG({
            owner: req.user._id,
            name,
            location,
            contact,
            features: typeof features === 'string' ? features.split(',').map(s => s.trim()) : features,
            price,
            photos: photoUrls,
            amenities: typeof amenities === 'string' ? amenities.split(',').map(s => s.trim()) : amenities
        });
        const createdPG = await pg.save();
        res.status(201).json(createdPG);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a PG
// @route   PUT /api/pg/:id
const updatePG = async (req, res) => {
    try {
        const pg = await PG.findById(req.params.id);
        if (pg) {
            if (pg.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(401).json({ message: 'Not authorized' });
            }

            const updateData = { ...req.body };
            if (req.files && req.files.length > 0) {
                updateData.photos = req.files.map(file => file.path);
            }

            if (typeof updateData.features === 'string') updateData.features = updateData.features.split(',').map(s => s.trim());
            if (typeof updateData.amenities === 'string') updateData.amenities = updateData.amenities.split(',').map(s => s.trim());

            Object.assign(pg, updateData);
            const updatedPG = await pg.save();
            res.json(updatedPG);
        } else {
            res.status(404).json({ message: 'PG not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a PG
// @route   DELETE /api/pg/:id
const deletePG = async (req, res) => {
    try {
        const pg = await PG.findById(req.params.id);
        if (pg) {
            if (pg.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(401).json({ message: 'Not authorized' });
            }
            await pg.deleteOne();
            res.json({ message: 'PG removed' });
        } else {
            res.status(404).json({ message: 'PG not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getPGs, getPGById, createPG, updatePG, deletePG };
