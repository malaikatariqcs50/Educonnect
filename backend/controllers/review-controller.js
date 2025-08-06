const reviewModel = require('../models/review');
const userModel = require('../models/user');

// Add review
const addReviewController = async (req, res) => {
  try {
    const { userId, stars, review } = req.body;

    const user = await userModel.findById(userId);
    const newReview = new reviewModel({
      userId,
      userAvatar: user.avatar,
      fullName: user.fullName,
      stars,
      review
    });

    await newReview.save();
    //await courseModel.updateOne({title: courseName}, {$inc: {enrolled: 1}});
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
    const userId = req.user._id; // Assuming you have user authentication and the user ID is available
    const reviewId = req.params.id;

    // First, check if the user has already liked this review
    const alreadyLiked = await reviewModel.findOne({
      _id: reviewId,
      likedBy: userId
    });

    if (alreadyLiked) {
      return res.status(400).json({ message: "You have already liked this review" });
    }

    // If not liked yet, update the review
    const review = await reviewModel.findByIdAndUpdate(
      reviewId,
      { 
        $inc: { likes: 1 },
        $push: { likedBy: userId }
      },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Liked review", review });
  } catch (err) {
    res.status(500).json({ message: "Like failed", error: err.message });
  }
};

const unlikeReviewById = async (req, res) => {
  try {
    const userId = req.user._id;
    const reviewId = req.params.id;

    // Check if the user has liked this review
    const review = await reviewModel.findOne({
      _id: reviewId,
      likedBy: userId
    });

    if (!review) {
      return res.status(400).json({ message: "You have not liked this review yet" });
    }

    // Update: decrease like count and remove user from likedBy
    const updatedReview = await reviewModel.findByIdAndUpdate(
      reviewId,
      {
        $inc: { likes: -1 },
        $pull: { likedBy: userId }
      },
      { new: true }
    );

    res.status(200).json({ message: "Unliked review", review: updatedReview });
  } catch (err) {
    res.status(500).json({ message: "Unlike failed", error: err.message });
  }
};


// Dislike a review
const dislikeReviewById = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user is authenticated
    const reviewId = req.params.id;

    // Check if user already disliked this review
    const alreadyDisliked = await reviewModel.findOne({
      _id: reviewId,
      dislikedBy: userId
    });

    if (alreadyDisliked) {
      return res.status(400).json({ message: "You have already disliked this review" });
    }

    // Check if user had liked before (to remove like)
    const hadLiked = await reviewModel.findOne({
      _id: reviewId,
      likedBy: userId
    });

    const update = {
      $inc: { dislikes: 1 },
      $push: { dislikedBy: userId }
    };

    if (hadLiked) {
      update.$inc.likes = -1;
      update.$pull = { likedBy: userId };
    }

    const review = await reviewModel.findByIdAndUpdate(
      reviewId,
      update,
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Disliked review", review });
  } catch (err) {
    res.status(500).json({ message: "Dislike failed", error: err.message });
  }
};

const undislikeReviewById = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user is authenticated
    const reviewId = req.params.id;

    // Check if user actually disliked this review
    const hadDisliked = await reviewModel.findOne({
      _id: reviewId,
      dislikedBy: userId
    });

    if (!hadDisliked) {
      return res.status(400).json({ message: "You haven't disliked this review" });
    }

    const review = await reviewModel.findByIdAndUpdate(
      reviewId,
      {
        $inc: { dislikes: -1 },
        $pull: { dislikedBy: userId }
      },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Removed dislike from review", review });
  } catch (err) {
    res.status(500).json({ message: "Undislike failed", error: err.message });
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
  markReviewHelpful,
  unlikeReviewById,
  undislikeReviewById
};
