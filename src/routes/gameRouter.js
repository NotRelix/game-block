const { Router } = require("express");
const gameRouter = Router();
const gameController = require("../controllers/gameController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

gameRouter.get("/", gameController.gamesListGet);
gameRouter.get("/games/add", gameController.gameAddGet);
gameRouter.post("/games/add", upload.single("image"), gameController.gameAddPost);
gameRouter.get("/games/:id", gameController.gameInfoGet);
gameRouter.get("/browse", gameController.browseListGet);
gameRouter.get("/games/:id/edit", gameController.gameEditGet);
gameRouter.post("/games/:id/edit", gameController.gameEditPost);
gameRouter.post("/games/:id/delete", gameController.gameDeletePost);

module.exports = gameRouter;
