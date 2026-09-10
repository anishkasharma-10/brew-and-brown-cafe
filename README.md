📖 About The Project

Brew & Brown is a fully responsive, premium cafe website built to feel like a real, production-ready brand — not a template. It's designed around a single core menu: fudgy brownies, stone-baked pizzas, indulgent desserts, refreshing mocktails, and everyday cafe beverages & snacks.

The homepage opens with a full-screen, auto-playing hero slideshow of cafe and food photography with smooth crossfades and a subtle Ken Burns zoom, followed by a complete ordering experience — category-filtered menu, product detail modal, persistent cart, and a demo checkout flow.

<div align="center"> <img src="./public/images/fudge-brownie.jpg" alt="Brew & Brown signature brownie" width="45%" /> &nbsp; <img src="./public/images/nutella-waffles.jpg" alt="Nutella waffles" width="45%" /> </div>
✨ Features
🎞️ Cinematic hero slideshow — auto-rotating, full-screen background with crossfade + slow zoom, no user interaction required
🧭 Sticky, responsive navbar — blurs on scroll, hamburger menu on mobile
🍕 Full menu system — categorized (Brownies, Desserts, Pizzas, Mocktails, Beverages, Snacks), with search and filtering
🧾 Product detail modal — size selection (Regular / Medium / Large for pizzas), quantity picker, ingredients
🛒 Persistent shopping cart — add/remove/update quantity, cart survives page navigation via localStorage
📦 Order flow — customer details form, payment method selection, order confirmation with a generated order number
🖼️ Masonry gallery with lightbox
💬 Testimonials section
📍 Contact page with map placeholder and contact form
📱 Fully responsive — optimized for mobile, tablet, and desktop
🎨 Custom design system — warm cream/espresso/terracotta palette, serif + sans-serif type pairing
🛠️ Tech Stack
Category	Technology
Framework	React 19
Language	TypeScript
Build Tool	Vite
Styling	Tailwind CSS 4
Icons	Lucide React
Animation	Motion
State	React Hooks + localStorage persistence
📂 Project Structure
brew-and-brown/
├── public/
│   └── images/              # Static, publicly-served food images
├── src/
│   ├── assets/
│   │   └── images/          # Imported/bundled image assets
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── CategoryCards.tsx
│   │   ├── BrownieSpeciality.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductModal.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── MenuPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── ContactPage.tsx
│   │   └── OrderPage.tsx
│   ├── data/
│   │   ├── menuData.ts      # Menu items, pricing, testimonials, gallery
│   │   └── images.ts
│   ├── types.ts              # Shared TypeScript interfaces
│   ├── App.tsx                # Root component & app-level state (cart, routing)
│   ├── main.tsx                # Entry point
│   ├── index.css
│   └── vite-env.d.ts
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
