import { FiBook, FiSearch, FiDownload, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContext, useRef, useState, useEffect } from "react";
import { UserDataContext } from "../context/UserContext";
import api from "../axios";

const ResourcesPage = () => {
  const {user} = useContext(UserDataContext)
  const [open, setOpen] = useState(false)
  const [resources, setResources] = useState([])
  const [course, setCourse] = useState(null);
    useEffect(() => {
      const token = localStorage.getItem("token");
      if(!token){
        navigate("/home")
        return;
      }

          const fetchResources = async () => {
            try {
              const courseRes = await api.get("/my-course", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              const fetchedCourse = courseRes.data.course;
              setCourse(fetchedCourse);

              if(fetchedCourse && fetchedCourse._id){
                const response = await api.get(`/get-resources/${fetchedCourse._id}`, {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                })

                if(response.status == 200){
                  const data = response.data;
                  setResources(data.resources)
                }
              }
            } catch (err) {
              console.error('Failed to fetch course ', err);
            }
          };
          
      fetchResources();

      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  const dropdownRef = useRef(null)
  return (
    <div className=" p-6 bg-white rounded-xl shadow-sm min-h-screen">
      {/* Navigation - Consistent with your rating page */}
      <motion.nav 
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
                <Link to="/user-resources" className="relative text-gray-900 after:absolute after:left-0 after:bottom-0 after:h-[2px] 
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
                      <span className="text-gray-700 relative text-gray-500 after:absolute after:left-0 after:bottom-0 after:h-[2px] 
                                after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 
                                hover:after:w-full hover:text-indigo-600">{user?.fullName}</span>
                      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center ml-2 overflow-hidden">
                              {user?.avatar? (
                                <img src={user.avatar.url} className="h-full w-full object-cover" ></img>
                              ) : (<FiUser className="text-indigo-600" />)}
                              
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
        </motion.nav>

      {/* Page Header */}
      <div className="text-center mb-8 p-6 bg-indigo-600 rounded-lg">
        <h2 className="text-3xl font-bold text-white mb-2">Course Resources</h2>
        <p className="text-indigo-100">Access study materials shared by students and professors</p>
      </div>

      {/* Resources Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {resources.map((resource) => (
          <motion.div
            key={resource.id}
            whileHover={{ y: -5 }}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded">
                  {course.title}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{resource.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  <FiDownload className="inline mr-1" />
                   pdf
                </span>
                <a
                  href={resource.url}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Open
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;