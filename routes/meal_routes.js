const express = require("express");
const router = express.Router();
const MealController = require('../controllers/meal_controller.js');

router.post("/new", MealController.newMeal);
router.get("/get/:oid", MealController.getMeal);
router.post("/upload-pic/:oid", MealController.uploadMealPicture);

module.exports = router;
