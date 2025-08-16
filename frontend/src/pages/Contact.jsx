import { FiMail, FiPhone, FiMapPin, FiSend, FiBook, FiUser, FiMessageSquare } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../axios";
import { useRef } from "react";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import { useEffect } from "react";

const ContactPage = () => {
  const [open, setOpen] = useState(false)
  useEffect(()=>{
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [])
  const dropdownRef = useRef(null)
  const { user } = useContext(UserDataContext)
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await api.post('/send-email', formData)
      
      if (response.status == 200 && response.data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm min-h-screen">
      {/* Navigation - Consistent with other pages */}
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
                <Link to="/user-resources" className="relative text-gray-500 after:absolute after:left-0 after:bottom-0 after:h-[2px] 
                                after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 
                                hover:after:w-full hover:text-indigo-600">Resources</Link>
                <Link to="/rating" className="relative text-gray-500 after:absolute after:left-0 after:bottom-0 after:h-[2px] 
                                after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 
                                hover:after:w-full hover:text-indigo-600">Rating</Link>
                <Link to="/contact" className="relative text-gray-900 after:absolute after:left-0 after:bottom-0 after:h-[2px] 
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
                                <img src={user.avatar} className="h-full w-full object-cover" ></img>
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
      <div className="text-center mb-8 py-12 bg-indigo-600 rounded-lg">
        <h2 className="text-4xl font-bold text-white mb-3">Contact Us</h2>
        <p className="text-indigo-100">We're here to help with any questions about EduConnect</p>
      </div>

      {/* Contact Methods Grid */}
      
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {/* Email Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=malaikatariq800@gmail.com" target="_blank">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <FiMail className="text-indigo-600 text-xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Us</h3>
          <p className="text-gray-600 mb-4">Get answers within 24 hours</p>
          <p 
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            support@educonnect.com
          </p>
          </a>
        </motion.div>

        {/* Phone Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <a href="tel:+923379918720">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <FiPhone className="text-indigo-600 text-xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Call Us</h3>
          <p className="text-gray-600 mb-4">Mon-Fri, 9am-5pm EST</p>
          <p
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            +92 337 9918720
          </p>
          </a>
        </motion.div>

        {/* Location Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <FiMapPin className="text-indigo-600 text-xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Visit Us</h3>
          <p className="text-gray-600 mb-4">Our headquarters</p>
          <address className="text-indigo-600 not-italic">
            123 Education Ave<br />
            Boston, MA 02115
          </address>
        </motion.div>
      </div>

      {/* Contact Form */}
      <div className="p-6 border border-gray-200 rounded-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Send us a message</h3>
      
      {submitStatus === 'success' && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
          Message sent successfully!
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
          Failed to send message. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white 
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Your name"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white 
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="your@email.com"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              id="subject"
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="What's this about?"
              onChange={handleChange}
                  value={formData.subject}
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                <FiMessageSquare className="text-gray-400" />
              </div>
              <textarea
                id="message"
                rows="4"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="How can we help you?"
                onChange={handleChange}
                  value={formData.message}
              ></textarea>
            </div>
          </div>
          <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 ${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} 
                            text-white font-medium rounded-lg transition-colors flex items-center`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                {isSubmitting ? (
                    'Sending...'
                ) : (
                    <>
                    <FiSend className="mr-2" />
                    Send Message
                    </>
                )}
        </motion.button>
        </form>
    </div>

      {/* FAQ Section */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {[
            {
              question: "How do I reset my password?",
              answer: "Go to the login page and click 'Forgot Password'. You'll receive an email with reset instructions."
            },
            {
              question: "Where can I find course resources?",
              answer: "All shared resources are available in the Resources section, filterable by course."
            },
            {
              question: "How are course ratings calculated?",
              answer: "Ratings are an average of all student submissions for that course."
            }
          ].map((faq, index) => (
            <motion.div 
              key={index}
              whileHover={{ x: 5 }}
              className="border-l-4 border-indigo-600 pl-4 py-2"
            >
              <h4 className="font-bold text-gray-800">{faq.question}</h4>
              <p className="text-gray-600 mt-1">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;