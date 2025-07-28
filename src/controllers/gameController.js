const {
  insertGame,
  getAllGames,
  getAllDevelopers,
  insertDeveloper,
  getDeveloper,
  getGame,
  getGameFromQuery,
  getDeveloperById,
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
  const { name, description, price, developer, releaseDate, categories } =
    req.body;
  const image = req.file?.buffer || null;
  let developerId;
  const filteredCategories = categories.split(",");
  console.log(filteredCategories);

  const result = await getDeveloper(developer);
  if (result.length > 0) {
    developerId = result[0].id;
  } else {
    developerId = await insertDeveloper(developer);
  }
  await insertGame(
    name,
    description,
    price,
    image,
    developerId,
    releaseDate,
    filteredCategories
  );
  res.redirect("/");
};

exports.gameInfoGet = async (req, res) => {
  const id = req.params.id;
  let { game, categories } = await getGame(id);
  game = {
    ...game,
    categories: categories,
    imageBase64: game.image ? game.image.toString("base64") : null,
  };
  res.render("gameInfo", {
    title: game.name,
    game: game,
  });
};

exports.browseListGet = async (req, res) => {
  const { searchBar } = req.query;
  let games = await getGameFromQuery(searchBar);
  games = games.map((game) => {
    return {
      ...game,
      imageBase64: game.image ? game.image.toString("base64") : null,
    };
  });
  res.render("browse", {
    title: "Browse Games",
    games: games,
  });
};

exports.gameEditGet = async (req, res) => {
  const { id } = req.params;
  let { game, categories } = await getGame(id);
  const developer = await getDeveloperById(game.developer_id);
  game = {
    ...game,
    categories: categories,
    developer: developer[0].developer,
    imageBase64: game.image ? game.image.toString("base64") : null,
  };
  const developers = await getAllDevelopers();
  res.render("edit", {
    title: "Edit Game",
    developers: developers,
    game: game,
  });
};
