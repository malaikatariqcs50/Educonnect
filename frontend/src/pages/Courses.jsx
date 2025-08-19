import { useState } from 'react';
import { FiMail, FiSearch, FiBook, FiFilter, FiChevronDown, FiStar, FiClock, FiUsers } from 'react-icons/fi';
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Link } from "react-router-dom";

// Course images (replace with your actual image paths or URLs)
const mathImage = 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755592086/math-course_mdcfpf.jpg';
const pythonImage = 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755592099/python-course_me5epq.jpg';
const scienceImage = 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755592105/science-course_jvxowv.jpg';
const writingImage = 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755592113/writing-course_fpus78.jpg';
const designImage = 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755594196/WhatsApp_Image_2025-08-19_at_02.01.37_f80cc447_humntw.jpg';
const businessImage = 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755594192/WhatsApp_Image_2025-08-19_at_02.01.36_802e571a_nbq71g.jpg';
const musicImage = 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755594193/WhatsApp_Image_2025-08-19_at_02.01.36_e2f6c906_zl6gyj.jpg';
const languageImage = 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755594198/WhatsApp_Image_2025-08-19_at_02.01.37_28f85fbb_lkscvl.jpg';
import Header from '../components/Header';
import Footer from '../components/Footer';

const categories = [
  { id: 1, name: 'All Categories', count: 120 },
  { id: 2, name: 'Programming', count: 32 },
  { id: 3, name: 'Mathematics', count: 18 },
  { id: 4, name: 'Science', count: 24 },
  { id: 5, name: 'Business', count: 15 },
  { id: 6, name: 'Design', count: 21 },
  { id: 7, name: 'Language', count: 10 },
];

const difficultyLevels = [
  { id: 1, name: 'All Levels', count: 120 },
  { id: 2, name: 'Beginner', count: 45 },
  { id: 3, name: 'Intermediate', count: 52 },
  { id: 4, name: 'Advanced', count: 23 },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.3
    }
  }
};

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isHovered, setIsHovered] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const courses = [
    { 
      id: 1, 
      title: 'Mathematics Fundamentals', 
      category: 'Math', 
      lessons: 24,
      duration: '32 hours',
      students: 1250,
      rating: 4.8,
      image: mathImage,
      description: 'Master algebra, geometry, and calculus with our comprehensive math program designed for all skill levels.',
      level: 'Beginner'
    },
    { 
      id: 2, 
      title: 'Introduction to Python', 
      category: 'Programming', 
      lessons: 18,
      duration: '24 hours',
      students: 2450,
      rating: 4.9,
      image: pythonImage,
      description: 'Learn Python from scratch with hands-on projects and build your first applications in just 4 weeks.',
      level: 'Beginner'
    },
    { 
      id: 3, 
      title: 'Science for Beginners', 
      category: 'Science', 
      lessons: 15,
      duration: '20 hours',
      students: 980,
      rating: 4.7,
      image: scienceImage,
      description: 'Explore physics, chemistry, and biology through interactive experiments and real-world applications.',
      level: 'Beginner'
    },
    { 
      id: 4, 
      title: 'Creative Writing', 
      category: 'Language', 
      lessons: 12,
      duration: '16 hours',
      students: 750,
      rating: 4.6,
      image: writingImage,
      description: 'Develop your writing voice and storytelling skills with guidance from published authors.',
      level: 'Intermediate'
    },
    { 
      id: 5, 
      title: 'UI/UX Design Principles', 
      category: 'Design', 
      lessons: 20,
      duration: '28 hours',
      students: 1850,
      rating: 4.8,
      image: designImage,
      description: 'Master the fundamentals of user interface and experience design with industry-standard tools.',
      level: 'Intermediate'
    },
    { 
      id: 6, 
      title: 'Business Analytics', 
      category: 'Business', 
      lessons: 22,
      duration: '30 hours',
      students: 1650,
      rating: 4.7,
      image: businessImage,
      description: 'Learn data-driven decision making and business intelligence techniques used by top companies.',
      level: 'Intermediate'
    },
    { 
      id: 7, 
      title: 'Music Theory', 
      category: 'Music', 
      lessons: 16,
      duration: '22 hours',
      students: 620,
      rating: 4.9,
      image: musicImage,
      description: 'Understand the building blocks of music, from scales and chords to composition techniques.',
      level: 'Beginner'
    },
    { 
      id: 8, 
      title: 'Spanish for Travelers', 
      category: 'Language', 
      lessons: 10,
      duration: '14 hours',
      students: 890,
      rating: 4.5,
      image: languageImage,
      description: 'Learn essential Spanish phrases and vocabulary for traveling to Spanish-speaking countries.',
      level: 'Beginner'
    },
  ];

  // Filter courses based on selected category and level
  const filteredCourses = courses.filter(course => {
    const categoryMatch = selectedCategory === 1 || 
                         (selectedCategory === 2 && course.category === 'Programming') ||
                         (selectedCategory === 3 && course.category === 'Math') ||
                         (selectedCategory === 4 && course.category === 'Science') ||
                         (selectedCategory === 5 && course.category === 'Business') ||
                         (selectedCategory === 6 && course.category === 'Design') ||
                         (selectedCategory === 7 && course.category === 'Language');
    
    const levelMatch = selectedLevel === 1 || 
                      (selectedLevel === 2 && course.level === 'Beginner') ||
                      (selectedLevel === 3 && course.level === 'Intermediate') ||
                      (selectedLevel === 4 && course.level === 'Advanced');
    
    return categoryMatch && levelMatch;
  });

  // Animation variants
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
        title="Explore Our Courses"
        desc="Discover expert-led courses in various subjects to expand your knowledge and skills."
        />

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filters */}
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="bg-white rounded-lg shadow-sm p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <FiFilter className="h-5 w-5 text-indigo-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="ml-4 md:hidden flex items-center text-sm text-indigo-600 hover:text-indigo-800"
                >
                  {showFilters ? 'Hide' : 'Show'} filters
                  <FiChevronDown className={`ml-1 h-4 w-4 transition-transform ${showFilters ? 'transform rotate-180' : ''}`} />
                </button>
              </div>
              <div className="text-sm text-gray-500">
                Showing {filteredCourses.length} of {courses.length} courses
              </div>
            </div>

            <div className={`mt-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-3 py-1 rounded-full text-sm ${selectedCategory === category.id ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                        {category.name} ({category.count})
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Difficulty Level</h4>
                  <div className="flex flex-wrap gap-2">
                    {difficultyLevels.map(level => (
                      <button
                        key={level.id}
                        onClick={() => setSelectedLevel(level.id)}
                        className={`px-3 py-1 rounded-full text-sm ${selectedLevel === level.id ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                        {level.name} ({level.count})
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </m.div>

          {/* Courses Grid */}
          <m.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredCourses.map((course, i) => (
              <m.div 
                key={course.id}
                variants={item}
                custom={i}
                className="bg-white overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-lg"
                onMouseEnter={() => setIsHovered(course.id)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <div className="h-48 bg-gray-200 overflow-hidden relative">
                  <m.img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: isHovered === course.id ? 1.05 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded">
                    {course.level}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {course.category}
                    </span>
                    <div className="flex items-center text-sm text-yellow-500">
                      <FiStar className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-gray-700">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">{course.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{course.description}</p>
                  
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <FiClock className="h-4 w-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <FiUsers className="h-4 w-4 mr-1" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                  
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

          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <m.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <div className="mx-auto h-24 w-24 text-gray-400">
                <FiSearch className="h-full w-full" />
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No courses found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => {
                    setSelectedCategory(1);
                    setSelectedLevel(1);
                    setSearchQuery('');
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Reset filters
                </button>
              </div>
            </m.div>
          )}

          {/* Pagination */}
          {filteredCourses.length > 0 && (
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              className="mt-12 flex items-center justify-between"
            >
              <button 
                disabled
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <div className="hidden md:flex">
                {[1, 2, 3, 4, 5].map(page => (
                  <button
                    key={page}
                    className={`mx-1 px-4 py-2 border text-sm font-medium rounded-md ${page === 1 ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                  >
                    {page}
                  </button>
                ))}
                <span className="mx-1 px-4 py-2 text-sm text-gray-700">...</span>
                <button className="mx-1 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50">
                  10
                </button>
              </div>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </m.div>
          )}
        </section>

        <Footer />
      </div>
    </LazyMotion>
  );
};

export default Courses;