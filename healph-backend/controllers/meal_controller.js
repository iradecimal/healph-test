const asyncHandler = require('express-async-handler');
const Meal = require('../models/meal.js');

exports.newMeal = asyncHandler(async (req, res, next) => {
    const newMeal = new Meal({
        uid: req.body.uid, 
        dailyid: req.body.dailyid,
        datetime: req.body.datetime,
        cal: req.body.cal,
        fat: req.body.fat,
        carbs: req.body.carbs,
        proteins: req.body.proteins,
        waste: req.body.waste,
        mealdesc: req.body.mealdesc,
        foodgroups:  req.body.foodgroups,
    });
    await newMeal.save()
            .then(() => {
                res.status(201).json(newMeal);
            })
            .catch((error) => {
                res.status(400).send("Adding meal was unsuccessful");
            });

});

exports.getMeal = asyncHandler(async (req, res, next) => {
    const meal = await Meal.findById(req.params.oid).select(
    'datetime cal fat carbs proteins waste mealdesc foodgroups').exec();

    if (meal === null) {
        console.log(err);
        res.status(404).send("Meal cannot be found");
    }

    res.status(201).json(meal);
});

exports.getAllMeals = asyncHandler(async (req, res, next) => {
    const meals = await Meal.find({uid: req.params.uid}).select(
        'datetime cal fat carbs proteins waste mealdesc foodgroups').exec();
    console.log(meals)
    if (meals === null) {
        console.log(err)
        res.status(404).send("Meals cannot be found");
    }

    res.status(200).json(meals);
});


// deprecated function
// exports.uploadMealPicture = asyncHandler(async (req, res, next) => {
//     console.log(req.body, req.files)
// });
