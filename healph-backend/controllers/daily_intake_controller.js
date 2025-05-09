const asyncHandler = require('express-async-handler');
const Intake = require('../models/daily_intake.js');
const Meal = require('../models/meal.js');
require('mongoose').Promise = global.Promise

//create a new empty intake
//find existing intake and update daily intake
exports.newDailyIntake = asyncHandler(async (req, res, next) => {
    const intake = await Intake.findOneAndUpdate(
        { uid: req.params.uid, date: req.params.date },
        {
            $set: {
            sleephrs: req.body.hoursOfSleep,
            waterglass: req.body.glassesOfWater,
            dailycal: req.body.dailyCalories,
            steps: req.body.stepsTaken,
            phd: req.body.phd,
            hale: req.body.hale,
            submit: true
            }
        }, {new: true}
        ).exec();
        await intake.save;
    
    if (!intake) {
        const newDate = new Date(req.body.date);
        console.log(newDate.getTimezoneOffset());
        const newIntake = new Intake({
            uid: req.params.uid, 
            date: req.body.date,
            sleephrs: req.body.hoursOfSleep,
            waterglass: req.body.glassesOfWater,
            dailycal: req.body.dailyCalories,
            steps: req.body.stepsTaken,
            phd: req.body.phd,
            hale: req.body.hale
        });

        await newIntake.save()
            .then(() => {
                res.status(201).json({id: intake._id});
            })
            .catch((err) => {
                res.status(400);
            });
    } else {
        res.status(200).json({id: intake._id});
    }

    
});

// exports.updateDailyIntake = asyncHandler(async (req, res, next) => {

//     const intake = await Intake.findOneAndUpdate(
//         { uid: req.params.uid, date: req.params.date },
//         {
//           $set: {
//             sleephrs: req.body.hoursOfSleep,
//             waterglass: req.body.glassesOfWater,
//             dailycal: req.body.dailyCalories,
//             steps: req.body.stepsTaken,
//             phd: req.body.phd,
//             hale: req.body.hale,
//             submit: true
//           }
//         }, {new: true}
//       ).exec();
//       await intake.save;
    
//     if (!intake) {
//         console.log("Intake was not found");
//         res.status(404).send("Intake was not found");
//     } else {
//         res.status(200).json({id: intake._id});
//     }
// });

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

exports.getAllIntakes = asyncHandler(async (req, res, next) => {
    const intakes = await Intake.find({ uid: req.params.uid}).select(
        "date sleephrs waterglass dailycal steps phd hale").exec();
    
    if (intakes === null) {
        console.log(err);
        res.status(404).send("Intake was not found");
    }


    res.status(200).json(intakes);

});
