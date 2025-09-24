import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { isLoggedIn } from "../services/Auth";

export const Navbar = () => {

  const [authState, setAuthState] = useState({
    loggedIn: isLoggedIn(),
    user: null,
  });

  const handleLogout = () => {
    logout();
  };

  const getProfileLink = () => {
    if (isFreelancer()) return "/freelance-profile/1";
    if (isClient()) return "/client-profile/1";
    if (isAdmin()) return "/admin/dashboard";
    return "/";
  };

  const getProfileText = () => {
    if (isAdmin()) return "Admin Panel";
    return "Profile";
  };

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
            
            {authState.loggedIn ? (
              <>
              {authState.user && (  
                              <pre style={{ maxWidth: 600, background: "#f2f2f2", padding: 8 }}>
                                {JSON.stringify(authState.user, null, 2)}
                              </pre>
              )}
              </>
            ) : (
              <Link to="/login" className="text-white hover:text-orange-500 transition-colors">Login</Link>
            )}

          </div>
        </nav>
      </div >
    </header >
  );
};
