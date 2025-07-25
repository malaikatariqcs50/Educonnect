const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    id:{type: Number, unique: true},
    title: {type: String, unique: true},
    teacherId: {type: Number},
    category: {type: String},
    level: {type: String},
    duration: {type: String},
    enrolled: {type: Number},
    rating: {type: Number},
    resources: {type: Number}
})

const courseModel = mongoose.model('course', courseSchema);
module.exports = courseModel;