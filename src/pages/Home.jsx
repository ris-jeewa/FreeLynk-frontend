import React from 'react'
import { HeroSection } from '../components/home/HeroSection';
import { TrustedClientsSec } from '../components/home/TrustedClientsSec';
import { CategorySection } from '../components/home/CategorySection';


export const Home = () => {
  

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

