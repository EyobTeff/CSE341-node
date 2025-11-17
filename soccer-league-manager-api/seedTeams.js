const connectDB = require('./data/database');

const teams = [
  {
    "name": "St. George",
    "city": "Addis Ababa",
    "wins": 0,
    "draws": 0,
    "losses": 0,
    "yellowCards": 0,
    "redCards": 0
  },
  {
    "name": "Ethiopian Buna",
    "city": "Addis Ababa",
    "wins": 0,
    "draws": 0,
    "losses": 0,
    "yellowCards": 0,
    "redCards": 0
  },
  {
    "name": "DDK",
    "city": "",
    "wins": 0,
    "draws": 0,
    "losses": 0,
    "yellowCards": 0,
    "redCards": 0
  },
  {
    "name": "70N",
    "city": "",
    "wins": 0,
    "draws": 0,
    "losses": 0,
    "yellowCards": 0,
    "redCards": 0
  },
  {
    "name": "BDFC",
    "city": "",
    "wins": 0,
    "draws": 0,
    "losses": 0,
    "yellowCards": 0,
    "redCards": 0
  },
  {
    "name": "Fasil Kenema",
    "city": "Gondar",
    "wins": 0,
    "draws": 0,
    "losses": 0,
    "yellowCards": 0,
    "redCards": 0
  },
  {
    "name": "Hawassa Kenema",
    "city": "Hawassa",
    "wins": 0,
    "draws": 0,
    "losses": 0,
    "yellowCards": 0,
    "redCards": 0
  },
  {
    "name": "Decha",
    "city": "",
    "wins": 0,
    "draws": 0,
    "losses": 0,
    "yellowCards": 0,
    "redCards": 0
  }
];

async function seedTeams() {
  try {
    const db = await connectDB();
    
    // Clear existing teams (optional)
    await db.collection('teams').deleteMany({});
    console.log('Cleared existing teams');
    
    // Insert all teams
    const result = await db.collection('teams').insertMany(teams);
    console.log(`Successfully inserted ${result.insertedCount} teams`);
    console.log('Teams seeded successfully!');
    
    process.exit(0);
  } catch (err) {
    console.error('Error seeding teams:', err);
    process.exit(1);
  }
}

seedTeams();
