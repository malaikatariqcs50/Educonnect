const userProgressModel = require('../models/user-progress')

const completeLesson = async (req, res) => {
    try{
        const lessonId = parseInt(req.params.lessonId);
        const { userId } = req.body;
        const userProgress = await userProgressModel.findOne({userId});

        const alreadyCompleted = userProgress.completedLessons.some(
            l => l.lessonId === lessonId
        )

        if(alreadyCompleted){
            return res.status(400).json({ message: "Lesson already completed! ", completedLessons: userProgress.completedLessons})
        }

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

const uncompleteLesson = async(req, res) => {
    try{
        const lessonId = parseInt(req.params.lessonId);
        const { userId } = req.body;
        const userProgress = await userProgressModel.findOne({userId});

        if(!userProgress){
            return res.status(404).json({ message: "User Progress not found!" })
        }

        const alreadyCompleted = userProgress.completedLessons.some(
            l => l.lessonId === lessonId
        )

        if(alreadyCompleted){
            userProgress.completedLessons = userProgress.completedLessons.filter(
                l => l.lessonId !== lessonId
            )
            await userProgress.save()
        }

        res.status(200).json({ message: "Lesson uncompleted ", completedLessons: userProgress.completedLessons})
    }
    catch(err){
        res.status(500).json({ message: "Server Error: ", err })
    }
}

const restartLessons = async(req, res) => {
    try{
        const id = req.params.id;
        const userProgress = await userProgressModel.findOne({userId: id})
        if(!userProgress){
            return res.status(404).json({ message: "Progress not found" })
        }

        userProgress.completedLessons = []
        await userProgress.save()
        res.status(200).json({ message: "Restarted all lessons "})
    }
    catch(error){
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = {
    completeLesson,
    showAlluserProgress,
    showUserProgress,
    uncompleteLesson,
    restartLessons
};

