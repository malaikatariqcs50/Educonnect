const express = require('express');
const completeLesson = require('../controllers/user_course_controller')
const router = express.Router()

router.put('/complete-lesson:id', completeLesson)

module.exports = router;