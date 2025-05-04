import React, { useState } from 'react';
import { FaUser, FaCode, FaBriefcase, FaStar, FaEdit, FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';

export const FreelanceProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="min-h-screen bg-[#1A1A1A] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-[#2A2A2A] rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-orange-500"
                />
                <button className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full hover:bg-orange-600 transition-colors">
                  <FaEdit className="text-white" />
                </button>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Sarah Johnson</h1>
                <p className="text-xl text-orange-500 mb-2">Full Stack Developer</p>
                <p className="text-gray-400 mb-3">New York, USA</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-white">4.9</span>
                    <span className="text-gray-400 ml-1">(124 reviews)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
                      <FaGithub size={20} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
                      <FaLinkedin size={20} />
                    </a>
                    <a href="https://portfolio.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
                      <FaGlobe size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-700 overflow-x-auto">
          <button
            onClick={() => setActiveTab('personal')}
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === 'personal'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FaUser className="inline-block mr-2" />
            About Me
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === 'skills'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FaCode className="inline-block mr-2" />
            Skills & Experience
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === 'portfolio'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FaBriefcase className="inline-block mr-2" />
            Portfolio
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-[#2A2A2A] rounded-lg p-8">
          {activeTab === 'personal' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">About Me</h2>
                <p className="text-gray-400 leading-relaxed">
                  Full Stack Developer with 5+ years of experience in building scalable web applications.
                  Passionate about creating elegant solutions to complex problems. Specialized in React,
                  Node.js, and cloud technologies.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      value="sarah.johnson@example.com"
                      className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Phone</label>
                    <input
                      type="tel"
                      value="+1 234 567 8900"
                      className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Skills</h2>
                <div className="flex flex-wrap gap-3">
                  {['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker', 'MongoDB', 'GraphQL'].map((skill) => (
                    <span
                      key={skill}
                      className="bg-[#1A1A1A] text-white px-4 py-2 rounded-full border border-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Work Experience</h2>
                <div className="space-y-6">
                  <div className="border-l-2 border-orange-500 pl-4">
                    <h3 className="text-xl font-semibold text-white">Senior Developer</h3>
                    <p className="text-orange-500">Tech Solutions Inc.</p>
                    <p className="text-gray-400">2020 - Present</p>
                    <p className="text-gray-400 mt-2">
                      Led development of multiple web applications, mentored junior developers,
                      and implemented CI/CD pipelines.
                    </p>
                  </div>
                  <div className="border-l-2 border-gray-700 pl-4">
                    <h3 className="text-xl font-semibold text-white">Full Stack Developer</h3>
                    <p className="text-orange-500">Digital Innovations</p>
                    <p className="text-gray-400">2018 - 2020</p>
                    <p className="text-gray-400 mt-2">
                      Developed and maintained multiple client projects using React and Node.js.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white mb-6">Portfolio Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Portfolio Item */}
                <div className="bg-[#1A1A1A] rounded-lg overflow-hidden">
                  <img
                    src="https://via.placeholder.com/400x300"
                    alt="Project"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-white mb-2">E-commerce Platform</h3>
                    <p className="text-gray-400 mb-4">
                      A full-stack e-commerce solution built with React and Node.js
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm text-orange-500 bg-orange-500/10 px-2 py-1 rounded">React</span>
                      <span className="text-sm text-orange-500 bg-orange-500/10 px-2 py-1 rounded">Node.js</span>
                      <span className="text-sm text-orange-500 bg-orange-500/10 px-2 py-1 rounded">MongoDB</span>
                    </div>
                  </div>
                </div>

                {/* Add more portfolio items here */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 