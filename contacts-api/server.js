const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const app = express();
const contactsRoutes = require('./routes/contacts');

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Contacts API - Use /contacts to get all contacts');
});

app.use('/contacts', contactsRoutes);
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
