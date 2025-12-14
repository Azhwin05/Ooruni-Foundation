const mongoose = require('mongoose');

const OESStudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    oesId: { type: String, required: true, unique: true }, // e.g., OES1.3
    photo: { type: String }, // Cloudinary URL
    course: { type: String, required: true },
    amountRequired: { type: Number, required: true },
    amountCollected: { type: Number, default: 0 },
    status: { type: String, enum: ['Active', 'Fully Supported'], default: 'Active' },
    supporters: [{ type: String }], // List of donor names
    updates: [{ // Log of updates (e.g., "Fees Paid")
        text: { type: String, required: true },
        date: { type: Date, default: Date.now }
    }],
    verificationBadge: { type: Boolean, default: true }, // Verified by Ooruni
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OESStudent', OESStudentSchema);
