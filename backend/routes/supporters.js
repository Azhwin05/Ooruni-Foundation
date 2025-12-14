const router = require('express').Router();
const Supporter = require('../models/Supporter');

// GET ALL SUPPORTERS
router.get('/', async (req, res) => {
    try {
        const supporters = await Supporter.find().sort({ createdAt: -1 });
        res.status(200).json(supporters);
    } catch (err) {
        res.status(500).json(err);
    }
});

// ADD NEW SUPPORTER
router.post('/', async (req, res) => {
    const newSupporter = new Supporter(req.body);
    try {
        const savedSupporter = await newSupporter.save();
        res.status(200).json(savedSupporter);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE SUPPORTER
router.delete('/:id', async (req, res) => {
    try {
        await Supporter.findByIdAndDelete(req.params.id);
        res.status(200).json("Supporter has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
