import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, ShoppingBag, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    quantity: number,
    size?: 'Regular' | 'Medium' | 'Large',
    notes?: string
  ) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<'Regular' | 'Medium' | 'Large'>('Regular');
  const [quantity, setQuantity] = useState(1);
  const [extraCheese, setExtraCheese] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize('Regular');
      setQuantity(1);
      setExtraCheese(false);
      setSpecialInstructions('');
      setAddedAnimation(false);
    }
  }, [product]);

  if (!product) return null;

  // Calculate dynamic price based on size and pizza options
  let unitPrice = product.price;
  if (product.category === 'Pizzas') {
    if (selectedSize === 'Medium') unitPrice += 80;
    if (selectedSize === 'Large') unitPrice += 150;
    if (extraCheese) unitPrice += 60;
  }

  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    setAddedAnimation(true);
    let notes = specialInstructions;
    if (extraCheese) {
      notes = notes ? `Extra Cheese Burst. ${notes}` : 'Extra Cheese Burst';
    }

    onAddToCart(
      product,
      quantity,
      product.category === 'Pizzas' ? selectedSize : undefined,
      notes
    );

    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 450);
  };

  return (
    <div
      id="product-detail-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="product-detail-modal"
        className="relative w-full max-w-2xl bg-[#18100b] border border-[#442c1f] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-product-modal-btn"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Large Food Image */}
        <div className="md:w-1/2 relative h-64 md:h-auto min-h-[260px] bg-[#24160f] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18100b] md:from-transparent md:to-transparent" />
          
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#2a170e]/85 text-[#e5b887] border border-[#6b442b]/60 backdrop-blur-md uppercase tracking-wider">
              {product.category}
            </span>
          </div>
        </div>

        {/* Details Content */}
        <div className="md:w-1/2 p-6 sm:p-7 flex flex-col justify-between text-[#faede1]">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-serif-elegant text-2xl sm:text-3xl font-bold text-[#faf3eb] leading-tight">
                {product.name}
              </h3>
            </div>

            <div className="text-xl font-bold text-[#dfad7d] mb-4">
              ₹{unitPrice}
              {product.category === 'Pizzas' && (
                <span className="text-xs text-[#a98f7e] font-normal ml-2">
                  ({selectedSize})
                </span>
              )}
            </div>

            <p className="text-sm text-[#ceb8a6] leading-relaxed mb-5 font-light">
              {product.description}
            </p>

            {/* Ingredients List */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="mb-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#d49e6f] mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Fresh Ingredients</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md text-[11px] bg-[#291b13] text-[#ebd2be] border border-[#482f21]"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Pizza Specific Options */}
            {product.category === 'Pizzas' && (
              <div className="space-y-4 mb-5 pt-3 border-t border-[#311f16]">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#d49e6f] mb-2">
                    Select Pizza Size
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Regular', 'Medium', 'Large'] as const).map((size) => {
                      const extra = size === 'Medium' ? '+₹80' : size === 'Large' ? '+₹150' : 'Std';
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                            selectedSize === size
                              ? 'bg-[#dfad7d] text-[#1c1109] border-[#dfad7d] font-bold shadow-sm'
                              : 'bg-[#241710] text-[#e0cbba] border-[#442c1f] hover:border-[#6e4632]'
                          }`}
                        >
                          <div className="block">{size}</div>
                          <div className="text-[10px] opacity-75">{extra}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Cheese Burst Add-on */}
                <label className="flex items-center gap-3 p-2.5 rounded-xl bg-[#241710] border border-[#3e271b] cursor-pointer hover:border-[#734832] transition-colors">
                  <input
                    type="checkbox"
                    checked={extraCheese}
                    onChange={(e) => setExtraCheese(e.target.checked)}
                    className="w-4 h-4 rounded text-[#dfad7d] focus:ring-[#dfad7d] bg-[#1a0f09] border-[#553726]"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-[#f8ede3]">Extra Molten Cheese Burst</span>
                    <span className="text-[#e2a874] ml-2 font-bold">+₹60</span>
                  </div>
                </label>
              </div>
            )}

            {/* Special Instructions */}
            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#a88d7b] mb-1.5">
                Special Note / Instructions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., Serve extra warm, less ice, warm syrup..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#22150e] border border-[#3e271c] text-xs text-[#faede1] placeholder-[#7d6554] focus:outline-none focus:border-[#dfad7d]"
              />
            </div>
          </div>

          {/* Bottom Quantity & Add to Cart */}
          <div className="pt-4 border-t border-[#311f16] flex items-center justify-between gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-2 bg-[#251811] p-1 rounded-xl border border-[#442b1d]">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-1.5 rounded-lg text-[#d8c2af] hover:text-white hover:bg-[#392419] transition-colors cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold text-sm text-[#faede1]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="p-1.5 rounded-lg text-[#d8c2af] hover:text-white hover:bg-[#392419] transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart CTA */}
            <button
              id="modal-add-to-cart-cta"
              type="button"
              onClick={handleAdd}
              disabled={addedAnimation}
              className="flex-1 py-3 px-5 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#dfad7d] to-[#c78e58] hover:from-[#eec49a] hover:to-[#d89e67] text-[#1a0f09] flex items-center justify-center gap-2 shadow-lg transition-all duration-200 cursor-pointer active:scale-98"
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart • ₹{totalPrice}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
