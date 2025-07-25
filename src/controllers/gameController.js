exports.gamesListGet = (req, res) => {
  res.render("games", {
    title: "Games",
  });
};

exports.gameAddGet = (req, res) => {
  res.render("addGame", {
    title: "Add Game",
  });
};
