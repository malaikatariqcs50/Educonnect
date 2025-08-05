import { useState, useEffect, useContext, useRef } from 'react';
import { FiBook, FiVideo, FiAward, FiClock, FiUser, FiBarChart2, FiMessageSquare, FiBookmark, FiChevronDown, FiMail } from 'react-icons/fi';
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import pythonCourseThumbnail from '../assets/pythonThumbnail.jpg'
import courseThumbnail from '../assets/thumbnail.jpg'
import { CourseDataContext } from '../context/CourseContext';
import CourseProgress from '../components/CourseProgress';
import ExerciseProgress from '../components/ExerciseProgress.jsx';
import { UserDataContext } from '../context/UserContext';
import api from '../axios.jsx'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { NavLink } from "react-router-dom";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Dashboard = () => {
  const { courseId } = useParams();
  const [activeModule, setActiveModule] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(null);
  const [userProgress, setUserProgress] = useState('')
  const [progressPercentage, setProgressPercentage] = useState(0)
  const [completedLessons, setCompletedLessons ] = useState([])
  const [completedExercises, setCompletedExercises] = useState([])
  const navigate = useNavigate();
  const { user } = useContext(UserDataContext)
  const {course, setCourse} = useContext(CourseDataContext);
  const [clicked, setClicked] = useState(false)
  const [ exercisePercentage ,setExercisePercentage] = useState(0)
  const [ noOfCompletedExercises, setNoOfCompletedExercises ] = useState(0)
  const [ noOfModules, setNoOfModules ] = useState(0)
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login")
    }
    
    const fetchCourse = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/my-course`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const fetchedCourse = response.data.course;
    setCourse(fetchedCourse);

    const modulesLength = Array.isArray(fetchedCourse?.modules)
      ? fetchedCourse.modules.length
      : 0;

    setNoOfModules(modulesLength);
  } catch (err) {
    console.error('Failed to fetch course ', err);
  } finally {
    setLoading(false);
  }
};


    fetchCourse();
  }, [navigate])

  useEffect(() => {
    if (!user || !user._id || !course) return;

    const fetchUserProgress = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/show-user-progress/${user._id}`);
        if (response.status === 200) {
          const data = response.data;
          setUserProgress(data.userProgress);
          const progressPercentage = CourseProgress(course, data.userProgress);
          setProgressPercentage(progressPercentage);
          const ePercentage = ExerciseProgress(course, data.userProgress);
          setExercisePercentage(ePercentage);
          setCompletedLessons(Array.isArray(data.userProgress?.completedLessons)
          ? data.userProgress.completedLessons 
          : []);
          setCompletedExercises(Array.isArray(data.userProgress.completedExercises)?
          data.userProgress.completedExercises : [])
          setNoOfCompletedExercises(
  Array.isArray(data.userProgress.completedExercises)
    ? data.userProgress.completedExercises.map(e => e.exerciseId)
    : []
);

        }
      } catch (err) {
        console.log("Error fetching progress", err);
        setCompletedLessons([])
      }
    };

    fetchUserProgress();
  }, [user, course]);

  const restartLessons = async() => {
    try{
      await api.put(`/restart-lessons/${user._id}`)
      setProgressPercentage(0)
      setCompletedLessons([])
      setCompletedExercises([])
    }
    catch(error){
      console.log("Error restarting lessons")
    }
  }

  const totalLessons = course?.modules
    ?.reduce((acc, module) => acc.concat(module?.lessons || []), [])
    ?.length || 0;

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation - Same as your theme */}
        <m.nav 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-sm shadow-indigo-300 sticky top-0 z-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <FiBook className="h-6 w-6 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">EduConnect</span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/dashboard" className="relative text-gray-900 after:absolute after:left-0 after:bottom-0 after:h-[2px] 
                                after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 
                                hover:after:w-full hover:text-indigo-600">Dashboard</Link>
                <Link to="/courses" className="relative text-gray-500 after:absolute after:left-0 after:bottom-0 after:h-[2px] 
                                after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 
                                hover:after:w-full hover:text-indigo-600">Resources</Link>
                <Link to="/resources" className="relative text-gray-500 after:absolute after:left-0 after:bottom-0 after:h-[2px] 
                                after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 
                                hover:after:w-full hover:text-indigo-600">Rating</Link>
                <div className="relative" ref={dropdownRef}>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setOpen(!open)}
                      className="flex items-center justify-center"
                    >
                      <span className="text-gray-700 relative text-gray-500 after:absolute after:left-0 after:bottom-0 after:h-[2px] 
                                after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 
                                hover:after:w-full hover:text-indigo-600">{user.fullName}</span>
                      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center ml-2">
                        <FiUser className="text-indigo-600" />
                      </div>
                    </button>
                  </div>

                  {open && (
                    <div className="absolute right-0 z-50 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <Link
                          to="/Profile"
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/logout"
                          className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                        >
                          Logout
                        </Link>

                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </m.nav>

        {/* Course Header */}
        <m.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 lg:w-1/4">
                <m.div 
                  whileHover={{ scale: 1.02 }}
                  className="rounded-lg overflow-hidden shadow-md"
                >
                  <img 
                    src={course.category == "Programming"? pythonCourseThumbnail : courseThumbnail} 
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                </m.div>
              </div>
              <div className="md:w-2/3 lg:w-3/4">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                    {course?.category}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                    {course?.level}
                  </span>
                </div>
                <h1 className="mt-2 text-3xl font-bold text-gray-900">{course?.title}</h1>
                <p className="mt-2 text-gray-600">Instructor: {course?.instructor}</p>
                
                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Progress: {progressPercentage}%
                    </span>
                    <span className="text-xs text-gray-500">
                      {completedLessons.length}/{totalLessons} lessons completed
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <m.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1 }}
                      className="bg-indigo-600 h-2.5 rounded-full" 
                    />
                  </div>
                </div>
                
                {/* Stats */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center">
                    <FiClock className="h-5 w-5 text-indigo-600 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-medium">{course?.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FiUser className="h-5 w-5 text-indigo-600 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Enrolled</p>
                      <p className="font-medium">{course?.enrolled?.toLocaleString()?? '0'}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FiAward className="h-5 w-5 text-indigo-600 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Rating</p>
                      <p className="font-medium">{course?.rating}/5</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FiBarChart2 className="h-5 w-5 text-indigo-600 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Level</p>
                      <p className="font-medium">{course?.level}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </m.section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Course Content */}
            <div className="lg:w-2/3">
              <m.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="px-6 py-4 text-xl font-bold text-gray-900 border-b border-gray-200 flex justify-between">
                  <span>
                    Course Content
                  </span>
                  <button onClick={restartLessons} className="bg-indigo-600 text-white rounded-full px-3 py-0.5 font-medium">
                    Reset
                  </button>
                </div>
                
                {course?.modules?.map((module) => (
                  <m.div 
                    key={module.id}
                    variants={item}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    <button
                      onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                      className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 bg-gray-100 text-gray-800}`}>
                          
                            <span className="text-xs font-medium">{module.id}</span>
                        </div>
                        <h3 className="font-medium text-gray-900">{module.title}</h3>
                      </div>
                      <FiChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${activeModule === module.id ? 'transform rotate-180' : ''}`} />
                    </button>
                    
                    {activeModule === module.id && (
                      <m.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-4"
                      >
                        <ul className="space-y-2">
                          {module.lessons.map((lesson) => (
                            <li key={lesson.id}>
                              <Link
                                to={`/${course.id}/lesson/${lesson.id}`}
                                className={`flex items-center px-4 py-3 rounded-md ${
                                completedLessons.some(item => String(item.lessonId) === String(lesson.id))
                                ? 'bg-green-100 text-green-800'
                                : 'hover:bg-gray-50'
                                }`}
                                onMouseEnter={() => setIsHovered(lesson.id)}
                                onMouseLeave={() => setIsHovered(null)}
                              >
                                <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600 mr-3">
                                  
                                    <FiBook className="h-4 w-4" />
                                </div>
                                <div className="flex-grow">
                                  <p className={`text-sm font-medium ${completedLessons.some(item => String(item.lessonId) === String(lesson.id)) ? 'text-green-800' : 'text-gray-900'}`}>
                                    {lesson.title}
                                  </p>
                                  <p className="text-xs text-gray-500">{lesson.duration}</p>
                                </div>
                                {completedLessons.some(item => String(item.lessonId) === String(lesson.id)) && (
                                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </Link>
                            </li>
                          ))}
                          {module.exercises.map((exercise) => (
                            <li key={exercise.id}>
                              <Link
                                to={`/${course.id}/exercise/${exercise.id}`}
                                
                                className={`flex items-center px-4 py-3 rounded-md ${
                                completedExercises.some(item => String(item.exerciseId) === String(exercise.id))
                                ? 'bg-green-100 text-green-800'
                                : 'hover:bg-gray-50'
                                }`}
                                onMouseEnter={() => setIsHovered(exercise.id)}
                                onMouseLeave={() => setIsHovered(null)}
                              >
                                <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600 mr-3">
                                  
                                    <FiBook className="h-4 w-4" />
                                </div>
                                <div className="flex-grow">
                                  
                                  <p className={`text-sm font-medium ${completedExercises.some(item => String(item.exerciseId) === String(exercise.id)) ? 'text-green-800' : 'text-gray-900'}`}>
                                    Exercise
                                  </p>
                                  <p className="text-xs text-gray-500">10 questions</p>
                                </div>
                                {completedExercises.some(item => String(item.exerciseId) === String(exercise.id)) && (
                                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </Link>
                            </li>
                          ))}
                            <li>
                              <Link
                                to={module.practiceQuestions}
                                className={`flex items-center px-4 py-3 rounded-md hover:bg-gray-50`}
                              >
                                <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600 mr-3">
                                  <FiBook className="h-4 w-4" />
                                </div>
                                <div className="flex-grow">
                                  <p className="text-sm font-medium text-gray-900">
                                    Practice Questions
                                  </p>
                                  <p className="text-xs text-gray-500">5 questions</p>
                                </div>
                              </Link>
                            </li>
                          </ul>
                        </m.div>
                    )}
                  </m.div>
                ))}
              </m.div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Upcoming Deadlines */}
              <m.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden mb-8"
              >
                <h2 className="px-6 py-4 text-xl font-bold text-gray-900 border-b border-gray-200">
                  Upcoming Deadlines
                </h2>
                <div className="p-6">
                  <div className="flex items-start pb-4">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-red-100 text-red-600 mr-4">
                      <FiClock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Assignment 1 Due</h3>
                      <p className="text-xs text-gray-500">Tomorrow at 11:59 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start pt-4 border-t border-gray-200">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 mr-4">
                      <FiAward className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Midterm Project</h3>
                      <p className="text-xs text-gray-500">Due in 1 week</p>
                    </div>
                  </div>
                </div>
              </m.div>

              {/* Course Completion */}
              <m.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <h2 className="px-6 py-4 text-xl font-bold text-gray-900 border-b border-gray-200">
                  Exercise Completion
                </h2>
                <div className="p-6">
                  <div className="relative h-4 w-full bg-gray-200 rounded-full mb-4">
                    <m.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${exercisePercentage}%` }}
                      transition={{ duration: 1 }}
                      className="absolute h-4 bg-indigo-600 rounded-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-6">
                    <span>{exercisePercentage}% Complete</span>
                    <span>{noOfCompletedExercises.length}/{noOfModules} Exercises</span>
                  </div>
                  <m.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Continue Learning
                  </m.button>
                </div>
              </m.div>
            </div>
          </div>
        </div>

        {/* Footer - Same as your theme */}
        <Footer />
      </div>
    </LazyMotion>
  );
  
};

export default Dashboard;
