import React, { useEffect, useRef, useState } from 'react'
import { BiHome } from 'react-icons/bi'
import { CiSettings } from 'react-icons/ci'
import Sidebar from '../components/Sidebar'
import gsap from 'gsap'

const NetworkCircle = ({ image, name, position, rotation, distance }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    // Create a bouncing animation for the image only
    gsap.to(imageRef.current, {
      y: -10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: Math.random() * 2,
    });

    // Add slight rotation to the image only
    gsap.to(imageRef.current, {
      rotate: "8deg",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "none",
      delay: Math.random() * 2,
    });
  }, []);

  const style = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: `rotate(${rotation}deg) translate(${distance}px) rotate(-${rotation}deg)`,
  };

  return (
    <div style={style} className="absolute">
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        <div ref={imageRef}>
          <img 
            src={image} 
            alt={name} 
            className="w-16 h-16 rounded-full border-2 border-white hover:scale-110 transition-transform duration-300"
          />
        </div>
        <p className="text-sm text-white text-center mt-2 whitespace-nowrap">{name}</p>
      </div>
    </div>
  );
};

const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const index = useRef(0);

  useEffect(() => {
    index.current = 0;
    setDisplayText('');

    const typeWriter = () => {
      if (index.current < text.length) {
        setDisplayText(text.substring(0, index.current + 1));
        index.current += 1;
        setTimeout(typeWriter, 100);
      }
    };

    typeWriter();

    return () => {
      index.current = text.length;
    };
  }, [text]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-blink">|</span>
    </span>
  );
};

export const Home = () => {
  const heroTextRef = useRef(null);
  const centerProfileRef = useRef(null);
  const circlesRef = useRef(null);
  const welcomeRef = useRef(null);
  const buttonRef = useRef(null);
  const descriptionRef = useRef(null);

  const profiles = [
    { name: 'Adam Crawford', image: '/avatars/hero-img-4.jpeg', rotation: 0, distance: 160 },
    { name: 'Christina Jones', image: '/avatars/hero-img-2.jpeg', rotation: 60, distance: 160 },
    { name: 'James Warner', image: '/avatars/hero-img-3.jpeg', rotation: 120, distance: 160 },
    { name: 'Sophia Garner', image: '/avatars/hero-img-1.jpeg', rotation: 180, distance: 160 },
    { name: 'Kevin Kapoor', image: '/avatars/hero-img-6.jpeg', rotation: 240, distance: 160 },
    { name: 'Megan Trainer', image: '/avatars/hero-img-7.jpeg', rotation: 300, distance: 160 },
  ];

  return (
    <div className="font-sans bg-[#1A1A1A] min-h-screen text-white">
      {/* Navbar */}
      <header className="fixed w-full z-10 bg-[#1A1A1A] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">FreeLynk</h1>
            <div className="flex items-center space-x-8">
              <a href="/" className="text-white hover:text-orange-500">Home</a>
              <a href="/membership" className="text-white hover:text-orange-500">Membership</a>
              <a href="/careers" className="text-white hover:text-orange-500">Careers</a>
              <a href="/about" className="text-white hover:text-orange-500">About Us</a>
              <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">
                Lets Go!
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-20 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="grid grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2" ref={welcomeRef}>
                <div className="w-12 h-1 bg-orange-500"></div>
                <h2 className="text-xl text-orange-500">
                  <TypewriterText text="Welcome to FreeLynk" />
                </h2>
              </div>
              <h1 className="text-6xl font-bold leading-tight" ref={heroTextRef}>
                FREELANCERS,<br />
                GATHER HERE
              </h1>
              <p className="text-gray-400 text-lg max-w-md" ref={descriptionRef}>
                Engaging community for Freelancers, you can have fun while working, acquire new clients and complete daily challenges.
              </p>
              <button 
                className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg hover:bg-orange-600 transition-colors"
                ref={buttonRef}
              >
                Lets Go!
              </button>
            </div>
            
            {/* Right Content - Network Circle */}
            <div className="relative">
              <div className="w-[500px] h-[500px] relative mx-auto">
                {/* Center Profile */}
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
                  ref={centerProfileRef}
                >
                  <div className="relative">
                    <img 
                      src="/avatars/hero-img-8.jpeg" 
                      alt="Monica Geller" 
                      className="w-32 h-32 rounded-full border-4 border-white mx-auto"
                    />
                    <div className="absolute -top-2 -right-2 bg-orange-400 text-white text-sm px-2 py-1 rounded-full">
                      ★ 4.8
                    </div>
                  </div>
                  <h3 className="text-white text-xl mt-2">Monica Geller</h3>
                </div>

                {/* Circular Background Rings */}
                <div ref={circlesRef}>
                  <div className="absolute inset-0 rounded-full border-2 border-orange-700 opacity-10"></div>
                  <div className="absolute inset-8 rounded-full border-2 border-orange-600 opacity-15"></div>
                  <div className="absolute inset-16 rounded-full border-2 border-orange-600 opacity-20"></div>
                </div>

                {/* Surrounding Profiles */}
                {profiles.map((profile, index) => (
                  <NetworkCircle key={index} {...profile} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

