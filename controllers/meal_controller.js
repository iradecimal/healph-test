const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Meal = require('../models/meal.js');

exports.newMeal = asyncHandler(async (req, res, next) => {
    const newMeal = new Meal({
        uid: req.body.uid, 
        dailyid: req.body.dailyid,
        cal: req.body.cal,
        fat: req.body.fat,
        carbs: req.body.carbs,
        proteins: req.body.proteins,
        mealdesc: req.body.mealdesc,
        foodgroups:  req.body.foodgroups,
        })

    await newMeal.save(); //get id from here to add to the intake

    //need to update daily intake as well, grab the oid from the req.body, then modify it

    res.send("Under Construction");
});

exports.getMeal = asyncHandler(async (req, res, next) => {
    const meal = await Meal.findById(req.params.oid).exec();

    if (meal === null) {
        const err = new Error("meal not found");
        err.status = 404;
        return next(err);
    }

    res.send(meal.toJSON());
});

exports.uploadMealPicture = asyncHandler(async (req, res, next) => {

});
