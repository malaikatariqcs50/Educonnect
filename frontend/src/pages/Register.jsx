import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import newImg from "../assets/auth.png";
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'

function Register() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [courseName, setCourseName] = useState('')
  const [systemId, setSystemId] = useState('')
  const [contactNumber, setContactNumber] = useState('')

  const {user, setUser} = useContext(UserDataContext)
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    const user = ({
      fullName,
      email,
      password,
      gender,
      courseName,
      dateOfBirth,
      systemId,
      contactNumber
    })
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/register`, user)
    if(response.status == 201){
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token)
      navigate('/home')
    }
  };

  return (
    <div className="h-screen w-full flex bg-gray-50 from-[#f0f4f8] to-[#e6ecf2]">
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-[65%] h-screen justify-center px-8 md:px-14"
      >
        <div className="text-center mb-6">
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
          className="w-full bg-white p-6 rounded-xl shadow-lg"
        >

          {/* First Row - Full Name and Email */}
    <div className="flex mb-4">
      <div className="w-full md:w-1/2 px-2 mb-5 md:mb-0">
        <label className="block mb-2 font-medium text-[#102a43]">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="w-full border border-gray-300 px-4 py-3 rounded-md"
          placeholder="Your Name"
        />
      </div>
      <div className="w-full md:w-1/2 px-2">
        <label className="block mb-2 font-medium text-[#102a43]">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 px-4 py-3 rounded-md"
          placeholder="your@email.com"
        />
      </div>
    </div>

          {/* 2nd row */}
          <div className="flex mb-4">

          <div className="w-1/2 px-2">
            <label className="block mb-2 font-medium text-[#102a43]">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition"
              placeholder="••••••••"
            />
          </div>

          {/* Course Name */}
          <div className="w-1/2 px-2">
            <label className="block mb-2 font-medium text-[#102a43]">Course</label>
            <select
              name="courseName"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition"
            >
              <option value="" hidden>Select your course</option>
              <option value="Python">Python Programming</option>
              <option value="Creative Writing">Creative Writing</option>
            </select>
          </div>
          </div>

          {/* 3rd Row */}
          <div className="flex mb-4">

          
          <div className="w-1/2 px-2">
            <label className="block mb-2 font-medium text-[#102a43]">Gender</label>
            <select
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
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
          <div className="px-2 w-1/2">
            <label className="block mb-2 font-medium text-[#102a43]">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition"
            />
          </div>
          </div>

          {/* 4th Row */}
          <div className="flex mb-4">
            <div className="px-2 w-1/2">
            <label className="block mb-2 font-medium text-[#102a43]">System ID</label>
            <input
              type="text"
              name="systemId"
              value={systemId}
              onChange={(e) => setSystemId(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition"
              placeholder="Student/Employee ID"
            />
          </div>

          {/* Contact Number */}
          <div className="w-1/2 px-2">
            <label className="block mb-2 font-medium text-[#102a43]">Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition"
              placeholder="+1 (123) 456-7890"
            />
          </div>
          </div>
          

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#1e3a8a] text-white py-2 text-lg rounded-md hover:bg-[#2c5282] transition mb-2"
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
        className="w-[35%] h-screen hidden md:flex items-center justify-center"
      >
        <motion.img
          src={newImg}
          alt="Education Visual"
          className="w-[100%] object-contain"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </motion.div>
    </div>
  );
}

export default Register;