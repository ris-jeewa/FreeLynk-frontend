import React from "react";
import { FaBriefcase, FaUsers, FaRocket, FaLightbulb } from "react-icons/fa";

const Careers = () => {
  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#2A2A2A] rounded-lg p-12 shadow-2xl">
          {/* Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-orange-500 rounded-full mb-6">
              <FaBriefcase className="text-white text-3xl" />
            </div>
          </div>

          {/* Main Message */}
          <h1 className="text-4xl font-bold text-white mb-6">
            Careers Page
          </h1>
          
          <div className="text-2xl font-semibold text-orange-500 mb-8">
            🚧 Under Development 🚧
          </div>

          {/* Description */}
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            We're building an exciting careers section where talented individuals can discover 
            amazing opportunities to join our growing team and make a real impact.
          </p>

          {/* What's Coming Soon */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#3A3A3A] rounded-lg p-6">
              <FaUsers className="text-orange-500 text-2xl mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Job Opportunities</h3>
              <p className="text-gray-400 text-sm">
                Exciting roles across various departments
              </p>
            </div>
            <div className="bg-[#3A3A3A] rounded-lg p-6">
              <FaRocket className="text-orange-500 text-2xl mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Career Growth</h3>
              <p className="text-gray-400 text-sm">
                Professional development and advancement paths
              </p>
            </div>
            <div className="bg-[#3A3A3A] rounded-lg p-6">
              <FaLightbulb className="text-orange-500 text-2xl mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Innovation Culture</h3>
              <p className="text-gray-400 text-sm">
                Work on cutting-edge projects and technologies
              </p>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-300 text-lg mb-4">
              Thank you for your interest in joining our team!
            </p>
            <p className="text-orange-500 font-semibold">
              We'll let you know as soon as our careers page is live. Stay tuned! 🎉
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-8">
            <a 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers; 