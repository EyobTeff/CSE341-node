const connectDB = require('./data/database');

const matches = [
  {
    homeTeam: "St. George",
    awayTeam: "Ethiopian Buna",
    homeScore: 2,
    awayScore: 1,
    matchDate: "2025-11-01T15:00:00.000Z",
    playersWithYellowCards: [],
    playersWithRedCards: []
  },
  {
    homeTeam: "Fasil Kenema",
    awayTeam: "Hawassa Kenema",
    homeScore: 1,
    awayScore: 1,
    matchDate: "2025-11-03T15:00:00.000Z",
    playersWithYellowCards: [],
    playersWithRedCards: []
  },
  {
    homeTeam: "DDK",
    awayTeam: "70N",
    homeScore: 3,
    awayScore: 0,
    matchDate: "2025-11-05T14:00:00.000Z",
    playersWithYellowCards: [],
    playersWithRedCards: []
  },
  {
    homeTeam: "St. George",
    awayTeam: "Fasil Kenema",
    homeScore: 2,
    awayScore: 2,
    matchDate: "2025-11-08T16:00:00.000Z",
    playersWithYellowCards: [],
    playersWithRedCards: []
  },
  {
    homeTeam: "Ethiopian Buna",
    awayTeam: "Hawassa Kenema",
    homeScore: 1,
    awayScore: 0,
    matchDate: "2025-11-10T15:00:00.000Z",
    playersWithYellowCards: [],
    playersWithRedCards: []
  }
];

async function seedMatches() {
  try {
    const db = await connectDB();
    
    // Clear existing matches
    await db.collection('matches').deleteMany({});
    console.log('Cleared existing matches');
    
    // Insert all matches
    const result = await db.collection('matches').insertMany(matches);
    console.log(`Successfully inserted ${result.insertedCount} matches`);
    console.log('Matches seeded successfully!');
    
    process.exit(0);
  } catch (err) {
    console.error('Error seeding matches:', err);
    process.exit(1);
  }
}

seedMatches();
