async function testLogin() {
    try {
        console.log('Testing login to https://ooruni-foundation-backend.onrender.com...');
        const response = await fetch('https://ooruni-foundation-backend.onrender.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'admin',
                password: 'Ooruni@2025'
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('SUCCESS! Token received:', data.token ? 'YES' : 'NO');
            console.log('User Role:', data.role);
        } else {
            console.log('FAILED. Status:', response.status);
            const text = await response.text();
            console.log('Response:', text);
        }
    } catch (error) {
        console.log('ERROR:', error.message);
    }
}

testLogin();
