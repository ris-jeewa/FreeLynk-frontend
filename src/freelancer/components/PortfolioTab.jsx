import React from 'react';

const PortfolioTab = () => {
  return (
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
      </div>
    </div>
  );
};

export default PortfolioTab; 