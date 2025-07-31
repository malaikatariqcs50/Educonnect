import { useState, useEffect, useContext } from 'react';
import { FiBook, FiVideo, FiAward, FiClock, FiUser, FiBarChart2, FiMessageSquare, FiBookmark, FiChevronDown, FiMail } from 'react-icons/fi';
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import pythonCourseThumbnail from '../assets/pythonThumbnail.jpg'
import courseThumbnail from '../assets/thumbnail.jpg'
import { CourseDataContext } from '../context/CourseContext';
import CourseProgress from '../components/CourseProgress';

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
  const navigate = useNavigate();

  const {course, setCourse} = useContext(CourseDataContext);

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login")
    }
    
    const fetchCourse = async()=>{
      try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/my-course`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        setCourse(response.data.course);
      }
      catch(err){
        console.error('Failed to fetch course ', err)
      }
      finally{
        setLoading(false);
      }
    }

    const fetchUserProgress = async() => {
      try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/show-user-progress/688b0608c1d38b36faf39965`)
        if(response.status == 200){
          const data = response.data;
          setUserProgress(data.userProgress)
          setProgressPercentage(CourseProgress(course, data.userProgress))
        }
      }
      catch(err){
        console.log("Error fetching progress ", err)
      }
    }
    fetchCourse();
    fetchUserProgress();
  }, [navigate])

  const completedLessons = course?.modules
    ?.reduce((acc, module) => acc.concat(module?.lessons || []), [])
    ?.filter(lesson => lesson?.completed)
    ?.length || 0;
  
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
          className="bg-white shadow-sm sticky top-0 z-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <FiBook className="h-6 w-6 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">EduConnect</span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/dashboard" className="text-gray-500 hover:text-indigo-600">Dashboard</Link>
                <Link to="/courses" className="text-gray-500 hover:text-indigo-600">My Courses</Link>
                <Link to="/resources" className="text-gray-500 hover:text-indigo-600">Resources</Link>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">John Doe</span>
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <FiUser className="text-indigo-600" />
                  </div>
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
                    src={course.category=="Programming"? pythonCourseThumbnail:courseThumbnail} 
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
                      {completedLessons} of {totalLessons} lessons completed
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
                <h2 className="px-6 py-4 text-xl font-bold text-gray-900 border-b border-gray-200">
                  Course Content
                </h2>
                
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
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 ${module.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {module.completed ? (
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-xs font-medium">{module.id}</span>
                          )}
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
                                to={`/course/${course.id}/lesson/${lesson.id}`}
                                className={`flex items-center px-4 py-3 rounded-md ${lesson.completed ? 'bg-green-50 text-green-800' : 'hover:bg-gray-50'}`}
                                onMouseEnter={() => setIsHovered(lesson.id)}
                                onMouseLeave={() => setIsHovered(null)}
                              >
                                <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600 mr-3">
                                  {lesson.type === 'video' ? (
                                    <FiVideo className="h-4 w-4" />
                                  ) : lesson.type === 'interactive' ? (
                                    <FiMessageSquare className="h-4 w-4" />
                                  ) : (
                                    <FiBook className="h-4 w-4" />
                                  )}
                                </div>
                                <div className="flex-grow">
                                  <p className={`text-sm font-medium ${lesson.completed ? 'text-green-800' : 'text-gray-900'}`}>
                                    {lesson.title}
                                  </p>
                                  <p className="text-xs text-gray-500">{lesson.duration}</p>
                                </div>
                                {lesson.completed && (
                                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </m.div>
                    )}
                  </m.div>
                ))}
              </m.div>

              {/* Resources Section */}
              <m.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="mt-8 bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <h2 className="px-6 py-4 text-xl font-bold text-gray-900 border-b border-gray-200">
                  Resources
                </h2>
                <div className="divide-y divide-gray-200">
                  {course?.resources?.map((resource) => (
                    <m.div 
                      key={resource.id}
                      variants={item}
                      className="px-6 py-4 hover:bg-gray-50"
                      onMouseEnter={() => setIsHovered(`resource-${resource.id}`)}
                      onMouseLeave={() => setIsHovered(null)}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 mr-4">
                          <FiBookmark className="h-5 w-5" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-sm font-medium text-gray-900">{resource.title}</h3>
                          <p className="text-xs text-gray-500 capitalize"> downloads</p>
                        </div>
                        <m.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1 text-xs font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                        >
                          Download
                        </m.button>
                      </div>
                    </m.div>
                  ))}
                </div>
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
                  Course Completion
                </h2>
                <div className="p-6">
                  <div className="relative h-4 w-full bg-gray-200 rounded-full mb-4">
                    <m.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${course?.progress}%` }}
                      transition={{ duration: 1 }}
                      className="absolute h-4 bg-indigo-600 rounded-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-6">
                    <span>{course?.progress}% Complete</span>
                    <span>{completedLessons}/{totalLessons} Lessons</span>
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
        <m.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gray-800 text-gray-300"
        >
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-white text-sm font-semibold tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white text-sm font-semibold tracking-wider uppercase">Resources</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link to="/resources" className="hover:text-white transition-colors">Help Center</Link></li>
                  <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white text-sm font-semibold tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white text-sm font-semibold tracking-wider uppercase">Connect</h3>
                <div className="mt-4 flex space-x-6">
                  <a href="#" className="hover:text-white transition-colors">
                    <span className="sr-only">Facebook</span>
                    <FiMail className="h-6 w-6" />
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    <span className="sr-only">Twitter</span>
                    <FiMail className="h-6 w-6" />
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    <span className="sr-only">Instagram</span>
                    <FiMail className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-12 border-t border-gray-700 pt-8">
              <p className="text-base text-gray-400 text-center">
                &copy; {new Date().getFullYear()} EduConnect. All rights reserved.
              </p>
            </div>
          </div>
        </m.footer>
      </div>
    </LazyMotion>
  );
};

export default Dashboard;
