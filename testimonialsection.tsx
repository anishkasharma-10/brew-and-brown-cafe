import React from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/menuData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials-section" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#120b07] text-[#faede1] border-t border-[#291a11]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#dfad7d] block mb-2">
            Loved by Our Guests
          </span>
          <h2 className="font-serif-elegant text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FAF5EF]">
            Words from Coffee &amp; Brownie Lovers
          </h2>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              id={`testimonial-${review.id}`}
              className="relative p-6 sm:p-7 rounded-2xl bg-[#19100a] border border-[#332015] hover:border-[#6b422a] transition-all duration-300 flex flex-col justify-between shadow-lg"
            >
              <Quote className="w-8 h-8 text-[#543625] mb-4 opacity-70" />

              <p className="text-sm text-[#ceb8a6] leading-relaxed italic mb-6 font-light">
                “{review.comment}”
              </p>

              <div>
                <div className="flex items-center gap-1 text-[#f59e0b] mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-[#2d1b12]">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#523525]"
                  />
                  <div>
                    <h4 className="font-serif-elegant font-bold text-sm text-[#faf3eb]">
                      {review.name}
                    </h4>
                    <span className="text-[11px] text-[#a98f7e] block">
                      {review.role}
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-[11px] text-[#dfad7d] bg-[#271810] px-2.5 py-1 rounded-md inline-block font-medium">
                  Loves: {review.favouriteItem}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
