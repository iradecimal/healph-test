const express = require("express");
const router = express.Router();
import MealController from '../controllers/meal_controller.js';

router.get("/new-meal", MealController.getUserAge);
router.post("/get-meal/:oid", MealController.updateHeight);

export default router;
