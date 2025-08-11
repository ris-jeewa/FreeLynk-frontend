import React from 'react';
import { FaEdit } from 'react-icons/fa';

const AboutMeTab = ({ aboutMeData, handleAboutMeEdit }) => {

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white mb-2">About Me</h2>
        <button
          onClick={handleAboutMeEdit}
          className='border-1 border-gray-500 rounded-full p-2'
        >
          <FaEdit size={20} className='hover:text-orange-500'/>
        </button>
      </div>
      <p className={`leading-relaxed p-2 rounded-lg bg-gray-900 border-1 border-gray-500 ${aboutMeData.bio == ''|| null ? 'text-gray-400' : 'text-white'}`}>
        {aboutMeData.bio == ''|| null ? 'No bio' : aboutMeData.bio}
      </p>

      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 mb-2">Email</label>
            <p className={`p-2 rounded-lg bg-gray-900 border-1 border-gray-500 ${aboutMeData.email == null ? 'text-gray-400' : 'text-white'}`}>{aboutMeData.email == null ? 'No email' : aboutMeData.email}</p>
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Phone</label>
            <p className={`p-2 rounded-lg bg-gray-900 border-1 border-gray-500 ${aboutMeData.phone == null ? 'text-gray-400' : 'text-white'}`}>{aboutMeData.phone == null ? 'No phone number' : aboutMeData.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMeTab; 