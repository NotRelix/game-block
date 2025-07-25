const express = require("express");
const app = express();
const path = require("node:path");
const gameRouter = require("./routes/gameRouter");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use("/", gameRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Express listening on port ${PORT}`);
});
