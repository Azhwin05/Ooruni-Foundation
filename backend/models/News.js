const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    tamilTitle: { type: String },
    description: { type: String, required: true },
    image: { type: String }, // URL or Path
    link: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('News', NewsSchema);
