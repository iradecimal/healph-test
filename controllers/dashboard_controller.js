const asyncHandler = require('express-async-handler');
const Daily_Intake =require('../models/daily_intake.js');
const User = require('../models/user.js');
const Meal = require('../models/meal.js');
const Report = require('../models/report.js');

function cleanFindString(reqQuery) {
    const removeFields = ["sort"];
    removeFields.forEach((val) => delete reqQuery[val]);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in|match)\b/g,
    (match) => `$${match}`
    );

    return queryStr;
}

exports.getIntakes = asyncHandler(async (req, res, next) => {
    console.log(req.query);
    const reqQuery = req.query;
    const { sort } = req.query;
    
    let intakes;
    let queryStr = cleanFindString(reqQuery);

    if (sort == null){
        intakes = await Daily_Intake.paginate(JSON.parse(queryStr),
        {page: req.params.page, limit: req.params.limit});
    } else {      
        const sortString = sort.replace(",", " ");
        intakes = await Daily_Intake.paginate(JSON.parse(queryStr),{
            page: req.params.page, 
            limit: req.params.limit,
            collation: {locale: "en", strength: 2},
            sort: sortString });
    }
   
    res.send(intakes);
});


exports.getMeals = asyncHandler(async (req, res, next) => {
    console.log(req.query);
    const reqQuery = req.query;
    const { sort } = req.query;
    
    let meals;
    let queryStr = cleanFindString(reqQuery);

    if (sort == null){
        meals = await Meal.paginate(JSON.parse(queryStr),
        {page: req.params.page, limit: req.params.limit});
    } else {      
        const sortString = sort.replace(",", " ");
        meals = await Meal.paginate(JSON.parse(queryStr),{
            page: req.params.page, 
            limit: req.params.limit,
            collation: {locale: "en", strength: 2},
            sort: sortString });
    }
   
    res.send(meals);

});

exports.getReports = asyncHandler(async (req, res, next) => {
    console.log(req.query);
    const reqQuery = req.query;
    const { sort } = req.query;
    
    let reports;
    let queryStr = cleanFindString(reqQuery);

    if (sort == null){
        reports = await Report.paginate(JSON.parse(queryStr),
        {page: req.params.page, limit: req.params.limit});
    } else {      
        const sortString = sort.replace(",", " ");
        reports = await Report.paginate(JSON.parse(queryStr),{
            page: req.params.page, 
            limit: req.params.limit,
            collation: {locale: "en", strength: 2},
            sort: sortString });
    }
   
    res.send(reports);

});

exports.getUsers = asyncHandler(async (req, res, next) => {
    console.log(req.query);
    const reqQuery = req.query;
    const { sort } = req.query;
    
    let users;
    let queryStr = cleanFindString(reqQuery);

    if (sort == null){
        //users = await User.find(JSON.parse(queryStr));
        users = await User.paginate(JSON.parse(queryStr),
            {page: req.params.page, limit: req.params.limit});
    } else {      
        const sortString = sort.replace(",", " ");
        users = await User.paginate(JSON.parse(queryStr),{
            page: req.params.page, 
            limit: req.params.limit,
            collation: {locale: "en", strength: 2},
            sort: sortString });
    }
   
    res.send(users);
});

exports.getIntakeStatsDaily = asyncHandler(async (req, res, next) => {
    let dailydate = new Date();

    const dailystats = await Daily_Intake.aggregate([
        {'$match': {date: dailydate}},
        {'$group': {
            _id: null,
            'hale': {'$avg': '$hale'},
            'phd': {'$avg': '$phd'},
            'steps': {'$avg': '$steps'},
            'sleephrs': {'$avg': '$sleephrs'},
            'waterglass': {'$avg': '$waterglass'},
            'dailycal': {'$avg': '$dailycal'},
        }}
    ]);
    res.status(200).send(dailystats);
});

exports.getIntakeStatsWeekly = asyncHandler(async (req, res, next) => {
    let week_date = new Array();

    let dailydate = new Date();
    
    for (let i = 1; i <= 7; i++){
        dailydate.setDate(dailydate.getDate() - 1);
        week_date.push(dailydate.toISOString().slice(0,10));
    }

    const weeklystats = await Daily_Intake.aggregate([
        {'$match': {'$or': [ //match for the whole week
            {date: date1},{date: date2},{date: date3},{date: date4},
            {date: date5},{date: date6},{date: date7}]}},
        {'$group': {
            _id: null,
            'hale': {'$avg': '$hale'},
            'phd': {'$avg': '$phd'},
            'steps': {'$avg': '$steps'},
            'sleephrs': {'$avg': '$sleephrs'},
            'waterglass': {'$avg': '$waterglass'},
            'dailycal': {'$avg': '$dailycal'},
        }}
    ]);
    res.status(200).send(weeklystats);
});

exports.getMealStatsDaily = asyncHandler(async (req, res, next) => {
    let dailydate = new Date();

    const dailystats = await Daily_Intake.aggregate([
        {'$match': {date: dailydate}},
        {'$group': {
            _id: null,
            'fat': {'$avg': '$fat'},
            'carbs': {'$avg': '$carbs'},
            'proteins': {'$avg': '$proteins'},
            'cal': {'$avg': '$cal'},
            'waste': {'$avg': '$waste'},
        }}
    ]);
    res.status(200).send(dailystats);
});

exports.getMealStatsWeekly = asyncHandler(async (req, res, next) => {
    let week_date = new Array();

    let dailydate = new Date();
    
    for (let i = 1; i <= 7; i++){
        dailydate.setDate(dailydate.getDate() - 1);
        week_date.push(dailydate.toISOString().slice(0,10));
    }


    const weeklystats = await Daily_Intake.aggregate([
        {'$match': {'$or': [ //match for the whole week
            {date: date1},{date: date2},{date: date3},{date: date4},
            {date: date5},{date: date6},{date: date7}]}},
        {'$group': {
            _id: null,
            'fat': {'$avg': '$fat'},
            'carbs': {'$avg': '$carbs'},
            'proteins': {'$avg': '$proteins'},
            'cal': {'$avg': '$cal'},
            'waste': {'$avg': '$waste'},
        }}
    ]);
    res.status(200).send(weeklystats);
});