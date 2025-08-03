const express = require('express');
const {completeLesson, showAlluserProgress, showUserProgress, uncompleteLesson, restartLessons} = require('../controllers/user-progress-controller')
const router = express.Router()

router.put('/complete-lesson/:lessonId', completeLesson)
router.get('/show-all-user-progress', showAlluserProgress)
router.get('/show-user-progress/:userId', showUserProgress)
router.put('/uncomplete-lesson/:lessonId', uncompleteLesson)
router.put('/restart-lessons/:id', restartLessons)

module.exports = router;