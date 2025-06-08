const db = require('../db');

exports.viewCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      `SELECT c.id AS category_id, c.name AS category_name,
              json_agg(json_build_object('id', m.id, 'title', m.title, 'author', m.author, 'img_url', m.img_url)) AS manga
       FROM categories c
       LEFT JOIN manga_categories mc ON c.id = mc.category_id
       LEFT JOIN manga m ON mc.manga_id = m.id
       WHERE c.id = $1
       GROUP BY c.id`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching category" });
  }
};

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
  
    try {
      const linkedManga = await db.query(
        'SELECT * FROM manga_categories WHERE category_id = $1',
        [id]
      );
  
      if (linkedManga.rows.length > 0) {
        return res.status(400).send('Cannot delete category with manga linked to it.');
      }
  
      await db.query('DELETE FROM categories WHERE id = $1', [id]);
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error deleting category" });
    }
};

exports.getAllCategories = async (req, res) => {
  try {
    const result = await db.query('SELECT DISTINCT id, name FROM categories ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching categories" });
  }
};
