const express = require("express");
const router = express.Router();
const DashboardController = require('../controllers/dashboard_controller');


router.get("/intakes", DashboardController.getIntakes);
router.get("/meals", DashboardController.getMeals);
router.get("/reports", DashboardController.getReports);
router.get("/users", DashboardController.getUsers);


module.exports = router;
