const express = require("express");
const router = express.Router();
const DashboardController = require('../controllers/dashboard_controller');
const Auth = require('../auth/auth_token_handler.js');


router.get("/dailystats/intake", Auth.adminAuth, DashboardController.getIntakeStatsDaily);
router.get("/dailystats/meal", Auth.adminAuth, DashboardController.getMealStatsDaily);
router.get("/weeklystats/intake", Auth.adminAuth, DashboardController.getIntakeStatsWeekly);
router.get("/weeklystats/meal", Auth.adminAuth, DashboardController.getMealStatsWeekly);
router.get("/intakes/:page/:limit", Auth.adminAuth, DashboardController.getIntakes);
router.get("/meals/:page/:limit", Auth.adminAuth, DashboardController.getMeals);
router.get("/reports/:page/:limit", Auth.adminAuth, DashboardController.getReports);
router.get("/users/:page/:limit", Auth.adminAuth, DashboardController.getUsers);
router.get("/rankings/daily", Auth.adminAuth, DashboardController.dailyRankings);
router.get("/rankings/weekly", Auth.adminAuth, DashboardController.weeklyRankings);
router.get("/rankings/monthly", Auth.adminAuth, DashboardController.monthlyRankings);


module.exports = router;
