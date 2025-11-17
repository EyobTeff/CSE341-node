const Joi = require('joi');

const teamSchema = Joi.object({
  name: Joi.string().min(2).required(),
  city: Joi.string().allow('').default(''),
  wins: Joi.number().integer().min(0).default(0),
  draws: Joi.number().integer().min(0).default(0),
  losses: Joi.number().integer().min(0).default(0),
  yellowCards: Joi.number().integer().min(0).default(0),
  redCards: Joi.number().integer().min(0).default(0)
});

function validateTeam(req, res, next) {
  const { error, value } = teamSchema.validate(req.body, { stripUnknown: true });
  if (error) return res.status(400).json({ message: error.details[0].message });
  req.body = value;
  next();
}

module.exports = { validateTeam };
