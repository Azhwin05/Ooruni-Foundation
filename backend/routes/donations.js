const router = require('express').Router();
const Donation = require('../models/Donation');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// 1. SUBMIT DONATION DETAILS (POST /api/donations)
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, amount, utr, purpose } = req.body;

        // Save to Database
        const newDonation = new Donation({
            name, email, phone, amount, utr, purpose
        });
        const savedDonation = await newDonation.save();

        // Send "Received" Email
        const mailOptions = {
            from: `"Ooruni Foundation" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Donation Details Received - Verification Pending',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
                    <h2 style="color: #059669;">Thank You, ${name}!</h2>
                    <p>We have received your donation details. Thank you for your support.</p>
                    <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Amount:</strong> ₹${amount}</p>
                        <p><strong>Transaction ID (UTR):</strong> ${utr}</p>
                        <p><strong>Status:</strong> <span style="color: orange;">Pending Verification</span></p>
                    </div>
                    <p>Our team will verify the transaction with our bank records. Once verified, you will receive an official receipt via email.</p>
                    <br/>
                    <p>Warm Regards,<br/><strong>Ooruni Foundation Team</strong></p>
                </div>
            `
        };
        
        // Send email without blocking response
        transporter.sendMail(mailOptions).catch(err => console.error("Email Error:", err));

        res.status(200).json(savedDonation);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: "This Transaction ID (UTR) has already been submitted." });
        }
        res.status(500).json(err);
    }
});

// 2. LIST ALL DONATIONS (GET /api/donations) - For CMS
router.get('/', async (req, res) => {
    try {
        // Sort by Pending first, then by Date (newest first)
        const donations = await Donation.find().sort({ status: 1, date: -1 });
        res.status(200).json(donations);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 3. VERIFY DONATION & SEND RECEIPT (PUT /api/donations/:id/verify)
router.post('/:id/verify', async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);
        if (!donation) return res.status(404).json({ message: "Donation not found" });

        if (donation.status === 'Verified') {
            return res.status(400).json({ message: "Already verified" });
        }

        // Update Status
        donation.status = 'Verified';
        await donation.save();

        // Send Receipt Email
        const receiptOptions = {
            from: `"Ooruni Foundation" <${process.env.EMAIL_USER}>`,
            to: donation.email,
            subject: 'Donation Receipt - Ooruni Foundation',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 2px solid #059669; max-width: 600px; margin: 0 auto;">
                    <div style="text-align: center; border-bottom: 2px solid #eee; padding-bottom: 20px;">
                        <h1 style="color: #059669; margin: 0;">OORUNI FOUNDATION</h1>
                        <p style="margin: 5px 0; color: #666;">Empowering Communities, Transforming Lives</p>
                    </div>
                    
                    <div style="padding: 20px 0;">
                        <h2 style="text-align: center; color: #333;">Donation Receipt</h2>
                        <p style="text-align: center;"><strong>Receipt No:</strong> #${donation._id.toString().slice(-6).toUpperCase()}</p>
                        <p style="text-align: center;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>

                        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                            <tr style="background: #f9fafb;">
                                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Donor Name</strong></td>
                                <td style="padding: 10px; border: 1px solid #ddd;">${donation.name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Amount Donation</strong></td>
                                <td style="padding: 10px; border: 1px solid #ddd;">₹${donation.amount}</td>
                            </tr>
                            <tr style="background: #f9fafb;">
                                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Payment Mode</strong></td>
                                <td style="padding: 10px; border: 1px solid #ddd;">UPI / Bank Transfer</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Transaction Ref</strong></td>
                                <td style="padding: 10px; border: 1px solid #ddd;">${donation.utr}</td>
                            </tr>
                        </table>
                    </div>

                    <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #888;">
                        <p>This is a computer-generated receipt and does not require a signature.</p>
                        <p>Ooruni Foundation is a registered NGO under Section 80G.</p>
                    </div>
                </div>
            `
        };

        transporter.sendMail(receiptOptions).catch(err => console.error("Receipt Email Error:", err));

        res.status(200).json(donation);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
