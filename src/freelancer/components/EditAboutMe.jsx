import React from "react";
import { FaTimes } from "react-icons/fa";

export const EditAboutMe = ({ aboutMeData, setAboutMeData , setIsAboutMeEditOpen }) => {

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2A2A2A] rounded-lg p-8 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Edit About Me</h2>
          <button onClick={() => setIsAboutMeEditOpen(false)}>
            <FaTimes size={24} className="hover:text-orange-500" />
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
  );
};
