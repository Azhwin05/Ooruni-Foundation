const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    tamilTitle: { type: String },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String },
    registrationLink: { type: String },
    images: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
