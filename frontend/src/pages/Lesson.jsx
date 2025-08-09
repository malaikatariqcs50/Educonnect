import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const LessonPage = () => {
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchLesson = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/get-lesson/${courseId}/${lessonId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setLesson(response.data.lesson);
        }
      } catch (err) {
        console.error("Error fetching lesson:", err);
      }
    };

    fetchLesson();
  }, [courseId, lessonId]);

  useEffect(() => {
    const userProgress = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/show-user-progress/${user._id}`
        );
        if (response.status === 200) {
          const data = response.data;
          setCompletedLessons(data.userProgress.completedLessons);
        }
      } catch (err) {
        console.log("Error fetching completed Lessons", err);
      }
    };
    userProgress();
  }, [courseId, lessonId]);

  const isCompleted = completedLessons?.some(l => l.lessonId == lessonId) || false;

  const completeLesson = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/complete-lesson/${lessonId}`,
        { userId: user._id }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const uncompleteLesson = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/uncomplete-lesson/${lessonId}`,
        { userId: user._id }
      );
      const button = document.querySelector('button')
      button.innerHTML = 'Completed'
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      {!lesson ? (
        <p>Loading......</p>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-2 text-indigo-700">
            {lesson.title}
          </h2>
          <p className="text-sm text-gray-500 mb-4 flex items-center">
            <span className="mr-2 bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
              Python
            </span>
            <span className="text-gray-400">{lesson.duration}</span>
          </p>
          <iframe
            src={lesson.url.replace("/view", "/preview")}
            width="100%"
            height="480"
            allowFullScreen
            className="rounded-lg border border-gray-200 shadow-sm hover:border-indigo-300 transition-colors duration-300"
          />
          <div className="mt-4 flex justify-end">
            <Link to={isCompleted? `` : '/'}>
              <button
                onClick={isCompleted? uncompleteLesson : completeLesson}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                {isCompleted ? "Reset" : "Completed"}
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default LessonPage;
