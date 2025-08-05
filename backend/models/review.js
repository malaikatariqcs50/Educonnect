const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    userId: {type: String, unique: true},
    fullName: String,
    stars: {type: Number, required: true},
    review: {type: String, default: null},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now},
    helpful: {type: Boolean, default: false}
})

const reviewModel = mongoose.model('review', reviewSchema)
module.exports = reviewModel;