const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');
const categoryController = require('../controllers/categoryController');

router.get('/manga', bookController.getManga);
router.post('/manga', bookController.addManga);
router.get('/manga/:id', bookController.viewItem);
router.put('/manga/:id', bookController.updateManga);
router.delete('/manga/:id', bookController.deleteItem);

router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.viewCategory);
router.get('/items/:id', bookController.viewItem);

router.post('/categories/delete/:id', categoryController.deleteCategory);


module.exports = router;