import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { IoIosArrowDown } from "react-icons/io";

export const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();


  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signin',
      }
    });
  };

  const handleSignUp = () => {
    // loginWithRedirect({
    //   authorizationParams: {
    //     screen_hint: 'signup',
    //   },
    //   initialScreen: 'signUp'
    // });
    navigate('/signup');
  };

  return (
    <header className="fixed w-full z-10 bg-[#1A1A1A] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <nav className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-white transition-colors"
          >
            FreeLynk
          </Link>
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-orange-500 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-orange-500 transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/membership"
              className="text-white hover:text-orange-500 transition-colors"
            >
              Membership
            </Link>
            <Link
              to="/careers"
              className="text-white hover:text-orange-500 transition-colors"
            >
              Careers
            </Link>
          </div>
          {!isAuthenticated ? (
            <div className="flex items-center gap-5">
              <button
                onClick={handleLogin}
                className="text-white hover:text-orange-500 transition-colors cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={handleSignUp}
                className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="relative">
              <div className="flex items-center gap-2">
                  <img
                    src={user?.picture}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-orange-500"
                  />
                <IoIosArrowDown 
                  className="text-white hover:text-orange-500 transition-colors cursor-pointer" 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                />
              </div>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#2A2A2A] rounded-lg shadow-lg py-2">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-white font-semibold">{user?.name}</p>
                    <p className="text-sm text-gray-400">{user?.email}</p>
                  </div>
                  <Link
                    to="/freelance-profile/1"
                    className="block px-4 py-2 text-white hover:bg-[#3A3A3A] transition-colors"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-white hover:bg-[#3A3A3A] transition-colors"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-[#3A3A3A] transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
