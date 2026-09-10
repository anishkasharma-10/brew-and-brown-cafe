import React from 'react';
import { Plus, Flame, Star } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/menuData';

interface BrownieSpecialityProps {
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const BrownieSpeciality: React.FC<BrownieSpecialityProps> = ({
  onAddToCart,
  onSelectProduct,
}) => {
  const brownieProducts = PRODUCTS.filter((p) => p.category === 'Brownies');

  return (
    <section id="brownie-speciality-section" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#0e0906] text-[#faede1] relative overflow-hidden">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#8b4513]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-[#d4a373]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#352014] border border-[#6b422a] text-[#dfad7d] text-xs font-semibold tracking-widest uppercase mb-4 shadow-inner">
            <Flame className="w-3.5 h-3.5 text-[#e59866]" />
            <span>Signature Brownie Craft</span>
          </div>

          {/* EXACT HEADING */}
          <h2 className="font-serif-elegant text-3xl sm:text-5xl lg:text-6xl font-normal text-[#FAF5EF] tracking-tight mb-5">
            “Something Chocolatey?”
          </h2>

          {/* EXACT SUBHEADING */}
          <p className="font-sans-clean text-base sm:text-lg text-[#d3beab] leading-relaxed max-w-2xl mx-auto font-light">
            “Rich, fudgy and baked to satisfy your sweetest cravings.”
          </p>
        </div>

        {/* 12 Brownies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
          {brownieProducts.map((product) => (
            <div
              key={product.id}
              id={`brownie-item-${product.id}`}
              className="group relative bg-[#19110c] rounded-2xl overflow-hidden border border-[#342217] hover:border-[#b88654]/70 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.7)] flex flex-col justify-between cursor-pointer"
              onClick={() => onSelectProduct(product)}
            >
              {/* Product Image */}
              <div className="relative h-52 w-full overflow-hidden bg-[#24160f]">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#19110c] via-transparent to-black/20" />

                {/* Best Seller or Specialty tag */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {product.isBestSeller && (
                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#b45309] text-white shadow-sm">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      Best Seller
                    </span>
                  )}
                  {product.isVeg && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#1b3820]/90 text-[#7ee787] border border-[#238636]">
                      Pure Veg
                    </span>
                  )}
                </div>

                {/* Price Tag Pill */}
                <div className="absolute bottom-3 right-3">
                  <span className="px-3 py-1 rounded-full text-sm font-bold bg-[#0d0805]/85 text-[#f4d1ad] border border-[#5a3b29] backdrop-blur-md">
                    ₹{product.price}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-serif-elegant text-lg font-bold text-[#faede1] group-hover:text-[#dfad7d] transition-colors leading-snug mb-1.5">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#c4ac9a] line-clamp-2 leading-relaxed font-light mb-4">
                    {product.description}
                  </p>
                </div>

                {/* Bottom Bar: Action */}
                <div className="pt-3 border-t border-[#291a12] flex items-center justify-between">
                  <span className="text-xs text-[#a88a75] font-medium group-hover:text-[#d3a87c] transition-colors">
                    View recipe details →
                  </span>

                  <button
                    id={`add-brownie-${product.id}-btn`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#3b2418] hover:bg-[#dfad7d] text-[#faede1] hover:text-[#1c1109] border border-[#5c3a27] hover:border-[#dfad7d] transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
