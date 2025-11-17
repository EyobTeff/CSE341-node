/**
 * @route GET /players
 * @route GET /players/:id
 * @route POST /players
 * @route PUT /players/:id
 * @route DELETE /players/:id
 */
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const connectDB = require('../data/database');
const { validatePlayer } = require('../middleware/validate');

// GET all players
router.get('/', async (req, res) => {
  try {
    const db = await connectDB();
    const players = await db.collection('players').find().toArray();
    res.status(200).json(players);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error retrieving players' });
  }
});

// GET one player by id
router.get('/:id', async (req, res) => {
  try {
    const db = await connectDB();
    const id = new ObjectId(req.params.id);
    const player = await db.collection('players').findOne({ _id: id });
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.status(200).json(player);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error retrieving player' });
  }
});

// POST create player
router.post('/', validatePlayer, async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection('players').insertOne(req.body);
    return res.status(201).json({ id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating player' });
  }
});

// PUT update player
router.put('/:id', validatePlayer, async (req, res) => {
  try {
    const db = await connectDB();
    const id = new ObjectId(req.params.id);
    const result = await db.collection('players').updateOne({ _id: id }, { $set: req.body });
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Player not found' });
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating player' });
  }
});

// DELETE player
router.delete('/:id', async (req, res) => {
  try {
    const db = await connectDB();
    const id = new ObjectId(req.params.id);
    const result = await db.collection('players').deleteOne({ _id: id });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Player not found' });
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting player' });
  }
});

module.exports = router;
