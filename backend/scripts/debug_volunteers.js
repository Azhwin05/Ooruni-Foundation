const mongoose = require('mongoose');
const Volunteer = require('../models/Volunteer');
const crypto = require('crypto');

// ENCRYPTION SETUP (Must match server)
const ENCRYPTION_KEY = crypto.scryptSync('ooruni_secret_key_2025', 'salt', 32);

function decrypt(text) {
    try {
        let textParts = text.split(':');
        let iv = Buffer.from(textParts.shift(), 'hex');
        let encryptedText = Buffer.from(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    } catch (e) {
        return "DECRYPTION_FAILED";
    }
}

const fs = require('fs');

mongoose.connect('mongodb://127.0.0.1:27017/ooruni')
    .then(async () => {
        let output = "";
        const log = (msg) => { output += msg + "\n"; console.log(msg); };

        log("Connected to DB");
        const volunteers = await Volunteer.find().sort({ createdAt: -1 });
        
        log(`Found ${volunteers.length} volunteers.`);
        
        volunteers.forEach(v => {
            log("---------------------------------------------------");
            log(`Name: ${v.name}`);
            log(`Email: ${v.email}`);
            log(`ID: ${v._id}`);
            // log(`Encrypted Data: ${v.encryptedData}`); 
            
            if (v.encryptedData) {
                const decrypted = decrypt(v.encryptedData);
                log(`Decrypted Payload: ${decrypted}`);
            }
        });
        
        fs.writeFileSync('debug_result.txt', output);
        process.exit();
    })
    .catch(err => console.error(err));
