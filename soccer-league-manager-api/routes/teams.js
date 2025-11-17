/**
 * @route GET /teams
 * @route GET /teams/:id
 * @route POST /teams
 * @route PUT /teams/:id
 * @route DELETE /teams/:id
 */
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const connectDB = require('../data/database');
const { validateTeam } = require('../middleware/validateTeam');

// GET all teams
router.get('/', async (req, res) => {
  try {
    const db = await connectDB();
    const teams = await db.collection('teams').find().toArray();
    res.status(200).json(teams);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error retrieving teams' });
  }
});

// GET one team by id
router.get('/:id', async (req, res) => {
  try {
    const db = await connectDB();
    const id = new ObjectId(req.params.id);
    const team = await db.collection('teams').findOne({ _id: id });
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.status(200).json(team);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error retrieving team' });
  }
});

// POST create team
router.post('/', validateTeam, async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection('teams').insertOne(req.body);
    return res.status(201).json({ id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating team' });
  }
});

// PUT update team
router.put('/:id', validateTeam, async (req, res) => {
  try {
    const db = await connectDB();
    const id = new ObjectId(req.params.id);
    const result = await db.collection('teams').updateOne({ _id: id }, { $set: req.body });
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Team not found' });
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating team' });
  }
});

// DELETE team
router.delete('/:id', async (req, res) => {
  try {
    const db = await connectDB();
    const id = new ObjectId(req.params.id);
    const result = await db.collection('teams').deleteOne({ _id: id });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Team not found' });
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting team' });
  }
});

module.exports = router;
