const router = require('express').Router();
const News = require('../models/News');
const authMiddleware = require('../middleware/authMiddleware');

// CREATE
router.post('/', authMiddleware, async (req, res) => {
    const newNews = new News(req.body);
    try {
        const savedNews = await newNews.save();
        res.status(200).json(savedNews);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const updatedNews = await News.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedNews);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await News.findByIdAndDelete(req.params.id);
        res.status(200).json("News has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL
router.get('/', async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 });
        res.status(200).json(news);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ONE
router.get('/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        res.status(200).json(news);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
