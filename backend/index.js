const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Routes
const authRoute = require('./routes/auth');
const newsRoute = require('./routes/news');
const eventsRoute = require('./routes/events');
const galleryRoute = require('./routes/gallery');
const scholarshipRoute = require('./routes/scholarships');
const contactRoute = require('./routes/contact');
const uploadRoute = require('./routes/upload');
const donationsRoute = require('./routes/donations'); // Added donations route import

app.use('/auth', authRoute);
app.use('/news', newsRoute); 
app.use('/events', eventsRoute);
app.use('/gallery', galleryRoute);
app.use('/scholarship', scholarshipRoute);
app.use('/contact', contactRoute);
app.use('/upload', uploadRoute);
app.use('/volunteer', require('./routes/volunteer'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/api/donations', donationsRoute);
app.use('/api/oes', require('./routes/oes'));
app.use('/api/supporters', require('./routes/supporters')); // Added supporters route

app.get('/', (req, res) => {
    res.send('Ooruni Foundation API Running');
});





app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
