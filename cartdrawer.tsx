import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToOrder: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToOrder,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = items.length === 0 ? 0 : subtotal >= 500 ? 0 : 40;
  const total = subtotal + deliveryFee;

  return (
    <div
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        id="cart-drawer-panel"
        className="w-full max-w-md bg-[#160f0a] border-l border-[#3a261a] h-full flex flex-col shadow-2xl text-[#faede1] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="p-5 sm:p-6 border-b border-[#2d1c13] flex items-center justify-between bg-[#1d130d]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#2e1d13] text-[#dfad7d]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-elegant text-xl font-bold text-[#faf3eb]">
                Your Order Basket
              </h2>
              <span className="text-xs text-[#a98f7e]">
                {items.reduce((acc, curr) => acc + curr.quantity, 0)} freshly crafted items
              </span>
            </div>
          </div>

          <button
            id="close-cart-drawer-btn"
            onClick={onClose}
            aria-label="Close cart"
            className="p-2 rounded-full hover:bg-[#2e1c13] text-[#cfb29e] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        {items.length > 0 && (
          <div className="bg-[#241710] px-5 py-2.5 border-b border-[#342217] text-xs">
            {subtotal >= 500 ? (
              <p className="text-[#6ee7b7] font-medium flex items-center gap-1.5">
                <span>🎉</span> You unlocked FREE delivery on this order!
              </p>
            ) : (
              <div>
                <p className="text-[#dfad7d] font-medium mb-1">
                  Add ₹{500 - subtotal} more for FREE Delivery!
                </p>
                <div className="w-full h-1.5 bg-[#3c2518] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#dfad7d] rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / 500) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-[#261810] flex items-center justify-center text-[#dfad7d] mb-4">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="font-serif-elegant text-xl font-semibold text-[#faf3eb] mb-2">
                Your basket is empty
              </h3>
              <p className="text-sm text-[#bca594] max-w-xs mb-6 font-light">
                Explore our brownies, pizzas, and mocktails to satisfy your craving!
              </p>
              <button
                id="cart-empty-explore-btn"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#3e271a] hover:bg-[#dfad7d] text-[#faede1] hover:text-[#190f09] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border border-[#633e2a]"
              >
                Browse Our Menu
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                id={`cart-item-${item.id}`}
                className="flex gap-3.5 p-3.5 rounded-2xl bg-[#1f150f] border border-[#342217]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-[#2a1a11]"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif-elegant font-bold text-sm sm:text-base text-[#faf3eb] leading-snug">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#967966] hover:text-[#ef4444] transition-colors p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs text-[#be9c84] mt-0.5">
                      {item.size && (
                        <span className="px-2 py-0.5 rounded bg-[#2e1d13] text-[#dfad7d] font-medium">
                          Size: {item.size}
                        </span>
                      )}
                      {item.specialInstructions && (
                        <span className="italic text-[11px] text-[#9a7e6d] truncate max-w-[180px]">
                          Note: {item.specialInstructions}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#2e1c12]">
                    <span className="font-bold text-sm text-[#e8c099]">
                      ₹{item.price * item.quantity}
                    </span>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-2 bg-[#2a1a11] px-2 py-1 rounded-lg border border-[#432a1b]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="text-[#ceb8a6] hover:text-white cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center text-[#faede1]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="text-[#ceb8a6] hover:text-white cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer Summary */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-[#2f1d13] bg-[#1a110a] space-y-3">
            <div className="space-y-1.5 text-xs text-[#ceb8a6]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#faede1]">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-[#6ee7b7] font-medium">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-[#2f1d13] flex justify-between text-base font-bold text-[#faf3eb]">
                <span>Total Amount</span>
                <span className="text-[#dfad7d]">₹{total}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                id="cart-proceed-order-btn"
                onClick={() => {
                  onClose();
                  onProceedToOrder();
                }}
                className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#dfad7d] to-[#c78e58] hover:from-[#ecc297] hover:to-[#d6985f] text-[#1c1109] flex items-center justify-center gap-2 shadow-lg transition-all duration-200 cursor-pointer active:scale-98"
              >
                <span>Proceed to Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="cart-continue-shopping-btn"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-[#c4ab98] hover:text-white hover:bg-[#2b1c13] transition-colors cursor-pointer text-center"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
