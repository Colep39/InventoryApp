const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serving static front end files:
app.use(express.static(path.join(__dirname, 'public')));

// to start local host server:
// cd App
// node src/server.js


// Routes
const bookRoutes = require('./routes/bookRoutes');
app.use('/api', bookRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/manga/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM manga WHERE id = $1', [id]);

        if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Manga not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching manga by ID:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
  
module.exports = app;