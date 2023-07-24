const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Report = require('../models/report.js');

exports.newReport = asyncHandler(async (req, res, next) => {
    const newReport = new Report({
        uid: req.params.uid,
        reptype: req.params.reptype,
        det: req.params.date 
    })

    await newReport.save();
});

exports.updateReport = asyncHandler(async (req, res, next) => {
    Report.findByIdAndUpdate(req.params.oid, {det: req.body.det}, function (err,docs) {
        if (err){
            res.send(err);
        } else {
            res.send("Success");
        }
    })
});

exports.flagReport = asyncHandler(async (req, res, next) => {
    Report.findByIdAndUpdate(req.params.oid, {status: true}, function (err,docs) {
        if (err){
            res.send(err);
        } else {
            res.send("Success");
        }
    })
});