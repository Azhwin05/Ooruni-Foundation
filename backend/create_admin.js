const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Check if admin exists
        const existingAdmin = await User.findOne({ username: 'admin' });
        if (existingAdmin) {
            console.log('Admin already exists. Resetting password...');
            const salt = await bcrypt.genSalt(10);
            existingAdmin.password = await bcrypt.hash('Ooruni@2025', salt);
            await existingAdmin.save();
            console.log('Admin password reset to: Ooruni@2025');
        } else {
            console.log('Creating new admin...');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('Ooruni@2025', salt);

            const newUser = new User({
                username: 'admin',
                password: hashedPassword,
                role: 'admin'
            });

            await newUser.save();
            console.log('Admin created successfully');
            console.log('Username: admin');
            console.log('Password: Ooruni@2025');
        }
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

createAdmin();
