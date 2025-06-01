import React from "react";

export const PersonalInfo = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Personal Information
      </h2>
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
  );
};
