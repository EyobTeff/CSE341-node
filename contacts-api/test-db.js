const { MongoClient } = require('mongodb');

async function testConnection() {
  try {
    const uri = 'mongodb+srv://eyobteff_db_user:gvHSxKnCTkTwMFxn@cluster0.3xaetnl.mongodb.net/project1';
    console.log('Connecting to MongoDB...');
    const client = await MongoClient.connect(uri);
    console.log('Connected successfully');
    
    const db = client.db('project1');
    console.log('Database name:', db.databaseName);
    
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    const count = await db.collection('contacts').countDocuments();
    console.log('Document count in contacts:', count);
    
    const contacts = await db.collection('contacts').find().limit(5).toArray();
    console.log('First few contacts:', JSON.stringify(contacts, null, 2));
    
    await client.close();
    console.log('Connection closed');
  } catch (err) {
    console.error('Error:', err);
  }
}

testConnection();
