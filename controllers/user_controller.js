const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require('../models/user.js');

exports.signup = asyncHandler(async (req, res, next) => {
    const newUser = new User({
        email: req.body.email,
        pass: req.body.password,
        uname: req.body.username,
        fname: req.body.firstName,
        lname: req.body.lastName,
        mi: req.body.middleInitial,
        suffix: req.body.suffix,
        sex: req.body.sex,
        bday: req.body.birthday,
        loc: req.body.location,
        uni: req.body.university,
        deg: req.body.degree,
        illnesses: req.body.illnesses,
        allergies: req.body.allergies,
        weight: req.body.weight,
        height: req.body.height
    });
    try {
        const user = await newUser.save();
        res.status(200).json({user: user._id});
    } catch {
        res.status(400).send(err);
    }
});

exports.login = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.login(req.body.email, req.body.password);
        //token
        res.status(200).json({user: user._id});
    } catch {
        res.status(400).send(err);
    }
});

exports.logout = asyncHandler(async (req, res, next) => {
    //
    res.send("Under Construction");
});

exports.getUser = asyncHandler(async (req, res, next) => {
    const query = await User.findById(req.body.oid).select(
    'uname name sex bday loc uni deg joindate illnesses allergies weight height').exec();

    

});

exports.getFullName = asyncHandler(async (req, res, next) => {
    const query = await User.findById(req.body.oid).select('fullName').exec();

    if (query === null) {
        console.log(err);
        res.status(404).send("User cannot be found");
    }

    console.log(query);
});

exports.getProfilePicture = asyncHandler(async (req, res, next) => {
    const query = await User.findById(req.body.oid).select('pic').exec();

    if (query === null) {
        console.log(err);
        res.status(404).send("Meal cannot be found");
    }

    console.log(query);
});

exports.getUserAge = asyncHandler(async (req, res, next) => {
    const query = await User.findById(req.body.oid).select('age').exec();

    if (query === null) {
        console.log(err);
        res.status(404).send("Meal cannot be found");
    }

    console.log(query);
});

exports.updateHeight = asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(req.params.uid, {height: req.body.height});
    res.status(200).send("Success");
});

exports.updateWeight = asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(req.params.uid, {weight: req.body.weight});
    res.status(200).send("Success");
});

exports.updateUserBio = asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(req.params.uid, {
        fname: req.body.firstName,
        lname: req.body.lastName,
        mi: req.body.middleInitial,
        suffix: req.body.suffix
    });
    res.status(200).send("Success");
});

// exports.updateProfilePicture = asyncHandler(async (req, res, next) => {
//     await User.findByIdAndUpdate(req.params.uid, {height: req.body.height});
//     res.status(200).send("Success");
// });

exports.updateUni = asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(req.params.uid, {uno: req.body.uni});
    res.status(200).send("Success");
});

exports.updateDegree = asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(req.params.uid, {deg: req.body.deg});
    res.status(200).send("Success");
});

exports.updatePassword = asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(req.params.uid, {password: req.body.password});
    res.status(200).send("Success");
});