const asyncHandler = require('express-async-handler');
const User = require('../models/user.js');
const path = require("node:path");
const jwt = require('jsonwebtoken');

const maxAge = 28 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'HealPHScrambler', {
      expiresIn: maxAge
    });
  };


exports.checkUnique = asyncHandler(async (req, res, next) => {
    const checkUname = await User.exists({uname: req.body.username});
    const checkEmail = await User.exists({email: req.body.email});
    let uniqueUname = true;
    let uniqueEmail = true;
    if (checkUname){
        uniqueUname = false;
    }
    if (checkEmail){
        uniqueEmail = false;
    }
    res.send({"unique-email": uniqueEmail, "unique-username": uniqueUname});
});

exports.signup = asyncHandler(async (req, res, next) => {
    const newUser = new User({
        email: req.body.email,
        pass: req.body.password,
        uname: req.body.username,
        name: {
            fname: req.body.firstName,
            lname: req.body.lastName,
            mi: req.body.middleInitial,
            suffix: req.body.suffix
        },
        sex: req.body.sex,
        bday: req.body.birthday,
        loc:{
            region: req.body.region,
            town: req.body.town
        },   
        uni: req.body.university,
        deg: req.body.degree,
        illnesses: req.body.illnesses,
        allergies: req.body.allergies,
        weight: req.body.weight,
        height: req.body.height
    });

    try{
        console.log(newUser);
        await newUser.save();
        const token = createToken(newUser._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({uid: newUser._id});
    } catch(err) {
        console.log(err)
        if (err.code === 11000){
            res.status(400).json({ error: "Username/Email has already been used"});
        } else {
            res.status(400).json(err); 
        }  
    }
});

exports.login = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.login(req.body.email, req.body.password);
        console.log(user);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    } catch (err) {
        res.status(400).json(err);
    }
});

exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.send("User Logged out.");
});

exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.uid).select(
    'uname name sex bday loc uni deg joindate illnesses allergies weight height').exec();

    if (user === null) {
        res.status(404).send("User cannot be found");
    }
    

    res.status(200).json({
        uname: user.uname,
        name: user.name,
        sex: user.sex,
        bday: user.bday,
        loc: user.uname,
        uni: user.uni,
        deg: user.deg,
        joindate: user.joindate,
        illnesses: user.illnesses,
        allergies: user.allergies,
        weight: user.weight,
        height: user.height
    });
});

exports.getFullName = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.uid).exec();

    if (user === null) {
        res.status(404).send("User cannot be found");
    }
    
    const query = user.fullName;

    res.status(200).json({fullName: query});
});

exports.getProfilePicture = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.uid).exec();

    if (user === null) {
        res.status(404).send("User cannot be found");
    }
    const options = {
        root: path.join(__dirname, '../profpics')
    };
    console.log('/profpics/' + req.params.uid + ".jpg");
    res.status(200).sendFile( `${req.params.uid}` + ".jpg", options);
});

exports.getUserAge = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.uid).exec();

    if (user === null) {
        res.status(404).send("User cannot be found");
    }

    const query = user.age;

    res.status(200).json({age: query});
});

exports.updateMetrics = asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(req.params.uid, {
        $set: {
          height: req.body.height,
          weight: req.body.weight
        }
      },);
    res.status(200).send("Success");
});

exports.updateBio = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.uid, {
        $set: {
            fname: req.body.firstName,
            lname: req.body.lastName,
            mi: req.body.middleInitial,
            suffix: req.body.suffix,
            sex: req.body.sex,
            location: req.body.location,
            uni: req.body.uni,
            degree: req.body.degree
        }
    }, {new: true} );
    res.status(200).send("Success");
});

exports.uploadPicture = asyncHandler(async (req, res, next) => {
    res.status(200).send("Success");
});

exports.updatePassword = asyncHandler(async (req, res, next) => {

    await User.findByIdAndUpdate(req.params.uid, {password: req.body.password});
    res.status(200).send("Success");
});