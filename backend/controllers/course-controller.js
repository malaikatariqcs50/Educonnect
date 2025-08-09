const courseModel = require("../models/course");
const mongoose = require('mongoose')

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
        const {id, title, url} = req.body;
        const resource = {
            id,
            title,
            url
        }
        const updated = await courseModel.updateOne(
            {_id: courseId},
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

const addExercise = async (req, res) => {
  try {
    const { courseId, moduleId } = req.params;
    const newExercise = req.body;

    if (
      !newExercise.title ||
      !Array.isArray(newExercise.questions) ||
      newExercise.questions.length === 0
    ) {
      return res.status(400).json({ message: "Invalid exercise structure" });
    }

    // Find course
    const course = await courseModel.findOne({ id: courseId });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Find module
    const module = course.modules.find((mod) => mod.id == moduleId);
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    // Add exercise
    if (!module.exercises) module.exercises = [];
    module.exercises.push(newExercise);

    await course.save();

    res.status(201).json({
      message: "Exercise added successfully",
      exerciseTitle: newExercise.title,
    });
  } catch (err) {
    console.error("Error adding exercise:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const removeExercises = async (req, res) => {
  try {
    const { courseId, moduleId } = req.params;

    const course = await courseModel.findOne({ id: courseId });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const module = course.modules.find((mod) => mod.id == moduleId);
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    module.exercises = []; // Clear all exercises
    await course.save();

    res.status(200).json({ message: "All exercises removed successfully" });
  } catch (err) {
    console.error("Error removing exercises:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



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

const getExercise = async(req, res) => {
    try{
        const { courseId, exerciseId } = req.params;
        const course = await courseModel.findOne({id: courseId})
        if(!course){
            return res.status(400).json({message: "Course not found"})
        }
        let exerciseFound = null;

        for(const module of course.modules){
            const exercise = module.exercises.find((exercise) => exercise.id == exerciseId)
            if(exercise){
                exerciseFound = exercise
                break
            }
        }

        if(!exerciseFound){
            return res.status(400).json({message: "Exercise not found"})
        }

        res.status(200).json({ message: "Exercise Found!", exercise: exerciseFound })
    }
    catch(err){
        res.status(500).json({ message: "Server Error", error: err.message })
    }
}

const addThumbnail = async(req, res) => {
    try{
        const id = req.params.id;
        const {thumbnail} = req.body;

        const course = await courseModel.findOne({id})
        if(!course){
            return res.status(400).json({message: "Course not found"})
        }

        course.thumbnail = thumbnail;
        await course.save();
        res.status(200).json({ message: "Thumbnail added ", thumbnail})
    }
    catch(err){
        res.status(500).json({ message: "Server Error", err })
    }
}

const addPQuestions = async(req, res)=>{
    try {
        const { courseId, moduleId } = req.params;
        const {practiceQuestions} = req.body;

        // Find course
        const course = await courseModel.findOne({ id: courseId });
        if (!course) {
        return res.status(404).json({ message: "Course not found" });
        }

        // Find module
        const module = course.modules.find((mod) => mod.id == moduleId);
        if (!module) {
        return res.status(404).json({ message: "Module not found" });
        }

        // Add practice ques
        if (!module.practiceQuestions) module.practiceQuestions = [];
        module.practiceQuestions = practiceQuestions;

        await course.save();

        res.status(201).json({
        message: "Practice Questions added successfully",
        practiceQuestions
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

const updateRating = async(req, res) => {
    try{
        const courseName = req.params.courseName;
        const {rating} = req.body;
        const course = await courseModel.findOne({title: courseName})
        course.rating = rating;
        await course.save();
        res.status(200).json({message: "Course rating updated!", course})
    }
    catch(error){
        res.status(500).json({message: "Internal Server Error"})
    }

}

const deleteResource = async(req, res)=>{
    try {
        const { courseId, resourceId } = req.params;

        // Validate ObjectIds
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ message: "Invalid courseId" });
        }
        if (!mongoose.Types.ObjectId.isValid(resourceId)) {
            return res.status(400).json({ message: "Invalid resourceId" });
        }

        const updated = await courseModel.updateOne(
            { _id: courseId },
            { $pull: { resources: { _id: resourceId } } }
        );

        if (updated.modifiedCount === 0) {
            return res.status(404).json({ message: "Course or resource not found" });
        }

        res.status(200).json({ message: "Resource deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
}

const getResources = async(req, res) => {
    try{
        const id = req.params.id;
        const course = await courseModel.findById(id);
        if(!course){
            return res.status(404).json({message: "Course not found"})
        }
        res.status(200).json({message: "Course resources fetched", resources: course.resources})
    }
    catch(err){
        res.status(500).json({message: "Internal Server Error", error: err.message})
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
    getLesson,
    addExercise,
    removeExercises,
    getExercise,
    addThumbnail,
    addPQuestions,
    updateRating,
    deleteResource,
    getResources
};