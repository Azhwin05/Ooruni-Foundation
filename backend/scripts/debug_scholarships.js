const mongoose = require('mongoose');
const Scholarship = require('../models/Scholarship');

mongoose.connect('mongodb://127.0.0.1:27017/ooruni')
    .then(async () => {
        console.log("Connected to DB");
        const apps = await Scholarship.find().sort({ createdAt: -1 });
        
        console.log(`Found ${apps.length} scholarship applications.`);
        
        apps.forEach(a => {
            console.log(`- ${a.name} (${a.email}) [${a.status}]`);
        });
        
        process.exit();
    })
    .catch(err => console.error(err));
