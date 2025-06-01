import React, { useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

export const CompanyDetails = ({ companyDetails, setCompanyDetails }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState(companyDetails);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedDetails(companyDetails);
  };

  const handleSave = () => {
    setCompanyDetails(editedDetails);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedDetails(companyDetails);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white mb-6">Company Details</h2>
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
          <label className="block text-gray-400 mb-2">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={isEditing ? editedDetails.companyName : companyDetails.companyName}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 ${
              !isEditing ? 'cursor-not-allowed opacity-70' : ''
            }`}
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Industry</label>
          <input
            type="text"
            name="industry"
            value={isEditing ? editedDetails.industry : companyDetails.industry}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 ${
              !isEditing ? 'cursor-not-allowed opacity-70' : ''
            }`}
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Company Size</label>
          <input
            type="text"
            name="companySize"
            value={isEditing ? editedDetails.companySize : companyDetails.companySize}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 ${
              !isEditing ? 'cursor-not-allowed opacity-70' : ''
            }`}
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Website</label>
          <input
            type="url"
            name="website"
            value={isEditing ? editedDetails.website : companyDetails.website}
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
