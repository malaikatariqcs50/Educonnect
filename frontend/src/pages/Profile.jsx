import { FiUser, FiMail, FiAward, FiBook, FiClock, FiSettings, FiLogOut } from 'react-icons/fi';
import { LazyMotion, domAnimation, m } from "framer-motion";
import { UserDataContext } from '../context/UserContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/WhatsApp Image 2025-07-27 at 20.58.48_21328568.jpg'
import axios from 'axios';

const Profile = () => {

    const { user, setUser } = useContext(UserDataContext)
    console.log(user)
    const navigate = useNavigate()

    useEffect(() => {
      const token = localStorage.getItem("token");
      if(!token){
        navigate("/login")
      }

      const fetchProfile = async() => {
        try{
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/profile`,
            {
              headers:{
                Authorization: `Bearer ${token}`
              }
            }
          )
          if(response.status == 200){
            const data = response.data;
            setUser(data)
            console.log(user)
          }
        }
        catch(err){
          console.log("Error in profile.jsx ", err);
        }
      }

      fetchProfile()
    }, [navigate])
    
  // Animation variants
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

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-gray-50">

        {/* Navigation */}
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
              <div className="flex items-center space-x-4">
                <button className="p-1 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">
                  <FiSettings className="h-5 w-5" />
                </button>
                <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-indigo-100">
                  <img src={avatar} alt="Profile" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </m.nav>

        {/* Profile Header */}
        <m.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <m.div
                whileHover={{ scale: 1.05 }}
                className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-indigo-100 shadow-md"
              >
                <img src={avatar} alt={user.fullName} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-indigo-500 bg-opacity-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <FiUser className="h-8 w-8 text-white" />
                </div>
              </m.div>
              
              <div className="flex-1 text-center md:text-left">
                <m.h1 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold text-gray-900"
                >
                  {user.fullName}
                </m.h1>
                <m.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-center md:justify-start mt-2 text-gray-600"
                >
                  <FiMail className="mr-2 text-indigo-500" />
                  {user.email}
                </m.div>
              </div>
            </div>
          </div>
        </m.section>

        {/* Stats Section */}
        <m.section 
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <m.div 
              variants={item}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
                  <FiBook className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Enrolled Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{user.courseName}</p>
                </div>
              </div>
            </m.div>
            
            <m.div 
              variants={item}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                  <FiAward className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed Lessons</p>
                  <p className="text-2xl font-bold text-gray-900">{/*{user.completedLessons}*/}Here</p>
                </div>
              </div>
            </m.div>
            
            <m.div 
              variants={item}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                  <FiClock className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Hours Learned</p>
                  <p className="text-2xl font-bold text-gray-900">{/*{user.hoursLearned}*/} Here </p>
                </div>
              </div>
            </m.div>
          </div>
        </m.section>

        {/* Achievements Section */}
        <m.section 
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Achievements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/*{user.achievements.map((achievement) => (
            {user.courseName.map((achievement) => (
              <m.div
                key={achievement.id}
                variants={item}
                whileHover={{ y: -5 }}
                className="bg-white p-4 rounded-lg shadow-sm flex items-center"
              >
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-indigo-50 mr-4">
                  {/*{achievement.icon}
                  Icon
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{/*{achievement.title}Achievement Title</h3>
                  <p className="text-sm text-gray-500">Earned on May 15, 2023</p>
                </div>
              </m.div>
            ))}*/}
          </div>
        </m.section>

        {/* Course Progress Section */}
        <m.section 
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Progress</h2>
         {/* <div className="space-y-6">
            {user.recentCourses.map((course) => (
            {user.courseName.map((course) =>(
              <m.div
                key={course.id}
                variants={item}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">{course.title} Course Title</h3>
                  <span className="text-sm font-medium text-indigo-600">{/*{course.progress}Course Progress%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <m.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    animate = {{ width: `25%` }}
                    transition={{ duration: 1 }}
                    className="bg-indigo-600 h-2 rounded-full"
                  />
                </div>
              </m.div>
            ))} 
          </div>*/}
        </m.section>

        {/* Footer - Consistent with your theme */}
        <m.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-800 text-gray-300 py-12"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center">
                <FiBook className="h-6 w-6 text-indigo-400" />
                <span className="ml-2 text-xl font-bold text-white">EduConnect</span>
              </div>
              <div className="mt-4 md:mt-0">
                <button className="flex items-center text-gray-300 hover:text-white">
                  <FiLogOut className="mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-700 pt-8">
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

export default Profile;