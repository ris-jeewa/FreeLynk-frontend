import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { isLoggedIn } from "../services/Auth";
import { login,handleCallback,STORAGE, parseJwt } from "../services/Auth";

export const Navbar = () => {

  const [authState, setAuthState] = useState({
    loggedIn: isLoggedIn(),
    user: null,
  });

  useEffect(() => {
    // If callback contains code, handle it
    const url = new URL(window.location.href);
    if (url.searchParams.get("code") && url.searchParams.get("state")) {
      handleCallback()
        .then((tokens) => {
          // optionally parse id_token to get user info
          const idToken = localStorage.getItem(STORAGE.ID_TOKEN);
          const payload = idToken ? parseJwt(idToken) : null;
          setAuthState({ loggedIn: true, user: payload });
        })
        .catch((err) => {
          console.error("Callback handling failed:", err);
          setAuthState({ loggedIn: false, user: null });
        });
    } else {
      if (isLoggedIn()) {
        const idToken = localStorage.getItem(STORAGE.ID_TOKEN);
        const payload = idToken ? parseJwt(idToken) : null;
        setAuthState({ loggedIn: true, user: payload });
      } else {
        setAuthState({ loggedIn: false, user: null });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <div>
                  <strong>Logged in</strong>
                </div>
                {/* {authState.user && (
                  <pre style={{ maxWidth: 600, background: "#f2f2f2", padding: 8 }}>
                    {JSON.stringify(authState.user, null, 2)}
                  </pre>
                )} */}
                <button onClick={() => { logout(); }} style={{ marginTop: 8 }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <div>
                  <strong>Not logged in</strong>
                </div>
                <button
                  onClick={() => {
                    login();
                  }}
                  style={{ marginTop: 8 }}
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
