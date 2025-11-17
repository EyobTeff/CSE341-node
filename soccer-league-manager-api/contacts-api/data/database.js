const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

let db;

async function connectDB() {
  if (db) return db;

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db('project1'); // make sure this matches your Atlas database name
    console.log('Connected to MongoDB:', db.databaseName);
    return db;
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    throw err;
  }
}

module.exports = connectDB;
