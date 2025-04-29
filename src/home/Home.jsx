import React from 'react'
import { BiHome } from 'react-icons/bi'
import { CiSettings } from 'react-icons/ci'
import Sidebar from '../components/Sidebar'

export const Home = () => {
  return (
    <div className="font-sans bg-[#1A1A1A] min-h-screen text-white">
      {/* Navbar */}
      <header className="fixed w-full z-10 bg-[#1A1A1A] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">FreeLynk</h1>
            <div className="flex items-center space-x-8">
              <a href="/" className="text-white hover:text-orange-500">Home</a>
              <a href="/membership" className="text-white hover:text-orange-500">Membership</a>
              <a href="/careers" className="text-white hover:text-orange-500">Careers</a>
              <a href="/about" className="text-white hover:text-orange-500">About Us</a>
              <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">
                Lets Go!
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Sidebar */}

      {/* Main Content */}
      <div className="pt-20 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="grid grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-1 bg-orange-500"></div>
                <h2 className="text-xl text-orange-500">Welcome to FreeLynk</h2>
              </div>
              <h1 className="text-6xl font-bold leading-tight">
                FREELANCERS,<br />
                GATHER HERE
              </h1>
              <p className="text-gray-400 text-lg max-w-md">
                Engaging community for Freelancers, you can have fun while working, acquire new clients and complete daily challenges.
              </p>
              <button className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg hover:bg-orange-600 transition-colors">
                Lets Go!
              </button>
            </div>
            
            {/* Right Content - Circular Image */}
            <div className="relative">
              <div className="w-[500px] h-[500px] rounded-full bg-orange-500 overflow-hidden relative">
                <img 
                  src="/hero-image.jpg" 
                  alt="Freelancer"
                  className="w-full h-full object-cover"
                />
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-12 h-12">
                  <div className="animate-spin">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-8 left-8">
                  <div className="w-8 h-8 text-white">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

