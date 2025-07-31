const userProgressModel = require('../models/user-progress')

const completeLesson = async (req, res) => {
    try{
        const lessonId = req.params.lessonId;
        const { userId } = req.body;
        const userProgress = await userProgressModel.findOne({userId});

        userProgress.completedLessons.push({
            lessonId,
            completedAt: new Date()
        })

        await userProgress.save()
        res.status(200).json({ message: "Lesson completed ", completedLessons: userProgress.completedLessons})
    }
    catch(err){
        res.status(500).json({ message: "Server Error: ", err })
    }
}

const showAlluserProgress = async(req, res) => {
    try{
        const alluserProgresses = await userProgressModel.find()
        res.status(200).json({ message: "Found all user Progresses", alluserProgresses})
    }
    catch(err){
        res.status(500).json({ message: "Server Error! ", err})
    }
}

const showUserProgress = async(req, res) => {
    try{
        const userId  = req.params.userId;
        const userProgress = await userProgressModel.findOne({userId})
        res.status(200).json({ message: "Found User Progress", userProgress })
    }
    catch(err){
        res.status(500).json({message: "Server Error", err})
    }
}

module.exports = {
    completeLesson,
    showAlluserProgress,
    showUserProgress
};

