import React from "react";
import { FaTools, FaHeart, FaClock } from "react-icons/fa";

const Membership = () => {
  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#2A2A2A] rounded-lg p-12 shadow-2xl">
          {/* Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-orange-500 rounded-full mb-6">
              <FaTools className="text-white text-3xl" />
            </div>
          </div>

          {/* Main Message */}
          <h1 className="text-4xl font-bold text-white mb-6">
            Membership Page
          </h1>
          
          <div className="text-2xl font-semibold text-orange-500 mb-8">
            🚧 Under Development 🚧
          </div>

          {/* Description */}
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            We're working hard to bring you an amazing membership experience with exclusive benefits, 
            premium features, and special perks for our valued community members.
          </p>

          {/* Features Coming Soon */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#3A3A3A] rounded-lg p-6">
              <FaHeart className="text-orange-500 text-2xl mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Premium Features</h3>
              <p className="text-gray-400 text-sm">
                Exclusive tools and advanced capabilities
              </p>
            </div>
            <div className="bg-[#3A3A3A] rounded-lg p-6">
              <FaClock className="text-orange-500 text-2xl mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Priority Support</h3>
              <p className="text-gray-400 text-sm">
                Faster response times and dedicated assistance
              </p>
            </div>
            <div className="bg-[#3A3A3A] rounded-lg p-6">
              <FaTools className="text-orange-500 text-2xl mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Advanced Tools</h3>
              <p className="text-gray-400 text-sm">
                Professional-grade resources and analytics
              </p>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-300 text-lg mb-4">
              Thank you for your patience and interest in our membership program!
            </p>
            <p className="text-orange-500 font-semibold">
              We'll let you know as soon as it's ready. Stay tuned! 🎉
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-8">
            <a 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership; 