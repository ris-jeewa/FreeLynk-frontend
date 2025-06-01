import React from "react";

export const Projects = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Posted Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Project Card */}
        <div className="bg-[#1A1A1A] rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-2">
            E-commerce Website Development
          </h3>
          <p className="text-gray-400 mb-4">
            Looking for a full-stack developer to build an e-commerce
            platform...
          </p>
          <div className="flex justify-between items-center">
            <span className="text-orange-500">$5,000 - $10,000</span>
            <span className="text-gray-400">Posted 2 days ago</span>
          </div>
        </div>
        {/* Add more project cards here */}
      </div>
    </div>
  );
};
