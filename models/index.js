const userJS = require('./user.js');
const mealJS = require('./meal.js');
const intakeJS = require('./daily_intake.js');
const reportJS = require('./report.js');


module.exports = Object.freeze({
    User: userJS.User,
    Meal: mealJS.Meal,
    Intake: intakeJS.Intake,
    Report: reportJS.Report
})