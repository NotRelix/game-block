const pool = require("./pool");

async function getAllGames() {
  try {
    const { rows } = await pool.query("SELECT * FROM games;");
    if (rows.length > 0) {
      return rows;
    }
    return rows;
  } catch (err) {
    console.error("Get all games failed: ", err);
  }
  return [];
}

async function getGame(id) {
  const gameResult = await pool.query("SELECT * FROM games WHERE id = $1", [
    id,
  ]);
  const categoryResult = await pool.query(
    `
    SELECT categories.name
    FROM game_category 
    JOIN categories ON game_category.category_id = categories.id 
    WHERE game_category.game_id = $1
    ORDER BY categories.name
    `,
    [id]
  );
  return {
    game: gameResult.rows[0],
    categories: categoryResult.rows.map((row) => row.name),
  };
}

async function getGameFromQuery(search) {
  const { rows } = await pool.query("SELECT * FROM games WHERE name ILIKE $1", [
    `%${search}%`,
  ]);
  return rows;
}

async function insertGame(
  name,
  description,
  price,
  image,
  developerId,
  releaseDate,
  categories
) {
  try {
    const result = await pool.query(
      `
      INSERT INTO games 
        (name, description, price, image, developer_id, release_date) 
      VALUES 
        ($1, $2, $3, $4, $5, $6) RETURNING id;
    `,
      [name, description, price, image, developerId, releaseDate]
    );
    const gameId = result.rows[0].id;
    await insertWithCategories(gameId, categories);
  } catch (err) {
    console.error("Insert game failed: ", err);
  }
}

async function getAllDevelopers() {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM developers ORDER BY developer;"
    );
    return rows;
  } catch (err) {
    console.error("Get all developers failed: ", err);
    return [];
  }
}

async function getDeveloper(developer) {
  const { rows } = await pool.query(
    "SELECT * FROM developers WHERE developer = $1",
    [developer]
  );
  return rows;
}

async function getDeveloperById(id) {
  const { rows } = await pool.query("SELECT * FROM developers WHERE id = $1", [
    id,
  ]);
  return rows;
}

async function insertDeveloper(developer) {
  const result = await pool.query(
    "INSERT INTO developers (developer) VALUES ($1) RETURNING id",
    [developer]
  );
  return result.rows[0].id;
}

async function insertWithCategories(gameId, categories) {
  for (const category of categories) {
    const existingCategory = await pool.query(
      "SELECT * FROM categories WHERE name = $1",
      [category]
    );
    let categoryId;
    if (existingCategory.rows.length > 0) {
      categoryId = existingCategory.rows[0].id;
    } else {
      const insertCategoryResult = await pool.query(
        "INSERT INTO categories (name) VALUES ($1) RETURNING id",
        [category]
      );
      categoryId = insertCategoryResult.rows[0].id;
    }
    await pool.query(
      "INSERT INTO game_category (game_id, category_id) VALUES ($1, $2)",
      [gameId, categoryId]
    );
  }
}

module.exports = {
  getAllGames,
  getGame,
  getGameFromQuery,
  insertGame,
  getAllDevelopers,
  getDeveloper,
  getDeveloperById,
  insertDeveloper,
};
