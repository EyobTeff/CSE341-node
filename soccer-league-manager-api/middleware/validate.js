const Joi = require('joi');

const playerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  team: Joi.string().min(1).required(),
  position: Joi.string().min(1).required(),
  age: Joi.number().integer().min(13).required(),
  nationality: Joi.string().required(),
  yellowCards: Joi.number().integer().min(0).default(0),
  redCards: Joi.number().integer().min(0).default(0),
  suspended: Joi.boolean().default(false)
});

const matchSchema = Joi.object({
  homeTeam: Joi.string().required(),
  awayTeam: Joi.string().required(),
  homeScore: Joi.number().integer().min(0).required(),
  awayScore: Joi.number().integer().min(0).required(),
  matchDate: Joi.date().iso().required(),
  playersWithYellowCards: Joi.array().items(Joi.string()).default([]),
  playersWithRedCards: Joi.array().items(Joi.string()).default([])
});

function validatePlayer(req, res, next) {
  const { error, value } = playerSchema.validate(req.body, { stripUnknown: true });
  if (error) return res.status(400).json({ message: error.details[0].message });
  req.body = value;
  next();
}

function validateMatch(req, res, next) {
  const { error, value } = matchSchema.validate(req.body, { stripUnknown: true });
  if (error) return res.status(400).json({ message: error.details[0].message });
  req.body = value;
  next();
}

module.exports = { validatePlayer, validateMatch };
