const mongoose = require('mongoose');
const schemas = require('./models/index.js');

const User = mongoose.model('User', schemas.User);
const Intake = mongoose.model('Daily Intake', schemas.Intake);
const Meal = mongoose.model('Meal', schemas.Meal);
const Report = mongoose.model('Report', schemas.Report);

//You can't apparently have a custom cast error msg by design
function hasError(err){
    if (err.name === "ValidationError") {
        Object.keys(err.errors).forEach((key) => {
            err[key] = err.errors[key].message;
            console.log(err[key]);
        }) 
        console.log('\n')
        return true;
    }
    return false;
}

//User Validation
//email* pass* uname* name bday* loc uni* deg* illness allergies weight height
var user_1 = new User({
    email: 'definitelyvalid@.com',
    pass: 'lmao6',
    uname: '123123',
    name: {
        fname: 'John',
        lname: 'Comsci',
        mi: 'true'
    },
    bday: Date.now(),
    loc: {
        region: 'Laguna',
        town: 'Los baños'
    },
    uni: 'University of the Philippines Los Baños',
    deg: 'BS Computer Wizard',
    illnesses: ['crippling computer addiction', 'weeb'],
    allergies: false,
    height: 'hello world',
    weight: 12.34
})

//Daily Intake
//uid, date, sleephrs, waterglass, dailycal, steps, phd, hale, submit

var intake_1 = new Intake({
    sleephrs: 5,
    waterglass: -1,
    dailycal: 'many',
    steps: true,
    phd: 0.1
})

//Meal
//uid, dailyid, datetime, cal, fat,carbs, proteins, mealdesc, foodgroups
var meal_1 = new Meal({
    uid: user_1._id,
    dailyid: intake_1._id,
    cal: -1,
    fat: 0.1,
    carbs: 'lmaoxd',
    proteins: 'a',
    mealdesc: ''
})

var report_1 = new Report({
    uid: user_1._id,
    reptype: 'bug',
    det: 'why BA no die?'
})


//checking the input
user_err = user_1.validateSync();
console.log('User Validation');
isUserValid = hasError(user_err);

in_err = intake_1.validateSync();
console.log('Daily Intake Validation');
isDTakeValid = hasError(in_err);

meal_err = meal_1.validateSync();
console.log('Meal Validation');
isMealValid = hasError(meal_err);

report_err = report_1.validateSync();
console.log('Report Validation');
isMealValid = hasError(meal_err);


// console.log(user_1);
// console.log(intake_1);
// console.log(meal_1);
// console.log(report_1);

