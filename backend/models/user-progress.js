const mongoose = require('mongoose')

const userProgressSchema = new mongoose.Schema({
    userId: String,
    fullName: String,
    courseName: String,
    completedLessons: {
        type: [
            {
                lessonId: {type: Number, required: true},
                completedAt: { type: Date, default: Date.now },
            }
        ],
        default: []
    },
    completedExercises: {
      type: [
        {
          exerciseId: Number,
          completedAt: {type: Date, default: Date.now}
        }
      ]
    }
})

const userProgressModel = mongoose.model('user_progress', userProgressSchema);
module.exports = userProgressModel;