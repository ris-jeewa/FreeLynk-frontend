import React from 'react';
import { Link } from 'react-router-dom';
import { features } from '../../assets/Constants';

const SpecialitySection = () => {
  

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose FreeLynk?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join the platform that connects top talent with exciting projects worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-[#2A2A2A] p-6 rounded-lg hover:bg-[#3A3A3A] transition-colors"
            >
              <div className="flex flex-col items-center text-center">
                {feature.icon}
                <h3 className="text-xl font-semibold text-white mt-4 mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/signup"
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Join with us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpecialitySection; 