const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  uid: {
    type: mongoose.ObjectId,
    required: true
  },
  datetime: {
    type: Date, 
    default: Date.now()
  },
  reptype: {
    type: String
  },
  det: {
    type: String
  },
  status: {
    type: Boolean,
    default: false
  }
})

module.exports = Object.freeze({Report: reportSchema});