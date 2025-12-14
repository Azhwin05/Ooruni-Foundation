const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    url: { type: String, required: true },
    category: { 
        type: String, 
        required: true,
        enum: ['Education', 'Environment', 'Equal Opportunity', 'Freedom Carnival', 'WWAA', 'CSR Work', 'General'] 
    },
    caption: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Gallery', GallerySchema);
