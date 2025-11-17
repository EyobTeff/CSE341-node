const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const app = express();
const contactsRoutes = require('./routes/contacts');

// Generate Swagger documentation dynamically
const swaggerAutogen = require('swagger-autogen')();
const doc = {
  info: {
    title: 'Contacts API',
    description: 'Contacts API for CSE341'
  },
  host: process.env.SWAGGER_HOST || 'localhost:8080',
  schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http'],
  tags: [
    {
      name: 'Contacts',
      description: 'Contact management operations'
    }
  ]
};

// Generate swagger.json on startup
const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Contacts API - Use /contacts to get all contacts or /api-docs for documentation');
});

// Routes
app.use('/contacts', contactsRoutes);

// Swagger UI - load after generation
setTimeout(() => {
  const swaggerUi = require('swagger-ui-express');
  let swaggerFile;
  try {
    swaggerFile = require('./swagger.json');
  } catch (err) {
    console.log('Swagger file not found, using default config');
    swaggerFile = doc;
  }
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
}, 1000);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
