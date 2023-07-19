import mongoose from "mongoose";

const reportSchema = mongoose.Schema({
    uid: {
      type: ObjectId,
      required: true},
    datetime: {
      type: Date, 
      default: Date.now},
    reptype: {
      type: String},
    det: {
      type: String},
    status: {
      type: Boolean,
      default: false}
});


const Report = mongoose.model("Report", reportSchema)
export default Report;