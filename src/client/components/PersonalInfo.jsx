import React, { useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

export const PersonalInfo = ({ personalInfo, setPersonalInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(personalInfo);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedInfo(personalInfo);
  };

  const handleSave = () => {
    setPersonalInfo(editedInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedInfo(personalInfo);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white mb-6">
          Personal Information
        </h2>
        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className='border-1 border-gray-500 rounded-full p-2 hover:bg-green-500 hover:border-green-500 transition-colors'
            >
              <FaSave size={20} className='hover:text-white'/>
            </button>
            <button
              onClick={handleCancel}
              className='border-1 border-gray-500 rounded-full p-2 hover:bg-red-500 hover:border-red-500 transition-colors'
            >
              <FaTimes size={20} className='hover:text-white'/>
            </button>
          </div>
        ) : (
          <button
            onClick={handleEdit}
            className='border-1 border-gray-500 rounded-full p-2 hover:bg-orange-500 hover:border-orange-500 transition-colors'
          >
            <FaEdit size={20} className='hover:text-white'/>
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-400 mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={isEditing ? editedInfo.fullName : personalInfo.fullName}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 ${
              !isEditing ? 'cursor-not-allowed opacity-70' : ''
            }`}
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={isEditing ? editedInfo.email : personalInfo.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 ${
              !isEditing ? 'cursor-not-allowed opacity-70' : ''
            }`}
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={isEditing ? editedInfo.phone : personalInfo.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 ${
              !isEditing ? 'cursor-not-allowed opacity-70' : ''
            }`}
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={isEditing ? editedInfo.location : personalInfo.location}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 ${
              !isEditing ? 'cursor-not-allowed opacity-70' : ''
            }`}
          />
        </div>
      </div>
    </div>
  );
};
