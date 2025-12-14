const router = require('express').Router();
const OESStudent = require('../models/OESStudent');
const OESDonation = require('../models/OESDonation');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Email Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// --- PUBLIC ROUTES ---

// 1. Get All Active Students (Crowdfunding Board)
router.get('/students', async (req, res) => {
    try {
        const students = await OESStudent.find({ status: { $ne: 'Archived' } }).sort({ status: 1, createdAt: -1 });
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 2. Submit Donation (Pending)
router.post('/donate', async (req, res) => {
    try {
        const { studentId, donorName, email, amount, utr, isAnonymous } = req.body;

        const newDonation = new OESDonation({
            studentId, donorName, email, amount, utr, isAnonymous
        });
        await newDonation.save();

        // Send "Received" Email
        const mailOptions = {
            from: `"Ooruni Foundation" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'OES Donation Received - Verification Pending',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2 style="color: #059669;">Thank You, ${donorName}!</h2>
                    <p>We received your pledge to support education via Ooruni Education Support (OES).</p>
                    <p><strong>Amount:</strong> ₹${amount}</p>
                    <p><strong>Status:</strong> Pending Verification</p>
                    <p><strong>Anonymous:</strong> ${isAnonymous ? 'Yes' : 'No'}</p>
                    <p>Once verified, this amount will be added to the student's fund goal.</p>
                </div>
            `
        };
        transporter.sendMail(mailOptions).catch(err => console.error(err));

        res.status(200).json(newDonation);
    } catch (err) {
        if (err.code === 11000) return res.status(400).json({ message: "Duplicate UTR" });
        res.status(500).json(err);
    }
});

// --- ADMIN ROUTES ---

// 3. Add New Student Case
router.post('/student', async (req, res) => {
    try {
        const newStudent = new OESStudent(req.body);
        const savedStudent = await newStudent.save();
        res.status(200).json(savedStudent);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 4. Get Pending Donations
router.get('/donations', async (req, res) => {
    try {
        const donations = await OESDonation.find({ status: 'Pending' }).populate('studentId', 'name oesId');
        res.status(200).json(donations);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 5. Verify Donation & Update Student Progress
router.put('/verify/:id', async (req, res) => {
    try {
        const donation = await OESDonation.findById(req.params.id);
        if (!donation) return res.status(404).json({ message: "Donation not found" });
        if (donation.status === 'Verified') return res.status(400).json({ message: "Already verified" });

        // 1. Update Donation Status
        donation.status = 'Verified';
        await donation.save();

        // 2. Update Student Progress
        const student = await OESStudent.findById(donation.studentId);
        if (student) {
            student.amountCollected += donation.amount;
            
            // Handle Anonymity for Supporters List
            const supporterName = donation.isAnonymous ? "Well Wisher" : donation.donorName;
            
            // Logic: Always add unless it's a duplicate named donor? 
            // For now, let's just push unique names to avoid clutter, or push "Well Wisher" if not present?
            // "Well Wisher" might appear multiple times or once. Let's keep unique names mainly.
            if (!student.supporters.includes(supporterName)) {
                student.supporters.push(supporterName);
            }
            
            // Auto-mark as Fully Supported if goal reached
            if (student.amountCollected >= student.amountRequired) {
                student.status = 'Fully Supported';
            }
            await student.save();
        }

        // 3. Send Receipt Email
         const receiptOptions = {
            from: `"Ooruni Foundation" <${process.env.EMAIL_USER}>`,
            to: donation.email,
            subject: 'OES Donation Receipt - Verified',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 2px solid #059669;">
                    <h2 style="color: #059669;">Donation Verified!</h2>
                    <p>Dear ${donation.donorName},</p>
                    <p>Your donation of <strong>₹${donation.amount}</strong> for <strong>${student ? student.name : 'Student Education'}</strong> has been verified.</p>
                    <p>This brings us closer to the goal!</p>
                    <br/>
                    <p>Receipt No: #${donation._id.toString().slice(-6).toUpperCase()}</p>
                    <p style="font-size: 10px; color: #888;">(This is an official receipt from Ooruni Foundation)</p>
                </div>
            `
        };
        transporter.sendMail(receiptOptions).catch(err => console.error(err));

        res.status(200).json({ donation, student });
    } catch (err) {
        res.status(500).json(err);
    }
});

// 6. Post Student Update (Admin)
router.post('/student/:id/update', async (req, res) => {
    try {
        const { text } = req.body;
        const student = await OESStudent.findById(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });

        student.updates.push({ text });
        await student.save();

        res.status(200).json(student);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 7. Get Recent Activity (Verified Donations)
router.get('/activity', async (req, res) => {
    try {
        // Fetch last 5 verified donations, populate student name
        const events = await OESDonation.find({ status: 'Verified' })
            .sort({ date: -1 })
            .limit(5)
            .populate('studentId', 'name oesId');
        
        // Transform for privacy
        const refinedEvents = events.map(d => ({
            donor: d.isAnonymous ? "A Well Wisher" : d.donorName,
            student: d.studentId ? d.studentId.oesId : 'a student',
            time: d.date
        }));
        
        res.status(200).json(refinedEvents);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
