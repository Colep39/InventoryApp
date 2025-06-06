const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/manga', bookController.getManga);
router.post('/manga', bookController.addManga);

module.exports = router;