const express = require("express");
const router = express.Router();
const RankingController = require('../controllers/rankings_controller');

router.get("/daily", RankingController.dailyRankings);
router.get("/weekly", RankingController.weeklyRankings);
router.get("/monthly", RankingController.monthlyRankings);


module.exports = router;