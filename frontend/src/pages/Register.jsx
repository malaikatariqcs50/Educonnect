import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import newImg from "../assets/auth.png";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    courseName: "",
    gender: "",
    dateOfBirth: "",
    systemId: "",
    contactNumber: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log(formData);
  };

  return (
    <div className="h-screen w-full flex bg-gray-50 from-[#f0f4f8] to-[#e6ecf2]">
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-[65%] h-screen flex flex-col justify-center px-8 md:px-20"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#102a43] mt-8">EduConnect</h1>
          <p className="text-md text-gray-600 mt-2">
            Join our learning community and start your educational journey today.
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto w-full bg-white p-8 rounded-xl shadow-lg"
        >
          {/* Full Name */}
          <div className="mb-5">
            <label className="block mb-2 font-medium text-[#102a43]">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block mb-2 font-medium text-[#102a43]">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition"
              placeholder="your@email.com"
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block mb-2 font-medium text-[#102a43]">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition"
              placeholder="••••••••"
            />
          </div>

          {/* Course Name */}
          <div className="mb-5">
            <label className="block mb-2 font-medium text-[#102a43]">Course</label>
            <select
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition"
            >
              <option value="" hidden>Select your course</option>
              <option value="Python">Python Programming</option>
              <option value="Creative Writing">Creative Writing</option>
            </select>
          </div>

          {/* Gender */}
          <div className="mb-5">
            <label className="block mb-2 font-medium text-[#102a43]">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition"
            >
              <option value="" hidden>Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div className="mb-5">
            <label className="block mb-2 font-medium text-[#102a43]">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition"
            />
          </div>

          {/* System ID */}
          <div className="mb-5">
            <label className="block mb-2 font-medium text-[#102a43]">System ID</label>
            <input
              type="text"
              name="systemId"
              value={formData.systemId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition"
              placeholder="Student/Employee ID"
            />
          </div>

          {/* Contact Number */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-[#102a43]">Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition"
              placeholder="+1 (123) 456-7890"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#1e3a8a] text-white py-3 text-lg rounded-md hover:bg-[#2c5282] transition mb-4"
          >
            Create Account
          </motion.button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-[#1e3a8a] hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.form>
      </motion.div>

      {/* Right Section - Image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-[35%] h-screen hidden md:flex items-center justify-center bg-gradient-to-br from-blue-700 to-indigo-900"
      >
        <motion.img
          src={newImg}
          alt="Education Visual"
          className="w-[80%] object-contain"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </motion.div>
    </div>
  );
}

export default Register;