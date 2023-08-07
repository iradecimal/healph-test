const asyncHandler = require('express-async-handler');
const Meal = require('../models/meal.js');

exports.newMeal = asyncHandler(async (req, res, next) => {
    const newMeal = new Meal({
        uid: req.body.uid, 
        dailyid: req.body.dailyid,
        cal: req.body.calories,
        fat: req.body.fat,
        carbs: req.body.carbs,
        proteins: req.body.proteins,
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
