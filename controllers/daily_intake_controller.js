const express = require("express");
const asyncHandler = require('express-async-handler');
const Daily_Intake =require('../models/daily_intake.js');
const Meal = require('../models/meal.js');

//create a new empty intake
exports.newDailyIntake = asyncHandler(async (req, res, next) => {
    const newDate = new Date();
    const newIntake = new Daily_Intake({uid: req.params.uid, date: newDate.toISOString().slice(0,10) });
    
    try{
        await newIntake.save();
        res.status(201).json(intake);
    } catch {
        res.status(400);
    } 
});

exports.updateDailyIntake = asyncHandler(async (req, res, next) => {

    const intake = await Daily_Intake.findOneAndUpdate(
        { uid: ObjectId(req.params.uid), date: req.params.date },
        {
          $set: {
            sleephrs: req.body.sleephrs,
            waterglass: req.body.waterglass,
            dailycal: req.body.dailcal,
            steps: req.body.steps,
            phd: req.body.phd,
            hale: req.body.hale
          }
        }, {new: true}
      ).exec();
    
    if (!intake) {
        console.log("Intake was not found");
        res.status(404).send("Intake was not found");
    } else {
        res.status(204).json(intake);
    }
});

exports.viewDailyIntake = asyncHandler(async (req, res, next) => {
    const intake = await Daily_Intake.find({ uid:req.params.uid, date: req.params.date }).exec();
    const intakeMeals = await Meal.find({ dailyid: intake._id }).exec();
    
    if (!intake) {
        console.log(err);
        res.status(404).send("Intake was not found");
    } else {
        res.status(201).json({intake: intake, meals: intakeMeals});
    }
});

//getmealsfrom intake

exports.getHALE = asyncHandler(async (req, res, next) => {
    const HALE = await Daily_Intake.find({ uid: req.body.date, date: Date(req.body.date)}, "hale").exec();

    if (!HALE) {
        console.log(err);
        res.status(404).send("Intake was not found");
    } else {
        res.status(200).json(HALE);
    }
});

exports.getPHD = asyncHandler(async (req, res, next) => {
    const PHD = await Daily_Intake.find({ uid: req.body.date, date: Date(req.body.date)}, "phd").exec();
    
    if (!PHD) {
        console.log(err);
        res.status(404).send("Intake was not found");
    } else {
        res.status(200).json(PHD);
    }
});