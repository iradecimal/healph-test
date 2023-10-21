const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  email: { type: String, required: true,
      maxLength: 50, unique: [true, 'email is already taken'] },
  pass: { type: String, required: true, minLength: 8, maxLength: 24 },
});
//password encryption code taken from mongodb blog by @jmar777

adminSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.pass = await bcrypt.hash(this.pass, salt);
  next();
});

adminSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.pass, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
}

adminSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.pass);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
}

module.exports = mongoose.model("Admin", adminSchema);