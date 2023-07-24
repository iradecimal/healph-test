const express = require("express");
const router = express.Router();
const MealController = require('../controllers/meal_controller.js');

router.get("/new-meal", MealController.newMeal);
router.post("/get-meal/:oid", MealController.getMeal);
router.post("/upload-meal-pic/:oid", MealController.uploadMealPicture);

module.exports = router;
