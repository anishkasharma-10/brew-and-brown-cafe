import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Instagram, Facebook, Twitter, Coffee, Compass } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';

export const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Table Reservation',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSubmitted(true);
  };

  return (
    <div id="contact-page" className="min-h-screen bg-[#100a07] text-[#faede1] pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#dfad7d] block mb-2">
            Visit Our Sanctuary
          </span>
          <h1 className="font-serif-elegant text-4xl sm:text-5xl lg:text-6xl font-normal text-[#FAF5EF] tracking-tight mb-4">
            Connect with Brew &amp; Brown
          </h1>
          <p className="font-sans-clean text-sm sm:text-base text-[#d1bbaa] max-w-xl mx-auto font-light leading-relaxed">
            Drop by for a quiet coffee, reserve a table for group gatherings, or leave a note for our cafe team.
          </p>
        </div>

        {/* 2-Column Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Contact Info & Opening Hours (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address & Direct Details */}
            <div className="bg-[#18100b] p-7 rounded-2xl border border-[#342217] space-y-5">
              <h2 className="font-serif-elegant text-xl font-bold text-[#faf3eb]">
                Cafe Location
              </h2>

              <div className="space-y-4 text-xs text-[#ceb8a6]">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#291a11] text-[#dfad7d] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-semibold text-sm text-[#faf3eb] mb-0.5">
                      Brew &amp; Brown Cafe
                    </span>
                    <p className="leading-relaxed">{CAFE_INFO.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#291a11] text-[#dfad7d] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-semibold text-[#faf3eb]">Phone</span>
                    <span>{CAFE_INFO.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#291a11] text-[#dfad7d] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-semibold text-[#faf3eb]">Email</span>
                    <span>{CAFE_INFO.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-[#18100b] p-7 rounded-2xl border border-[#342217] space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#291a11] text-[#dfad7d]">
                  <Clock className="w-5 h-5" />
                </div>
                <h2 className="font-serif-elegant text-xl font-bold text-[#faf3eb]">
                  Cafe Hours
                </h2>
              </div>

              <div className="space-y-3 pt-2">
                {CAFE_INFO.hours.map((h, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-xs pb-2.5 border-b border-[#291a11] last:border-0"
                  >
                    <span className="font-medium text-[#f0ded0]">{h.days}</span>
                    <span className="text-[#dfad7d] font-semibold">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-[#18100b] p-6 rounded-2xl border border-[#342217] flex items-center justify-between">
              <span className="text-xs font-medium text-[#ceb8a6]">Follow our journey</span>
              <div className="flex items-center gap-3">
                <a
                  href="#instagram"
                  onClick={(e) => e.preventDefault()}
                  className="p-2.5 rounded-full bg-[#291a11] hover:bg-[#dfad7d] text-[#ceb8a6] hover:text-[#180f0a] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#facebook"
                  onClick={(e) => e.preventDefault()}
                  className="p-2.5 rounded-full bg-[#291a11] hover:bg-[#dfad7d] text-[#ceb8a6] hover:text-[#180f0a] transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#twitter"
                  onClick={(e) => e.preventDefault()}
                  className="p-2.5 rounded-full bg-[#291a11] hover:bg-[#dfad7d] text-[#ceb8a6] hover:text-[#180f0a] transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right: Interactive Message & Table Reservation Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#18100b] p-8 sm:p-9 rounded-3xl border border-[#342217] shadow-xl">
              <h2 className="font-serif-elegant text-2xl sm:text-3xl font-bold text-[#faf3eb] mb-2">
                Send a Message or Reserve
              </h2>
              <p className="text-xs text-[#be9f88] mb-6 font-light">
                Planning a special celebration or want to inquire about catering? We'd love to host you.
              </p>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-900/40 text-green-400 flex items-center justify-center mx-auto border border-green-700/50">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif-elegant text-2xl font-bold text-[#faf3eb]">
                    Message Received!
                  </h3>
                  <p className="text-xs text-[#ceb8a6] max-w-sm mx-auto leading-relaxed">
                    Thank you, {formState.name}. Our cafe manager will connect with you shortly via phone or email.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({
                        name: '',
                        email: '',
                        phone: '',
                        subject: 'Table Reservation',
                        message: '',
                      });
                    }}
                    className="mt-4 px-6 py-2 rounded-full text-xs font-semibold bg-[#2a1a11] text-[#dfad7d] border border-[#4d3221] hover:bg-[#dfad7d] hover:text-[#1c1109] transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#c4ac9a] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rohini Sen"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#22160f] border border-[#3e271a] text-xs text-[#faede1] placeholder-[#7d6554] focus:outline-none focus:border-[#dfad7d]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#c4ac9a] mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98200 XXXXX"
                        value={formState.phone}
                        onChange={(e) =>
                          setFormState({ ...formState, phone: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#22160f] border border-[#3e271a] text-xs text-[#faede1] placeholder-[#7d6554] focus:outline-none focus:border-[#dfad7d]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#c4ac9a] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="rohini@example.com"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#22160f] border border-[#3e271a] text-xs text-[#faede1] placeholder-[#7d6554] focus:outline-none focus:border-[#dfad7d]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#c4ac9a] mb-1.5">
                        Inquiry Purpose
                      </label>
                      <select
                        value={formState.subject}
                        onChange={(e) =>
                          setFormState({ ...formState, subject: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#22160f] border border-[#3e271a] text-xs text-[#faede1] focus:outline-none focus:border-[#dfad7d]"
                      >
                        <option value="Table Reservation">Table Reservation</option>
                        <option value="Event / Birthday Booking">Event / Birthday Booking</option>
                        <option value="Catering / Bulk Brownie Boxes">Catering / Bulk Brownie Boxes</option>
                        <option value="Feedback & Compliment">Feedback &amp; Compliment</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#c4ac9a] mb-1.5">
                      Your Message / Date &amp; Guests Count *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Let us know how many guests, preferred time, or any sweet preferences..."
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#22160f] border border-[#3e271a] text-xs text-[#faede1] placeholder-[#7d6554] focus:outline-none focus:border-[#dfad7d]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#dfad7d] to-[#c78e58] hover:from-[#ecc297] hover:to-[#d6985f] text-[#1c1109] flex items-center justify-center gap-2 shadow-lg transition-all duration-200 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>

            {/* Stylized Map Placeholder Card */}
            <div className="relative rounded-3xl overflow-hidden border border-[#342217] bg-[#1a110a] h-64 flex flex-col justify-between p-6">
              {/* Map background texture */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30 filter grayscale"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop")',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120a06] via-[#120a06]/70 to-[#120a06]/90" />

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#dfad7d] uppercase tracking-wider">
                  <Compass className="w-4 h-4" />
                  <span>Neighbourhood Guide</span>
                </div>
                <span className="text-[11px] text-[#9b7e6c] bg-[#291a11] px-2.5 py-1 rounded-full border border-[#482d1c]">
                  Valet Parking Available
                </span>
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif-elegant font-bold text-lg text-[#faf3eb]">
                    Brew &amp; Brown Flagship
                  </h4>
                  <p className="text-xs text-[#ceb8a6]">
                    Heritage Boulevard, Bandra West • 2 mins from Promenade
                  </p>
                </div>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(CAFE_INFO.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-xs font-semibold bg-[#2a1a11] hover:bg-[#dfad7d] text-[#dfad7d] hover:text-[#190f09] border border-[#523321] transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Get Driving Directions</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
