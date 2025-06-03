const asyncHandler = require('express-async-handler');
const {User, EmpUser, Student} = require('../models/user.js');
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

exports.signupEmployee = asyncHandler(async (req, res, next) => {
    const newEmp = new EmpUser({
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
        empnum: req.body.empnum,
        college: req.body.college,
        unit: req.body.unit,
        illnesses: req.body.illnesses,
        allergies: req.body.allergies,
        diet: req.body.diet,
        lifestyle: req.body.lifestyle, 
        weight: req.body.weight,
        height: req.body.height
    });

    try{
        console.log(newEmp);
        await newEmp.save();
        const token = createToken(newEmp._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({uid: newEmp._id});
    } catch(err) {
        console.log(err)
        if (err.code === 11000){
            res.status(400).json({ error: "Username/Email has already been used"});
        } else {
            res.status(400).json(err); 
        }  
    }
});

exports.signupStudent = asyncHandler(async (req, res, next) => {
    const newStudent = new Student({
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
        studentnum: req.body.studentnum,
        college: req.body.college,
        deg: req.body.degree,
        illnesses: req.body.illnesses,
        allergies: req.body.allergies,
        diet: req.body.diet,
        lifestyle: req.body.lifestyle, 
        weight: req.body.weight,
        height: req.body.height
    });

    try{
        console.log(newStudent);
        await newStudent.save();
        const token = createToken(newStudent._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({uid: newStudent._id});
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
    const user = await User.findById(req.params.uid).exec();

    if (user.__t == "EmpUser") {
        res.status(200).json({
            uname: user.uname,
            name: user.name,
            sex: user.sex,
            bday: user.bday,
            empnum: user.empnum,
            college: user.college,
            unit: user.unit,
            joindate: user.joindate,
            illnesses: user.illnesses,
            allergies: user.allergies,
            diet: user.diet,
            lifestyle: user.lifestyle,
            weight: user.weight,
            height: user.height
        });
    } else if (user.__t == "StudentUser") {
        res.status(200).json({
            uname: user.uname,
            name: user.name,
            sex: user.sex,
            bday: user.bday,
            loc: user.uname,
            studentnum: user.studentnum,
            college: user.college,
            deg: user.deg,
            joindate: user.joindate,
            illnesses: user.illnesses,
            allergies: user.allergies,
            diet: user.diet,
            lifestyle: user.lifestyle,
            weight: user.weight,
            height: user.height
        });
    }

    if (user === null) {
        res.status(404).send("User cannot be found");
    }
    

    
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
    const user = await User.findById(req.params.uid).exec();

    if (user.__t == "EmpUser") {
        await EmpUser.findByIdAndUpdate(req.params.uid, {
            $set: {
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
                empnum: req.body.empnum,
                college: req.body.college,
                unit: req.body.unit,
                illnesses: req.body.illnesses,
                allergies: req.body.allergies,
                diet: req.body.diet,
                lifestyle: req.body.lifestyle,
            }
        })
    } else if (user.__t == "StudentUser") {
        await Student.findByIdAndUpdate(req.params.uid, {
            $set: {
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
                studentnum: req.body.studentnum,
                college: req.body.college,
                deg: req.body.degree,
                illnesses: req.body.illnesses,
                allergies: req.body.allergies,
                diet: req.body.diet,
                lifestyle: req.body.lifestyle 
                    }
        })
    }

    if (user === null) {
        res.status(404).send("User cannot be found");
    }    
});

exports.uploadPicture = asyncHandler(async (req, res, next) => {
    res.status(200).send("Success");
});

exports.updatePassword = asyncHandler(async (req, res, next) => {

    await User.findByIdAndUpdate(req.params.uid, {password: req.body.password});
    res.status(200).send("Success");
});