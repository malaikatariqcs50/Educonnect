import userCourseModel from "../models/user_course";

const completeLesson = (req, res) => {
    try{
        const { lessonId } = req.params.id;
        const lesson = new userCourseModel({
            lessonId
        })
        res.status(201).json({ message: "Lesson completed ", lesson})
    }
    catch(err){
        res.status(500).json({ message: "Server Error: ", err })
    }
}

module.exports = completeLesson;

