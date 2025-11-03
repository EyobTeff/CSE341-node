const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const connectDB = require('../data/database');

// GET all contacts
router.get('/', async (req, res) => {
  console.log('=== ROUTE HIT ===');
  try {
    const db = await connectDB();
    console.log('Database name:', db.databaseName);
    
    const contacts = await db.collection('contacts').find().toArray();
    console.log('Found', contacts.length, 'contacts');
    
    if (contacts.length > 0) {
      console.log('First contact:', JSON.stringify(contacts[0]));
    }
    
    res.json(contacts);
  } catch (err) {
    console.error('ERROR:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET one contact by ID
router.get('/:id', async (req, res) => {
  try {
    const db = await connectDB();
    const id = new ObjectId(req.params.id);
    const contact = await db.collection('contacts').findOne({ _id: id });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
