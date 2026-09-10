import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Coffee } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  cartCount,
  onOpenCart,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Menu', id: 'menu' },
    { label: 'About', id: 'about' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#120c09]/95 backdrop-blur-md shadow-lg border-b border-[#2d1b13]/80 py-3.5'
          : 'bg-gradient-to-b from-[#0b0806]/90 via-[#0e0a07]/50 to-transparent backdrop-blur-[2px] py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#dfad7d] to-[#9c6644] p-[1.5px] shadow-md transition-transform group-hover:scale-105">
              <div className="w-full h-full rounded-full bg-[#1b120c] flex items-center justify-center text-[#e8c29a]">
                <Coffee className="w-5 h-5 transition-transform group-hover:rotate-6" />
              </div>
            </div>
            <div>
              <span className="font-serif-elegant text-2xl sm:text-2xl font-bold tracking-wider text-[#FAF5EF] block leading-none">
                Brew &amp; Brown
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#cf9f74] font-medium block mt-1">
                Artisan Cafe &amp; Bakes
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#F9EFE5] bg-[#3a2519]/70 font-semibold'
                      : 'text-[#e5d5c5] hover:text-[#ffffff] hover:bg-[#2b1b13]/40'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#dfad7d] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Order Now Button */}
            <button
              id="navbar-order-now-btn"
              onClick={() => handleNavClick('order')}
              className={`hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                activePage === 'order'
                  ? 'bg-[#dfad7d] text-[#1c1109] shadow-md'
                  : 'border border-[#dfad7d]/60 text-[#faeade] hover:bg-[#dfad7d] hover:text-[#1c1109] shadow-sm'
              }`}
            >
              Order Now
            </button>

            {/* Cart Icon Button */}
            <button
              id="navbar-cart-btn"
              onClick={onOpenCart}
              aria-label="View Cart"
              className="relative p-2.5 rounded-full bg-[#2a1b13]/70 hover:bg-[#3d271b] border border-[#523525]/60 text-[#f5e4d3] hover:text-white transition-all duration-200 cursor-pointer focus:outline-none"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span
                  id="navbar-cart-counter"
                  className="absolute -top-1 -right-1 bg-gradient-to-r from-[#d97706] to-[#b45309] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse"
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              id="navbar-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-lg text-[#e5d5c5] hover:text-white hover:bg-[#2e1c14] focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-[#150d09]/98 border-b border-[#352117] backdrop-blur-xl px-6 py-6 transition-all duration-300"
        >
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-4 py-2.5 rounded-lg text-base font-medium transition-all ${
                  activePage === item.id
                    ? 'bg-[#3b2418] text-[#ffdcb2] font-semibold'
                    : 'text-[#e6d8cb] hover:bg-[#251710] hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              id="mobile-order-now-btn"
              onClick={() => handleNavClick('order')}
              className="mt-2 w-full py-3 rounded-full text-center text-sm font-semibold tracking-wide uppercase bg-gradient-to-r from-[#dfad7d] to-[#c89260] text-[#1c1109] shadow-md"
            >
              Order Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
