const connectDB = require('./data/database');

const players = [
  // St. George players
  {
    name: "Abebaw Butako",
    team: "St. George",
    position: "Forward",
    age: 27,
    nationality: "Ethiopia",
    yellowCards: 0,
    redCards: 0,
    suspended: false
  },
  {
    name: "Samuel Saliso",
    team: "St. George",
    position: "Midfielder",
    age: 24,
    nationality: "Ethiopia",
    yellowCards: 1,
    redCards: 0,
    suspended: false
  },
  {
    name: "Amanuel Gebremichael",
    team: "St. George",
    position: "Defender",
    age: 26,
    nationality: "Ethiopia",
    yellowCards: 0,
    redCards: 0,
    suspended: false
  },
  // Ethiopian Buna players
  {
    name: "Getaneh Kebede",
    team: "Ethiopian Buna",
    position: "Forward",
    age: 28,
    nationality: "Ethiopia",
    yellowCards: 2,
    redCards: 0,
    suspended: false
  },
  {
    name: "Bezabih Meleyo",
    team: "Ethiopian Buna",
    position: "Goalkeeper",
    age: 30,
    nationality: "Ethiopia",
    yellowCards: 0,
    redCards: 0,
    suspended: false
  },
  {
    name: "Ramkel Lok",
    team: "Ethiopian Buna",
    position: "Midfielder",
    age: 25,
    nationality: "South Sudan",
    yellowCards: 1,
    redCards: 0,
    suspended: false
  },
  // Fasil Kenema players
  {
    name: "Surafel Dagnachew",
    team: "Fasil Kenema",
    position: "Forward",
    age: 23,
    nationality: "Ethiopia",
    yellowCards: 0,
    redCards: 0,
    suspended: false
  },
  {
    name: "Mujib Kassim",
    team: "Fasil Kenema",
    position: "Defender",
    age: 29,
    nationality: "Ethiopia",
    yellowCards: 3,
    redCards: 0,
    suspended: true
  },
  {
    name: "Biniyam Ayten",
    team: "Fasil Kenema",
    position: "Midfielder",
    age: 26,
    nationality: "Ethiopia",
    yellowCards: 0,
    redCards: 0,
    suspended: false
  },
  // Hawassa Kenema players
  {
    name: "Efrem Ashamo",
    team: "Hawassa Kenema",
    position: "Forward",
    age: 22,
    nationality: "Ethiopia",
    yellowCards: 1,
    redCards: 0,
    suspended: false
  },
  {
    name: "Aschalew Tamene",
    team: "Hawassa Kenema",
    position: "Goalkeeper",
    age: 31,
    nationality: "Ethiopia",
    yellowCards: 0,
    redCards: 0,
    suspended: false
  },
  {
    name: "Yosef Tarekegn",
    team: "Hawassa Kenema",
    position: "Defender",
    age: 27,
    nationality: "Ethiopia",
    yellowCards: 0,
    redCards: 1,
    suspended: true
  }
];

async function seedPlayers() {
  try {
    const db = await connectDB();
    
    // Clear existing players
    await db.collection('players').deleteMany({});
    console.log('Cleared existing players');
    
    // Insert all players
    const result = await db.collection('players').insertMany(players);
    console.log(`Successfully inserted ${result.insertedCount} players`);
    console.log('Players seeded successfully!');
    
    process.exit(0);
  } catch (err) {
    console.error('Error seeding players:', err);
    process.exit(1);
  }
}

seedPlayers();
