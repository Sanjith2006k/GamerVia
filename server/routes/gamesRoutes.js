const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/gamesController");

router.get("/trending", gamesController.getTrendingGames);
router.get("/popular", gamesController.getPopularGames);
router.get("/new", gamesController.getNewReleases);
router.get("/search", gamesController.searchGames);
router.get("/:id", gamesController.getGameDetails);

module.exports = router;
