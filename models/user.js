const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, maxLength: 50 },
  pass: { type: String, required: true, maxLength: 16 },
  uname: { type: String, required: true, maxLength: 16 },
  name: {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    mi: { type: String, default: '' },
    suffix: { type: String, default: '' }
  },
  bday: { type: Date, required: true }, 
  pic: { type: String },
  loc: { region: String, town: String },
  uni: { type: String, required: true },
  deg: { type: String, required: true },
  //can set get to provide user's computed age instead
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

module.exports = mongoose.model("User", userSchema);