const { Router } = require("express");
const gameRouter = Router();
const gameController = require("../controllers/gameController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

gameRouter.get("/", gameController.gamesListGet);
gameRouter.get("/games/add", gameController.gameAddGet);
gameRouter.post("/games/add", upload.single("image"), gameController.gameAddPost);

module.exports = gameRouter;
