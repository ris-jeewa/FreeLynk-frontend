import React, { useState } from 'react';
import { FaBuilding, FaUser, FaBriefcase, FaEdit } from 'react-icons/fa';

const ClientProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="min-h-screen bg-[#1A1A1A] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-[#2A2A2A] rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
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
                <h1 className="text-3xl font-bold text-white">John Doe</h1>
                <p className="text-gray-400">Client at Tech Solutions Inc.</p>
                <div className="flex items-center mt-2">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                    Verified Client
                  </span>
                </div>
              </div>
            </div>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('personal')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'personal'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FaUser className="inline-block mr-2" />
            Personal Information
          </button>
          <button
            onClick={() => setActiveTab('company')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'company'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FaBuilding className="inline-block mr-2" />
            Company Details
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'projects'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FaBriefcase className="inline-block mr-2" />
            Posted Projects
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-[#2A2A2A] rounded-lg p-8">
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    value="John Doe"
                    className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    value="john.doe@example.com"
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
                <div>
                  <label className="block text-gray-400 mb-2">Location</label>
                  <input
                    type="text"
                    value="New York, USA"
                    className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'company' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Company Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 mb-2">Company Name</label>
                  <input
                    type="text"
                    value="Tech Solutions Inc."
                    className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Industry</label>
                  <input
                    type="text"
                    value="Technology"
                    className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Company Size</label>
                  <input
                    type="text"
                    value="50-200 employees"
                    className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Website</label>
                  <input
                    type="url"
                    value="https://techsolutions.com"
                    className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Posted Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Project Card */}
                <div className="bg-[#1A1A1A] rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">E-commerce Website Development</h3>
                  <p className="text-gray-400 mb-4">Looking for a full-stack developer to build an e-commerce platform...</p>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-500">$5,000 - $10,000</span>
                    <span className="text-gray-400">Posted 2 days ago</span>
                  </div>
                </div>
                {/* Add more project cards here */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientProfile; 