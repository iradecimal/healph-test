const express = require("express");
const asyncHandler = require('express-async-handler');
const Report = require('../models/report.js');

exports.newReport = asyncHandler(async (req, res, next) => {
    const newReport = new Report({
        uid: req.body.uid,
        reptype: req.body.reptype,
        det: req.body.det 
    });
    try {
        await newReport.save();
        res.status(200).send("Success");
    } catch {
        res.status(400).send(err);
    }
});

exports.updateReport = asyncHandler(async (req, res, next) => {
    await Report.findByIdAndUpdate(req.params.oid, {det: req.body.det});
    res.status(200).send("Success");
});

exports.flagReport = asyncHandler(async (req, res, next) => {
    await Report.findByIdAndUpdate(req.params.oid, {status: true});
    res.status(200).send("Success");
});