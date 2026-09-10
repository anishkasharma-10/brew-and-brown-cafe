import React from 'react';
import { Hero } from '../components/Hero';
import { CategoryCards } from '../components/CategoryCards';
import { BrownieSpeciality } from '../components/BrownieSpeciality';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { Product } from '../types';
import { Coffee, Award, Sparkles, Heart, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onNavigateToMenu: (category?: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateToMenu,
  onAddToCart,
  onSelectProduct,
}) => {
  return (
    <div id="home-page" className="w-full bg-[#100a07]">
      {/* 
        1. HOMEPAGE HERO:
        Full-screen animated background slideshow every 3 seconds,
        exact headline, sub-headline, explore menu button, decorative line, and indicators.
      */}
      <Hero onExploreMenu={() => onNavigateToMenu()} />

      {/* 
        2. HOMEPAGE AFTER HERO:
        "Made for Every Craving" with 4 category cards:
        BROWNIES, PIZZAS, MOCKTAILS, DESSERTS
      */}
      <CategoryCards onSelectCategory={(cat) => onNavigateToMenu(cat)} />

      {/* 
        3. BROWNIE SPECIALITY:
        Heading: “Something Chocolatey?”
        Subheading: “Rich, fudgy and baked to satisfy your sweetest cravings.”
        All 12 brownie items with photos and prices.
      */}
      <BrownieSpeciality
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
      />

      {/* 
        4. CAFE PILLARS / ARTISANAL PROMISE:
        Visual luxury banner showcasing the cafe experience.
      */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#170f0a] border-t border-b border-[#2d1c13] text-[#faede1]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#1e130c] border border-[#392418]">
              <div className="p-3 rounded-xl bg-[#2e1d13] text-[#dfad7d] shrink-0">
                <Coffee className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif-elegant font-bold text-lg text-[#faf3eb] mb-1">
                  100% Specialty Arabica
                </h4>
                <p className="text-xs text-[#ceb8a6] leading-relaxed font-light">
                  Single-origin estate beans slow roasted and pulled fresh for every cup.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#1e130c] border border-[#392418]">
              <div className="p-3 rounded-xl bg-[#2e1d13] text-[#dfad7d] shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif-elegant font-bold text-lg text-[#faf3eb] mb-1">
                  Pure Belgian Chocolate
                </h4>
                <p className="text-xs text-[#ceb8a6] leading-relaxed font-light">
                  No artificial compounds; only real couverture cocoa butter in our brownies.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#1e130c] border border-[#392418]">
              <div className="p-3 rounded-xl bg-[#2e1d13] text-[#dfad7d] shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif-elegant font-bold text-lg text-[#faf3eb] mb-1">
                  Hand-Tossed Sourdough
                </h4>
                <p className="text-xs text-[#ceb8a6] leading-relaxed font-light">
                  24-hour slow fermented pizza dough baked at blistering 400°C temperatures.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#1e130c] border border-[#392418]">
              <div className="p-3 rounded-xl bg-[#2e1d13] text-[#dfad7d] shrink-0">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif-elegant font-bold text-lg text-[#faf3eb] mb-1">
                  Warm Ambient Haven
                </h4>
                <p className="text-xs text-[#ceb8a6] leading-relaxed font-light">
                  Cozy wood accents, gentle acoustics, and welcoming seats for every mood.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        5. CALL TO ACTION BANNER:
        Encourages visitors to explore the complete menu.
      */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 text-center text-[#faede1] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop")',
          }}
        />
        <div className="absolute inset-0 bg-[#0c0805]/85 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#dfad7d]">
            Fresh Bakes Every Two Hours
          </span>
          <h2 className="font-serif-elegant text-3xl sm:text-5xl font-normal text-[#FAF5EF]">
            Ready to Discover Your Next Favourite Flavour?
          </h2>
          <p className="text-base text-[#d8c3b2] max-w-xl mx-auto font-light">
            Whether it's a quiet afternoon with a cold brew or a lively evening pizza feast,
            our doors are open for you.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigateToMenu()}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold bg-gradient-to-r from-[#dfad7d] to-[#c78e58] hover:from-[#ecc297] hover:to-[#d6985f] text-[#1c1109] shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <span>Explore Full Menu</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 
        6. TESTIMONIALS:
      */}
      <TestimonialsSection />
    </div>
  );
};
