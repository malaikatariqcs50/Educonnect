import { FiBook, FiUsers, FiAward, FiGlobe, FiMail, FiTwitter, FiLinkedin } from 'react-icons/fi';
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Link } from "react-router-dom";

// Images (replace with your actual image paths or URLs)
const teamImage = 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755593192/WhatsApp_Image_2025-08-19_at_01.45.05_cef0e593_j2byqo.jpg';
const missionImage = 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755593195/WhatsApp_Image_2025-08-19_at_01.45.05_a4189e4d_atoxme.jpg';
const founder1 = 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755593486/WhatsApp_Image_2025-08-19_at_01.51.02_b0abff08_eocwyh.jpg';
const founder2 = 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755593482/WhatsApp_Image_2025-08-19_at_01.51.02_5f5b4e85_unemqv.jpg';
import Header from '../components/Header';
import Footer from '../components/Footer';

const stats = [
  { value: '50,000+', label: 'Students Enrolled' },
  { value: '1,000+', label: 'Courses Available' },
  { value: '200+', label: 'Expert Instructors' },
  { value: '95%', label: 'Satisfaction Rate' },
];

const values = [
  {
    name: 'Accessibility',
    description: 'Making quality education available to everyone regardless of location or background.',
    image: 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755593199/WhatsApp_Image_2025-08-19_at_01.45.06_93cec7a4_vd61me.jpg'
  },
  {
    name: 'Excellence',
    description: 'Maintaining high standards in our courses and learning materials.',
    image: 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755593198/WhatsApp_Image_2025-08-19_at_01.45.06_dcc17c73_t3tsmd.jpg'
  },
  {
    name: 'Innovation',
    description: 'Continuously improving our platform and teaching methods.',
    image: 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755593216/WhatsApp_Image_2025-08-19_at_01.45.06_fbdd8961_hpjzjl.jpg'
  },
  {
    name: 'Community',
    description: 'Building a supportive network of learners and educators.',
    image: 'https://res.cloudinary.com/dcsyexvub/image/upload/v1755593218/WhatsApp_Image_2025-08-19_at_01.45.07_f09b6eae_ns6a1n.jpg'
  }
];

const team = [
  {
    name: 'Alex Johnson',
    role: 'CEO & Co-Founder',
    image: founder1,
    bio: 'Education technology expert with 15 years of experience in online learning platforms.'
  },
  {
    name: 'Maria Chen',
    role: 'CTO & Co-Founder',
    image: founder2,
    bio: 'Software engineer passionate about creating accessible educational tools.'
  }
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

const About = () => {
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
            title="About EduConnect"
            desc="Our mission is to make quality education accessible to everyone, everywhere."
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

        {/* Our Story */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Our Story</h2>
              <p className="mt-4 text-lg text-gray-500">
                EduConnect was founded in 2015 with a simple idea: education should be accessible to everyone, regardless of their location or financial situation.
              </p>
              <p className="mt-4 text-gray-500">
                What started as a small platform with a handful of courses has grown into a global learning community with thousands of students and hundreds of expert instructors. Our team is passionate about breaking down barriers to education and helping learners achieve their goals.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src={teamImage} 
                alt="EduConnect team" 
                className="w-full h-full object-cover"
              />
            </div>
          </m.div>
        </section>

        {/* Mission Section */}
        <section className="bg-indigo-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="order-last lg:order-first rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={missionImage} 
                  alt="EduConnect mission" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900">Our Mission</h2>
                <p className="mt-4 text-lg text-gray-500">
                  To democratize education by providing high-quality, affordable learning opportunities to anyone with an internet connection.
                </p>
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900">What We Believe</h3>
                  <ul className="mt-4 space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-indigo-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-500">Learning should be engaging, interactive, and accessible</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-indigo-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-500">Education is the most powerful tool for personal and societal growth</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-indigo-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-500">Technology can bridge gaps and create equal opportunities</p>
                    </li>
                  </ul>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="text-center"
          >
            <h2 className="text-3xl font-extrabold text-gray-900">Our Values</h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-500">
              These principles guide everything we do at EduConnect
            </p>
          </m.div>

          <m.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((value, i) => (
              <m.div 
                variants={item}
                custom={i}
                key={value.name} 
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-gray-200 overflow-hidden rounded-lg mb-4">
                  <img 
                    src={value.image} 
                    alt={value.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900">{value.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{value.description}</p>
              </m.div>
            ))}
          </m.div>
        </section>

        {/* Team Section */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              className="text-center"
            >
              <h2 className="text-3xl font-extrabold text-gray-900">Meet Our Founders</h2>
              <p className="mt-4 max-w-2xl mx-auto text-gray-500">
                The passionate team behind EduConnect
              </p>
            </m.div>

            <m.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2"
            >
              {team.map((member, i) => (
                <m.div 
                  variants={item}
                  custom={i}
                  key={member.name} 
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img 
                        className="h-16 w-16 rounded-full object-cover"
                        src={member.image}
                        alt={member.name}
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                      <p className="text-sm text-indigo-600">{member.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-500">{member.bio}</p>
                  <div className="mt-4 flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-indigo-600">
                      <FiTwitter className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-indigo-600">
                      <FiLinkedin className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-indigo-600">
                      <FiMail className="h-5 w-5" />
                    </a>
                  </div>
                </m.div>
              ))}
            </m.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-indigo-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <m.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              className="text-3xl font-extrabold tracking-tight sm:text-4xl"
            >
              Ready to start learning?
            </m.h2>
            <m.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              className="mt-4 max-w-2xl mx-auto text-xl"
            >
              Join thousands of students already growing with EduConnect
            </m.p>
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              className="mt-8"
            >
              <Link to="/register">
                <m.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-100"
                >
                  Get Started Today
                </m.button>
              </Link>
            </m.div>
          </div>
        </section>

        <Footer />
      </div>
    </LazyMotion>
  );
};

export default About;