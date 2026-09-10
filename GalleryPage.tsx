import React, { useState } from 'react';
import { Sparkles, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/menuData';
import { GalleryItem } from '../types';

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Interiors', 'Brownies', 'Pizzas', 'Mocktails', 'Coffee & Desserts'] as const;

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const activeItem: GalleryItem | null =
    activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) =>
        prev === 0 ? filteredItems.length - 1 : (prev ?? 0) - 1
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) =>
        prev === filteredItems.length - 1 ? 0 : (prev ?? 0) + 1
      );
    }
  };

  return (
    <div id="gallery-page" className="min-h-screen bg-[#100a07] text-[#faede1] pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Gallery Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2a1a11] border border-[#563622] text-[#dfad7d] text-xs font-semibold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visual Atmosphere &amp; Delights</span>
          </div>

          <h1 className="font-serif-elegant text-4xl sm:text-5xl lg:text-6xl font-normal text-[#FAF5EF] tracking-tight mb-4">
            The Brew &amp; Brown Gallery
          </h1>

          <p className="font-sans-clean text-sm sm:text-base text-[#d1bbaa] max-w-xl mx-auto font-light leading-relaxed">
            Glimpses of our warm ambient spaces, sizzling brownie skillets, wood-fired crusts, and vibrant mocktail pours.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveLightboxIndex(null);
                }}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'bg-[#dfad7d] text-[#1c1109] border-[#dfad7d] shadow-md'
                    : 'bg-[#19100a] text-[#ceb8a6] border-[#342217] hover:bg-[#28180e] hover:text-[#faede1]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Masonry-Style Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              id={`gallery-item-${item.id}`}
              onClick={() => setActiveLightboxIndex(index)}
              className="group relative rounded-2xl overflow-hidden bg-[#1a110a] border border-[#342217] hover:border-[#b88654]/70 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.7)] cursor-pointer h-80"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0906]/95 via-[#0e0906]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Tag in top-left */}
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-[#0e0805]/80 text-[#dfad7d] border border-[#593925] backdrop-blur-md">
                  {item.category}
                </span>
              </div>

              {/* Fullscreen icon top-right on hover */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-black/60 text-white border border-white/20">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              {/* Caption Card at Bottom */}
              <div className="absolute bottom-0 inset-x-0 p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <h3 className="font-serif-elegant text-lg font-bold text-[#faf3eb] group-hover:text-[#dfad7d] transition-colors leading-snug mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#ceb8a6] line-clamp-2 font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeItem && (
          <div
            id="gallery-lightbox-overlay"
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
            onClick={() => setActiveLightboxIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxIndex(null)}
              aria-label="Close Lightbox"
              className="absolute top-5 right-5 z-20 p-3 rounded-full bg-black/70 hover:bg-[#3d2417] text-white border border-white/10 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Nav Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous Image"
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/70 hover:bg-[#3d2417] text-white border border-white/10 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Nav Button */}
            <button
              onClick={handleNext}
              aria-label="Next Image"
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/70 hover:bg-[#3d2417] text-white border border-white/10 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Card Container */}
            <div
              className="relative max-w-4xl max-h-[88vh] w-full bg-[#18110b] border border-[#3e271a] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden max-h-[70vh]">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="p-6 bg-[#18110b] flex items-center justify-between border-t border-[#311f15]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#352014] text-[#dfad7d] border border-[#5e3b26]">
                      {activeItem.category}
                    </span>
                    <span className="text-xs text-[#a98f7e]">
                      Image {(activeLightboxIndex ?? 0) + 1} of {filteredItems.length}
                    </span>
                  </div>
                  <h3 className="font-serif-elegant text-xl font-bold text-[#faf3eb]">
                    {activeItem.title}
                  </h3>
                  <p className="text-xs text-[#ceb8a6] mt-1 font-light">
                    {activeItem.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
