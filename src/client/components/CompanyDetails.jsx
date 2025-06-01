import React from "react";

export const CompanyDetails = () => {
  return (
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
  );
};
