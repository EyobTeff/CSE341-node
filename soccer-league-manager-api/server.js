const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/players', require('./routes/players'));
app.use('/matches', require('./routes/matches'));
app.use('/teams', require('./routes/teams'));

// Swagger UI
const swaggerUi = require('swagger-ui-express');
let swaggerFile;
try {
  swaggerFile = require('./swagger.json');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
} catch (e) {
  console.warn('swagger.json not found. Run `npm run swagger` to generate it.');
}

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
