const { insertGame, getAllGames } = require("../db/query");

exports.gamesListGet = async (req, res) => {
  let games = await getAllGames();
  games = games.map((game) => {
    return {
      ...game,
      imageBase64: game.image ? game.image.toString("base64") : null,
    };
  });
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
  const image = req.file?.buffer || null;
  console.log(image);
  await insertGame(name, description, price, image);
  res.redirect("/games");
};
