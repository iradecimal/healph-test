const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reportSchema = new Schema({
  uid: { type: Schema.ObjectId, ref: "User", required: true },
  datetime: { type: Date, default: Date.now() },
  reptype: { type: String },
  det: { type: String },
  status: { type: Boolean, default: false }
})

module.exports = mongoose.model("Report", reportSchema);