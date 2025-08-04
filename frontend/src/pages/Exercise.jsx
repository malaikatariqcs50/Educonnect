import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { motion } from "framer-motion";
import api from '../axios.jsx'

const Exercise = () => {
  const { courseId, exerciseId } = useParams();
  const [exercise, setExercise] = useState(null); 
  const [completedExercises, setCompletedExercises] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchExercise = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/get-exercise/${courseId}/${exerciseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setExercise(response.data.exercise); 
        }
      } catch (err) {
        console.error("Error fetching exercise:", err);
      }
    };
    
    fetchExercise();
  }, [courseId, exerciseId]);

    useEffect(() => {
      const userProgress = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/show-user-progress/${user._id}`
          );
          if (response.status === 200) {
            const data = response.data;
            setCompletedExercises(data.userProgress.completedExercises);
          }
        } catch (err) {
          console.log("Error fetching completed Lessons", err);
        }
      };
      userProgress();
    }, [courseId, exerciseId]);

  const handleOptionSelect = (questionId, optionIndex) => {
    if (!submitted) {
      setSelectedOptions({
        ...selectedOptions,
        [questionId]: optionIndex,
      });
    }
  };

  const handleSubmit = () => {
    if (!exercise) return;
    
    let correctAnswers = 0;
    exercise.questions.forEach((question) => {
      if (selectedOptions[question.id] === question.correctOption) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setSubmitted(true);
  };

  useEffect(() => {
  if (submitted && score === 10) {
    completeExercise();
  }
}, [submitted, score]);

  
  if (!exercise) {
    return <div className="p-6 bg-white rounded-xl shadow-md">Loading exercise...</div>;
  }

    const completeExercise = async () => {
    try {
      await api.put(`/complete-exercise/${exerciseId}`, {userId: user._id}
      );
    } catch (err) {
      console.error('Full error:', err);
    }
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
    {/* Animated Hero Section */}
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="text-5xl font-extrabold text-indigo-900 mb-4">
            {exercise.title}
          </h1>
          <p className="text-xl text-indigo-700 max-w-2xl mx-auto">
            Let's test what you've learned! Each correct answer brings you closer to mastery.
          </p>
        </motion.div>
        
        {/* Floating animated shapes */}
        <motion.div 
          animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-10 left-1/4 w-16 h-16 rounded-full bg-indigo-200 opacity-40"
        />
        <motion.div 
          animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-10 right-1/4 w-24 h-24 rounded-full bg-purple-200 opacity-30"
        />
      </div>
    </div>

    {/* Questions Section */}
    <div className="max-w-3xl mx-auto px-6 pb-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-8"
      >
        {exercise.questions.map((question, qIndex) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * qIndex }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
          >
            <div className="flex items-start mb-6">
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center mr-4 shadow-md">
                {qIndex + 1}
              </span>
              <h3 className="text-xl font-semibold text-gray-800 mt-1">{question.question}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-14">
              {question.options.map((option, index) => {
                const isSelected = selectedOptions[question.id] === index;
                const isCorrect = index === question.correctOption;
                const showCorrect = submitted && isCorrect;
                const showIncorrect = submitted && isSelected && !isCorrect;

                return (
                  <motion.div
                    key={index}
                    whileHover={!submitted ? { scale: 1.02 } : {}}
                    className={`p-5 rounded-xl border-2 cursor-pointer transition-all
                      ${isSelected ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}
                      ${showCorrect ? '!border-green-500 !bg-green-50 shadow-green-100' : ''}
                      ${showIncorrect ? '!border-red-400 !bg-red-50' : ''}
                      ${!submitted ? 'hover:border-indigo-300 hover:bg-indigo-50' : ''}`}
                    onClick={() => !submitted && handleOptionSelect(question.id, index)}
                  >
                    <div className="flex items-center">
                      <span className={`font-bold mr-3 ${
                        showCorrect ? 'text-green-600' : 
                        showIncorrect ? 'text-red-600' : 'text-indigo-600'
                      }`}>
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <span className="text-gray-800">{option}</span>
                      {showCorrect && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto text-green-500"
                        >
                          ✓
                        </motion.span>
                      )}
                      {showIncorrect && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto text-red-500"
                        >
                          ✕
                        </motion.span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Results & Submit Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`mt-12 p-8 rounded-2xl shadow-lg ${
          submitted ? (score === exercise.questions.length ? 'bg-gradient-to-r from-green-50 to-emerald-50' : 'bg-gradient-to-r from-indigo-50 to-purple-50') : 'bg-white'
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          {submitted ? (
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h2 className={`text-3xl font-bold ${
                score === exercise.questions.length ? 'text-green-600' : 'text-indigo-700'
              }`}>
                {score === exercise.questions.length ? 'Perfect Score!' : 'Quiz Completed!'}
              </h2>
              <p className="text-xl mt-2 text-gray-700">
                You scored <span className={`font-bold ${
                  score === exercise.questions.length ? 'text-green-600' :
                  score >= exercise.questions.length * 0.7 ? 'text-blue-600' :
                  'text-orange-500'
                }`}>
                  {score}/{exercise.questions.length}
                </span>
              </p>
              {score !== exercise.questions.length && (
                <p className="text-gray-600 mt-2">
                  {score >= exercise.questions.length * 0.7 
                    ? 'Great job! Almost perfect!' 
                    : score >= exercise.questions.length * 0.5 
                      ? 'Good effort! Keep practicing!' 
                      : 'Review the material and try again!'}
                </p>
              )}
            </div>
          ) : (
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-semibold text-indigo-700">
                {Object.keys(selectedOptions).length === exercise.questions.length 
                  ? 'Ready to submit?' 
                  : `${exercise.questions.length - Object.keys(selectedOptions).length} questions remaining`}
              </h3>
            </div>
          )}

          <motion.button
            whileHover={!submitted ? { scale: 1.05 } : {}}
            whileTap={!submitted ? { scale: 0.95 } : {}}
             onClick={handleSubmit}
            disabled={!submitted && Object.keys(selectedOptions).length !== exercise.questions.length}
            className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all ${
              submitted 
                ? score === exercise.questions.length 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-indigo-600 hover:bg-indigo-700'
                : Object.keys(selectedOptions).length === exercise.questions.length 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700' 
                  : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {submitted 
              ? score === exercise.questions.length 
                ? 'Perfect! 🎉' 
                : 'Try Again 🔄'
              : 'Submit Answers'}
          </motion.button>
          
        </div>

        {submitted && score !== exercise.questions.length && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
          </motion.div>
        )}
      </motion.div>
    </div>
  </div>
);
};

export default Exercise;