import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#181818] border-t border-gray-800 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} FreeLynk. All rights reserved.</div>
        <div className="flex gap-6 items-center">
          <Link to="/about" className="hover:text-orange-500 text-gray-400 transition-colors">About Us</Link>
          <Link to="/membership" className="hover:text-orange-500 text-gray-400 transition-colors">Membership</Link>
          <Link to="/careers" className="hover:text-orange-500 text-gray-400 transition-colors">Careers</Link>
          <Link to="/privacy-policy" className="hover:text-orange-500 text-gray-400 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-orange-500 text-gray-400 transition-colors">Terms & Conditions</Link>
        </div>
        <div className="flex gap-4">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors"><FaGithub size={20} /></a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors"><FaTwitter size={20} /></a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors"><FaLinkedin size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 