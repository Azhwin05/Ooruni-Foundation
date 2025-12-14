const mongoose = require('mongoose');

const OESDonationSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'OESStudent', required: true },
    donorName: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    utr: { type: String, required: true, unique: true },
    isAnonymous: { type: Boolean, default: false },
    status: { type: String, enum: ['Pending', 'Verified'], default: 'Pending' },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OESDonation', OESDonationSchema);
