const router = require('express').Router();
const News = require('../models/News');
const Event = require('../models/Event');
const Volunteer = require('../models/Volunteer');
const Scholarship = require('../models/Scholarship');
const Gallery = require('../models/Gallery');
const authMiddleware = require('../middleware/authMiddleware');

// DASHBOARD STATS (Admin Only)
router.get('/stats', authMiddleware, async (req, res) => {
    try {
        const newsCount = await News.countDocuments();
        const eventCount = await Event.countDocuments();
        const galleryCount = await Gallery.countDocuments();
        
        // Count Verified Volunteers separately if needed, but total is fine for now
        const volunteerCount = await Volunteer.countDocuments(); 
        
        const scholarshipCount = await Scholarship.countDocuments({ status: 'Pending' });

        // Get 5 most recent scholarships
        const recentActivity = await Scholarship.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            newsCount,
            eventCount,
            galleryCount,
            volunteerCount,
            scholarshipCount,
            recentActivity
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
