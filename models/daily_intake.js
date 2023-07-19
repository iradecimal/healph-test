const mongoose = require('mongoose');


const daily_intakeSchema = new Schema({
    uid: {
      type: ObjectId,
      required: true},
    date: {
      type: Date, 
      default: Date.now},
    sleephrs: {
      type: Number},
    waterglass: {
      type: Number},
    dailycal: {
      type: Number},
    steps: {
      type: Number},
    phd: {
      type: Number},
    hale: {
      type: Number},
    dailymeals: {
      type: [ObjectId]
    },
    submit: {
      type: Boolean,
      default: false
    },
});

const Intake = mongoose.model("Intake", daily_intakeSchema)
export default Intake;
  