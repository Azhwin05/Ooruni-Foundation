const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    amount: { type: Number, required: true },
    utr: { type: String, required: true, unique: true },
    purpose: { type: String, default: 'General' },
    status: { type: String, enum: ['Pending', 'Verified'], default: 'Pending' },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donation', DonationSchema);
