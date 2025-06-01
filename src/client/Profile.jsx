import React, { useState, useEffect } from 'react';
import { FaBuilding, FaUser, FaBriefcase, FaEdit } from 'react-icons/fa';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { PersonalInfo } from './components/PersonalInfo';
import { CompanyDetails } from './components/CompanyDetails';
import { Projects } from './components/Projects';

const ClientProfile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [activeTab, setActiveTab] = useState('personal');
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    company: 'Tech Solutions Inc.',
    location: 'New York, USA',
    isVerified: true
  });

  const [personalInfo, setPersonalInfo] = useState({
    fullName: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+1 234 567 8900',
    location: 'New York, USA'
  });

  const [companyDetails, setCompanyDetails] = useState({
    companyName: 'Tech Solutions Inc.',
    industry: 'Technology',
    companySize: '50-200 employees',
    website: 'https://techsolutions.com'
  });

  const [projects, setProjects] = useState([
    {
      title: 'E-commerce Website Development',
      description: 'Looking for a full-stack developer to build an e-commerce platform...',
      budget: '$5,000 - $10,000',
      postedDate: '2 days ago'
    }
  ]);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get('http://localhost:8080/api/clients/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.data) {
          setProfileData(prev => ({
            ...prev,
            name: response.data.name || user?.name,
            company: response.data.company,
            location: response.data.location
          }));

          setPersonalInfo(prev => ({
            ...prev,
            fullName: response.data.name || user?.name,
            email: response.data.email || user?.email,
            phone: response.data.phone,
            location: response.data.location
          }));

          setCompanyDetails(prev => ({
            ...prev,
            companyName: response.data.companyName,
            industry: response.data.industry,
            companySize: response.data.companySize,
            website: response.data.website
          }));

          if (response.data.projects) {
            setProjects(response.data.projects);
          }
        }
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    };

    if (isAuthenticated) {
      fetchClientData();
    }
  }, [isAuthenticated, user, getAccessTokenSilently]);

  const handleEditProfile = () => {
    // Implement edit profile functionality
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-[#2A2A2A] rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={user?.picture || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-orange-500"
                />
                <button className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full hover:bg-orange-600 transition-colors">
                  <FaEdit className="text-white" />
                </button>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{profileData.name}</h1>
                <p className="text-gray-400">Client at {profileData.company}</p>
                <div className="flex items-center mt-2">
                  {profileData.isVerified && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                      Verified Client
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button 
              onClick={handleEditProfile}
              className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
            >
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
            <PersonalInfo personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} />
          )}

          {activeTab === 'company' && (
            <CompanyDetails companyDetails={companyDetails} setCompanyDetails={setCompanyDetails} />
          )}

          {activeTab === 'projects' && (
            <Projects projects={projects} setProjects={setProjects} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientProfile; 