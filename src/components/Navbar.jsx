import React from "react";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useAuthContext } from "@asgardeo/auth-react";

export const Navbar = () => {
  const { state, signIn, signOut } = useAuthContext();

  // const { isAuthenticated, user, logout, isFreelancer, isClient, isAdmin, asgardeoSignIn } = useAuth();

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
            {state.isAuthenticated ? (
              <>
                {/* Show Post Project button only for clients and admins */}
                {(isClient() || isAdmin()) && (
                  <Link to="/post-project" className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors flex items-center gap-2">
                    <PlusOutlined />
                    Post a Project
                  </Link>
                )}
                <Link to={getProfileLink()} className="text-white hover:text-orange-500 transition-colors">
                  {getProfileText()}
                </Link>
                <div className="flex items-center gap-4">
                  <span className="text-gray-400 text-sm">Welcome, {user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors text-sm"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-3">
                <button onClick={() => signIn()}>Login / Sign Up</button>
              </div>
            )}
          </div>
        </nav>
      </div >
    </header >
  );
};
