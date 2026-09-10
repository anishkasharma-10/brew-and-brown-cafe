import React, { useState } from 'react';
import { CheckCircle, ShoppingBag, ArrowLeft, Clock, ShieldCheck, Sparkles, MapPin, Phone, User, Mail, CreditCard, QrCode, Banknote } from 'lucide-react';
import { CartItem, CustomerDetails } from '../types';

interface OrderPageProps {
  cartItems: CartItem[];
  onClearCart: () => void;
  onNavigateToMenu: () => void;
}

export const OrderPage: React.FC<OrderPageProps> = ({
  cartItems,
  onClearCart,
  onNavigateToMenu,
}) => {
  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    phone: '',
    email: '',
    address: '',
    diningOption: 'delivery',
    paymentMethod: 'upi',
    notes: '',
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = cartItems.length === 0 ? 0 : customer.diningOption === 'delivery' ? (subtotal >= 500 ? 0 : 40) : 0;
  const taxes = Math.round(subtotal * 0.05); // 5% cafe GST
  const total = subtotal + deliveryFee + taxes;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!customer.name.trim()) errs.name = 'Please provide your full name';
    if (!customer.phone.trim() || customer.phone.length < 10)
      errs.phone = 'Please enter a valid 10-digit mobile number';
    if (!customer.email.trim() || !customer.email.includes('@'))
      errs.email = 'Please provide a valid email address';
    if (customer.diningOption === 'delivery' && !customer.address.trim())
      errs.address = 'Delivery address is required for doorstep delivery';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate ordering process
    setTimeout(() => {
      const randomOrderNum = `BNB-${Math.floor(10000 + Math.random() * 90000)}`;
      setConfirmedOrderNumber(randomOrderNum);
      setIsSubmitting(false);
      setOrderConfirmed(true);
      onClearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
  };

  // SUCCESS ANIMATION VIEW
  if (orderConfirmed) {
    return (
      <div id="order-confirmed-view" className="min-h-screen bg-[#100a07] text-[#faede1] pt-32 pb-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-xl w-full bg-[#18110b] border border-[#3e271a] rounded-3xl p-8 sm:p-10 shadow-2xl text-center relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">
          
          {/* Confetti / Glow accent */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#dfad7d]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Success Check Icon */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#166534] to-[#22c55e] text-white flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-900/40 animate-bounce">
            <CheckCircle className="w-10 h-10 stroke-[2.5]" />
          </div>

          <span className="text-xs font-semibold tracking-widest uppercase text-[#dfad7d] block mb-2">
            Brew &amp; Brown Artisan Kitchen
          </span>

          {/* EXACT SUCCESS TEXT */}
          <h1 className="font-serif-elegant text-3xl sm:text-4xl font-bold text-[#faf3eb] mb-3">
            “Order Confirmed!”
          </h1>

          <p className="text-sm text-[#ceb8a6] max-w-md mx-auto mb-6 leading-relaxed font-light">
            Thank you, <span className="font-semibold text-[#faf3eb]">{customer.name}</span>!
            Our baristas and chefs are now freshly preparing your items with love.
          </p>

          {/* Order Details Card */}
          <div className="bg-[#22160f] p-5 rounded-2xl border border-[#3f281b] text-left space-y-3 mb-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#342217] text-xs">
              <span className="text-[#a98f7e]">Order Number:</span>
              <span className="font-mono font-bold text-sm text-[#dfad7d]">
                #{confirmedOrderNumber}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#a98f7e]">Estimated Time:</span>
              <span className="font-semibold text-[#6ee7b7] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                25 – 35 Minutes
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#a98f7e]">Order Type:</span>
              <span className="capitalize font-medium text-[#faede1]">
                {customer.diningOption === 'delivery' ? 'Doorstep Delivery' : customer.diningOption}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#a98f7e]">Payment Method:</span>
              <span className="uppercase font-medium text-[#faede1]">
                {customer.paymentMethod} (Verified Demo)
              </span>
            </div>

            {customer.address && (
              <div className="pt-2 border-t border-[#342217] text-xs text-[#b89b88]">
                <span className="block font-medium text-[#a98f7e] mb-0.5">Delivering to:</span>
                {customer.address}
              </div>
            )}
          </div>

          {/* Back to Menu CTA */}
          <button
            id="order-success-return-btn"
            onClick={() => {
              setOrderConfirmed(false);
              onNavigateToMenu();
            }}
            className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#dfad7d] to-[#c78e58] hover:from-[#ecc297] hover:to-[#d6985f] text-[#1c1109] shadow-lg transition-all duration-200 cursor-pointer"
          >
            Explore More Delights
          </button>
        </div>
      </div>
    );
  }

  // EMPTY BASKET CHECK
  if (cartItems.length === 0) {
    return (
      <div id="order-empty-cart-view" className="min-h-screen bg-[#100a07] text-[#faede1] pt-36 pb-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-[#1e130c] flex items-center justify-center text-[#dfad7d] mb-6 border border-[#3e271a]">
          <ShoppingBag className="w-10 h-10 opacity-70" />
        </div>
        <h2 className="font-serif-elegant text-3xl sm:text-4xl font-bold text-[#faf3eb] mb-3">
          Your Order Basket is Empty
        </h2>
        <p className="text-sm text-[#ceb8a6] max-w-md mx-auto mb-8 font-light">
          Please add your favourite artisanal brownies, pizzas, or mocktails before proceeding to checkout.
        </p>
        <button
          onClick={onNavigateToMenu}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-[#dfad7d] text-[#1c1109] hover:bg-[#eec69c] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Menu</span>
        </button>
      </div>
    );
  }

  return (
    <div id="checkout-order-page" className="min-h-screen bg-[#100a07] text-[#faede1] pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button
              onClick={onNavigateToMenu}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#a88a75] hover:text-[#dfad7d] transition-colors mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Menu</span>
            </button>
            <h1 className="font-serif-elegant text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FAF5EF]">
              Complete Your Order
            </h1>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#241710] border border-[#442c1e] text-xs text-[#dfad7d]">
            <ShieldCheck className="w-4 h-4" />
            <span>Frontend Demo Checkout</span>
          </div>
        </div>

        {/* Demo Notice Banner */}
        <div className="mb-8 p-3.5 rounded-2xl bg-[#2b1e15] border border-[#523725] text-xs text-[#eedac8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#dfad7d] shrink-0" />
            <span>
              <strong>Note:</strong> This is a FRONTEND DEMO. No actual payment card will be charged.
            </span>
          </div>
        </div>

        {/* 2-Column Checkout Layout */}
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Left Column: Customer & Delivery Info */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Dining / Delivery Choice */}
            <div className="bg-[#18110b] p-6 rounded-2xl border border-[#342217]">
              <h2 className="font-serif-elegant text-xl font-semibold text-[#faf3eb] mb-4">
                1. Order Preference
              </h2>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'delivery', label: 'Home Delivery' },
                  { id: 'takeaway', label: 'Takeaway Pickup' },
                  { id: 'dine-in', label: 'Dine-In Table' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() =>
                      setCustomer({ ...customer, diningOption: opt.id as any })
                    }
                    className={`py-3 px-3 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                      customer.diningOption === opt.id
                        ? 'bg-[#dfad7d] text-[#1c1109] border-[#dfad7d] shadow-sm'
                        : 'bg-[#22160f] text-[#ceb8a6] border-[#3e271a] hover:border-[#68432d]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Details Form */}
            <div className="bg-[#18110b] p-6 rounded-2xl border border-[#342217] space-y-4">
              <h2 className="font-serif-elegant text-xl font-semibold text-[#faf3eb] mb-2">
                2. Contact &amp; Delivery Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-medium text-[#c4ac9a] mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#dfad7d]" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ananya Sharma"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#22160f] border border-[#3e271a] text-sm text-[#faede1] placeholder-[#7d6554] focus:outline-none focus:border-[#dfad7d]"
                  />
                  {errors.name && (
                    <p className="text-xs text-[#f87171] mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-medium text-[#c4ac9a] mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#dfad7d]" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98200 12345"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#22160f] border border-[#3e271a] text-sm text-[#faede1] placeholder-[#7d6554] focus:outline-none focus:border-[#dfad7d]"
                  />
                  {errors.phone && (
                    <p className="text-xs text-[#f87171] mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-[#c4ac9a] mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#dfad7d]" />
                  <span>Email Address *</span>
                </label>
                <input
                  type="email"
                  placeholder="ananya@example.com"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#22160f] border border-[#3e271a] text-sm text-[#faede1] placeholder-[#7d6554] focus:outline-none focus:border-[#dfad7d]"
                />
                {errors.email && (
                  <p className="text-xs text-[#f87171] mt-1">{errors.email}</p>
                )}
              </div>

              {/* Address (Only for delivery) */}
              {customer.diningOption === 'delivery' && (
                <div>
                  <label className="block text-xs font-medium text-[#c4ac9a] mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#dfad7d]" />
                    <span>Delivery Address *</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Apartment, Wing, Street, Landmark, Pincode"
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#22160f] border border-[#3e271a] text-sm text-[#faede1] placeholder-[#7d6554] focus:outline-none focus:border-[#dfad7d]"
                  />
                  {errors.address && (
                    <p className="text-xs text-[#f87171] mt-1">{errors.address}</p>
                  )}
                </div>
              )}

              {/* Special Cooking Note */}
              <div>
                <label className="block text-xs font-medium text-[#c4ac9a] mb-1.5">
                  Order Instructions / Kitchen Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ring doorbell, brownie extra hot, extra napkins..."
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#22160f] border border-[#3e271a] text-sm text-[#faede1] placeholder-[#7d6554] focus:outline-none focus:border-[#dfad7d]"
                />
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-[#18110b] p-6 rounded-2xl border border-[#342217]">
              <h2 className="font-serif-elegant text-xl font-semibold text-[#faf3eb] mb-4">
                3. Payment Method
              </h2>

              <div className="space-y-3">
                {[
                  {
                    id: 'upi',
                    label: 'UPI / QR Scan',
                    desc: 'Google Pay, PhonePe, Paytm, or UPI ID',
                    icon: QrCode,
                  },
                  {
                    id: 'card',
                    label: 'Credit / Debit Card',
                    desc: 'Visa, MasterCard, RuPay, Amex',
                    icon: CreditCard,
                  },
                  {
                    id: 'cod',
                    label: 'Cash on Delivery / Pay at Counter',
                    desc: 'Pay safely upon arrival',
                    icon: Banknote,
                  },
                ].map((method) => {
                  const Icon = method.icon;
                  return (
                    <label
                      key={method.id}
                      className={`flex items-start gap-3.5 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        customer.paymentMethod === method.id
                          ? 'bg-[#2b1c13] border-[#dfad7d]'
                          : 'bg-[#20150e] border-[#392418] hover:border-[#5a3b29]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={customer.paymentMethod === method.id}
                        onChange={() =>
                          setCustomer({ ...customer, paymentMethod: method.id as any })
                        }
                        className="mt-1 w-4 h-4 text-[#dfad7d] focus:ring-[#dfad7d] bg-[#140d08] border-[#553625]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-[#dfad7d]" />
                          <span className="font-semibold text-sm text-[#faf3eb]">
                            {method.label}
                          </span>
                        </div>
                        <p className="text-xs text-[#a98f7e] mt-0.5">{method.desc}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-[#18110b] p-6 rounded-2xl border border-[#342217] sticky top-28 shadow-xl">
              <h2 className="font-serif-elegant text-xl font-bold text-[#faf3eb] mb-4 pb-3 border-b border-[#2d1c13]">
                Order Summary
              </h2>

              {/* Items List */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1 mb-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-xs py-2 border-b border-[#26170e] last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover bg-[#24160f]"
                      />
                      <div>
                        <span className="font-semibold text-[#faf3eb] block">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-[#a98f7e]">
                          Qty: {item.quantity} {item.size ? `• Size: ${item.size}` : ''}
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-[#dfad7d]">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial Calculation */}
              <div className="space-y-2 text-xs text-[#ceb8a6] pb-4 border-b border-[#2d1c13]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#faede1]">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-[#6ee7b7] font-semibold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>GST &amp; Restaurant Taxes (5%)</span>
                  <span className="font-medium text-[#faede1]">₹{taxes}</span>
                </div>
              </div>

              {/* Total */}
              <div className="pt-4 flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#a88a75] block">
                    Grand Total
                  </span>
                  <span className="font-serif-elegant text-2xl font-bold text-[#dfad7d]">
                    ₹{total}
                  </span>
                </div>
                <span className="text-[10px] text-[#7ee787] bg-[#14321b] px-2.5 py-1 rounded-full border border-[#238636]">
                  Inclusive of all taxes
                </span>
              </div>

              {/* Submit CTA */}
              <button
                id="place-order-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl font-bold text-base bg-gradient-to-r from-[#dfad7d] via-[#d69f6a] to-[#c78e58] hover:from-[#ecc297] hover:to-[#d6985f] text-[#1a0f09] shadow-xl hover:shadow-[0_10px_25px_rgba(223,173,125,0.4)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 active:scale-98"
              >
                {isSubmitting ? (
                  <span>Sending to Kitchen...</span>
                ) : (
                  <span>Place Order • ₹{total}</span>
                )}
              </button>

              <p className="text-center text-[11px] text-[#8e7362] mt-3">
                Instant SMS &amp; WhatsApp live order updates will be sent.
              </p>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
