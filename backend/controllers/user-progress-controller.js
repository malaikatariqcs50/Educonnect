const { response } = require('express');
const userModel = require('../models/user');
const userProgressModel = require('../models/user-progress')

const completeLesson = async (req, res) => {
    try{
        const lessonId = req.params.lessonId;
        const { userProgressId } = req.body;
        const userProgress = await userProgressModel.findById(userProgressId);

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

const addUserProgress = async(req, res) => {
    try{
        const {userId } = req.body;
        if(!userId){
            return res.status(400).json({ message: "User Id is required" })
        }

        const { fullName, courseName } = await userModel.findById(userId)

        const userProgress = new userProgressModel({
            userId,
            fullName,
            courseName
        })

        await userProgress.save();
        res.status(201).json({ message: "User Progress Schema created", userProgress })
    }
    catch(err){
        res.status(500).json({ message: "Server Error ", err})
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
    addUserProgress,
    showAlluserProgress,
    showUserProgress
};

