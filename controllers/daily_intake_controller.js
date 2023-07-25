const express = require("express");
const asyncHandler = require('express-async-handler');
const Daily_Intake =require('../models/daily_intake.js');

//create a new empty intake
exports.newDailyIntake = asyncHandler(async (req, res, next) => {
    const newDate = new Date();

    const newIntake = new Daily_Intake({uid: req.params.uid, date: newDate.toISOString().slice(0,10) });

    await newIntake.save();
    res.send("Under Construction");
});

exports.updateDailyIntake = asyncHandler(async (req, res, next) => {
    const query = { uid: req.params.uid, date: req.params.date};

    Daily_Intake.findOne(
        {uid: ObjectId(req.params.uid), date: req.params.date},
        { $set:{ 
            sleephrs: req.body.sleephrs,
            waterglass: req.body.waterglass,
            dailycal: req.body.dailcal,
            steps: req.body.steps,
            phd: req.body.phd,
            hale: req.body.hale
        }}, function (err,docs) {
            if (err){
                res.send(err);
            } else {
                res.send("Success");
            }
        }
    ); 
});

exports.viewDailyIntake = asyncHandler(async (req, res, next) => {
    const intake = await Daily_Intake.find({ uid:req.params.uid, date: req.params.date }).exec();
    
    if (intake === null) {
        const err = new Error("meal not found");
        err.status = 404;
        return next(err);
    }
    
    res.send(intake);
});

//getmealsfrom intake

exports.getHALE = asyncHandler(async (req, res, next) => {
    const HALE = await Daily_Intake.find({ uid: req.body.date, date: Date(req.body.date)}, "hale").exec();

    if (HALE === null) {
        const err = new Error("meal not found");
        err.status = 404;
        return next(err);
    }

    res.send(HALE);
});

exports.getPHD = asyncHandler(async (req, res, next) => {
    const PHD = await Daily_Intake.find({ uid: req.body.date, date: Date(req.body.date)}, "phd").exec();
    
    if (PHD === null) {
        const err = new Error("meal not found");
        err.status = 404;
        return next(err);
    }

    res.send(PHD);
});