const router = require('express').Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ooruni_uploads', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    },
});

const upload = multer({ storage: storage });

// UPLOAD ENDPOINT
// UPLOAD ENDPOINT (With Error Handling)
router.post('/', (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            // Catch Multer/Cloudinary Errors
            console.error("Upload Error:", err);
            return res.status(500).json({ 
                error: "Image Upload Failed", 
                details: err.message, 
                code: err.code 
            });
        }
        
        // Success
        if (!req.file) {
            return res.status(400).json({ error: "No file provided" });
        }
        res.status(200).json(req.file.path);
    });
});

module.exports = router;
