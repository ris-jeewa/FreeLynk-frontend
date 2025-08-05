import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaCode, FaBriefcase, FaStar, FaEdit, FaGithub, FaLinkedin, FaGlobe, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
import CloudinaryUploadWidget from '../components/CloudinaryUploadWidget';
import AboutMeTab from './components/AboutMeTab';
import SkillsTab from './components/SkillsTab';
import PortfolioTab from './components/PortfolioTab';
import { EditAboutMe } from './components/EditAboutMe';
import { EditSkills } from './components/EditSkills';
import { EditProfileDialog } from './components/EditProfileDialog';
import { getProfileData } from '../services/userProfileService';

export const FreelanceProfile = () => {
  const { user, isAuthenticated, getAccessTokenSilently, logout } = useAuth0();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAboutMeEditOpen, setIsAboutMeEditOpen] = useState(false);
  const [isSkillsEditOpen, setIsSkillsEditOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.picture || "https://via.placeholder.com/150");
  const fileInputRef = useRef(null);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Sarah Johnson',
    title: 'Full Stack Developer',
    location: 'New York, USA',
    rating: '4.9',
    reviews: '124',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    portfolio: 'https://portfolio.com'
  });

  const [aboutMeData, setAboutMeData] = useState({
    description: 'Full Stack Developer with 5+ years of experience in building scalable web applications. Passionate about creating elegant solutions to complex problems. Specialized in React, Node.js, and cloud technologies.',
    email: `${user?.nickname}@gmail.com` || 'sarah.johnson@example.com',
    phone: '+1 234 567 8900'
  });

  const [skillsData, setSkillsData] = useState({
    skills: 'React, Node.js, TypeScript, Python, AWS, Docker, MongoDB, GraphQL',
    experiences: [
      {
        position: 'Senior Developer',
        company: 'Tech Solutions Inc.',
        period: '2020 - Present',
        description: 'Led development of multiple web applications, mentored junior developers, and implemented CI/CD pipelines.'
      },
      {
        position: 'Full Stack Developer',
        company: 'Digital Innovations',
        period: '2018 - 2020',
        description: 'Developed and maintained multiple client projects using React and Node.js.'
      }
    ]
  });

  const [userData, setUserData] = useState('');

  // Configuration
  const cloudName = 'dcn64hytu'; // Replace with your actual cloud name
  const uploadPreset = 'freelynk'; // Replace with your actual upload preset

  // State
  const [publicId, setPublicId] = useState('');

  // Cloudinary configuration
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  // Upload Widget Configuration
  const uwConfig = {
    cloudName,
    uploadPreset,
    sources: ['local'],
    showAdvancedOptions: false,
    cropping: true,
    multiple: false,
    maxFiles: 1,
    defaultSource: 'local',
    resourceType: 'image',
    folder: 'freelynk/profileimg',
    styles: {
      palette: {
        window: '#ffffff',
        sourceBg: '#f4f4f5',
        windowBorder: '#90a0b3',
        tabIcon: '#000000',
        inactiveTabIcon: '#555a5f',
        menuIcons: '#555a5f',
        link: '#000000',
        action: '#000000',
        inProgress: '#464646',
        complete: '#000000',
        error: '#cc0000',
        textDark: '#000000',
        textLight: '#fcfffd',
      },
    }
  };

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditProfile = () => {
    setIsEditModalOpen(false);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      axios.put(`http://localhost:8080/api/users/1/image`,{
        imageUrl: file.name
      })
        .then(response => {
          console.log("Image updated successfully", response.data);
        })
        .catch(error => {
          console.error("Error updating image", error);
        });
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAboutMeEdit = () => {
    setIsAboutMeEditOpen(true);
  };

  const handleSkillsEdit = () => {
    setIsSkillsEditOpen(true);
  };

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin + '/login'
      }
    });
  };

  useEffect(() => {
    if (publicId) {
      const imageUrl = cld.image(publicId).toURL();
      setProfileImage(imageUrl);
      // Update profile picture URL in backend

      console.log(imageUrl,"image url/////////////////////////////////////");
      axios.put(`http://localhost:8080/api/users/1/image`,imageUrl,{
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log("Profile image updated successfully", response.data);
      })
      .catch(error => {
        console.error("Error updating profile image", error);
      });
    }
  }, [publicId]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await getProfileData();
        console.log(response.data.profilePictureUrl,"user data tika me enwa");
        
        if (response.data.profilePictureUrl) {
          setProfileImage(response.data.profilePictureUrl);
          // Extract public ID from the Cloudinary URL
          const urlParts = response.data.profilePictureUrl.split('/');
          const publicId = urlParts[urlParts.length - 1].split('?')[0];
          setPublicId(publicId);
        }
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-[#1A1A1A] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-[#2A2A2A] rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                {publicId ? (
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-500">
                    <AdvancedImage
                      cldImg={cld.image(publicId)}
                      plugins={[responsive(), placeholder()]}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-orange-500 object-cover"
                  />
                )}
                <div className="mt-4">
                  <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{profileData.name}</h1>
                <p className="text-xl text-orange-500 mb-2">{profileData.title}</p>
                <p className="text-gray-400 mb-3">{profileData.location}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-white">{profileData.rating}</span>
                    <span className="text-gray-400 ml-1">({profileData.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
                      <FaGithub size={20} />
                    </a>
                    <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
                      <FaLinkedin size={20} />
                    </a>
                    <a href={profileData.portfolio} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
                      <FaGlobe size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleEditProfile}
                className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
              >
                Edit Profile
              </button>
              <button 
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        <EditProfileDialog
          profileData={profileData}
          setProfileData={setProfileData}
          isOpen={isEditModalOpen}
          onClose={handleCloseEditProfile}
        />

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
            <AboutMeTab 
              aboutMeData={aboutMeData}
              handleAboutMeEdit={handleAboutMeEdit}
            />
          )}

          {activeTab === 'skills' && (
            <SkillsTab 
              skillsData={skillsData}
              handleSkillsEdit={handleSkillsEdit}
            />
          )}

          {activeTab === 'portfolio' && (
            <PortfolioTab />
          )}
        </div>
      </div>

      {/* About Me Edit Modal */}
      {isAboutMeEditOpen && (
        <EditAboutMe aboutMeData={aboutMeData} setAboutMeData={setAboutMeData} setIsAboutMeEditOpen={setIsAboutMeEditOpen} />
      )}

      {/* Skills and Experience Edit Modal */}
      {isSkillsEditOpen && (
        <EditSkills skillsData={skillsData} setSkillsData={setSkillsData} setIsSkillsEditOpen={setIsSkillsEditOpen} />
      )}
    </div>
  );
}; 