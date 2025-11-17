const { MongoClient } = require('mongodb');
require('dotenv').config();

let _db;

async function connectDB() {
  if (_db) return _db;

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    // choose a DB name; using 'soccerLeague' to match MongoDB URI
    _db = client.db('soccerLeague');
    console.log('Connected to MongoDB:', _db.databaseName);
    return _db;
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    throw err;
  }
}

module.exports = connectDB;
