import React from 'react';
import { Coffee, Flame, Heart, Sparkles, Users, Award } from 'lucide-react';
import { ABOUT_IMAGES } from '../data/images';

interface AboutPageProps {
  onNavigateToMenu: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToMenu }) => {
  return (
    <div id="about-page" className="min-h-screen bg-[#100a07] text-[#faede1] pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* Hero Story Banner */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2a1a11] border border-[#563622] text-[#dfad7d] text-xs font-semibold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Soul of Our Cafe</span>
          </div>

          <h1 className="font-serif-elegant text-4xl sm:text-5xl lg:text-6xl font-normal text-[#FAF5EF] tracking-tight mb-6">
            Crafting Comfort, One Bite at a Time.
          </h1>

          <p className="font-sans-clean text-base sm:text-lg text-[#d3beab] leading-relaxed font-light">
            Brew &amp; Brown was born from a singular obsession: to create a warm sanctuary where molten chocolate, hand-pulled espresso, and rustic wood-fired pizza bring people together.
          </p>
        </div>

        {/* 2-Column Story with Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#dfad7d] block">
              Our Journey
            </span>
            <h2 className="font-serif-elegant text-3xl sm:text-4xl font-normal text-[#faf3eb]">
              From a Passionate Oven to Your Neighbourhood Haven
            </h2>
            <p className="text-sm text-[#ceb8a6] leading-relaxed font-light">
              It started in 2018 with a humble cast iron skillet, slabs of authentic 55% Belgian dark chocolate, and an uncompromising quest for the world’s fudgiest brownie. We tested hundreds of batches until we achieved that sacred balance: a paper-thin crackly top, a dense melt-in-mouth interior, and rich cocoa aromatics.
            </p>
            <p className="text-sm text-[#ceb8a6] leading-relaxed font-light">
              Today, Brew &amp; Brown has grown into a vibrant cafe haven. Every morning at dawn, our ovens fire up with fresh brownie trays and sourdough pizza crusts, while our espresso grinder dials in single-origin estate beans.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#2e1d13]">
              <div>
                <span className="font-serif-elegant text-3xl font-bold text-[#dfad7d] block">
                  12+
                </span>
                <span className="text-xs text-[#a98f7e]">Artisan Brownie Varieties</span>
              </div>
              <div>
                <span className="font-serif-elegant text-3xl font-bold text-[#dfad7d] block">
                  100%
                </span>
                <span className="text-xs text-[#a98f7e]">Fresh Hand-pulled Espresso</span>
              </div>
              <div>
                <span className="font-serif-elegant text-3xl font-bold text-[#dfad7d] block">
                  4.9★
                </span>
                <span className="text-xs text-[#a98f7e]">Guest Satisfaction</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#3e271a] bg-[#1e130c]">
              <img
                src={ABOUT_IMAGES.interiorWarm}
                alt="Brew & Brown cafe interior"
                className="w-full h-[440px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100a07] via-transparent to-transparent" />
            </div>

            {/* Floating Highlight Card */}
            <div className="absolute -bottom-6 -left-6 bg-[#23150d] border border-[#523321] p-5 rounded-2xl shadow-xl max-w-xs hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#341e12] text-[#dfad7d]">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-elegant font-bold text-sm text-[#faf3eb]">
                    Cozy Ambience
                  </h4>
                  <p className="text-xs text-[#b89f8d]">
                    Warm lighting, soft acoustics, and inviting spaces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Brew & Brown */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#dfad7d] block mb-2">
              The Brew &amp; Brown Standard
            </span>
            <h2 className="font-serif-elegant text-3xl sm:text-4xl font-normal text-[#FAF5EF]">
              What Makes Every Visit Special
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#19100a] border border-[#342217] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#2b1b11] text-[#dfad7d] flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-serif-elegant text-lg font-bold text-[#faf3eb]">
                Freshly Prepared Food
              </h3>
              <p className="text-xs text-[#ceb8a6] leading-relaxed font-light">
                No pre-frozen shortcuts. Every pizza dough is stretched live, and every mocktail is shaken to order with crisp botanicals.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#19100a] border border-[#342217] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#2b1b11] text-[#dfad7d] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif-elegant text-lg font-bold text-[#faf3eb]">
                Signature Brownies
              </h3>
              <p className="text-xs text-[#ceb8a6] leading-relaxed font-light">
                From Lotus Biscoff to molten Nutella and classic walnuts, each brownie is an intensely rich chocolate experience.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#19100a] border border-[#342217] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#2b1b11] text-[#dfad7d] flex items-center justify-center">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="font-serif-elegant text-lg font-bold text-[#faf3eb]">
                Specialty Coffee
              </h3>
              <p className="text-xs text-[#ceb8a6] leading-relaxed font-light">
                Sourced directly from Chikmagalur and Nilgiri plantations, extracted on calibrated high-precision Italian espresso machines.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#19100a] border border-[#342217] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#2b1b11] text-[#dfad7d] flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif-elegant text-lg font-bold text-[#faf3eb]">
                Memorable Cafe Moments
              </h3>
              <p className="text-xs text-[#ceb8a6] leading-relaxed font-light">
                Whether working remotely, catching up over coffee, or celebrating weekend wins with friends, we welcome you home.
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Grid Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-2xl overflow-hidden h-64 border border-[#3e271a]">
            <img
              src={ABOUT_IMAGES.founderOrBarista}
              alt="Barista at work"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-64 border border-[#3e271a]">
            <img
              src={ABOUT_IMAGES.ovenBaking}
              alt="Baking fresh desserts"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-64 border border-[#3e271a]">
            <img
              src={ABOUT_IMAGES.coffeeCraft}
              alt="Latte art preparation"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Bottom Menu Invitation */}
        <div className="text-center bg-[#1d120c] p-10 sm:p-14 rounded-3xl border border-[#3d271a] space-y-6">
          <h2 className="font-serif-elegant text-3xl sm:text-4xl font-bold text-[#faf3eb]">
            Come Experience the Warmth
          </h2>
          <p className="text-sm text-[#ceb8a6] max-w-lg mx-auto font-light leading-relaxed">
            Our baristas are ready to brew your favourite drink, and the brownie warmers are on.
          </p>
          <button
            onClick={onNavigateToMenu}
            className="px-8 py-3.5 rounded-full text-sm font-semibold bg-[#dfad7d] text-[#1c1109] hover:bg-[#ecc397] transition-all cursor-pointer shadow-lg"
          >
            Explore Menu
          </button>
        </div>

      </div>
    </div>
  );
};
