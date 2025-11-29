/**
 * @route GET /matches
 * @route GET /matches/:id
 * @route POST /matches
 * @route PUT /matches/:id
 * @route DELETE /matches/:id
 */
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const connectDB = require('../data/database');
const { validateMatch } = require('../middleware/validate');
const ensureAuthenticated = require('../middleware/ensureAuth');

// GET all matches
router.get('/', async (req, res) => {
  try {
    const db = await connectDB();
    const matches = await db.collection('matches').find().toArray();
    res.status(200).json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error retrieving matches' });
  }
});

// GET match by id
router.get('/:id', async (req, res) => {
  try {
    const db = await connectDB();
    const id = new ObjectId(req.params.id);
    const match = await db.collection('matches').findOne({ _id: id });
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.status(200).json(match);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error retrieving match' });
  }
});

// POST create match
router.post('/', ensureAuthenticated, validateMatch, async (req, res) => {
  /* #swagger.security = [{ "bearerAuth": [] }]
     #swagger.parameters['body'] = {
    in: 'body',
    description: 'Match data',
    required: true,
    schema: { $ref: '#/definitions/Match' }
  } */
  try {
    const db = await connectDB();
    const match = req.body;

    // Save match
    const result = await db.collection('matches').insertOne(match);

    // Apply discipline effects to players (yellow/red cards -> update players collection)
    // playersWithYellowCards & playersWithRedCards are arrays of player IDs (strings)
    const { playersWithYellowCards = [], playersWithRedCards = [] } = match;

    // Handle yellow cards
    for (const playerId of playersWithYellowCards) {
      try {
        const pid = new ObjectId(playerId);
        const player = await db.collection('players').findOne({ _id: pid });
        if (!player) continue;

        let newYellow = (player.yellowCards || 0) + 1;
        let suspended = player.suspended || false;

        // rule: suspend after 3 yellow cards
        if (newYellow >= 3) {
          suspended = true;
          newYellow = 0; // reset yellow count after suspension
        }

        await db.collection('players').updateOne({ _id: pid }, { $set: { yellowCards: newYellow, suspended } });
      } catch (e) {
        console.warn('Invalid player id in yellow list, skipping:', playerId);
      }
    }

    // Handle red cards
    for (const playerId of playersWithRedCards) {
      try {
        const pid = new ObjectId(playerId);
        const player = await db.collection('players').findOne({ _id: pid });
        if (!player) continue;

        let newRed = (player.redCards || 0) + 1;
        // On red card, suspend player
        await db.collection('players').updateOne({ _id: pid }, { $set: { redCards: newRed, suspended: true } });
      } catch (e) {
        console.warn('Invalid player id in red list, skipping:', playerId);
      }
    }

    return res.status(201).json({ id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating match' });
  }
});

// PUT update match (you may need to re-run discipline logic or handle deltas — here we just replace)
router.put('/:id', ensureAuthenticated, validateMatch, async (req, res) => {
  /* #swagger.security = [{ "bearerAuth": [] }]
     #swagger.parameters['body'] = {
    in: 'body',
    description: 'Match data',
    required: true,
    schema: { $ref: '#/definitions/Match' }
  } */
  try {
    const db = await connectDB();
    const id = new ObjectId(req.params.id);
    const result = await db.collection('matches').updateOne({ _id: id }, { $set: req.body });
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Match not found' });
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating match' });
  }
});

// DELETE match
router.delete('/:id', ensureAuthenticated, async (req, res) => {
  /* #swagger.security = [{ "bearerAuth": [] }] */
  try {
    const db = await connectDB();
    const id = new ObjectId(req.params.id);
    const result = await db.collection('matches').deleteOne({ _id: id });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Match not found' });
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting match' });
  }
});

module.exports = router;
