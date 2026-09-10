import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HERO_SLIDESHOW_IMAGES } from '../data/images';

interface HeroProps {
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic background slideshow every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDESHOW_IMAGES.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Preload next image to ensure no flickering, white flash or delay
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % HERO_SLIDESHOW_IMAGES.length;
    const img = new Image();
    img.src = HERO_SLIDESHOW_IMAGES[nextIndex].url;
  }, [currentIndex]);

  const currentImage = HERO_SLIDESHOW_IMAGES[currentIndex];

  return (
    <div id="hero-section" className="relative w-full h-screen min-h-[640px] max-h-[1080px] flex items-center justify-center overflow-hidden bg-[#0d0907]">
      {/* 
        Full-Screen Background Slideshow 
        Crossfade (1.2s) + Ken Burns Slow Zoom
      */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentImage.id}
            initial={{ opacity: 0, scale: 1.0 }}
            animate={{ opacity: 1, scale: 1.08 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.2, ease: 'easeInOut' },
              scale: { duration: 4.5, ease: 'easeOut' },
            }}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url("${currentImage.url}")`,
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
            }}
          />
        </AnimatePresence>

        {/* 
          Refined Dark Gradient Overlay:
          Ensures high legibility for white/gold hero typography,
          while preserving the vibrant colors and photography details behind it.
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0a07]/80 via-[#100b08]/65 to-[#0e0a07]/90 backdrop-contrast-[1.05]" />
        
        {/* Subtle warm vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0d0907]/30 to-[#0b0806]/85" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center justify-center pt-16">
        
        {/* Small Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3e271a]/60 border border-[#b88654]/40 backdrop-blur-md mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#e5b887]" />
          <span className="text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-[#f3dfca]">
            WELCOME TO BREW & BROWN
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#e5b887]" />
        </motion.div>

        {/* Main Heading (EXACT TEXT) */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="font-serif-elegant text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-[#FAF5EF] leading-[1.1] max-w-4xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]"
        >
          “Savour Every Moment,
          <br />
          <span className="italic font-normal text-[#E8C29A]">One Bite at a Time.”</span>
        </motion.h1>

        {/* Below Heading (EXACT TEXT) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-sans-clean mt-6 text-base sm:text-lg md:text-xl text-[#e8d5c4] max-w-2xl font-light leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
        >
          Brownies, pizzas, desserts &amp; refreshing mocktails —
          <br className="hidden sm:inline" /> made fresh for every little craving.
        </motion.p>

        {/* Hero CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-8 sm:mt-10"
        >
          <button
            id="hero-explore-menu-btn"
            onClick={onExploreMenu}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full text-base sm:text-lg font-medium text-[#1c1109] bg-gradient-to-r from-[#e7be94] via-[#dfad7d] to-[#cf9764] shadow-[0_10px_30px_rgba(223,173,125,0.35)] hover:shadow-[0_15px_40px_rgba(223,173,125,0.5)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 ease-out border border-[#f8e0c7]/60 cursor-pointer"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
        </motion.div>

        {/* Line Below Menu Button (EXACT TEXT WITH DECORATIVE LINES) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 flex items-center justify-center gap-3 sm:gap-5 w-full max-w-lg text-[#cdb7a3]/90"
        >
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#b88654]/60" />
          <span className="text-xs sm:text-sm tracking-wide font-medium uppercase text-[#dfbe9f]">
            Your Next Favourite Bite Is Waiting.
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#b88654]/60" />
        </motion.div>

        {/* Ambient current scene title tag */}
        <motion.div
          key={`caption-${currentImage.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ duration: 0.5 }}
          className="mt-8 text-xs text-[#bba18c] font-light tracking-wider hidden md:block"
        >
          Currently playing: {currentImage.title}
        </motion.div>
      </div>

      {/* Hero Slideshow Indicators / Minimal Dots */}
      <div id="slideshow-indicators" className="absolute bottom-8 left-0 right-0 z-20 flex items-center justify-center gap-2 sm:gap-2.5">
        {HERO_SLIDESHOW_IMAGES.map((img, idx) => (
          <button
            key={img.id}
            id={`indicator-dot-${idx}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}: ${img.title}`}
            className="group relative py-2 px-1 focus:outline-none cursor-pointer"
          >
            <span
              className={`block rounded-full transition-all duration-500 ease-out ${
                idx === currentIndex
                  ? 'w-8 sm:w-10 h-2 bg-[#dfad7d] shadow-[0_0_12px_#dfad7d]'
                  : 'w-2 h-2 bg-[#ffffff]/35 group-hover:bg-[#ffffff]/60'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
