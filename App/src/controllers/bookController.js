const bookModel = require('../models/bookModel');

exports.getManga = async(req, res) => {
    const manga = await bookModel.getAllManga();
    res.json(manga);
}

exports.addManga = async(req, res) => {
    const { title, category_id } = req.body;
    const manga = await bookModel.createManga(title, category_id);
    res.status(201).json(manga);
}