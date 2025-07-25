const pool = require("./pool");

async function insertGame(name, description, price) {
  try {
    await pool.query(
      "INSERT INTO games (name, description, price) VALUES ($1, $2, $3);",
      [name, description, price]
    );
  } catch (err) {
    console.error("Insert game failed: ", err);
  }
}

module.exports = {
  insertGame,
};
