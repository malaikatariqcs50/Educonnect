import { useState } from 'react';
import { FiSearch, FiBook, FiVideo, FiAward, FiUser, FiMail, FiArrowRight } from 'react-icons/fi';
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Link } from "react-router-dom";

import mathImage from '../assets/math-course.jpg';
import pythonImage from '../assets/python-course.jpg';
import scienceImage from '../assets/science-course.jpg';
import writingImage from '../assets/writing-course.jpg';
import instructorsImg from '../assets/instructor.jpg';
import lessonsImg from '../assets/lessons.jpg';
import certificatesImg from '../assets/certificate.jpg';
import Header from '../components/Header';
import Footer from '../components/Footer'

const newThings = [
    { 
      id: 1, 
      title: 'Expert Instructors', 
      category: 'Exxpert Instructors', 
      lessons: 24,
      image: instructorsImg,
      description: ' Learn from top-tier educators and industry leaders who turn real-world experience into practical, career-ready knowledge.'
    },
    { 
      id: 2, 
      title: 'Interactive Lessons', 
      category: 'Interactive Lessons', 
      lessons: 18,
      image: lessonsImg,
      description: 'Dive into immersive, hands-on learning with dynamic video modules, live sessions, and real-time feedback.'
    },
    { 
      id: 3, 
      title: 'Certification', 
      category: 'Certification', 
      lessons: 15,
      image: certificatesImg,
      description: ' Receive industry-recognized certificates that validate your skills and boost your professional credibility.'
    }
  ];

const Home = () => {
  
  const [isHovered, setIsHovered] = useState(null);

  const courses = [
    { 
      id: 1, 
      title: 'Mathematics Fundamentals', 
      category: 'Math', 
      lessons: 24,
      image: mathImage,
      description: 'Master algebra, geometry, and calculus with our comprehensive math program designed for all skill levels.'
    },
    { 
      id: 2, 
      title: 'Introduction to Python', 
      category: 'Programming', 
      lessons: 18,
      image: pythonImage,
      description: 'Learn Python from scratch with hands-on projects and build your first applications in just 4 weeks.'
    },
    { 
      id: 3, 
      title: 'Science for Beginners', 
      category: 'Science', 
      lessons: 15,
      image: scienceImage,
      description: 'Explore physics, chemistry, and biology through interactive experiments and real-world applications.'
    },
    { 
      id: 4, 
      title: 'Creative Writing', 
      category: 'Language', 
      lessons: 12,
      image: writingImage,
      description: 'Develop your writing voice and storytelling skills with guidance from published authors.'
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Students Enrolled' },
    { value: '500+', label: 'Courses Available' },
    { value: '200+', label: 'Expert Instructors' },
    { value: '24/7', label: 'Learning Access' },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
};

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-gray-50">
        
        <Header 
        title="Learn without Limits"
        desc="Your gateway to knowledge with expert-led courses in various subjects."
        />
        
        {/* Stats Section */}
        <m.section 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white py-12"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat, i) => (
                <m.div 
                  variants={item}
                  custom={i}
                  key={stat.label} 
                  className="text-center"
                >
                  <p className="text-3xl font-bold text-indigo-600">{stat.value}</p>
                  <p className="mt-2 text-sm font-medium text-gray-500">{stat.label}</p>
                </m.div>
              ))}
            </div>
          </div>
        </m.section>

        {/* Featured Courses */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              className="text-center"
            >
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Popular Courses
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-gray-500">
                Learn from the best instructors in various fields
              </p>
            </m.div>

          

<m.div 
  variants={container}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
  className="mt-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center"
>
  {courses.map((course, i) => (
    <m.div 
      key={course.id}
      variants={item}
      custom={i}
      className="bg-white overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-lg max-w-xs w-full"
      onMouseEnter={() => setIsHovered(course.id)}
      onMouseLeave={() => setIsHovered(null)}
    >
      <div className="h-48 bg-gray-200 overflow-hidden">
        <m.img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered === course.id ? 1.05 : 1
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="p-6">
        <div className="flex items-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {course.category}
          </span>
          <span className="ml-2 text-sm text-gray-500">{course.lessons} lessons</span>
        </div>
        <h3 className="mt-2 text-lg font-medium text-gray-900">{course.title}</h3>
        <p className="mt-2 text-sm text-gray-500">{course.description}</p>
        <Link to="/register" className="block mt-4">
          <button 
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200"
          >
            Enroll Now
          </button>
        </Link>
      </div>
    </m.div>
  ))}
</m.div>




<LazyMotion features={domAnimation}>
 
</LazyMotion>
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              className="mt-12 text-center"
            >
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-900 transition-colors">
                View All Courses
                <FiArrowRight className="ml-2 h-4 w-4" />
              </button>
            </m.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              className="lg:text-center"
            >
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Why Choose EduConnect?
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-gray-500">
                We provide the best learning experience for students of all levels. Learn from top instructors, build real-world projects, and get mentored by 
                experts from leading tech companies — all in one platform.
              </p>
            </m.div>

           <m.div 
  variants={container}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
  className="mt-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center place-items-center"
>
  {newThings.map((course, i) => (
    <m.div 
      variants={item}
      custom={i}
      key={course.id} 
      className="bg-white overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-lg max-w-xs w-full"
      onMouseEnter={() => setIsHovered(course.id)}
      onMouseLeave={() => setIsHovered(null)}
    >
      <div className="h-48 bg-gray-200 overflow-hidden">
        <m.img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered === course.id ? 1.05 : 1
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="p-6">
        <div className="flex items-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {course.category}
          </span>
        </div>
        <h3 className="mt-2 text-lg font-medium text-gray-900">{course.title}</h3>
        <p className="mt-2 text-sm text-gray-500">{course.description}</p>
      </div>
    </m.div>
  ))}
</m.div>




          </div>
        </section>

        {/* Newsletter */}
        <m.section 
          initial="hidden"
          whileInView="show"
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="bg-indigo-700 text-white py-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Stay Updated
            </h2>
            <p className="mt-4 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest courses and learning resources.
            </p>
            <m.div 
              whileHover={{ scale: 1.01 }}
              className="mt-8 max-w-md mx-auto flex"
            >
              <input
                type="email"
                className="flex-1 min-w-0 block w-full px-4 py-3 rounded-md text-gray-900 focus:outline-none"
                placeholder="Enter your email"
              />
              <m.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-3 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-100"
              >
                Subscribe
              </m.button>
            </m.div>
          </div>
        </m.section>

        <Footer />
      </div>
    </LazyMotion>
  );
};

export default Home;