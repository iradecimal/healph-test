const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
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
        //if regex validation for password content is needed
        var exp = '^[a-zA-Z0-9]{8,16}$';
        return exp.test(v);
      },
      message: 'Password must be alphanumerical between 8 to 16 characters.'
    }
  },
  uname: {
    type: String, 
    required: [true, 'User must have a username.']
    /*  placeholder for regex username validation
    validate: {
      validator: function(v){
        var exp = 
        return exp.test(v);
      },
      message: 'Username must be'
    }
    */
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
  illneses: {
    type: [String]
  },
  allergies: {
    type: String
  },
  weight: {
    type: Number,
    min: [0, 'Must be zero or postive, received {VALUE}']
    
  },
  height: {
    type: Number,
    min: [0, 'Must be zero or postive, received {VALUE}']
  },
});


const daily_intake = new Schema({
  uid: {
    type: mongoose.ObjectId,
    required: true
  },
  date: {
    type: Date, 
    default: Date.now()
  },
  sleephrs: {
    type: Number,
    min: [0, 'Hours of sleep must be zero or postive, received {VALUE}'],
    default: 0
  },
  waterglass: {
    type: Number,
    min: [0, 'Number of glasses of water must be zero or postive, received {VALUE}'],
    default: 0
  },
  dailycal: {
    type: Number,
    min: [0, 'Daily calories must be zero or postive, received {VALUE}'],
    default: 0
  },
  steps: {
    type: Number,
    min: [0, 'Number of steps must be zero or postive, received {VALUE}'],
    default: 0
  },
  phd: {
    type: Number,
    min: [0, 'PHD must be zero or postive, received {VALUE}'],
    default: 0
  },
  hale: {
    type: Number,
    min: [0, 'HALE must be zero or postive, received {VALUE}'],
    default: 0
  },
  dailymeals: {
    type: [mongoose.ObjectId]
  },
  submit: {
    type: Boolean,
    default: false
  },
});

const meal = new Schema({
  uid: {
    type: mongoose.ObjectId,
    required: true
  },
  dailyid: {
    type: mongoose.ObjectId,
    required: true
  },
  datetime: {
    type: Date, 
    default: Date.now()
  },
  cal: {
    type: Number,
    min: [0, 'Calories must be zero or postive, received {VALUE}']
  },
  fat: {
    type: Number,
    min: [0, 'Fat must be zero or postive, received {VALUE}']
  },
  carbs: {
    type: Number,
    min: [0, 'Carbohydrates must be zero or postive, received {VALUE}']
  },
  proteins: {
    type: Number,
    min: [0, 'Proteins must be zero or postive, received {VALUE}']
  },
  mealdesc: {
    type: String
  },
  foodgroups: {
    type : [String]
  }
})

const report = new Schema({
  uid: {
    type: mongoose.ObjectId,
    required: true
  },
  datetime: {
    type: Date, 
    default: Date.now
  },
  reptype: {
    type: String
  },
  det: {
    type: String
  },
  status: {
    type: Boolean,
    default: false
  }
})
//for use of other js files
module.exports = Object.freeze({
  user_schema: user,
  daily_intake_schema: daily_intake,
  meal_schema: meal,
  report_schema: report
})