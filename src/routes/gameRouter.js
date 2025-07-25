const { Router } = require("express");
const gameRouter = Router();
const gameController = require("../controllers/gameController");

gameRouter.get("/", gameController.gamesListGet);
gameRouter.get("/add", gameController.gameAddGet);
gameRouter.post("/add", gameController.gameAddPost);

module.exports = gameRouter;
