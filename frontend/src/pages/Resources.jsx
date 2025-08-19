import { useState } from 'react';
import { FiFilter, FiChevronDown, FiSearch, FiBook, FiFileText, FiVideo, FiHeadphones, FiDownload, FiBookmark, FiChevronRight } from 'react-icons/fi';
import { LazyMotion, domAnimation, m } from "framer-motion";

const ebookImage = 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755596439/WhatsApp_Image_2025-08-19_at_02.40.08_caa41589_moc3kd.jpg';
const videoImage = 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755596484/WhatsApp_Image_2025-08-19_at_02.40.06_ec59aec7_in45hs.jpg';
const podcastImage = 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755596474/WhatsApp_Image_2025-08-19_at_02.40.07_d976a9e3_jo8icz.jpg';
const templateImage = 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755596480/WhatsApp_Image_2025-08-19_at_02.40.06_6302ba16_whogvm.jpg';
const guideImage = 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755596458/WhatsApp_Image_2025-08-19_at_02.40.08_11011c81_brqem9.jpg';
const cheatsheetImage= 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755596497/WhatsApp_Image_2025-08-19_at_02.40.05_f90e8db8_bi2adn.jpg';
import Footer from '../components/Footer';
import Header from '../components/Header';

const resourceTypes = [
  { id: 1, name: 'All Resources', count: 86 },
  { id: 2, name: 'E-books', count: 24 },
  { id: 3, name: 'Video Tutorials', count: 32 },
  { id: 4, name: 'Podcasts', count: 12 },
  { id: 5, name: 'Templates', count: 10 },
  { id: 6, name: 'Guides', count: 8 },
];

const popularTags = [
  { id: 1, name: 'Programming' },
  { id: 2, name: 'Design' },
  { id: 3, name: 'Mathematics' },
  { id: 4, name: 'Science' },
  { id: 5, name: 'Business' },
  { id: 6, name: 'Language' },
  { id: 7, name: 'Productivity' },
  { id: 8, name: 'Career' },
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

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isHovered, setIsHovered] = useState(null);
  const [selectedType, setSelectedType] = useState(1);
  const [selectedTag, setSelectedTag] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const resources = [
    { 
      id: 1, 
      title: 'JavaScript: The Complete Guide', 
      type: 'E-book', 
      format: 'PDF',
      pages: 320,
      downloads: 2450,
      image: ebookImage,
      description: 'Comprehensive guide covering modern JavaScript from basics to advanced concepts.',
      tags: ['Programming'],
      icon: <FiFileText className="h-5 w-5 text-indigo-600" />
    },
    { 
      id: 2, 
      title: 'UI Design Fundamentals', 
      type: 'Video Tutorial', 
      format: 'MP4',
      duration: '4.5 hours',
      downloads: 1850,
      image: videoImage,
      description: 'Master the principles of user interface design with practical examples.',
      tags: ['Design'],
      icon: <FiVideo className="h-5 w-5 text-indigo-600" />
    },
    { 
      id: 3, 
      title: 'The Science Podcast', 
      type: 'Podcast', 
      format: 'MP3',
      episodes: 12,
      downloads: 980,
      image: podcastImage,
      description: 'Weekly discussions on the latest scientific discoveries and breakthroughs.',
      tags: ['Science'],
      icon: <FiHeadphones className="h-5 w-5 text-indigo-600" />
    },
    { 
      id: 4, 
      title: 'Business Plan Template', 
      type: 'Template', 
      format: 'DOCX',
      downloads: 3200,
      image: templateImage,
      description: 'Professional business plan template with examples and guidelines.',
      tags: ['Business'],
      icon: <FiDownload className="h-5 w-5 text-indigo-600" />
    },
    { 
      id: 5, 
      title: 'Python Cheat Sheet', 
      type: 'Guide', 
      format: 'PDF',
      pages: 12,
      downloads: 4200,
      image: cheatsheetImage,
      description: 'Quick reference for Python syntax and common operations.',
      tags: ['Programming'],
      icon: <FiBookmark className="h-5 w-5 text-indigo-600" />
    },
    { 
      id: 6, 
      title: 'Study Skills Handbook', 
      type: 'E-book', 
      format: 'PDF',
      pages: 180,
      downloads: 1750,
      image: guideImage,
      description: 'Proven techniques to improve your study habits and learning efficiency.',
      tags: ['Productivity'],
      icon: <FiFileText className="h-5 w-5 text-indigo-600" />
    },
  ];

  // Filter resources based on selected type and tag
  const filteredResources = resources.filter(resource => {
    const typeMatch = selectedType === 1 || 
                     (selectedType === 2 && resource.type === 'E-book') ||
                     (selectedType === 3 && resource.type === 'Video Tutorial') ||
                     (selectedType === 4 && resource.type === 'Podcast') ||
                     (selectedType === 5 && resource.type === 'Template') ||
                     (selectedType === 6 && resource.type === 'Guide');
    
    const tagMatch = !selectedTag || resource.tags.includes(selectedTag);
    
    return typeMatch && tagMatch;
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
        title="Free Learning Resources"
        desc="Access our library of e-books, video tutorials, templates and more to support your learning journey."
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
                Showing {filteredResources.length} of {resources.length} resources
              </div>
            </div>

            <div className={`mt-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Resource Type</h4>
                  <div className="flex flex-wrap gap-2">
                    {resourceTypes.map(type => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`px-3 py-1 rounded-full text-sm ${selectedType === type.id ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                        {type.name} ({type.count})
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Popular Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map(tag => (
                      <button
                        key={tag.id}
                        onClick={() => setSelectedTag(selectedTag === tag.name ? null : tag.name)}
                        className={`px-3 py-1 rounded-full text-sm ${selectedTag === tag.name ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </m.div>

          {/* Resources Grid */}
          <m.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredResources.map((resource, i) => (
              <m.div 
                key={resource.id}
                variants={item}
                custom={i}
                className="bg-white overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-lg flex flex-col"
                onMouseEnter={() => setIsHovered(resource.id)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <div className="h-48 bg-gray-200 overflow-hidden relative">
                  <m.img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: isHovered === resource.id ? 1.05 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-50">
                      {resource.icon}
                    </div>
                    <span className="ml-2 text-sm font-medium text-indigo-600">{resource.type}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">{resource.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 flex-grow">{resource.description}</p>
                  
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <div>
                      {resource.pages && <span>{resource.pages} pages</span>}
                      {resource.duration && <span>{resource.duration}</span>}
                      {resource.episodes && <span>{resource.episodes} episodes</span>}
                    </div>
                    <div>
                      <span>{resource.downloads.toLocaleString()} downloads</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button 
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200"
                    >
                      Download Now
                      <FiDownload className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </m.div>
            ))}
          </m.div>

          {/* Empty State */}
          {filteredResources.length === 0 && (
            <m.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <div className="mx-auto h-24 w-24 text-gray-400">
                <FiSearch className="h-full w-full" />
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No resources found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => {
                    setSelectedType(1);
                    setSelectedTag(null);
                    setSearchQuery('');
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Reset filters
                </button>
              </div>
            </m.div>
          )}

          {/* Featured Section */}
          <m.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="mt-16 bg-indigo-50 rounded-lg p-8"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Featured Resource Collections</h2>
              <p className="mt-2 max-w-2xl mx-auto text-gray-600">
                Explore our curated collections of resources for specific learning paths
              </p>
            </div>

            <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100">
                    <FiBook className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-gray-900">Programming Starter Pack</h3>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Everything you need to start your programming journey - eBooks, cheatsheets, and project templates.
                </p>
                <div className="mt-4">
                  <button className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
                    View collection
                    <FiChevronRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100">
                    <FiVideo className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-gray-900">Design Masterclass</h3>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Video tutorials, UI kits, and design system templates from industry professionals.
                </p>
                <div className="mt-4">
                  <button className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
                    View collection
                    <FiChevronRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100">
                    <FiHeadphones className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-gray-900">Productivity Boosters</h3>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Podcasts, planners, and guides to help you study more effectively and manage your time.
                </p>
                <div className="mt-4">
                  <button className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
                    View collection
                    <FiChevronRight className="ml-1 h-4 w-4" />
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

export default Resources;