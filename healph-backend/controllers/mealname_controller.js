const asyncHandler = require('express-async-handler');
const Mealname = require('../models/daily_intake.js');
require('mongoose').Promise = global.Promise


exports.getMealName = asyncHandler(async (req, res, next) => {
    const foodgroups = await Mealname.findOne({ name: req.params.name}).select("foodgroups").exec();
    
    if (foodgroups === null) {
        res.status(404).send("Foodgroups weren't found");
    }

    res.status(200).json({foodgroups: foodgroups});
})

exports.newMealName = asyncHandler(async (req, res, next) => {
    const newMealName = new Mealname({
        name: req.params.name,
        foodgroups: req.body.foodgroups
    });

    await newMealName.save()
        .then(() => {
            res.status(201).json(newMealName);
        })
        .catch((err) => {
            res.status(400);
        });
})

exports.getMealNameTable = asyncHandler(async (req, res, next) => {
    const foodgroups = await Mealname.find().select();

    res.status(200).send(foodgroups);
})
