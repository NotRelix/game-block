const pool = require("./pool");

async function getAllGames() {
  try {
    const { rows } = await pool.query("SELECT * FROM games;");
    return rows;
  } catch (err) {
    console.error("Get all games failed: ", err);
  }
}

async function insertGame(name, description, price, image, developerId) {
  try {
    await pool.query(
      "INSERT INTO games (name, description, price, image, developer_id) VALUES ($1, $2, $3, $4, $5);",
      [name, description, price, image, developerId]
    );
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

async function insertDeveloper(developer) {
  const result = await pool.query(
    "INSERT INTO developers (developer) VALUES ($1) RETURNING id",
    [developer]
  );
  return result.rows[0].id;
}

module.exports = {
  getAllGames,
  insertGame,
  getAllDevelopers,
  getDeveloper,
  insertDeveloper,
};
