const express = require("express");
const router = express.Router();
const MealNameController = require('../controllers/mealname_controller.js');
//const Auth = require('../auth/auth_token_handler.js');

router.get("/get-one", MealNameController.getMealName);
router.get("/get-all", MealNameController.getMealNameTable);
router.post("/new", MealNameController.newMealName);

module.exports = router;
