import React from 'react';
import { FaClipboardList, FaUserFriends, FaHandshake, FaLock } from 'react-icons/fa';

export const HowToGetStarted = () => {
  const steps = [
    {
      icon: <FaClipboardList className="text-4xl text-orange-500" />,
      title: "Post a Job",
      description: "Create a detailed job posting with your requirements and budget"
    },
    {
      icon: <FaUserFriends className="text-4xl text-orange-500" />,
      title: "Choose Freelancer",
      description: "Review proposals and select the perfect freelancer for your project"
    },
    {
      icon: <FaHandshake className="text-4xl text-orange-500" />,
      title: "Collaborate",
      description: "Work together using our platform's communication tools"
    },
    {
      icon: <FaLock className="text-4xl text-orange-500" />,
      title: "Pay Securely",
      description: "Release payment only when you're satisfied with the work"
    }
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">How to Get Started with FreeLynk</h2>
        <p className="text-gray-400">Follow these simple steps to find the perfect freelancer for your project</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div 
            key={index}
            className="bg-[#2A2A2A] p-6 rounded-lg hover:bg-[#3A3A3A] transition-colors"
          >
            <div className="flex flex-col items-center text-center">
              {step.icon}
              <h3 className="text-xl font-semibold text-white mt-4 mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}; 