const db = require('../db');

exports.getAllManga = async () => {
    const result = await db.query(`
      SELECT 
        m.id,
        m.title,
        m.author,
        m.img_url,
        c.name AS category
      FROM manga m
      LEFT JOIN categories c ON m.category_id = c.id
    `);
    return result.rows;
  };
  

  exports.createManga = async (title, author, imgUrl, categoryId) => {
    const result = await db.query(
      `INSERT INTO manga (title, author, img_url, category_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [title, author, imgUrl, categoryId]
    );
  
    return {
      id: result.rows[0].id,
      title,
      author,
      imgUrl,
      categoryId
    };
  };
  
