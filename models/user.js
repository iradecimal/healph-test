const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true,
      maxLength: 50, unique: [true, 'email is already taken'] },
  pass: { type: String, required: true, minLength: 8, maxLength: 24 },
  uname: { type: String, required: true, minLength: 4, 
      maxLength: 24, unique: [true, 'username is already taken'] },
  name: {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    mi: { type: String, default: '' },
    suffix: { type: String, default: '' }
  },
  sex: {type: String, required: true},
  bday: { type: String, required: true, minLength: 9 ,maxLength: 11 },
  pic: { type: String },
  loc: { region: String, town: String },
  uni: { type: String, required: true },
  deg: { type: String, required: true },
  joindate: { type: Date, default: Date.now },
  illnesses: { type: [String] },
  allergies: { type: String },
  weight: { type: Number, min: 0 },
  height: { type: Number, min: 0 }
});

userSchema.virtual('fullName').get(function () {
    return this.name.fname + '' + this.name.lname + '' + this.name.suffix;
});

userSchema.virtual("url").get(function () {
    return "/users/" + this.uname;
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

//password encryption code taken from mongodb blog by @jmar777

userSchema.pre("save", function (next) {
  var user = this;

  if(!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) { 
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash ) {
      if (err) return next(err); 

      user.password = hash;
      next();
    })
  })
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
}

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
}

module.exports = mongoose.model("User", userSchema);