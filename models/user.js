const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String, 
    required: true,
    validate: {
      validator: function(v){
        //if need ng regex validation for password content
        var exp = '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$';  //pulled from regexr, modify if necessary (if for example emails can have one letter TLD)
        return exp.test(v);
      },
      message: 'Invalid email.'
    }
  },
  pass: {
    type: String, 
    required: [true, 'User must have a password'],
    validate: {
      validator: function(v){
        //placeholder values for password validation
        var exp = '^[\w-\.]{8,16}$';
        return exp.test(v);
      },
      message: 'Password must be alphanumerical between 8 to 16 characters.'
    }
  },
  uname: {
    type: String, 
    required: [true, 'User must have a username.'],
    //placeholder values for username validation
    validate: {
      validator: function(v){
        var exp = '^[\w-\.]{4,12}$'
        return exp.test(v);
      },
      message: 'Username must be alphanumerical between 4 to 12 characters.'
    }
  },
  name: {
    fname: String,
    lname: String,
    mi: String,
    suffix: {
      type: String, 
      default: ''
    }
  },
  bday: {
    type: Date,
    required: true
  }, 
  pic: {
    type: String
  },
  loc: {
    region: String,
    town: String
  },
  uni: {
    type: String, 
    required: true
  },
  deg: {
    type: String, 
    required: true
  },
  //can set get to provide user's computed age instead
  joindate: {
    type: Date, 
    default: Date.now
  },
  illnesses: {
    type: [String]
  },
  allergies: {
    type: String
  },
  weight: {
    type: Number,
    min: [0, 'Weight must be zero or postive, received {VALUE}']
    
  },
  height: {
    type: Number,
    min: [0, 'Height must be zero or postive, received {VALUE}']
  },
});

userSchema.virtual('fullName').get(function() {
    return this.name.fname + '' + this.name.lname + '' + this.name.suffix;
});

userSchema.virtual('age').get(function() {
    var today = new Date();
    var age = today.getFullYear() - this.bday.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
});

module.exports = Object.freeze({User: userSchema});