const express = require("express");
const router = express.Router();
const DashboardController = require('../controllers/dashboard_controller');
const Auth = require('../auth/auth_token_handler.js');


router.get("/intakes", Auth.adminAuth ,  DashboardController.getIntakes);
router.get("/meals", Auth.adminAuth, DashboardController.getMeals);
router.get("/reports", Auth.adminAuth, DashboardController.getReports);
router.get("/users", Auth.adminAuth, DashboardController.getUsers);


module.exports = router;
