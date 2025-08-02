const courseModel = require("../models/course");

const addCourseController = async(req, res)=>{
    const {id, title, teacherId, category, level, duration, enrolled, rating, resources, modules} = req.body;
    try{
        const course = new courseModel({
            id,
            title,
            teacherId,
            category,
            level,
            duration,
            enrolled,
            rating,
            resources,
            modules
        })
        await course.save();
        res.status(201).json({message: "Course added successfully", course})
    }
    catch(err){
        res.status(400).json({message: "Error adding the course: ", err})
    }
    
}

const showAllCourses = async(req, res)=>{
    try{
        const courses = await courseModel.find();
        res.status(200).json(courses)
    }
    catch(err){
        res.status(500).json({message:"Error fetching courses: ", err})
    }
}

const showCourse = async(req, res)=>{
    try{
        const title = req.params.title;
        const course = await courseModel.findOne({title})
        res.status(200).json({message: "Course fetched successfully", course})
    }
    catch(err){
        res.status(500).json({message: "Server Error: ", err})
    }
}

const showMyCourse = async(req, res)=>{
    try{
        const courseName = req.user.courseName;
        const course = await courseModel.findOne({title: courseName})
        if(!course){
            return res.status(400).json({message: "Course not found!"})
        }
        res.status(200).json({course});
    }
    catch(err){
        res.status(500).json({message: "Server Error: ", err})
    }
}

const addResource = async(req, res)=>{
    try{
        const courseId = req.params.id;
        const {id, title, type} = req.body;
        const resource = {
            id,
            title,
            type
        }
        const updated = await courseModel.updateOne(
            {id: courseId},
            {$push: {resources: resource}}
        )
        if(updated.modifiedCount === 0){
            return res.status(400).json({message: "Resource not added or Course not found"})
        }
        res.status(201).json({message: "Resource added Successfully", resource})
    }
    catch(err){
        res.status(500).json({message: "Server Error: ", err})
    }
}

const addModule = async(req, res)=>{
    try{
        const courseId = req.params.id;
        const {id, title, lessons} = req.body;
        const module = {
            id,
            title,
            lessons
        }
        const updated = await courseModel.updateOne(
            {id: courseId},
            {$push: {modules: module}}
        )

        if(updated.modifiedCount === 0){
            return res.status(400).json({message: "Course not found or Module not added"})
        }
        res.status(201).json({message: "Module added", module})
    }
    catch(err){
        res.status(500).json({message: "Server Error: ", err})
    }
}

const addLesson = async(req, res)=>{
    try{
        const { courseId, moduleId } = req.params;
        const {id, title, duration} = req.body;
        const lesson = {
            id,
            title,
            duration
        }
        const course = await courseModel.findOne({id: courseId});
        if(!course){
            return res.status(400).json({message: "Course not found"})
        }
        const module = course.modules.find((mod) => mod.id == moduleId);
        if(!module){
            return res.status(400).json({message: "Module not found"})
        }
        module.lessons.push(lesson)
        await course.save();
        res.status(201).json({message: "Lesson added successfully", lesson})
    }
    catch(err){
        res.status(500).json({message: "Server Error: ", err})
    }
}

const updateLesson = async(req,res)=>{
    try{
        const { courseId, lessonId } = req.params;
        const { url } = req.body;
        const course = await courseModel.findOne({id: courseId})
        if(!course){
            return res.status(400).json({message: "Course not found"})
        }
        
        let lessonFound = null;

        for(const module of course.modules){
            const lesson = module.lessons.find((lesson) => lesson.id == lessonId)
            if(lesson){
                lesson.url = url;
                lessonFound = lesson
                break
            }
        }
        
        if(!lessonFound){
            return res.status(400).json({message: "Lesson not found"})
        }
        await course.save()
        res.status(200).json({ message: "Lesson url updated!", lesson: lessonFound})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "Server Error", error: err.message})
    }
}

const getLesson = async(req, res)=>{
    try{
        const { courseId, lessonId } = req.params;
        const course = await courseModel.findOne({id: courseId})
        if(!course){
            return res.status(400).json({message: "Course not found"})
        }
        let lessonFound = null;

        for(const module of course.modules){
            const lesson = module.lessons.find((lesson) => lesson.id == lessonId)
            if(lesson){
                lessonFound = lesson
                break
            }
        }

        if(!lessonFound){
            return res.status(400).json({message: "Lesson not found"})
        }

        res.status(200).json({ message: "Lesson Found!", lesson: lessonFound })
    }
    catch(err){
        res.status(500).json({ message: "Server Error", error: err.message })
    }
}

module.exports = {
    addCourseController,
    showAllCourses,
    addResource,
    addModule,
    addLesson,
    showCourse,
    showMyCourse,
    updateLesson,
    getLesson
};