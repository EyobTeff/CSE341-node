const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:8080',
  credentials: true
}));

app.use(express.json());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/players', require('./routes/players'));
app.use('/matches', require('./routes/matches'));
app.use('/teams', require('./routes/teams'));

// Swagger UI
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
try {
  // Read swagger.json fresh each time to avoid caching issues
  const swaggerFile = JSON.parse(fs.readFileSync('./swagger.json', 'utf8'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, { 
    swaggerOptions: { 
      tryItOutEnabled: true 
    } 
  }));
} catch (e) {
  console.warn('swagger.json not found. Run `npm run swagger` to generate it.');
}

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
