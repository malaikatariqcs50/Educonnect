const express = require('express');
const router = express.Router();
const userAuth = require('../middlewares/authMiddleware')
const {
  addReviewController,
  fetchReviewById,
  fetchAllReviews,
  updateReviewById,
  likeReviewById,
  dislikeReviewById,
  markReviewHelpful,
  unlikeReviewById,
  undislikeReviewById
} = require('../controllers/review-controller');

// Add review
router.post('/add-review', userAuth, addReviewController);

// Get one review
router.get('/fetch-review/:id', fetchReviewById);

// Get all reviews
router.get('/fetch-all-reviews', fetchAllReviews);

// Update a review
router.put('/update-review/:id', userAuth, updateReviewById);

// Like a review
router.post('/like-review/:id', userAuth, likeReviewById);

// Dislike a review
router.post('/dislike-review/:id', userAuth, dislikeReviewById);

// Mark as helpful
router.post('/helpful-review/:id', userAuth, markReviewHelpful);

router.post('/unlike-review/:id', userAuth, unlikeReviewById )
router.post('/undislike-review/:id', userAuth, undislikeReviewById )

module.exports = router;