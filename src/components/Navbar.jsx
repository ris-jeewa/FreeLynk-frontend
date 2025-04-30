import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="fixed w-full z-10 bg-[#1A1A1A] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <nav className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-white transition-colors">
              FreeLynk
            </Link>
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-white hover:text-orange-500 transition-colors">Home</Link>
              <Link to="/about" className="text-white hover:text-orange-500 transition-colors">About Us</Link>
              <Link to="/membership" className="text-white hover:text-orange-500 transition-colors">Membership</Link>
              <Link to="/careers" className="text-white hover:text-orange-500 transition-colors">Careers</Link>
              <Link to="/login" className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">
                Lets Go!
              </Link>
            </div>
          </nav>
        </div>
      </header>
  );
};
