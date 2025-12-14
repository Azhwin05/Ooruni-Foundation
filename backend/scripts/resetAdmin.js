const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const MONGO_URI = 'mongodb://127.0.0.1:27017/ooruni';

const resetAdmin = async () => {
    try {
        console.log("Connecting to MongoDB at", MONGO_URI);
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected");

        // Delete existing admin
        const deleteResult = await User.deleteMany({ username: 'admin' });
        console.log(`Deleted ${deleteResult.deletedCount} existing admin user(s).`);

        // Create new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        const newUser = new User({
            username: 'admin',
            password: hashedPassword,
            role: 'admin'
        });

        await newUser.save();
        console.log("SUCCESS: Admin user created: admin / admin123");
        process.exit(0);
    } catch (err) {
        console.error("FATAL ERROR:", err);
        process.exit(1);
    }
};

resetAdmin();
