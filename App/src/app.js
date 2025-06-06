const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serving static front end files:
app.use(express.static(path.join(__dirname, 'public')));


// Routes
const bookRoutes = require('./routes/bookRoutes');
app.use('/api', bookRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
  
module.exports = app;