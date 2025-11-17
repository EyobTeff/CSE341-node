// routes/contacts.js
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const connectDB = require('../data/database');

/**
 * GET /contacts
 * Returns all contacts
 * #swagger.tags = ['Contacts']
 * #swagger.description = 'Get all contacts from the database'
 */
router.get('/', async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Get all contacts from the database'
  try {
    const db = await connectDB();
    const contacts = await db.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    console.error('Error in GET /contacts:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /contacts/:id
 * Returns one contact by id
 * #swagger.tags = ['Contacts']
 * #swagger.description = 'Get a single contact by ID'
 */
router.get('/:id', async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Get a single contact by ID'
  try {
    const db = await connectDB();
    const id = new ObjectId(req.params.id);
    const contact = await db.collection('contacts').findOne({ _id: id });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /contacts
 * Create a new contact (all fields required)
 * Body: { firstName, lastName, email, favoriteColor, birthday }
 * #swagger.tags = ['Contacts']
 * #swagger.description = 'Create a new contact'
 */
router.post('/', async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Create a new contact'
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const db = await connectDB();
    const result = await db.collection('contacts').insertOne({
      firstName, lastName, email, favoriteColor, birthday
    });

    // return the new id
    return res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * PUT /contacts/:id
 * Update an existing contact (all fields required)
 * Return 204 No Content on success
 * #swagger.tags = ['Contacts']
 * #swagger.description = 'Update an existing contact'
 */
router.put('/:id', async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Update an existing contact'
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const db = await connectDB();
    const id = new ObjectId(req.params.id);
    const result = await db.collection('contacts').updateOne(
      { _id: id },
      { $set: { firstName, lastName, email, favoriteColor, birthday } }
    );

    if (result.matchedCount === 0) return res.status(404).json({ message: 'Contact not found' });

    // 204 No Content is common for successful update with no body
    return res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE /contacts/:id
 * Delete a contact by id
 * Return 204 No Content on success
 * #swagger.tags = ['Contacts']
 * #swagger.description = 'Delete a contact by ID'
 */
router.delete('/:id', async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Delete a contact by ID'
  try {
    // Validate ObjectId format
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact ID format' });
    }
    
    const db = await connectDB();
    const id = new ObjectId(req.params.id);
    const result = await db.collection('contacts').deleteOne({ _id: id });

    if (result.deletedCount === 0) return res.status(404).json({ message: 'Contact not found' });
    return res.sendStatus(204);
  } catch (err) {
    console.error('Error in DELETE /contacts/:id:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
