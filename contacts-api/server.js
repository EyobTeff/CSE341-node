const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const app = express();
const contactsRoutes = require('./routes/contacts');

app.use(express.json());
app.use('/contacts', contactsRoutes);
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
