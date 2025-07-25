const { Router } = require("express");
const gameRouter = Router();
const gameController = require("../controllers/gameController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

gameRouter.get("/", gameController.gamesListGet);
gameRouter.get("/add", gameController.gameAddGet);
gameRouter.post("/add", upload.single("image"), gameController.gameAddPost);

module.exports = gameRouter;
