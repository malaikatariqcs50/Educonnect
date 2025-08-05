const express = require('express');
const router = express.Router();
const userAuth = require('../middlewares/authMiddleware')
const { addReviewController } = require('../controllers/review-controller')

router.post("/add-review", userAuth, addReviewController);

module.exports = router;