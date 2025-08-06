const reviewModel = require('../models/review');

// Add review
const addReviewController = async (req, res) => {
  try {
    const { userId, fullName, stars, review } = req.body;
    //get avatar from userId
    const newReview = new reviewModel({
      userId,
      fullName,
      stars,
      review
    });

    await newReview.save();
    res.status(201).json({ message: "Review Created", review: newReview });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

// Fetch review by ID
const fetchReviewById = async (req, res) => {
  try {
    const review = await reviewModel.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: "Error fetching review", error: err.message });
  }
};

// Fetch all reviews
const fetchAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reviews", error: err.message });
  }
};

// Update a review
const updateReviewById = async (req, res) => {
  try {
    const { stars, review } = req.body;
    const updated = await reviewModel.findByIdAndUpdate(
      req.params.id,
      { stars, review },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Review not found" });
    res.status(200).json({ message: "Review updated", review: updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// Like a review
const likeReviewById = async (req, res) => {
  try {
    const review = await reviewModel.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json({ message: "Liked review", review });
  } catch (err) {
    res.status(500).json({ message: "Like failed", error: err.message });
  }
};

// Dislike a review
const dislikeReviewById = async (req, res) => {
  try {
    const review = await reviewModel.findByIdAndUpdate(
      req.params.id,
      { $inc: { dislikes: 1 } },
      { new: true }
    );
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json({ message: "Disliked review", review });
  } catch (err) {
    res.status(500).json({ message: "Dislike failed", error: err.message });
  }
};

// Mark as helpful
const markReviewHelpful = async (req, res) => {
  try {
    const review = await reviewModel.findByIdAndUpdate(
      req.params.id,
      { helpful: true },
      { new: true }
    );
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json({ message: "Marked as helpful", review });
  } catch (err) {
    res.status(500).json({ message: "Helpful mark failed", error: err.message });
  }
};

module.exports = {
  addReviewController,
  fetchReviewById,
  fetchAllReviews,
  updateReviewById,
  likeReviewById,
  dislikeReviewById,
  markReviewHelpful
};
