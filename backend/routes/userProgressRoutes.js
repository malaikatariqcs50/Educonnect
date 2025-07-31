const express = require('express');
const {completeLesson, showAlluserProgress, showUserProgress} = require('../controllers/user-progress-controller')
const router = express.Router()

router.put('/complete-lesson/:lessonId', completeLesson)
router.get('/show-all-user-progress', showAlluserProgress)
router.get('/show-user-progress/:userId', showUserProgress)

module.exports = router;