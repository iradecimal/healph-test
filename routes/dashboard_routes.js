const express = require("express");
const router = express.Router();
const DashboardController = require('../controllers/dashboard_controller');

router.get("/intakes/:page/:limit", DashboardController.getIntakes);
router.get("/meals/:page/:limit", DashboardController.getMeals);
router.get("/reports/:page/:limit", DashboardController.getReports);
router.get("/users/:page/:limit", DashboardController.getUsers);


module.exports = router;
