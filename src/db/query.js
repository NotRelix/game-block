const pool = require("./pool");

async function getAllGames() {
  try {
    const { rows } = await pool.query("SELECT * FROM games;");
    return rows;
  } catch (err) {
    console.error("Get all games failed: ", err);
  }
}

async function insertGame(name, description, price, image) {
  try {
    await pool.query(
      "INSERT INTO games (name, description, price, image) VALUES ($1, $2, $3, $4);",
      [name, description, price, image]
    );
  } catch (err) {
    console.error("Insert game failed: ", err);
  }
}

module.exports = {
  getAllGames,
  insertGame,
};
