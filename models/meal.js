const mongoose = require('mongoose');

const mealSchema = mongoose.Schema({
    uid: {
      type: ObjectId,
      required: true},
    dailyid: {
      type: ObjectId,
      required: true},
    datetime: {
      type: Date, 
      default: Date.now},
    cal: {
      type: Number},
    fat: {
      type: Number},
    carbs: {
      type: Number},
    proteins: {
      type: Number},
    mealdesc: {
      type: String},
    foodgroups: {
      type : [String]
    },
    pic: {
      type: String
    }
});

const Meal = mongoose.model("Meal", mealSchema)
export default Meal;