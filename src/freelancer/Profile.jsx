import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaCode, FaBriefcase, FaStar, FaEdit, FaGithub, FaLinkedin, FaGlobe, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
import CloudinaryUploadWidget from '../components/CloudinaryUploadWidget';
import AboutMeTab from './components/AboutMeTab';
import SkillsTab from './components/SkillsTab';
import PortfolioTab from './components/PortfolioTab';
import { EditAboutMe } from './components/EditAboutMe';
import { EditSkills } from './components/EditSkills';
import { EditProfileDialog } from './components/EditProfileDialog';
import { getProfileData, updateUserImage } from '../services/userProfileService';
import { getBestImage, handleImageError } from '../utils/imageUtils';
// import { shouldRedirectToLogin, clearAuthData } from '../utils/authUtils';

export const FreelanceProfile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently, logout } = useAuth0();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAboutMeEditOpen, setIsAboutMeEditOpen] = useState(false);
  const [isSkillsEditOpen, setIsSkillsEditOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(getBestImage(user?.picture, 'PROFILE'));
  const [profileData, setProfileData] = useState({
    id: 0,
    name: user?.name,
    title: '',
    location: '',
    rating: 0,
    reviews: 0,
    github: '',
    linkedin: '',
    portfolio: ''
  });

  const [aboutMeData, setAboutMeData] = useState("");

  const [skillsData, setSkillsData] = useState("");

  const [userData, setUserData] = useState('');

  // Configuration
  const cloudName = 'dcn64hytu'; 
  const uploadPreset = 'freelynk';

  // State
  const [publicId, setPublicId] = useState('');
  const [imageUrl, setImageUrl] = useState('');

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

  const handleAboutMeEdit = () => {
    setIsAboutMeEditOpen(true);
  };

  const handleSkillsEdit = () => {
    setIsSkillsEditOpen(true);
  };

  const handleLogout = () => {
    
  };

  // Save image URL to database when it's uploaded
  useEffect(() => {
    const saveImageToDatabase = async () => {
      if (imageUrl && profileData.id) {
        try {
          await updateUserImage(profileData.id, imageUrl);
          console.log("Profile image updated successfully");
        } catch (error) {
          console.error("Error updating profile image", error);
        }
      }
    };

    saveImageToDatabase();
  }, [imageUrl, profileData.id]);

  // Update publicId and profileImage when imageUrl changes (for display)
  useEffect(() => {
    if (imageUrl && !publicId) {
      // Extract publicId from Cloudinary URL for display purposes
      try {
        const urlParts = imageUrl.split('/');
        const fileName = urlParts[urlParts.length - 1];
        const publicIdFromUrl = fileName.split('.')[0];
        
        // If it's in a folder, include folder path
        const folderIndex = urlParts.findIndex(part => part === 'upload');
        if (folderIndex >= 0 && folderIndex < urlParts.length - 1) {
          const folderPath = urlParts.slice(folderIndex + 1, -1).join('/');
          const extractedPublicId = folderPath ? `${folderPath}/${publicIdFromUrl}` : publicIdFromUrl;
          setPublicId(extractedPublicId);
        } else {
          setPublicId(publicIdFromUrl);
        }
        setProfileImage(imageUrl);
      } catch (error) {
        console.error("Error extracting publicId from URL:", error);
      }
    }
  }, [imageUrl, publicId]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await getProfileData();
        console.log('Fetched user data:', response);
        
        if (response) {
          // Update profile data with fetched user data
          setProfileData(prevData => ({
            ...prevData,
            id: response.id,
            name: response.name,
            title: response.freelancerProfile?.title,
            location: response.freelancerProfile?.location,
            rating: response.freelancerProfile?.rating?.toString(),
            reviews: response.freelancerProfile?.numberOfReviews?.toString(),
            github: response.freelancerProfile?.githubUrl,
            linkedin: response.freelancerProfile?.linkedinUrl,
            portfolio: response.freelancerProfile?.portfolioUrl,
          }));

          // Update about me data
          setAboutMeData({
            id: response.id,
            bio: response.bio,
            email: response.email,
            phone: response.phoneNumber 
          });

          // Update skills data
          if (response.freelancerProfile?.skills) {
            setSkillsData(prevData => ({
              ...prevData,
              skills: response.freelancerProfile.skills
            }));
          }
          
          if (response.profilePictureUrl) {
            setProfileImage(response.profilePictureUrl);
            setImageUrl(response.profilePictureUrl);
            // Extract public ID from the Cloudinary URL
            try {
              const urlParts = response.profilePictureUrl.split('/');
              const fileName = urlParts[urlParts.length - 1].split('?')[0];
              const publicIdFromUrl = fileName.split('.')[0];
              
              // If it's in a folder, include folder path
              const folderIndex = urlParts.findIndex(part => part === 'upload');
              if (folderIndex >= 0 && folderIndex < urlParts.length - 1) {
                const folderPath = urlParts.slice(folderIndex + 1, -1).join('/');
                const extractedPublicId = folderPath ? `${folderPath}/${publicIdFromUrl}` : publicIdFromUrl;
                setPublicId(extractedPublicId);
              } else {
                setPublicId(publicIdFromUrl);
              }
            } catch (error) {
              console.error("Error extracting publicId from saved URL:", error);
            }
          }
          
          setUserData(response);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, []);

  // Check authentication status
  // useEffect(() => {
  //   if (shouldRedirectToLogin(isAuthenticated, isLoading)) {
  //     console.log('No authentication found, redirecting to login');
  //     navigate('/login');
  //   }
  // }, [isAuthenticated, isLoading, navigate]);

  // Show loading while Auth0 is initializing
  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
  //         <p className="mt-4 text-gray-400">Loading profile...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // Check if user is authenticated (either via Auth0 or custom auth)
  const isUserAuthenticated = isAuthenticated || localStorage.getItem('authToken');
  
  // Show loading if not authenticated
  if (!isUserAuthenticated && !isLoading) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Redirecting to login...</p>
        </div>
      </div>
    );
  }

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
                    onError={(e) => handleImageError(e, 'PROFILE')}
                  />
                )}
                <CloudinaryUploadWidget 
                  uwConfig={uwConfig} 
                  setPublicId={setPublicId}
                  setImageUrl={setImageUrl}
                />
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
          userId={profileData.id}
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