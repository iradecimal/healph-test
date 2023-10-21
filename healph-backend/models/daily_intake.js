const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const daily_intakeSchema = new Schema({
  uid: { type: Schema.ObjectId, ref: "User", required: true },
  date: { type: String, required: true, minLength: 9 ,maxLength: 11 },
  sleephrs: { type: Number, min: 0, required: true },
  waterglass: { type: Number, min: 0, required: true },
  dailycal: { type: Number, min: 0, required: true },
  steps: { type: Number, min: 0, required: true },
  phd: { type: Number, min: 0, required: true },
  hale: { type: Number, min: 0, required: true },
});

daily_intakeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Intake", daily_intakeSchema);