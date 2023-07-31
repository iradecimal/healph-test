const asyncHandler = require('express-async-handler');
const Intake = require('../models/daily_intake.js');
const Meal = require('../models/meal.js');
require('mongoose').Promise = global.Promise

//create a new empty intake
exports.newDailyIntake = asyncHandler(async (req, res, next) => {
    const newDate = new Date();
    const newIntake = new Intake({uid: req.params.uid, date: newDate.toISOString().slice(0,10) });

        await newIntake.save()
            .then(() => {
                res.status(201).json(newIntake);
            })
            .catch((error) => {
                res.status(400);
            });
});

exports.updateDailyIntake = asyncHandler(async (req, res, next) => {

    const intake = await Intake.findOneAndUpdate(
        { uid: req.params.uid, date: req.params.date },
        {
          $set: {
            sleephrs: req.body.sleephrs,
            waterglass: req.body.waterglass,
            dailycal: req.body.dailcal,
            steps: req.body.steps,
            phd: req.body.phd,
            hale: req.body.hale,
            submit: true
          }
        }, {new: true}
      ).exec();
      await intake.save;
    
    if (!intake) {
        console.log("Intake was not found");
        res.status(404).send("Intake was not found");
    } else {
        res.status(204).json(intake);
    }
});

exports.viewDailyIntake = asyncHandler(async (req, res, next) => {
    const intake = await Intake.findOne({ uid:req.params.uid, date: req.params.date }).select(
    "date sleephrs waterglass dailycal steps phd hale").exec();
    const intakeMeals = await Meal.find({ dailyid: intake._id }).exec();
    
    if (intake === null) {
        console.log(err);
        res.status(404).send("Intake was not found");
    }

    res.status(201).json({intake: intake, meals: intakeMeals});
    
});


exports.getHALE = asyncHandler(async (req, res, next) => {
    const intake = await Intake.findOne({ uid:req.params.uid, date: req.params.date }).exec();

    if (intake === null) {
        res.status(404).send("Intake was not found");
    }

    const hale = intake.hale;

    res.status(200).json({hale: hale});
    
});

exports.getPHD = asyncHandler(async (req, res, next) => {
    const intake = await Intake.findOne({ uid: req.params.uid, date: req.params.date}).select("phd").exec();
    
    if (intake === null) {
        console.log(err);
        res.status(404).send("Intake was not found");
    }
    const phd = intake.phd;

    res.status(200).json({phd: phd});

});