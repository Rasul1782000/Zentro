
async function seed() {
    try {
        const response = await fetch('http://localhost:3000/scraper/seed', {
            method: 'POST'
        });
        const data = await response.json();
        console.log('Seed result:', data);
    } catch (error) {
        console.error('Error seeding:', error);
    }
}

seed();
