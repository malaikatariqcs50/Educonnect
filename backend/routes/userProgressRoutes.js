const express = require('express');
const {completeLesson, addUserProgress, showAlluserProgress, showUserProgress} = require('../controllers/user-progress-controller')
const router = express.Router()

router.put('/complete-lesson/:lessonId', completeLesson)
router.post('/add-user-progress', addUserProgress)
router.get('/show-all-user-progress', showAlluserProgress)
router.get('/show-user-progress/:userId', showUserProgress)

module.exports = router;