import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  uid: {
    type: mongoose.ObjectId,
    required: true
  },
  dailyid: {
    type: mongoose.ObjectId,
    required: true
  },
  datetime: {
    type: Date, 
    default: Date.now()
  },
  cal: {
    type: Number,
    min: [0, 'Calories must be zero or postive, received {VALUE}']
  },
  fat: {
    type: Number,
    min: [0, 'Fat must be zero or postive, received {VALUE}']
  },
  carbs: {
    type: Number,
    min: [0, 'Carbohydrates must be zero or postive, received {VALUE}']
  },
  proteins: {
    type: Number,
    min: [0, 'Proteins must be zero or postive, received {VALUE}']
  },
  mealdesc: {
    type: String
  },
  foodgroups: {
    type : [String]
  }
})

const Meal = mongoose.model("Meal", mealSchema);
export default Meal;