const axios = require('axios');

async function register() {
    try {
        const response = await axios.post('http://localhost:5000/auth/register', {
            username: 'admin',
            password: 'Ooruni@2025'
        });
        console.log('Success:', response.data);
    } catch (error) {
        if (error.response) {
            console.log('Error:', error.response.data);
        } else {
            console.log('Error:', error.message);
        }
    }
}

register();
