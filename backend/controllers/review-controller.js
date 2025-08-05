const reviewModel = require('../models/review');

const addReviewController = async(req, res) => {
    try{
        const { userId, fullName, stars, review } = req.body;
        //get avatar from userId
        const newReview = new reviewModel({
            userId,
            fullName,
            stars,
            review
        })

        await newReview.save();
        res.status(201).json({ message: "Review Created ", review: newReview})
    }
    catch(err){
        res.status(500).json({ message: "Internal Server Error: ", error: err.message })
    }
}

module.exports = {
    addReviewController
}