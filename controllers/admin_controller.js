const asyncHandler = require('express-async-handler');
const Admin = require('../models/admin.js');
const jwt = require('jsonwebtoken');

const maxAge = 1 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'HealPHAdminScrambler', {
      expiresIn: maxAge
    });
  };

exports.signup = asyncHandler(async (req, res, next) => {
    const newUser = new Admin({
        email: req.body.email,
        pass: req.body.password,
    });
    console.log(newUser);
    try{
        await newUser.save();
        
        const token = createToken(newUser._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json(newUser._id);
    } catch(err) {
        res.status(400).json(err);
    }

});

exports.login = asyncHandler(async (req, res, next) => {

    try {
        const user = await Admin.login(req.body.email, req.body.password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    } catch (err) {
        res.status(400).json(err);
    }

});

exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
});
