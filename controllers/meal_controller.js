const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Meal = require('../models/meal.js');
const Intake = require('../models/daily_intake.js');

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

    const meal = await newMeal.save(); //get id from here to add to the intake
    console.log(meal._id);
    
    const intake = await Intake.findById(req.body.dailyid).exec();

    intake.dailymeals.push(meal._id);

    await intake.save();

    res.send("Under Construction");
});

exports.getMeal = asyncHandler(async (req, res, next) => {
    const meal = await Meal.findById(req.params.oid).exec();

    if (meal === null) {
        const err = new Error("meal not found");
        err.status = 404;
        return next(err);
    }

    console.log(meal);
    const mealsend = {
        datetime: meal.datetime,
        cal: meal.cal,
        fat: meal.fat,
        carbs: meal.carbs,
        proteins: meal.proteins,
        mealdesc: meal.mealdesc,
        foodgroups: meal.foodgroups
    }

    res.send(mealsend);
});

exports.uploadMealPicture = asyncHandler(async (req, res, next) => {
    //accept picture
    //upload to Drive and take URL
    //find meal and attach string to the object
});
