const db = require('../src/db');

// node scripts/seed.js to run

async function seed() {
   // Insert categories
   const categoryResult = await db.query(`
    INSERT INTO categories (name)
    VALUES ('Action'), ('Fantasy'), ('Comedy'), ('Horror')
    RETURNING id, name
  `);

  const categories = categoryResult.rows;

  // Insert manga
  const mangaResult = await db.query(`
   INSERT INTO manga (title, author, img_url)
   VALUES 
      ('One Piece', 'Eiichiro Oda', 'https://upload.wikimedia.org/wikipedia/en/2/2c/One_Piece_Logo.png'),
      ('Berserk', 'Kentaro Miura', 'https://upload.wikimedia.org/wikipedia/en/7/70/Berserk_manga_logo.png'),
      ('Mob Psycho 100', 'ONE', 'https://upload.wikimedia.org/wikipedia/en/1/15/Mob_Psycho_100_cover.png'),
      ('Chainsaw Man', 'Tatsuki Fujimoto', 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/Chainsaw_Man_volume_1_cover.jpg/220px-Chainsaw_Man_volume_1_cover.jpg')
   RETURNING id, title
  `);

  const manga = mangaResult.rows;

  // Associate manga with categories
  const categoryMap = Object.fromEntries(categories.map(c => [c.name, c.id]));
  const mangaMap = Object.fromEntries(manga.map(m => [m.title, m.id]));

  const links = [
    { title: 'One Piece', cats: ['Action', 'Comedy'] },
    { title: 'Berserk', cats: ['Action', 'Horror'] },
    { title: 'Mob Psycho 100', cats: ['Comedy', 'Fantasy'] },
    { title: 'Chainsaw Man', cats: ['Horror', 'Action'] },
  ];

  for (const link of links) {
    for (const catName of link.cats) {
      await db.query(
        `INSERT INTO manga_categories (manga_id, category_id)
         VALUES ($1, $2)`,
        [mangaMap[link.title], categoryMap[catName]]
      );
    }
  }

  console.log('Seeding complete');
  process.exit();
}

seed();