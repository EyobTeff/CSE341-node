const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const app = express();
const contactsRoutes = require('./routes/contacts');

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Contacts API - Use /contacts to get all contacts or /api-docs for documentation');
});

// Routes
app.use('/contacts', contactsRoutes);

// Swagger UI
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
