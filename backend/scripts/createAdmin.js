const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

dotenv.config({ path: '../.env' });

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        // Check if user exists
        const existingUser = await User.findOne({ username: 'admin' });
        if (existingUser) {
            console.log("Admin user already exists");
            process.exit(0);
        }

        // Create new user
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
        console.error(err);
        process.exit(1);
    }
};

createAdmin();
