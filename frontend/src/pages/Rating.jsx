import { useState, useEffect, useContext } from 'react';
import { StarIcon, ThumbUpIcon, ThumbDownIcon, ChevronDownIcon, FilterIcon } from '@heroicons/react/solid';
import {m} from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import api from '../axios.jsx'
import { UserDataContext } from '../context/UserContext';
import certificate from '../assets/certificate.jpg'

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [sortBy, setSortBy] = useState('mostHelpful');
  const { user } = useContext(UserDataContext)
  const [loading, setLoading] = useState(true);
  const [noOfReviews, setNoOfReviews] = useState(0)

  const navigate = useNavigate()
  const token = localStorage.getItem("token");
    if(!token){
      navigate("/login")
    }

    //fetch Reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get('/fetch-all-reviews');
        setReviews(response.data);
        setNoOfReviews(response.data.length)
      } catch (err) {
        console.error("Failed to fetch reviews:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const postReview = async()=>{
      try{
        const newReview = ({
          userId: user._id,
          fullName: user.fullName,
          stars: rating,
          review
        })
        api.post("/add-review", newReview, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      }
      catch(error){
        console.log("Error posting review", error)
      }
    }

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) 
    : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return;
    
    const newReview = {
      id: reviews.length + 1,
      user,
      rating,
      review,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      dislikes: 0,
      helpful: false
    };
    
    setReviews([newReview, ...reviews]);
    setRating(0);
    setReview('');
  };

const handleLike = async (id) => {
  try {
    const review = reviews.find(r => r._id === id);
    const hasLiked = review?.likedBy?.includes(user?._id);
    
    // Optimistic update
    setReviews(reviews.map(r => {
      if (r._id !== id) return r;
      
      if (hasLiked) {
        // Unlike
        return { 
          ...r, 
          likes: r.likes - 1, 
          likedBy: r.likedBy.filter(userId => userId !== user._id) 
        };
      } else {
        // Like
        return { 
          ...r, 
          likes: r.likes + 1, 
          likedBy: [...(r.likedBy || []), user._id],
          // Remove from dislikes if they had disliked before
          dislikes: r.dislikedBy?.includes(user._id) ? r.dislikes - 1 : r.dislikes,
          dislikedBy: r.dislikedBy?.filter(userId => userId !== user._id)
        };
      }
    }));

    // API call after UI update
    const endpoint = hasLiked ? `/unlike-review/${id}` : `/like-review/${id}`;
    await api.post(endpoint, null, {
      headers: { Authorization: `Bearer ${token}` }
    });

  } catch (err) {
    console.error("Like action failed", err.message);
    // Revert optimistic update on error
    setReviews(reviews); // Reset to original state
  }
};

const handleDislike = async (id) => {
  try {
    const review = reviews.find(r => r._id === id);
    const hasDisliked = review?.dislikedBy?.includes(user?._id);
    
    // Optimistic update
    setReviews(reviews.map(r => {
      if (r._id !== id) return r;
      
      if (hasDisliked) {
        // Undislike
        return { 
          ...r, 
          dislikes: r.dislikes - 1, 
          dislikedBy: r.dislikedBy.filter(userId => userId !== user._id) 
        };
      } else {
        // Dislike
        return { 
          ...r, 
          dislikes: r.dislikes + 1, 
          dislikedBy: [...(r.dislikedBy || []), user._id],
          // Remove from likes if they had liked before
          likes: r.likedBy?.includes(user._id) ? r.likes - 1 : r.likes,
          likedBy: r.likedBy?.filter(userId => userId !== user._id)
        };
      }
    }));

    // API call after UI update
    const endpoint = hasDisliked ? `/undislike-review/${id}` : `/dislike-review/${id}`;
    await api.post(endpoint, null, {
      headers: { Authorization: `Bearer ${token}` }
    });

  } catch (err) {
    console.error("Dislike action failed", err.message);
    // Revert optimistic update on error
    setReviews(reviews); // Reset to original state
  }
};

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'mostHelpful') return (b.likes - b.dislikes) - (a.likes - a.dislikes);
    if (sortBy === 'recent') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'highest') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      {/* Average Rating Section */}
      <div className="text-center mb-8 p-6 bg-indigo-600 rounded-lg">
        <h2 className="text-3xl font-bold text-white mb-2">Course Rating</h2>
        <div className="flex justify-center items-center mb-2">
          <span className="text-5xl font-bold text-white mr-2">0.0{averageRating}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <StarIcon 
                key={i}
                className={`h-8 w-8 ${i < Math.round(averageRating) ? 'text-yellow-300' : 'text-gray-400'}`}
              />
            ))}
          </div>
        </div>
        <p className="text-white">{noOfReviews} reviews</p>
      </div>

      {/* Leave a Review Section */}
      <div className="mb-10 p-6 border border-gray-200 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Leave a Review</h3>
        <form onSubmit={handleSubmit}>
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => {
              const ratingValue = i + 1;
              return (
                <button
                  type="button"
                  key={ratingValue}
                  className="focus:outline-none"
                  onClick={() => setRating(ratingValue)}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                >
                  <StarIcon
                    className={`h-8 w-8 ${ratingValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                </button>
              );
            })}
          </div>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows="4"
            placeholder="Share your thoughts about this course (optional)"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <button
            onClick={postReview}
            type="submit"
            disabled={rating === 0}
            className={`mt-4 px-6 py-2 rounded-lg font-medium ${rating === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} text-white transition-colors`}
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* Reviews Filter */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Reviews</h3>
        <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="mostHelpful">Most Helpful</option>
            <option value="recent">Most Recent</option>
            <option value="highest">Highest Rated</option>
          </select>
          <ChevronDownIcon className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map((item, index) => (
          <div key={index} className="p-5 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
            <div className="flex items-start">
              <img 
                src={certificate}
                className="h-10 w-10 rounded-full object-cover mr-3"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{item.fullName}</h4>
                    <div className="flex items-center mt-1">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${i < item.stars ? 'text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {item.helpful && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Helpful</span>
                  )}
                </div>
                {item.review && (
                  <p className="mt-3 text-gray-700">{item.review}</p>
                )}
                <div className="flex items-center mt-4 space-x-4">
                  <button 
                    onClick={() => handleLike(item._id)}
                    className={`flex items-center ${item.likedBy?.includes(user?._id) ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
                    disabled={!user} // Disable if not logged in
                  >
                    <ThumbUpIcon className="h-4 w-4 mr-1" />
                    <span>{item.likes}</span>
                  </button>

                  <button 
                    onClick={() => handleDislike(item._id)}
                    className={`flex items-center ${item.dislikedBy?.includes(user?._id) ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
                    disabled={!user} // Disable if not logged in
                  >
                    <ThumbDownIcon className="h-4 w-4 mr-1" />
                    <span>{item.dislikes}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rating;