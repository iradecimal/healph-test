import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
      type: String, 
      required: true},
    pass: {
      type: String, 
      required: true},
    uname: {
      type: String, 
      required: true},
    name: {
      fname: String,
      lname: String,
      mi: String,
      suffix: String
    },
    pic: {
      type: String
    },
    bday: {
      type: Date,
      required: true}, //can set get to provide user's computed age instead
    loc: {
      region: String,
      town: String
    },
    uni: {
      type: String, 
      required: true},
    deg: {
      type: String, 
      required: true},
    joindate: {
      type: Date, 
      default: Date.now},
    illneses: {
      type: [String]},
    allergies: {
      type: String},
    weight: {
      type: Number},
    height: {
      type: Number},
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

const User = mongoose.model("User", userSchema);
export default User;