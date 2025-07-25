const { insertGame } = require("../db/query");

exports.gamesListGet = (req, res) => {
  res.render("games", {
    title: "Games",
  });
};

exports.gameAddGet = (req, res) => {
  console.log(process.env.CONNECTION_STRING);
  res.render("addGame", {
    title: "Add Game",
  });
};

exports.gameAddPost = async (req, res) => {
  const { name, description, price } = req.body;
  await insertGame(name, description, price);
  res.redirect("/games");
};
