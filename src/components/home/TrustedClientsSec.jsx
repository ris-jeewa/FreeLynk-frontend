import React from "react";
import { FaQuoteLeft } from 'react-icons/fa';

export const TrustedClientsSec = () => {
  return (
    <div className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">
          Trusted by Leading Companies
        </h2>
        <p className="text-gray-400 text-lg">
          Join thousands of successful freelancers who have found their perfect
          match
        </p>
      </div>

      {/* Client Logos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
        <div className="bg-[#434040] p-6 rounded-xl flex items-center justify-center hover:bg-[#333333] transition-colors">
          <img
            src="/logos/google.png"
            alt="Google"
            className="h-12 opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="bg-[#434040] p-6 rounded-xl flex items-center justify-center hover:bg-[#333333] transition-colors">
          <img
            src="/logos/microsoft.png"
            alt="Microsoft"
            className="h-12 opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="bg-[#434040] p-6 rounded-xl flex items-center justify-center hover:bg-[#333333] transition-colors">
          <img
            src="/logos/amazon.png"
            alt="Amazon"
            className="h-12 opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="bg-[#434040] p-6 rounded-xl flex items-center justify-center hover:bg-[#333333] transition-colors">
          <img
            src="/logos/apple.png"
            alt="Apple"
            className="h-12 opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#2A2A2A] p-8 rounded-xl">
          <FaQuoteLeft className="text-orange-500 text-2xl mb-4" />
          <p className="text-gray-300 mb-6">
            "FreeLynk has transformed how we find and work with freelancers. The
            quality of talent is exceptional."
          </p>
          <div className="flex items-center">
            <img
              src="/avatars/sarah.jpeg"
              alt="Sarah Johnson"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h4 className="font-bold">Sarah Johnson</h4>
              <p className="text-gray-400 text-sm">CTO, TechCorp</p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A2A2A] p-8 rounded-xl">
          <FaQuoteLeft className="text-orange-500 text-2xl mb-4" />
          <p className="text-gray-300 mb-6">
            "The platform's intuitive interface and robust features make it our
            go-to for all freelance needs."
          </p>
          <div className="flex items-center">
            <img
              src="/avatars/micheal.jpeg"
              alt="Michael Chen"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h4 className="font-bold">Michael Chen</h4>
              <p className="text-gray-400 text-sm">
                Product Manager, InnovateX
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A2A2A] p-8 rounded-xl">
          <FaQuoteLeft className="text-orange-500 text-2xl mb-4" />
          <p className="text-gray-300 mb-6">
            "FreeLynk's community-driven approach has helped us build lasting
            relationships with top freelancers."
          </p>
          <div className="flex items-center">
            <img
              src="/avatars/emma.jpeg"
              alt="Emma Davis"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h4 className="font-bold">Emma Davis</h4>
              <p className="text-gray-400 text-sm">CEO, Creative Solutions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
