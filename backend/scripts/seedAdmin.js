const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const MONGO_URI = 'mongodb://localhost:27017/ooruni';

const seedAdmin = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected");

        const existingUser = await User.findOne({ username: 'admin' });
        if (existingUser) {
            console.log("Admin user already exists");
            process.exit(0);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        const newUser = new User({
            username: 'admin',
            password: hashedPassword,
            role: 'admin'
        });

        await newUser.save();
        console.log("Admin user created: admin / admin123");
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
};

seedAdmin();
