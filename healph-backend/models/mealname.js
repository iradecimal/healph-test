const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const mealnameSchema = new Schema({
    name: { type: String, required: true},
    foodgroups: { type: [String], required: true}
});

module.exports = mongoose.model("Mealname", mealnameSchema);