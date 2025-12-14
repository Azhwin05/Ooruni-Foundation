const router = require('express').Router();
const nodemailer = require('nodemailer');

// CONTACT FORM
router.post('/', async (req, res) => {
    // In a real app, configure transporter with env vars
    // const transporter = nodemailer.createTransport({ ... });
    
    // For now, simple console log and mock success
    console.log("Contact Form Received:", req.body);
    
    try {
        // await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
