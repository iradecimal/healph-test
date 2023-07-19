import mongoose from "mongoose";

const daily_intake = new mongoose.Schema({
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

const Intake = mongoose.model("Intake", daily_intake);
export default Intake;
  