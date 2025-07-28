import React from 'react'
import {m} from 'framer-motion'
import { FiMail } from 'react-icons/fi'

const Footer = () => {
  return (
    <m.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gray-800 text-gray-300"
      >
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-sm font-semibold tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-sm font-semibold tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-sm font-semibold tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-sm font-semibold tracking-wider uppercase">Connect</h3>
              <div className="mt-4 flex space-x-6">
                <a href="#" className="hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <FiMail className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <FiMail className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <FiMail className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 text-center">
              &copy; {new Date().getFullYear()} EduConnect. All rights reserved.
            </p>
          </div>
        </div>
      </m.footer>
  )
}

export default Footer
