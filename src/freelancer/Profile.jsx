import React, { useState, useRef } from 'react';
import { FaUser, FaCode, FaBriefcase, FaStar, FaEdit, FaGithub, FaLinkedin, FaGlobe, FaTimes } from 'react-icons/fa';

export const FreelanceProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAboutMeEditOpen, setIsAboutMeEditOpen] = useState(false);
  const [isSkillsEditOpen, setIsSkillsEditOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150");
  const fileInputRef = useRef(null);
  const [profileData, setProfileData] = useState({
    name: 'Sarah Johnson',
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
    email: 'sarah.johnson@example.com',
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

  const [newExperience, setNewExperience] = useState({
    position: '',
    company: '',
    period: '',
    description: ''
  });

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to save the data
    setIsEditModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAboutMeEdit = () => {
    setIsAboutMeEditOpen(true);
  };

  const handleAboutMeSave = (e) => {
    e.preventDefault();
    setIsAboutMeEditOpen(false);
  };

  const handleAboutMeChange = (e) => {
    const { name, value } = e.target;
    setAboutMeData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillsEdit = () => {
    setIsSkillsEditOpen(true);
  };

  const handleSkillsSave = (e) => {
    e.preventDefault();
    setIsSkillsEditOpen(false);
  };

  const handleSkillsChange = (e) => {
    const { name, value } = e.target;
    setSkillsData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewExperienceChange = (e) => {
    const { name, value } = e.target;
    setNewExperience(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddExperience = (e) => {
    e.preventDefault();
    setSkillsData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExperience]
    }));
    setNewExperience({
      position: '',
      company: '',
      period: '',
      description: ''
    });
  };

  const handleRemoveExperience = (index) => {
    setSkillsData(prev => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-[#2A2A2A] rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-orange-500 object-cover"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <button 
                  onClick={handleImageClick}
                  className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full hover:bg-orange-600 transition-colors"
                >
                  <FaEdit className="text-white" />
                </button>
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
            <button 
              onClick={handleEditProfile}
              className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#2A2A2A] rounded-lg p-8 max-w-2xl w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={profileData.title}
                      onChange={handleInputChange}
                      className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={profileData.location}
                      onChange={handleInputChange}
                      className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Rating</label>
                    <input
                      type="text"
                      name="rating"
                      value={profileData.rating}
                      onChange={handleInputChange}
                      className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Number of Reviews</label>
                    <input
                      type="text"
                      name="reviews"
                      value={profileData.reviews}
                      onChange={handleInputChange}
                      className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">GitHub URL</label>
                    <input
                      type="url"
                      name="github"
                      value={profileData.github}
                      onChange={handleInputChange}
                      className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">LinkedIn URL</label>
                    <input
                      type="url"
                      name="linkedin"
                      value={profileData.linkedin}
                      onChange={handleInputChange}
                      className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Portfolio URL</label>
                    <input
                      type="url"
                      name="portfolio"
                      value={profileData.portfolio}
                      onChange={handleInputChange}
                      className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white mb-2">About Me</h2>
                <button
                  onClick={handleAboutMeEdit}
                  className='border-1 border-gray-500 rounded-full p-2'
                >
                  <FaEdit size={20} className='hover:text-orange-500 '/>
                </button>
              </div>
              <p className="text-gray-400 leading-relaxed  p-2 rounded-lg bg-gray-900 border-1 border-gray-500">
                {aboutMeData.description}
              </p>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 mb-2">Email</label>
                    <p className="text-gray-400 p-2 rounded-lg bg-gray-900  border-1 border-gray-500">{aboutMeData.email}</p>
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Phone</label>
                    <p className="text-gray-400 p-2 rounded-lg bg-gray-900  border-1 border-gray-500">{aboutMeData.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white mb-6">Skills</h2>
                <button
                  onClick={handleSkillsEdit}
                  className='border-1 border-gray-500 rounded-full p-2'
                >
                  <FaEdit size={20} className='hover:text-orange-500'/>
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {skillsData.skills.split(',').map((skill) => (
                  <span
                    key={skill.trim()}
                    className="bg-[#1A1A1A] text-white px-4 py-2 rounded-full border border-gray-700"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Work Experience</h2>
                <div className="space-y-6">
                  {skillsData.experiences.map((exp, index) => (
                    <div key={index} className="border-l-2 border-orange-500 pl-4">
                      <h3 className="text-xl font-semibold text-white">{exp.position}</h3>
                      <p className="text-orange-500">{exp.company}</p>
                      <p className="text-gray-400">{exp.period}</p>
                      <p className="text-gray-400 mt-2">{exp.description}</p>
                    </div>
                  ))}
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

      {/* About Me Edit Modal */}
      {isAboutMeEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#2A2A2A] rounded-lg p-8 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Edit About Me</h2>
              <button 
                onClick={() => setIsAboutMeEditOpen(false)}
              >
                <FaTimes size={24} className='hover:text-orange-500'/>
              </button>
            </div>
            <form onSubmit={handleAboutMeSave} className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2">Description</label>
                <textarea
                  name="description"
                  value={aboutMeData.description}
                  onChange={handleAboutMeChange}
                  className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 h-32"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={aboutMeData.email}
                    onChange={handleAboutMeChange}
                    className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={aboutMeData.phone}
                    onChange={handleAboutMeChange}
                    className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsAboutMeEditOpen(false)}
                  className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Skills and Experience Edit Modal */}
      {isSkillsEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#2A2A2A] rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Edit Skills & Experience</h2>
              <button 
                onClick={() => setIsSkillsEditOpen(false)}
              >
                <FaTimes size={24} className='hover:text-orange-500'/>
              </button>
            </div>
            <form onSubmit={handleSkillsSave} className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2">Skills (comma-separated)</label>
                <textarea
                  name="skills"
                  value={skillsData.skills}
                  onChange={handleSkillsChange}
                  className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 h-32"
                  placeholder="Enter skills separated by commas"
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Work Experience</h3>
                <div className="space-y-4">
                  {skillsData.experiences.map((exp, index) => (
                    <div key={index} className="bg-[#1A1A1A] p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-medium">{exp.position}</h4>
                        <button
                          type="button"
                          onClick={() => handleRemoveExperience(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <FaTimes />
                        </button>
                      </div>
                      <p className="text-orange-500">{exp.company}</p>
                      <p className="text-gray-400">{exp.period}</p>
                      <p className="text-gray-400 mt-2">{exp.description}</p>
                    </div>
                  ))}

                  <div className="bg-[#1A1A1A] p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-4">Add New Experience</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 mb-2">Position</label>
                        <input
                          type="text"
                          name="position"
                          value={newExperience.position}
                          onChange={handleNewExperienceChange}
                          className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Company</label>
                        <input
                          type="text"
                          name="company"
                          value={newExperience.company}
                          onChange={handleNewExperienceChange}
                          className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Period</label>
                        <input
                          type="text"
                          name="period"
                          value={newExperience.period}
                          onChange={handleNewExperienceChange}
                          className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                          placeholder="e.g., 2020 - Present"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Description</label>
                        <textarea
                          name="description"
                          value={newExperience.description}
                          onChange={handleNewExperienceChange}
                          className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 h-24"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleAddExperience}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                      >
                        Add Experience
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsSkillsEditOpen(false)}
                  className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}; 