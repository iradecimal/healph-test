const asyncHandler = require('express-async-handler');
const Daily_Intake =require('../models/daily_intake.js');
const Meal = require('../models/meal.js');

exports.dailyRankings = asyncHandler(async (req, res, next) => {
    const dailydate = Date();
    dailydate.setDate(dailydate.getDate()-1);

    const rankings = Daily_Intake.aggregate(
        {$match: {submit: true} }, //only accept intakes that were submitted
        {$match: {date: dailydate}},
        {'$group': {
            '_id': '$uid', 
            'hale': {'$sum': '$hale'}, 
            'count': {'$sum': 1}
            }}, 
        {'$match': {'count': {'$gte': 5}}},
        {'$sort': {'hale': -1}}, {
            '$lookup': {
            'from': 'users', 
            'localField': '_id', 
            'foreignField': '_id', 
            'as': 'user'
            }}, 
        {'$project': {
            'hale': 1, 
            'user': '$user.name'
            }}  
    )
    
    res.status(200).send(rankings);
});

exports.weeklyRankings = asyncHandler(async (req, res, next) => {
    let week_date = new Array();

    let dailydate = new Date();
    
    for (let i = 1; i <= 7; i++){
        dailydate.setDate(dailydate.getDate() - 1);
        week_date.push(dailydate.toISOString().slice(0,10));
    }
    const rankings = await Daily_Intake.aggregate(
        {$match: {submit: true} }, //only accept intakes that were submitted
        {$match: {$or: [ //match for the whole week
            {date: date1},{date: date2},{date: date3},{date: date4},
            {date: date5},{date: date6},{date: date7}]}},
        {'$group': {
            '_id': '$uid', 
            'hale': {'$sum': '$hale'}, 
            'count': {'$sum': 1}
            }}, 
        {'$match': {'count': {'$gte': 5}}},
        {'$sort': {'hale': -1}}, {
            '$lookup': {
            'from': 'users', 
            'localField': '_id', 
            'foreignField': '_id', 
            'as': 'user'
            }}, 
        {'$project': {
            'hale': 1, 
            'user': '$user.name'
            }}       
    )
        
    res.status(200).send(rankings);
});
//monthly rankings
exports.monthlyRankings = asyncHandler(async (req, res, next) => {
    let week_date = new Array();

    let dailydate = new Date();
    
    let month = 
        week_date.push(dailydate.toISOString().slice(0,7));
    
    const rankings = Daily_Intake.aggregate(
        {$match: {submit: true} }, //only accept intakes that were submitted
        {$match: {$expr: { $eq: [month, {$substrCP: [ "$date", 0, 7]} ]  } } },
        {'$group': {
            '_id': '$uid', 
            'hale': {'$sum': '$hale'}, 
            'count': {'$sum': 1}
            }}, 
        {'$match': {'count': {'$gte': 5}}},
        {'$sort': {'hale': -1}}, {
            '$lookup': {
            'from': 'users', 
            'localField': '_id', 
            'foreignField': '_id', 
            'as': 'user'
            }}, 
        {'$project': {
            'hale': 1, 
            'user': '$user.name'
            }}  
    )

    res.status(200).send(rankings);
});