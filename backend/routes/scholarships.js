const router = require('express').Router();
const Scholarship = require('../models/Scholarship');
const authMiddleware = require('../middleware/authMiddleware');

// SUBMIT APPLICATION (Public)
router.post('/', async (req, res) => {
    const newScholarship = new Scholarship(req.body);
    try {
        const savedScholarship = await newScholarship.save();
        res.status(200).json(savedScholarship);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL (Admin Only)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const scholarships = await Scholarship.find().sort({ createdAt: -1 });
        res.status(200).json(scholarships);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE STATUS (Admin Only)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const updatedScholarship = await Scholarship.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedScholarship);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
