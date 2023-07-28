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
    });
    try{
        const meal = await newMeal.save(); //get id from here to add to the intake

        const intake = await Intake.findById(req.body.dailyid).exec();
        intake.dailymeals.push(meal._id);
        await intake.save();
        res.status(201).json(meal);
    } catch {
        console.log(err);
        res.status(404).send("Adding meal was unsuccessful");
    }    
});

exports.getMeal = asyncHandler(async (req, res, next) => {
    const meal = await Meal.findById(req.params.oid).select(
    'datetime cal fat carbs proteins mealdesc foodgroups').exec();

    if (meal === null) {
        console.log(err);
        res.status(404).send("Meal cannot be found");
    }

    res.status(201).json(meal);
});

exports.uploadMealPicture = asyncHandler(async (req, res, next) => {
    //accept picture
    //upload to Drive and take URL
    //find meal and attach string to the object
});
