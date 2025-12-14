const mongoose = require('mongoose');

const ScholarshipSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    educationLevel: { type: String, required: true },
    institution: { type: String },
    familyIncome: { type: Number, required: true },
    address: { type: String, required: true },
    purpose: { type: String, required: true }, // Why they need it
    status: { type: String, default: 'Pending', enum: ['Pending', 'Reviewed', 'Approved', 'Rejected'] },
}, { timestamps: true });

module.exports = mongoose.model('Scholarship', ScholarshipSchema);
