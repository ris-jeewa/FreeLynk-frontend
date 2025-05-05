import React, { useEffect } from 'react'
import { HeroSection } from '../components/home/HeroSection';
import { TrustedClientsSec } from '../components/home/TrustedClientsSec';
import { CategorySection } from '../components/home/CategorySection';
import { HowToGetStarted } from '../components/home/HowToGetStarted';
import SpecialitySection from '../components/home/SpecialitySection';
import { useAuth0 } from '@auth0/auth0-react';

export const Home = () => {

  const { getAccessTokenSilently } = useAuth0();
  
  useEffect(() => {
    const getToken = async () => {
      const token = await getAccessTokenSilently();
      console.log(token);
    }
    getToken();
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

          {/* How to Get Started Section */}
          <HowToGetStarted />

          {/* Speciality Section */}
          <SpecialitySection />
        </div>
      </div>
    </div>
  )
}

