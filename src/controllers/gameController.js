const { insertGame, getAllGames } = require("../db/query");

exports.gamesListGet = async (req, res) => {
  const games = await getAllGames();
  res.render("games", {
    title: "Games",
    games: games,
  });
};

exports.gameAddGet = (req, res) => {
  res.render("addGame", {
    title: "Add Game",
  });
};

exports.gameAddPost = async (req, res) => {
  const { name, description, price } = req.body;
  await insertGame(name, description, price);
  res.redirect("/games");
};
