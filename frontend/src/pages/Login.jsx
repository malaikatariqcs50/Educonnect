import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const newImg = "https://res.cloudinary.com/dcsyexvub/image/upload/v1755592069/auth_wewgpk.png";
import axios from 'axios'
import { UserDataContext } from "../context/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState('')
  const {user, setUser} = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      navigate("/")
    }
  }, [])

  const handleSubmit = async(e) => {
    e.preventDefault();
    const user = ({
      email,
      password
    })
    try{
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, user);
    if(response.status == 200){
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem('token', data.token)
      navigate('/')
    }
  }
  catch(err){
    if (err.response){
      const {status, data} = err.response
      if (status === 401 && data.message === "Email or password is invalid!") {
        setMessage("Email or password is invalid!");
      } else if (status === 500) {
        setMessage("Login Error! Please try again later.");
      } else {
        setMessage(data.message || "Something went wrong!");
      }
    } else {
      setMessage("Network error, please try again.");
    }
  }
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
            Welcome back! Sign in to continue your learning journey.
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto w-full bg-white p-8 rounded-xl shadow-lg"
        >
          {/* Email Field */}
          <div className="mb-5">
            <label className="block mb-2 font-medium text-[#102a43]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition"
              placeholder="your@email.com"
            />
          </div>

          {/* Password Field */}
          <div className="mb-5">
            <label className="block mb-2 font-medium text-[#102a43]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition"
              placeholder="••••••••"
            />
          </div>

          {/* Role Select */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-[#102a43]">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition"
            >
              <option value="" hidden>Select your role</option>
              <option value="student">Student</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#1e3a8a] text-white py-3 text-lg rounded-md hover:bg-[#2c5282] transition mb-4"
          >
            Login
          </motion.button>
          {message? (
          <p className="bg-red-200 py-3 text-center">{message}</p>
          ): (<p></p>)}

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link 
                to="/register" 
                className="text-[#1e3a8a] hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
            <Link 
              to="/forgot-password" 
              className="text-sm text-[#1e3a8a] hover:underline mt-2 inline-block"
            >
              Forgot password?
            </Link>
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

export default Login;