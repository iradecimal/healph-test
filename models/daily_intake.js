const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const daily_intakeSchema = new Schema({
  uid: { type: Schema.ObjectId, ref: "User", required: true },
  date: { type: String, required: true, minLength: 9 ,maxLength: 11 },
  sleephrs: { type: Number, min: 0, default: 0 },
  waterglass: { type: Number, min: 0, default: 0 },
  dailycal: { type: Number, min: 0, default: 0 },
  steps: { type: Number, min: 0, default: 0 },
  phd: { type: Number, min: 0, default: 0 },
  hale: { type: Number, min: 0, default: 0 },
  submit: { type: Boolean, default: false },
});

daily_intakeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Intake", daily_intakeSchema);