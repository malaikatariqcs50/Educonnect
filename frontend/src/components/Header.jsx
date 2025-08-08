import React, {useState} from 'react'
import {m} from 'framer-motion'
import {FiBook, FiSearch} from 'react-icons/fi'
import {Link} from 'react-router-dom'

const Header = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    
    const fadeIn = {
        hidden: { opacity: 0 },
        show: { opacity: 1 }
    };

    return (
        <>
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
                    <Link
                        to="/home"
                        className="relative text-gray-900 after:absolute after:left-0 after:bottom-0 after:h-[2px] 
                                after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 
                                hover:after:w-full hover:text-indigo-600"
                    >
                    Home
                    </Link>
                    <Link
                    to="/courses"
                    className="relative text-gray-500 after:absolute after:left-0 after:bottom-0 after:h-[2px] 
                                after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 
                                hover:after:w-full hover:text-indigo-600"
                    >
                    Courses
                    </Link>
                    <Link
                    to="/resources"
                    className="relative text-gray-500 after:absolute after:left-0 after:bottom-0 after:h-[2px] 
                                after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 
                                hover:after:w-full hover:text-indigo-600"
                    >
                    Resources
                    </Link>
                    <Link
                    to="/teachers"
                    className="relative text-gray-500 after:absolute after:left-0 after:bottom-0 after:h-[2px] 
                                after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 
                                hover:after:w-full hover:text-indigo-600"
                    >
                    Teachers
                    </Link>
                    <Link
                    to="/about"
                    className="relative text-gray-500 after:absolute after:left-0 after:bottom-0 after:h-[2px] 
                                after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 
                                hover:after:w-full hover:text-indigo-600"
                    >
                    About
                    </Link>

                    <Link to="/register">
                    <m.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        Sign In
                    </m.button>
                    </Link>
                </div>
                </div>
            </div>
            </m.nav>

            {/* Hero Section */}
            <m.section 
            initial="hidden"
            animate="show"
            variants={fadeIn}
            transition={{ duration: 0.8 }}
            className="bg-indigo-700 text-white"
            >
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
                <m.h1 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
                >
                {props.title}
                </m.h1>
                <m.p 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6 max-w-3xl mx-auto text-xl"
                >
                {props.desc}
                </m.p>
                <m.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 max-w-md mx-auto"
                >
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                    type="text"
                    className="block w-full pl-10 pr-12 py-4 border border-transparent rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Find courses, articles, or tutors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center px-3">
                    <m.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Search
                    </m.button>
                    </div>
                </div>
                </m.div>
            </div>
            </m.section>
        </>
    )
}

export default Header;