const connectDB = require('./data/database');

async function checkTeams() {
  try {
    const db = await connectDB();
    const teams = await db.collection('teams').find().toArray();
    console.log(`Found ${teams.length} teams in database:`);
    console.log(JSON.stringify(teams, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

checkTeams();
