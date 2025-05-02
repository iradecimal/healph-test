const asyncHandler = require('express-async-handler');
const ActivityLog = require('../models/activitylog.js')
require('mongoose').Promise = global.Promise

exports.newLog = asyncHandler(async (req, res, next) => {
    
    const newLog = new ActivityLog({
        date: new Date().toJSON(),
        uid: req.body.uid,
        action: req.body.action,
        details: req.body.details
    });

    await newLog.save()
        .then(() => {
                res.status(201).json(newLog);
            })
            .catch((error) => {
               
            });
});

//function to return all logs for a specific day instead
//or just let mongoose paginate handle it LMAO