const asyncHandler = require('express-async-handler');
const User = require('../models/user.js');

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
    console.log(newUser);
    await newUser.save();
    res.status(201).json(newUser);
        // .then(() => {
        //     res.status(200).send(newUser);
        // })
        // .catch((error) => {
        //     res.status(400);
        // });
});

exports.login = asyncHandler(async (req, res, next) => {

        const user = await User.login(req.body.email, req.body.password);
        //token
        res.status(200).json({user: user._id});

});

exports.logout = asyncHandler(async (req, res, next) => {
    //
    res.send("Under Construction");
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
    const user = await User.findById(req.params.uid).select('pic').exec();

    if (user === null) {
        res.status(404).send("Meal cannot be found");
    }
    
    const query = user.pic;

    res.status(200).json({pic: query});
});

exports.getUserAge = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.uid).exec();

    if (user === null) {
        res.status(404).send("Meal cannot be found");
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

// exports.updateProfilePicture = asyncHandler(async (req, res, next) => {
//     await User.findByIdAndUpdate(req.params.uid, {height: req.body.height});
//     res.status(200).send("Success");
// });

exports.updatePassword = asyncHandler(async (req, res, next) => {

    await User.findByIdAndUpdate(req.params.uid, {password: req.body.password});
    res.status(200).send("Success");
});