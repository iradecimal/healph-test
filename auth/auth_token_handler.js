const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const Admin = require('../models/admin.js');


exports.adminAuth  = (req, res, next) => {
    const token = req.cookies.jwt;

   
      if (token) {
        jwt.verify(token, 'HealPHAdminScrambler', (err, decodedToken) => {
          if (err) {
            console.log(err.message);
            res.redirect('/redirect');
          } else {
            console.log(decodedToken);
            next();
          }
        });
      } else {
        res.redirect('/redirect');
      }
    };
