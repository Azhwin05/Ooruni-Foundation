const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    skills: { type: String },
    photo: { type: String }, // URL to uploaded photo
    status: { type: String, default: 'Pending' }, // Pending, Verified
    encryptedData: { type: String }, // Store the QR payload
}, { timestamps: true });

module.exports = mongoose.model('Volunteer', VolunteerSchema);
