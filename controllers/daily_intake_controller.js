const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Daily_Intake =require('../models/daily_intake.js');

//create a new empty intake
exports.newDailyIntake = asyncHandler(async (req, res, next) => {
    const newIntake = new Daily_Intake({uid: req.params.uid});

    await newIntake.save();
    res.send("Under Construction");
});

exports.updateDailyIntake = asyncHandler(async (req, res, next) => {
    //change to findoneandupate
    const intake = await Daily_Intake.find({ uid: req.body.date, date: Date(req.body.date) }).exec();

    res.send("Under Construction");
});

exports.viewDailyIntake = asyncHandler(async (req, res, next) => {
    const intake = await Daily_Intake.find({ uid: req.body.date, date: Date(req.body.date) }).exec();

    res.send("Under Construction");
});

exports.getHALE = asyncHandler(async (req, res, next) => {
    const intake = await Daily_Intake.find({ uid: req.body.date, date: Date(req.body.date) }).exec();

    res.send("Under Construction");
});

exports.getPHD = asyncHandler(async (req, res, next) => {
    const intake = await Daily_Intake.find({ uid: req.body.date, date: Date(req.body.date) }).exec();
     
    res.send("Under Construction");
});