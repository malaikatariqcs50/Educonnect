const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
    id: Number,
    title: String,
    duration: String,
    completed: {type: Boolean, default: false}
})

const moduleSchema = new mongoose.Schema({
    id: Number,
    title: String,
    completed: {type: Boolean, default: false},
    lessons: [lessonSchema]
})

const resourceSchema = new mongoose.Schema({
    id: Number,
    title: String,
    type: String
})

const courseSchema = new mongoose.Schema({
    id:{type: Number, unique: true},
    title: {type: String, unique: true},
    teacherId: {type: Number},
    category: {type: String},
    level: {type: String},
    duration: {type: String},
    enrolled: {type: Number},
    rating: {type: Number},
    modules: [moduleSchema],
    resources: [resourceSchema]
})

const courseModel = mongoose.model('course', courseSchema);
module.exports = courseModel;