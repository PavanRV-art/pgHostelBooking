const express = require('express');
const { getHostels, getHostelById, createHostel, updateHostel, deleteHostel } = require('../controllers/hostelController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

router.get('/', getHostels);
router.get('/:id', getHostelById);
router.post('/', protect, authorize('owner', 'admin'), upload.array('photos', 4), createHostel);
router.put('/:id', protect, authorize('owner', 'admin'), upload.array('photos', 4), updateHostel);
router.delete('/:id', protect, authorize('owner', 'admin'), deleteHostel);

module.exports = router;
