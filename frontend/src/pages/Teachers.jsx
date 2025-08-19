import { useState } from 'react';
import { FiFilter, FiStar, FiSearch, FiBook, FiUser, FiAward, FiMail, FiGlobe, FiTwitter, FiLinkedin, FiChevronDown } from 'react-icons/fi';
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Link } from "react-router-dom";

// Teacher images (replace with your actual image paths or URLs)
const teacher2 = 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755596912/WhatsApp_Image_2025-08-19_at_02.47.20_2adc0325_xfa94a.jpg';
const teacher1 = 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755596909/WhatsApp_Image_2025-08-19_at_02.47.19_dccb5af5_r1nf1a.jpg';
const teacher3 = 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755597240/WhatsApp_Image_2025-08-19_at_02.53.38_8043bccf_vvqqiu.jpg';
const teacher4 = 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755596902/WhatsApp_Image_2025-08-19_at_02.47.19_be3dd0b1_efaew6.jpg';
const teacher5 = 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755596896/WhatsApp_Image_2025-08-19_at_02.47.17_9289cb96_oj0fto.jpg';
const teacher6 = 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755596899/WhatsApp_Image_2025-08-19_at_02.47.18_14c30a5c_v7gwl3.jpg';
import Footer from '../components/Footer';
import Header from '../components/Header';

const subjects = [
  { id: 1, name: 'All Subjects', count: 42 },
  { id: 2, name: 'Mathematics', count: 8 },
  { id: 3, name: 'Programming', count: 12 },
  { id: 4, name: 'Science', count: 6 },
  { id: 5, name: 'Design', count: 7 },
  { id: 6, name: 'Business', count: 5 },
  { id: 7, name: 'Language', count: 4 },
];

const experienceLevels = [
  { id: 1, name: 'All Levels', count: 42 },
  { id: 2, name: 'Beginner', count: 15 },
  { id: 3, name: 'Intermediate', count: 18 },
  { id: 4, name: 'Advanced', count: 9 },
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

const Teachers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isHovered, setIsHovered] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const teachers = [
    { 
      id: 1, 
      name: 'Dr. Sarah Johnson', 
      subject: 'Mathematics', 
      experience: '12 years',
      students: 2450,
      rating: 4.9,
      image: teacher1,
      bio: 'PhD in Applied Mathematics with a passion for making complex concepts accessible to all students.',
      level: 'Advanced',
      courses: 8
    },
    { 
      id: 2, 
      name: 'Michael Chen', 
      subject: 'Programming', 
      experience: '8 years',
      students: 3200,
      rating: 4.8,
      image: teacher2,
      bio: 'Senior software engineer specializing in Python and JavaScript education for beginners.',
      level: 'Intermediate',
      courses: 12
    },
    { 
      id: 3, 
      name: 'Emily Rodriguez', 
      subject: 'Science', 
      experience: '6 years',
      students: 1850,
      rating: 4.7,
      image: teacher3,
      bio: 'Research scientist turned educator with a talent for engaging science demonstrations.',
      level: 'Intermediate',
      courses: 5
    },
    { 
      id: 4, 
      name: 'David Kim', 
      subject: 'Design', 
      experience: '10 years',
      students: 2750,
      rating: 4.9,
      image: teacher4,
      bio: 'Award-winning UI/UX designer teaching design principles and industry-standard tools.',
      level: 'Advanced',
      courses: 7
    },
    { 
      id: 5, 
      name: 'Priya Patel', 
      subject: 'Business', 
      experience: '7 years',
      students: 1950,
      rating: 4.6,
      image: teacher5,
      bio: 'Former startup founder teaching business strategy and entrepreneurship fundamentals.',
      level: 'Intermediate',
      courses: 4
    },
    { 
      id: 6, 
      name: 'James Wilson', 
      subject: 'Language', 
      experience: '15 years',
      students: 3100,
      rating: 4.8,
      image: teacher6,
      bio: 'Linguistics expert with a focus on practical language acquisition techniques.',
      level: 'Advanced',
      courses: 6
    },
  ];

  // Filter teachers based on selected subject and level
  const filteredTeachers = teachers.filter(teacher => {
    const subjectMatch = selectedSubject === 1 || 
                        (selectedSubject === 2 && teacher.subject === 'Mathematics') ||
                        (selectedSubject === 3 && teacher.subject === 'Programming') ||
                        (selectedSubject === 4 && teacher.subject === 'Science') ||
                        (selectedSubject === 5 && teacher.subject === 'Design') ||
                        (selectedSubject === 6 && teacher.subject === 'Business') ||
                        (selectedSubject === 7 && teacher.subject === 'Language');
    
    const levelMatch = selectedLevel === 1 || 
                      (selectedLevel === 2 && teacher.level === 'Beginner') ||
                      (selectedLevel === 3 && teacher.level === 'Intermediate') ||
                      (selectedLevel === 4 && teacher.level === 'Advanced');
    
    return subjectMatch && levelMatch;
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
            title="Meet Our Teachers"
            desc="Learn from expert educators with real-world experience and a passion for teaching."
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
                Showing {filteredTeachers.length} of {teachers.length} teachers
              </div>
            </div>

            <div className={`mt-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Subjects</h4>
                  <div className="flex flex-wrap gap-2">
                    {subjects.map(subject => (
                      <button
                        key={subject.id}
                        onClick={() => setSelectedSubject(subject.id)}
                        className={`px-3 py-1 rounded-full text-sm ${selectedSubject === subject.id ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                        {subject.name} ({subject.count})
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Experience Level</h4>
                  <div className="flex flex-wrap gap-2">
                    {experienceLevels.map(level => (
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

          {/* Teachers Grid */}
          <m.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredTeachers.map((teacher, i) => (
              <m.div 
                key={teacher.id}
                variants={item}
                custom={i}
                className="bg-white overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-lg"
                onMouseEnter={() => setIsHovered(teacher.id)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <div className="px-6 pt-6 pb-2 flex items-center">
                  <div className="flex-shrink-0">
                    <m.img 
                      className="h-16 w-16 rounded-full object-cover"
                      src={teacher.image}
                      alt={teacher.name}
                      animate={{
                        scale: isHovered === teacher.id ? 1.05 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{teacher.name}</h3>
                    <p className="text-sm text-indigo-600">{teacher.subject} Teacher</p>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <p className="text-sm text-gray-500">{teacher.bio}</p>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <FiAward className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{teacher.experience} experience</span>
                    </div>
                    <div className="flex items-center">
                      <FiUser className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{teacher.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center">
                      <FiBook className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{teacher.courses} courses</span>
                    </div>
                    <div className="flex items-center">
                      <FiStar className="h-4 w-4 text-yellow-400 fill-current mr-2" />
                      <span>{teacher.rating} rating</span>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 flex justify-between">
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-indigo-600">
                      <FiTwitter className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-indigo-600">
                      <FiLinkedin className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-indigo-600">
                      <FiGlobe className="h-5 w-5" />
                    </a>
                  </div>
                  <Link to={`/teacher/${teacher.id}`}>
                    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                      View Profile
                    </button>
                  </Link>
                </div>
              </m.div>
            ))}
          </m.div>

          {/* Empty State */}
          {filteredTeachers.length === 0 && (
            <m.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <div className="mx-auto h-24 w-24 text-gray-400">
                <FiSearch className="h-full w-full" />
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No teachers found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => {
                    setSelectedSubject(1);
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

          {/* Become a Teacher Section */}
          <m.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="mt-16 bg-indigo-50 rounded-lg p-8"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Want to Join Our Team?</h2>
              <p className="mt-2 max-w-2xl mx-auto text-gray-600">
                We're always looking for passionate educators to join our platform
              </p>
            </div>

            <div className="mt-8 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">Benefits of Teaching with Us</h3>
                <ul className="mt-4 space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Reach thousands of motivated students</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Competitive revenue sharing</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Flexible teaching schedule</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Supportive teaching community</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">Apply to Become a Teacher</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Share your expertise with our community of learners. We welcome educators from all backgrounds.
                </p>
                <div className="mt-6">
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    Start Application
                  </button>
                </div>
              </div>
            </div>
          </m.section>
        </section>

        <Footer />
      </div>
    </LazyMotion>
  );
};

export default Teachers;