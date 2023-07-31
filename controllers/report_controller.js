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
        res.status(400).send("Report cannot be created");
    }
});

exports.viewReport = asyncHandler(async (req, res, next) => {
    const reports = await Report.findById(req.body.oid).select(
    'datetime reptype det status').exec();
    if (reports === null) {
        console.log(err);
        res.status(404).send("Reports cannot be found");
    }

    res.status(200).json(reports);
});

exports.findUserReport = asyncHandler(async (req, res, next) => {
    const reports = await Report.find({uid: req.params.uid});
    if (reports === null) {
        console.log(err);
        res.status(404).send("Reports cannot be found");
    }
    res.status(201).json(reports);
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
        console.log(err);
        res.status(404).send("Reports cannot be found");
    }

    res.status(200).send("Success");
});

