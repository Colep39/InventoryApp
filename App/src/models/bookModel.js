const db = require('../db');

exports.getAllManga = async () => {
  const result = await db.query(`
    SELECT manga.id, manga.title, categories.name AS category 
    FROM manga 
    LEFT JOIN categories ON manga.category_id = categories.id
  `);
  return result.rows;
};

exports.createManga = async (title, categoryId) => {
  const result = await db.query(
    `INSERT INTO manga (title, category_id) VALUES ($1, $2) RETURNING *`,
    [title, categoryId]
  );
  return result.rows[0];
};
