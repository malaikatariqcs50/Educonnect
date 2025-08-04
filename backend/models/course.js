const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    id: Number,
    question: String,
    options: { type: [String] },
    correctOption: Number
})

const lessonSchema = new mongoose.Schema({
    id: Number,
    title: String,
    url: {type: String, default: null},
    duration: String
})

const exerciseSchema = new mongoose.Schema({
    id: Number,
    title: String,
    questions: [questionSchema]
})

const moduleSchema = new mongoose.Schema({
    id: Number,
    title: String,
    lessons: [lessonSchema],
    exercises: [exerciseSchema],
    practiceQuestions: String
})

const resourceSchema = new mongoose.Schema({
    id: Number,
    title: String,
    type: String
})

const courseSchema = new mongoose.Schema({
    id:{type: Number, unique: true},
    thumbnail: String,
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