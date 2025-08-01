const express = require("express");
const router = express.Router();
const {addCourseController, showAllCourses, addResource, addModule, addLesson, showCourse, showMyCourse, updateLesson} = require("../controllers/course-controller");
const userAuth = require("../middlewares/authMiddleware");

router.post("/add-course", addCourseController);
router.get("/all-courses", showAllCourses);
router.post("/add-resource/:id", addResource);
router.post("/add-module/:id", addModule);
router.post("/add-lesson/:courseId/:moduleId", addLesson)
router.put("/update-lesson/:courseId/:lessonId", updateLesson)
router.get("/show-course/:title", showCourse)
router.get("/my-course", userAuth, showMyCourse)


module.exports = router;