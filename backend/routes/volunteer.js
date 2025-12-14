const router = require('express').Router();
const Volunteer = require('../models/Volunteer');
const multer = require('multer');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const path = require('path');

// Configure Multer for Photo Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Encryption Settings
const ENCRYPTION_KEY = crypto.scryptSync('ooruni_secret_key_2025', 'salt', 32);
const IV_LENGTH = 16;

function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

const QRCode = require('qrcode');

// ... (existing imports and config)

// REGISTER VOLUNTEER
router.post('/register', upload.single('photo'), async (req, res) => {
    try {
        const { name, email, phone, skills } = req.body;
        const photo = req.file ? `/uploads/${req.file.filename}` : '';

        // Generate Identification Payload
        const payload = JSON.stringify({
            name: name,
            email: email,
            timestamp: Date.now()
        });

        const encryptedQR = encrypt(payload);

        const newVolunteer = new Volunteer({
            name, email, phone, skills, photo,
            encryptedData: encryptedQR
        });

        const savedVolunteer = await newVolunteer.save();

        // ---------------- EMAIL LOGIC ---------------- //
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            try {
                // Generate QR Code Buffer for Email
                const qrBuffer = await QRCode.toBuffer(encryptedQR);

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
                });

                const mailOptions = {
                    from: `"Ooruni Foundation" <${process.env.EMAIL_USER}>`,
                    to: email,
                    subject: "Welcome to the Family! 🌟 Your Volunteer Badge is Here",
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
                            <div style="background-color: #1a1a1a; color: #fff; padding: 20px; text-align: center;">
                                <h1>Welcome, ${name}!</h1>
                                <p>Thank you for joining Ooruni Foundation.</p>
                            </div>
                            <div style="padding: 30px; background-color: #fff; text-align: center;">
                                <p style="font-size: 16px; color: #555; line-height: 1.6;">
                                    "The best way to find yourself is to lose yourself in the service of others." <br>
                                    - Mahatma Gandhi
                                </p>
                                <p style="margin-top: 20px;">
                                    We are thrilled to have you on board. Your passion and skills will make a real difference in the lives of many.
                                </p>
                                
                                <div style="margin: 30px 0; padding: 20px; border: 2px dashed #ccc; display: inline-block; border-radius: 10px;">
                                    <p style="margin-bottom: 10px; font-weight: bold; color: #333;">YOUR VOLUNTEER PASS</p>
                                    <img src="cid:unique@qrcode" alt="Volunteer QR Code" style="width: 150px; height: 150px;" />
                                    <p style="margin-top: 5px; font-size: 12px; color: #888;">ID: ${savedVolunteer._id.toString().slice(-6).toUpperCase()}</p>
                                </div>

                                <p>Please save this QR code. It will be used to verify your identity at our events.</p>
                            </div>
                            <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #aaa;">
                                &copy; ${new Date().getFullYear()} Ooruni Foundation. All rights reserved.
                            </div>
                        </div>
                    `,
                    attachments: [
                        {
                            filename: 'qrcode.png',
                            content: qrBuffer,
                            cid: 'unique@qrcode' // same cid value as in the html img src
                        }
                    ]
                };

                await transporter.sendMail(mailOptions);
                console.log(`[EMAIL SENT] To: ${email} with QR Code attachment.`);
            } catch (emailErr) {
                console.error("Email Sending Failed:", emailErr);
                // Don't fail the registration if email fails, just log it.
            }
        } else {
            console.log("[EMAIL SKIPPED] Missing EMAIL_USER or EMAIL_PASS in .env");
        }
        // --------------------------------------------- //

        res.status(200).json(savedVolunteer);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// VERIFY QR CODE (Admin Only)
router.post('/verify-qr', async (req, res) => {
    try {
        const { encryptedData } = req.body;
        console.log("Verifying QR Data:", encryptedData.substring(0, 20) + "...");
        
        // Decrypt to get payload
        const decryptedString = decrypt(encryptedData);
        const payload = JSON.parse(decryptedString);
        console.log("Decrypted Payload:", payload);

        // Find Volunteer by email AND name to handle duplicates/updates
        // (Since multiple registrations might share an email in the MVP)
        const volunteer = await Volunteer.findOneAndUpdate(
            { email: payload.email, name: payload.name },
            { $set: { status: 'Verified' } },
            { new: true } // Return the updated document
        );
        console.log("Found & Verified Volunteer:", volunteer ? volunteer.name : "None");

        if (volunteer) {
            res.status(200).json({
                valid: true,
                volunteer: volunteer
            });
        } else {
            res.status(404).json({ valid: false, message: "Volunteer not found in database." });
        }
    } catch (err) {
        console.error("Verification Error:", err);
        res.status(400).json({ valid: false, message: "Invalid or Corrupted QR Code." });
    }
});

// GET ALL VOLUNTEERS (Admin Only)
router.get('/', async (req, res) => {
    try {
        const volunteers = await Volunteer.find().sort({ createdAt: -1 });
        res.status(200).json(volunteers);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
