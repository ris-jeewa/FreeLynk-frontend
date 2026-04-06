import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0();

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

            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <button
                    onClick={() =>
                      logout({
                        logoutParams: { returnTo: window.location.origin },
                      })
                    }
                    style={{
                      marginTop: 8,
                      backgroundColor: "orange",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => loginWithRedirect()}
                    style={{
                      marginTop: 8,
                      backgroundColor: "orange",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Login
                  </button>
                )}
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
