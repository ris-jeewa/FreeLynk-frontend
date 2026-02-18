import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { login,handleCallback,isLoggedIn, logout } from "../services/authis";

export const Navbar = () => {

  const [authState, setAuthState] = useState({
    loggedIn: isLoggedIn(),
    user: null,
  });

  useEffect(() => {
  setAuthState({
    loggedIn: isLoggedIn(),
    user: null,
  });
}, []);



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
                {/* {authState.user && (
                  <pre style={{ maxWidth: 600, background: "#f2f2f2", padding: 8 }}>
                    {JSON.stringify(authState.user, null, 2)}
                  </pre>
                )} */}
                <button onClick={() => { logout(); }} style={{ marginTop: 8, backgroundColor: 'orange', color: 'white', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    login();
                  }}
                  style={{ marginTop: 8, backgroundColor: 'orange', color: 'white', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </nav>
      </div >
    </header >
  );
};
