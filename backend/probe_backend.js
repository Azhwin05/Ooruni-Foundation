async function probe() {
    console.log('Probing Backend Health...');
    
    // Check Root
    try {
        const resRoot = await fetch('https://ooruni-foundation-backend.onrender.com/');
        const textRoot = await resRoot.text();
        console.log('ROOT [/]:', resRoot.status, textRoot);
    } catch (e) { console.log('ROOT Failed:', e.message); }

    // Check DB (News or something public)
    try {
        // Trying news route as it likely fetches from DB
        const resDB = await fetch('https://ooruni-foundation-backend.onrender.com/news');
        console.log('DB [/news]:', resDB.status);
    } catch (e) { console.log('DB Failed:', e.message); }
}

probe();
