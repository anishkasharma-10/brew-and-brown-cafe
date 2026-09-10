import React, { useState } from 'react';
import { Plus, Check, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (
    product: Product,
    quantity: number,
    size?: 'Regular' | 'Medium' | 'Large'
  ) => void;
  onOpenModal: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onOpenModal,
}) => {
  const [selectedPizzaSize, setSelectedPizzaSize] = useState<'Regular' | 'Medium' | 'Large'>('Regular');
  const [isAdded, setIsAdded] = useState(false);

  let currentPrice = product.price;
  if (product.category === 'Pizzas') {
    if (selectedPizzaSize === 'Medium') currentPrice += 80;
    if (selectedPizzaSize === 'Large') currentPrice += 150;
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(
      product,
      1,
      product.category === 'Pizzas' ? selectedPizzaSize : undefined
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 800);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onOpenModal(product)}
      className="group relative bg-[#18100b] rounded-2xl overflow-hidden border border-[#342217] hover:border-[#b88654]/70 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between cursor-pointer"
    >
      {/* Food Image Container */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#24160f]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
        />
        
        {/* Subtle dark gradient overlay at bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#18100b] via-transparent to-black/25" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#b45309] text-white shadow-sm">
              <Star className="w-2.5 h-2.5 fill-current" />
              Popular
            </span>
          )}
          {product.isSpecialty && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#9c6644] text-[#faede1] shadow-sm">
              Specialty
            </span>
          )}
          {product.isVeg && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#1b3820]/90 text-[#7ee787] border border-[#238636]">
              Veg
            </span>
          )}
        </div>

        {/* Price Tag Badge */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="px-3 py-1 rounded-full text-sm font-bold bg-[#0d0805]/85 text-[#f4d1ad] border border-[#5a3b29] backdrop-blur-md">
            ₹{currentPrice}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <h3 className="font-serif-elegant text-lg font-bold text-[#faede1] group-hover:text-[#dfad7d] transition-colors leading-snug">
              {product.name}
            </h3>
          </div>

          <p className="text-xs text-[#ceb8a6] line-clamp-2 leading-relaxed font-light mb-4">
            {product.description}
          </p>

          {/* For Pizzas: Inline Size Selector */}
          {product.category === 'Pizzas' && (
            <div
              className="mb-4 flex items-center justify-between gap-1 p-1 bg-[#23150d] rounded-xl border border-[#3e261a]"
              onClick={(e) => e.stopPropagation()}
            >
              {(['Regular', 'Medium', 'Large'] as const).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedPizzaSize(size)}
                  className={`flex-1 py-1 px-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                    selectedPizzaSize === size
                      ? 'bg-[#dfad7d] text-[#1a0f09] shadow-sm'
                      : 'text-[#ceb8a6] hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="pt-3 border-t border-[#2a1b13] flex items-center justify-between">
          <span className="text-[11px] text-[#9b7e6c] font-medium group-hover:text-[#dfad7d] transition-colors">
            Tap for details
          </span>

          <button
            id={`add-to-cart-${product.id}`}
            type="button"
            onClick={handleQuickAdd}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer shadow-sm active:scale-95 ${
              isAdded
                ? 'bg-[#15803d] text-white border border-[#16a34a]'
                : 'bg-[#3a2317] hover:bg-[#dfad7d] text-[#faede1] hover:text-[#1c1109] border border-[#583623] hover:border-[#dfad7d]'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
