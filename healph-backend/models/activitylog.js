const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const activitylogSchema = new Schema({
    datetime: { type: Date, required: true},
    uid: { type: Schema.ObjectId, ref: "User", required: true },
    action: { type: String, required: true},
    details: { type: String, required: true}
});

activitylogSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("ActivityLog", activitylogSchema);