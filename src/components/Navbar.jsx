import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getBestImage } from "../utils/imageUtils";

export const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, isLoading, user } = useAuth0();

  const [profileImage, setProfileImage] = useState(() =>
    getBestImage(user?.picture, "PROFILE")
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    setProfileImage(getBestImage(user?.picture, "PROFILE"));
  }, [user?.picture]);

  useEffect(() => {
    if (!menuOpen) return;

    const onMouseDown = (e) => {
      const el = menuRef.current;
      if (!el) return;
      if (el.contains(e.target)) return;
      setMenuOpen(false);
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  console.log(user,'user' , user?.sub	);
  const profilePath = useMemo(() => {
    const id = user?.sub ? encodeURIComponent(user.sub) : "me";
    return `/freelance-profile/${id}`;
  }, [user?.sub]);

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
                  <div className="relative" ref={menuRef}>
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={menuOpen}
                      onClick={() => setMenuOpen((v) => !v)}
                      className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <img
                        src={profileImage}
                        alt={user?.name ? `${user.name} profile` : "Profile"}
                        className="w-10 h-10 rounded-full object-cover border border-gray-700"
                      />
                    </button>

                    {menuOpen && (
                      <div
                        role="menu"
                        className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-md border border-gray-800 bg-[#121212] shadow-lg z-50"
                      >
                        <Link
                          role="menuitem"
                          to={profilePath}
                          onClick={() => setMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
                        >
                          View profile
                        </Link>
                        <button
                          role="menuitem"
                          type="button"
                          onClick={() => {
                            setMenuOpen(false);
                            logout({
                              logoutParams: { returnTo: window.location.origin },
                            });
                          }}
                          className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-800"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
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
