import React from "react";
import { profiles } from "../../assets/Constants";
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from "react";

const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const index = useRef(0);

  useEffect(() => {
    index.current = 0;
    setDisplayText("");

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

const NetworkCircle = ({ image, name, rotation, distance }) => {
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
    position: "absolute",
    left: "50%",
    top: "50%",
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
        <p className="text-sm text-white text-center mt-2 whitespace-nowrap">
          {name}
        </p>
      </div>
    </div>
  );
};

export const HeroSection = () => {
  return (
    <div className="grid grid-cols-2 gap-12 items-center min-h-[80vh]">
      {/* Left Content */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <div className="w-12 h-1 bg-orange-500"></div>
          <h2 className="text-xl text-orange-500">
            <TypewriterText text="Welcome to FreeLynk" />
          </h2>
        </div>
        <h1 className="text-6xl font-bold leading-tight">
          FREELANCERS,
          <br />
          GATHER HERE
        </h1>
        <p className="text-gray-400 text-lg max-w-md">
          Engaging community for Freelancers, you can have fun while working,
          acquire new clients and complete daily challenges.
        </p>
        <button className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg hover:bg-orange-600 transition-colors">
          Lets Go!
        </button>
      </div>

      {/* Right Content - Network Circle */}
      <div className="relative">
        <div className="w-[500px] h-[500px] relative mx-auto">
          {/* Center Profile */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="relative">
              <img
                src="/avatars/hero-img-8.jpeg"
                alt="Monica Geller"
                className="w-32 h-32 rounded-full border-4 border-white mx-auto"
              />
              <div className="absolute -top-2 -right-2 bg-blue-400 text-white text-sm px-2 py-1 rounded-full">
                ★ 4.8
              </div>
            </div>
            <h3 className="text-white text-xl mt-2">Monica Geller</h3>
          </div>

          {/* Circular Background Rings */}
          <div>
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
  );
};
