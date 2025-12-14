const router = require('express').Router();
const Gallery = require('../models/Gallery');
const authMiddleware = require('../middleware/authMiddleware');

// CREATE
router.post('/', authMiddleware, async (req, res) => {
    const newImage = new Gallery(req.body);
    try {
        const savedImage = await newImage.save();
        res.status(200).json(savedImage);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Gallery.findByIdAndDelete(req.params.id);
        res.status(200).json("Image has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL
router.get('/', async (req, res) => {
    const cat = req.query.cat;
    try {
        let images;
        if(cat){
            images = await Gallery.find({category: cat}).sort({ createdAt: -1 });
        } else {
            images = await Gallery.find().sort({ createdAt: -1 });
        }
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
