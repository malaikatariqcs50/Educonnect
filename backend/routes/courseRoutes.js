const express = require("express");
const router = express.Router();
const {addCourseController, showAllCourses, addResource, addPQuestions, removeExercises, addThumbnail, getExercise, addModule, addLesson, showCourse, showMyCourse, updateLesson, getLesson, addExercise} = require("../controllers/course-controller");
const userAuth = require("../middlewares/authMiddleware");

router.post("/add-course", addCourseController);
router.get("/all-courses", showAllCourses);
router.post("/add-resource/:id", addResource);
router.post("/add-module/:id", addModule);
router.post("/add-lesson/:courseId/:moduleId", addLesson)
router.put("/update-lesson/:courseId/:lessonId", updateLesson)
router.get("/show-course/:title", showCourse)
router.get("/my-course", userAuth, showMyCourse)
router.get("/get-lesson/:courseId/:lessonId", userAuth, getLesson)
router.get("/get-exercise/:courseId/:exerciseId", userAuth, getExercise)
router.post("/add-exercise/:courseId/:moduleId", addExercise)
router.put("/remove-exercises/:courseId/:moduleId", removeExercises)
router.put("/add-thumbnail/:id", addThumbnail)
router.put("/add-practice-questions/:courseId/:moduleId", addPQuestions)

module.exports = router;