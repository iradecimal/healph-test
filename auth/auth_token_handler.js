const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const Admin = require('../models/admin.js');


exports.adminAuth  = (req, res, next) => {
    const token = req.cookies.jwt;

      if (token) {
        jwt.verify(token, 'HealPHAdminScrambler', async (err, decodedToken) => {
          if (err) {
            console.log(err.message);
            res.redirect('/redirect');
          } else {
            console.log(decodedToken);
            let admin = await Admin.findById(decodedToken.id);
            if(!admin){
              res.redirect('/redirect');
            }
            next();
          }
        });
      } else {
        res.redirect('/redirect');
      }
    };

exports.userAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, 'HealPHScrambler', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/redirect');
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        if(!user){
          res.redirect('/redirect');
        }
        next();
      }
    });
  } else {
    res.redirect('/redirect');
  }
}
