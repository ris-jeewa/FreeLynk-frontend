import React, { useState, useEffect } from 'react'
import { HeroSection } from '../components/home/HeroSection';
import { TrustedClientsSec } from '../components/home/TrustedClientsSec';
import { CategorySection } from '../components/home/CategorySection';
import { isLoggedIn, login, handleCallback } from '../services/authis';



export const Home = () => {

  const [authState, setAuthState] = useState({
    loggedIn: isLoggedIn(),
    user: null,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      handleCallback().then((tokens) => {
        setAuthState({ loggedIn: true, user: tokens });
        window.history.replaceState(null, "", "/");
      }).catch((err) => {
        setAuthState({ loggedIn: false, user: null });
      });
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("sp") || params.has("tenantDomain")) {
      window.history.replaceState(null, "", "/");
    }
  }, []);
  

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <div className="px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <HeroSection />

          {/* Trusted Clients Section */}
          <TrustedClientsSec />

          {/* Categories Section */}
          <CategorySection />
        </div>
      </div>
    </div>
  )
}

