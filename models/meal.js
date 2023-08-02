const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const mealSchema = new Schema({
  uid: { type: Schema.ObjectId, ref: "User", required: true },
  dailyid: { type: Schema.ObjectId, ref: "Intake", required: true },
  datetime: { type: Date, default: Date.now() },
  pic: {type: String},
  cal: { type: Number, min: 0 },
  fat: { type: Number, min: 0 },
  carbs: { type: Number, min: 0 },
  proteins: { type: Number, min: 0 },
  mealdesc: { type: String },
  foodgroups: { type : [String]  }
})

mealSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Meal", mealSchema);