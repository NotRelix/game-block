const {
  insertGame,
  getAllGames,
  getAllDevelopers,
  insertDeveloper,
  getDeveloper,
} = require("../db/query");

exports.gamesListGet = async (req, res) => {
  let games = await getAllGames();
  games = games.map((game) => {
    return {
      ...game,
      imageBase64: game.image ? game.image.toString("base64") : null,
    };
  });
  res.render("games", {
    title: "Game Block",
    games: games,
  });
};

exports.gameAddGet = async (req, res) => {
  const developers = await getAllDevelopers();
  res.render("addGame", {
    title: "Add Game",
    developers: developers,
  });
};

exports.gameAddPost = async (req, res) => {
  const { name, description, price, developer, releaseDate } = req.body;
  const image = req.file?.buffer || null;
  let developerId;

  const result = await getDeveloper(developer);
  if (result.length > 0) {
    developerId = result[0].id;
  } else {
    developerId = await insertDeveloper(developer);
  }
  await insertGame(name, description, price, image, developerId, releaseDate);
  res.redirect("/");
};
