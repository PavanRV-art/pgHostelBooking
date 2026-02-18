const express = require('express');
const { getPGs, getPGById, createPG, updatePG, deletePG } = require('../controllers/pgController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

router.get('/', getPGs);
router.get('/:id', getPGById);
router.post('/', protect, authorize('owner', 'admin'), upload.array('photos', 4), createPG);
router.put('/:id', protect, authorize('owner', 'admin'), upload.array('photos', 4), updatePG);
router.delete('/:id', protect, authorize('owner', 'admin'), deletePG);

module.exports = router;
