import React from 'react'
import { useNavigate } from 'react-router-dom';
import { categories } from '../../assets/Constants';

export const CategorySection = () => {
    const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    // Navigate to the browse page with the selected category
    navigate(`/browse?category=${encodeURIComponent(category.name)}`);
  };

  return (
    <div className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Explore Categories</h2>
              <p className="text-gray-400 text-lg">Find the perfect freelancer or job in your field of interest</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <div 
                  key={index}
                  onClick={() => handleCategoryClick(category)}
                  className="group cursor-pointer"
                >
                  <div className="bg-[#2A2A2A] p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
                    <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
  )
}
