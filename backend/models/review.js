const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    userId: {type: String, unique: true},
    userAvatar: {type: String, required: false, default: null},
    fullName: String,
    stars: {type: Number, required: true},
    review: {type: String, default: null},
    likes: {type: Number, default: 0},
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    dislikes: {type: Number, default: 0},
    dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: {type: Date, default: Date.now},
    helpful: {type: Boolean, default: false}
})

const reviewModel = mongoose.model('review', reviewSchema)
module.exports = reviewModel;