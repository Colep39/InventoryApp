const bookModel = require('../models/bookModel');
const db = require('../db');

exports.getManga = async (req, res) => {
  const manga = await bookModel.getAllManga();
  res.json(manga);
};

exports.addManga = async (req, res) => {
  const { title, author, img_url, category_id } = req.body;

  try {
    const manga = await bookModel.createManga(title, author, img_url, category_id);
    res.status(201).json(manga);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating manga" });
  }
};

exports.viewItem = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      `SELECT m.id, m.title, m.author, m.img_url, m.category_id, c.name AS category_name
       FROM manga m
       LEFT JOIN categories c ON m.category_id = c.id
       WHERE m.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Manga not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving manga" });
  }
};


exports.updateManga = async (req, res) => {
  const { id } = req.params;
  const { title, author, img_url, category_id } = req.body;

  try {
    await db.query(
      `UPDATE manga SET title = $1, author = $2, img_url = $3, category_id = $4 WHERE id = $5`,
      [title, author, img_url, category_id, id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating manga" });
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM manga WHERE id = $1', [id]);
    res.json({ message: "Manga deleted successfully"});
  }
  catch(err){
    console.error(err);
    res.status(500).json({ error: "Error deleting manga" });
  }
}