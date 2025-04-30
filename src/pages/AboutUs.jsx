import React from 'react';
import { FaShieldAlt, FaHandshake, FaGraduationCap, FaStar } from 'react-icons/fa';
import { RiContractFill } from 'react-icons/ri';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-[#232323] p-8 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
    <div className="text-orange-500 text-4xl mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
);

const AboutUs = () => {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Secure Platform",
      description: "Our platform ensures both clients and freelancers are protected through advanced verification systems and secure payment protocols."
    },
    {
      icon: <RiContractFill />,
      title: "Secure Contracts",
      description: "Highly secure and legally binding contracts protect both parties, ensuring transparent and fair business relationships."
    },
    {
      icon: <FaHandshake />,
      title: "Equal Opportunities",
      description: "Everyone gets a fair chance to showcase their skills and secure projects, regardless of their experience level."
    },
    {
      icon: <FaGraduationCap />,
      title: "Learn & Grow",
      description: "Access comprehensive tutorials and resources to master freelancing skills and grow your career."
    }
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white pt-10">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">About FreeLynk</h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            FreeLynk is revolutionizing the freelancing industry by creating a secure, 
            fair, and transparent platform where talent meets opportunity.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-2xl p-12 mb-20">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            To create a trusted freelancing ecosystem where both clients and freelancers can work 
            together with complete peace of mind, fostering growth, fairness, and innovation in 
            the digital workforce.
          </p>
        </div>

        {/* Key Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Why Choose FreeLynk?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#232323] p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <FaStar className="text-orange-500 mr-2" />
                <h3 className="text-xl font-semibold">Trust & Security</h3>
              </div>
              <p className="text-gray-400">
                Our platform implements strict verification processes and secure payment systems 
                to ensure safe transactions and protect both parties.
              </p>
            </div>
            <div className="bg-[#232323] p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <FaStar className="text-orange-500 mr-2" />
                <h3 className="text-xl font-semibold">Fair Opportunity</h3>
              </div>
              <p className="text-gray-400">
                We believe in giving everyone a chance to succeed. Our platform provides equal 
                opportunities for both new and experienced freelancers.
              </p>
            </div>
            <div className="bg-[#232323] p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <FaStar className="text-orange-500 mr-2" />
                <h3 className="text-xl font-semibold">Learn & Earn</h3>
              </div>
              <p className="text-gray-400">
                Access our extensive tutorial library to enhance your skills while earning 
                through real-world projects.
              </p>
            </div>
          </div>
        </div>

        {/* Tutorial Section Preview */}
        <div className="bg-[#232323] rounded-2xl p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Start Your Freelancing Journey</h2>
            <p className="text-gray-400 mb-8">
              Whether you're new to freelancing or looking to enhance your skills, our 
              comprehensive tutorial section has everything you need to succeed.
            </p>
            <button className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-colors">
              Explore Tutorials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 