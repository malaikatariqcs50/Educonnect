import { FiUser, FiMail, FiAward, FiBook, FiClock, FiEdit, FiX } from 'react-icons/fi';
import { LazyMotion, domAnimation, m } from "framer-motion";
import { UserDataContext } from '../context/UserContext';
import { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import avatar from '../assets/WhatsApp Image 2025-07-27 at 20.58.48_21328568.jpg'
import api from '../axios'
import CourseProgress from '../components/CourseProgress';

const Profile = () => {

    const { user, setUser } = useContext(UserDataContext)
    const [userProgress, setUserProgress] = useState(null)
    const [progressPercentage, setProgressPercentage] = useState(0)
    const [course, setCourse] = useState([])
    const navigate = useNavigate()
    const dropdownRef = useRef(null)
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
    name: user.fullName,
    email: user.email,
    password: '',
    contactNumber: user.contactNumber,
    avatar: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setFormData(prev => ({
      ...prev,
      avatar: file
    }));
  }
};

  const handleSubmit = async(e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login")
    }
    const formData = new FormData();
  formData.append('fullName', formData.name);
  formData.append('email', formData.email);
  formData.append('contactNumber', formData.contactNumber);
  
  // Only append password if it's not empty
  if (formData.password) {
    formData.append('password', formData.password);
  }
  
  // Only append avatar if a file was selected
  if (formData.avatar instanceof File) {
    formData.append('avatar', formData.avatar);
  }

    try{
      const response = await api.put("/edit-profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if(response.status == 200){
        const data = response.data;
      setUser(data.user)
      setIsEditing(false);
      }else {
      const errorData = await res.json();
      console.error("Error updating profile:", errorData);
      }
    }
    catch(err){
      console.log("Error editing profile", err)
    }
  };

      useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/home")
      return;
    }
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if(!token){
        navigate("/login")
      }
    }, [navigate])

    useEffect(() => {
    if (!user || !user._id) return;

    const fetchUserProgress = async () => {
      try {
        const response = await api.get(`/show-user-progress/${user._id}`);
        if (response.status === 200) {
          const data = response.data;
          setUserProgress(data.userProgress);
          const pPercentage = CourseProgress(course, data.userProgress);
          setProgressPercentage(pPercentage);
        }
      } catch (err) {
        console.log("Error fetching progress", err);
      }
    };

    fetchUserProgress();
  }, [user, course]);

    useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/")
    }
    const fetchCourse = async () => {
  try {
    const response = await api.get(`/my-course`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const fetchedCourse = response.data.course;
    setCourse(fetchedCourse);
  } catch (err) {
    console.error('Failed to fetch course ', err);
  }
};


    fetchCourse();
  }, [user])

    
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

  const defaultAchievements = [
  {
    id: 1,
    title: "Course Starter",
    description: "Completed the first module",
    icon: "📖", // Replace with your actual icon component
    date: new Date().toLocaleDateString()
  },
  {
    id: 2,
    title: "Quiz Champion",
    description: "Scored 90%+ on a quiz",
    icon: "🏆", // Replace with your actual icon component
    date: new Date().toLocaleDateString()
  },
  {
    id: 3,
    title: "Practice Pro",
    description: "Completed all practice exercises",
    icon: "💪", 
    date: new Date().toLocaleDateString()
  },
  {
    id: 4,
    title: "Discussion Contributor",
    description: "Posted 5+ helpful comments",
    icon: "💬", // Replace with your actual icon component
    date: new Date().toLocaleDateString()
  },
  {
    id: 5,
    title: "Course Finisher",
    description: "Completed the whole course",
    icon: "🎉",
    date: new Date().toLocaleDateString()
  }
];

const achievementsToDisplay = user.achievements || defaultAchievements;
const thresholds = [0, 25, 50, 75, 100]; 

const unlockedAchievements = achievementsToDisplay.filter((_, index) => {
  return progressPercentage >= thresholds[index];
});

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-gray-50">

        {/* Navigation */}
        <m.nav 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-sm shadow-indigo-300 sticky top-0 z-50 mb-4"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between h-16">
                    <div className="flex items-center">
                      <FiBook className="h-6 w-6 text-indigo-600" />
                      <span className="ml-2 text-xl font-bold text-gray-900">EduConnect</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                      <Link to="/" className="relative text-gray-500 after:absolute after:left-0 after:bottom-0 after:h-[2px] 
                                      after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 
                                      hover:after:w-full hover:text-indigo-600">Dashboard</Link>
                      <Link to="/user-resources" className="relative text-gray-500 after:absolute after:left-0 after:bottom-0 after:h-[2px] 
                                      after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 
                                      hover:after:w-full hover:text-indigo-600">Resources</Link>
                      <Link to="/rating" className="relative text-gray-500 after:absolute after:left-0 after:bottom-0 after:h-[2px] 
                                      after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 
                                      hover:after:w-full hover:text-indigo-600">Rating</Link>
                      <Link to="/contact" className="relative text-gray-500 after:absolute after:left-0 after:bottom-0 after:h-[2px] 
                                after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 
                                hover:after:w-full hover:text-indigo-600">Contact</Link>
                      <div className="relative" ref={dropdownRef}>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center justify-center"
                          >
                            <span className="text-gray-700 relative text-gray-900 after:absolute after:left-0 after:bottom-0 after:h-[2px] 
                                      after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 
                                      hover:after:w-full hover:text-indigo-600">{user.fullName}</span>
                            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center ml-2 overflow-hidden">
                              <img src={avatar} className='h-full w-full object-cover' />
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
              <img
                src={avatar}
                alt={user.fullName}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-indigo-500 bg-opacity-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <FiUser className="h-8 w-8 text-white" />
              </div>
            </m.div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-between">
                <m.h1
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold text-gray-900"
                >
                  {user.fullName}
                </m.h1>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-2 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
                >
                  <FiEdit />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-4 text-gray-600">
                <div className="flex items-center">
                  <FiMail className="mr-2 text-indigo-500" /> {user.email}
                </div>
                <div>
                  <strong>System ID:</strong> {user.systemId}
                </div>
                <div>
                  <strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}
                </div>
                <div>
                  <strong>Contact Number:</strong> {user.contactNumber}
                </div>
              </div>
            </div>
          </div>
        </div>
      </m.section>

      {/* Edit Form */}
      {isEditing && (
        <m.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-white shadow-sm mt-6"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password (leave blank to keep current)
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </m.section>
      )}

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
                {userProgress && (
                  <div>
                  <p className="text-sm text-gray-500">Completed Lessons</p>
                  <p className="text-2xl font-bold text-gray-900">{userProgress.completedLessons.length}</p>
                </div>
              )}
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
                {userProgress && (
                <div>
                  <p className="text-sm text-gray-500">Completed Exercises</p>
                  <p className="text-2xl font-bold text-gray-900">{userProgress.completedExercises.length}</p>
                </div>
                )}
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
            {unlockedAchievements.map((achievement) => (
  <m.div
    key={achievement.id}
    variants={item}
    whileHover={{ y: -5 }}
    className="bg-white p-4 rounded-lg shadow-sm flex items-center"
  >
    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-indigo-50 mr-4">
      {achievement.icon}
    </div>
    <div>
      <h3 className="font-medium text-gray-900">{achievement.title}</h3>
      <p className="text-sm text-gray-500">Earned on {achievement.date}</p>
    </div>
  </m.div>
))}
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
          <div className="space-y-6">
              <m.div
                key='1'
                variants={item}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">{user.courseName}</h3>
                  <span className="text-sm font-medium text-indigo-600">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <m.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1 }}
                    className="bg-indigo-600 h-2 rounded-full"
                  />
                </div>
              </m.div>
          </div>
        </m.section>

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