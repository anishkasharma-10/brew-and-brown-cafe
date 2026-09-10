import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORY_CARD_IMAGES } from '../data/images';

interface CategoryCardsProps {
  onSelectCategory: (categoryName: string) => void;
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'brownies',
      name: 'BROWNIES',
      categoryQuery: 'Brownies',
      tagline: 'Signature Fudgy Indulgence',
      description: 'Slow-baked with 55% Belgian chocolate, gooey centers, and crinkled tops.',
      image: CATEGORY_CARD_IMAGES.brownies,
      badge: 'House Special',
    },
    {
      id: 'pizzas',
      name: 'PIZZAS',
      categoryQuery: 'Pizzas',
      tagline: 'Hand-stretched Artisan Crust',
      description: 'Fire-baked with San Marzano sauce, fresh mozzarella, and aromatic farm herbs.',
      image: CATEGORY_CARD_IMAGES.pizzas,
      badge: 'Woodfired Style',
    },
    {
      id: 'mocktails',
      name: 'MOCKTAILS',
      categoryQuery: 'Mocktails',
      tagline: 'Botanical & Citrus Elixirs',
      description: 'Vibrant infusions muddled with fresh herbs, pure fruit purees, and sparkling fizz.',
      image: CATEGORY_CARD_IMAGES.mocktails,
      badge: 'Craft Mixology',
    },
    {
      id: 'desserts',
      name: 'DESSERTS',
      categoryQuery: 'Desserts',
      tagline: 'Sweet Afterthoughts',
      description: 'Velvety New York cheesecakes, warm lava cups, golden waffles, and sundaes.',
      image: CATEGORY_CARD_IMAGES.desserts,
      badge: 'Freshly Churned',
    },
  ];

  return (
    <section id="category-cards-section" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#140d09] text-[#faede1] relative overflow-hidden">
      {/* Subtle ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-[#9c6644]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2f1f16] border border-[#5d3b2b] text-[#e0b284] text-xs font-semibold tracking-widest uppercase mb-4">
            <Sparkles className="w-3 h-3" />
            <span>Curated Artisan Collections</span>
          </div>
          
          <h2 className="font-serif-elegant text-3xl sm:text-5xl lg:text-6xl font-normal text-[#FAF5EF] tracking-tight mb-6">
            Made for Every Craving
          </h2>

          <p className="font-sans-clean text-base sm:text-lg text-[#d8c0ad] leading-relaxed">
            From rich chocolate brownies to freshly baked pizzas, refreshing mocktails and comforting coffee —
            there’s always something worth coming back for.
          </p>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              id={`category-card-${cat.id}`}
              className="group relative rounded-2xl overflow-hidden bg-[#1e140e] border border-[#3b271c] hover:border-[#b88654]/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between"
            >
              {/* Image Container with Hover Zoom */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e140e] via-[#1e140e]/30 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-[#0e0906]/80 text-[#e9c7a6] border border-[#6b4733]/50 backdrop-blur-md">
                    {cat.badge}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 pt-2 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-serif-elegant text-2xl font-bold tracking-wider text-[#faede1] mb-1.5 group-hover:text-[#e5b887] transition-colors">
                    {cat.name}
                  </h3>
                  <div className="text-xs uppercase tracking-wider text-[#cfa276] font-medium mb-3">
                    {cat.tagline}
                  </div>
                  <p className="text-sm text-[#ceb8a6] line-clamp-3 leading-relaxed mb-6 font-light">
                    {cat.description}
                  </p>
                </div>

                {/* View Menu Button */}
                <button
                  id={`view-menu-${cat.id}-btn`}
                  onClick={() => onSelectCategory(cat.categoryQuery)}
                  className="w-full py-3 px-4 rounded-xl bg-[#2b1b13] hover:bg-[#d8a474] text-[#f2e1d0] hover:text-[#190f09] border border-[#4a3022] hover:border-[#d8a474] font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-sm group-hover:shadow-md"
                >
                  <span>View Menu</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
