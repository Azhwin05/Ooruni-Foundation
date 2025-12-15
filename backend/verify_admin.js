const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const verifyAdmin = async () => {
    try {
        console.log('Connecting to:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const users = await User.find({}, 'username role');
        console.log('Users found:', users);
        
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

verifyAdmin();
