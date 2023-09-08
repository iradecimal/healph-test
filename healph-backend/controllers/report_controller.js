const asyncHandler = require('express-async-handler');
const Report = require('../models/report.js');

exports.newReport = asyncHandler(async (req, res, next) => {
    const newReport = new Report({
        uid: req.body.uid,
        reptype: req.body.reptype,
        det: req.body.det 
    });
    await newReport.save()
            .then(() => {
                res.status(201).json(newReport);
            })
            .catch((error) => {
                res.status(400);
            });
});

exports.viewReport = asyncHandler(async (req, res, next) => {
    const reports = await Report.findById(req.params.oid).select(
    'datetime reptype det status').exec();
    if (reports === null) {
        res.status(404).send("Reports cannot be found");
    }

    res.status(200).json(reports);
});

exports.findUserReport = asyncHandler(async (req, res, next) => {
    const reports = await Report.find({uid: req.params.uid});
    if (reports === null) {
        res.status(404).send("Reports cannot be found");
    }
    res.status(200).json(reports);
});

exports.updateReport = asyncHandler(async (req, res, next) => {
    await Report.findByIdAndUpdate(req.params.oid, {det: req.body.det});
    res.status(200).send("Success");
});

exports.flagReport = asyncHandler(async (req, res, next) => {
    await Report.findByIdAndUpdate(req.params.oid, {status: true});
    res.status(200).send("Success");
});

exports.deleteReport = asyncHandler(async (req, res, next) => {
    const del = await Report.deleteOne(req.params.oid);
    if (del == 0) {
        res.status(404).send("Reports cannot be found");
    }

    res.status(200).send("Success");
});


exports.getallreports = asyncHandler(async (req, res, next) => {
    Report.find()
    .then(reports => {
        res.status(200).json(reports)
    })
    .catch(err => {
        res.status(404).send("Reports cannot be found");
    })
});