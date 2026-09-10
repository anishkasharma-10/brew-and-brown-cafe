import React from 'react';
import { Coffee, MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="main-footer" className="bg-[#0b0705] text-[#faede1] border-t border-[#26170e] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14">
          
          {/* Brand & Story */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#dfad7d] to-[#9c6644] p-[1.5px]">
                <div className="w-full h-full rounded-full bg-[#1b120c] flex items-center justify-center text-[#e8c29a]">
                  <Coffee className="w-4 h-4" />
                </div>
              </div>
              <span className="font-serif-elegant text-2xl font-bold tracking-wider text-[#FAF5EF]">
                Brew &amp; Brown
              </span>
            </div>

            <p className="text-sm text-[#baa28f] font-light leading-relaxed">
              {CAFE_INFO.tagline}
            </p>
            <p className="text-xs text-[#8f7564] leading-relaxed">
              {CAFE_INFO.subtagline}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#instagram"
                aria-label="Instagram"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-[#1e130c] hover:bg-[#dfad7d] text-[#cbb09c] hover:text-[#180f0a] flex items-center justify-center transition-colors border border-[#3e271a]"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                aria-label="Facebook"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-[#1e130c] hover:bg-[#dfad7d] text-[#cbb09c] hover:text-[#180f0a] flex items-center justify-center transition-colors border border-[#3e271a]"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                aria-label="Twitter"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-[#1e130c] hover:bg-[#dfad7d] text-[#cbb09c] hover:text-[#180f0a] flex items-center justify-center transition-colors border border-[#3e271a]"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif-elegant text-lg font-semibold text-[#f8eee4] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Home', id: 'home' },
                { label: 'Menu', id: 'menu' },
                { label: 'About', id: 'about' },
                { label: 'Gallery', id: 'gallery' },
                { label: 'Contact', id: 'contact' },
                { label: 'Order Now', id: 'order' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      onNavigate(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-[#baa28f] hover:text-[#dfad7d] transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-serif-elegant text-lg font-semibold text-[#f8eee4] mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#dfad7d]" />
              <span>Opening Hours</span>
            </h4>
            <ul className="space-y-3 text-xs text-[#baa28f]">
              {CAFE_INFO.hours.map((h, idx) => (
                <li key={idx} className="pb-2 border-b border-[#1f140e] last:border-0">
                  <span className="block font-medium text-[#f1dfcf]">{h.days}</span>
                  <span className="text-[#a88f7d]">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif-elegant text-lg font-semibold text-[#f8eee4] mb-4">
              Find Us
            </h4>
            <ul className="space-y-3 text-xs text-[#baa28f]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#dfad7d] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{CAFE_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#dfad7d] shrink-0" />
                <span>{CAFE_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#dfad7d] shrink-0" />
                <span>{CAFE_INFO.email}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-[#1a100a] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7d6555]">
          <p>© 2026 Brew &amp; Brown. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#be9f88] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#be9f88] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#be9f88] cursor-pointer">FSSAI Lic. #1152100400032</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
