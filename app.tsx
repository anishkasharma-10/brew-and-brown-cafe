/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { OrderPage } from './pages/OrderPage';
import { Product, CartItem } from './types';
import { Check } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<string>('All Items');
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persistent cart in local state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('brew_brown_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('brew_brown_cart', JSON.stringify(cartItems));
    } catch {
      // Storage access fail-safe
    }
  }, [cartItems]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleAddToCart = (
    product: Product,
    quantity = 1,
    size?: 'Regular' | 'Medium' | 'Large',
    notes?: string
  ) => {
    // Unique ID based on productId and size
    const cartItemId = size ? `${product.id}-${size}` : product.id;

    // Calculate item unit price
    let itemPrice = product.price;
    if (product.category === 'Pizzas' && size) {
      if (size === 'Medium') itemPrice += 80;
      if (size === 'Large') itemPrice += 150;
    }
    if (notes && notes.includes('Extra Cheese Burst')) {
      itemPrice += 60;
    }

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        if (notes) updated[existingIndex].specialInstructions = notes;
        return updated;
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          category: product.category,
          image: product.image,
          price: itemPrice,
          quantity,
          size,
          specialInstructions: notes,
        };
        return [...prevItems, newItem];
      }
    });

    showToast(`Added "${product.name}" to your basket`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const navigateToMenuWithCategory = (category?: string) => {
    if (category) {
      setSelectedMenuCategory(category);
    } else {
      setSelectedMenuCategory('All Items');
    }
    setActivePage('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#100a07] text-[#faede1] flex flex-col font-sans-clean antialiased selection:bg-[#dfad7d] selection:text-[#180f0a]">
      {/* Sticky Navigation Bar */}
      <Navbar
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setCartDrawerOpen(true)}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            onNavigateToMenu={navigateToMenuWithCategory}
            onAddToCart={(product) => handleAddToCart(product, 1)}
            onSelectProduct={(product) => setModalProduct(product)}
          />
        )}

        {activePage === 'menu' && (
          <MenuPage
            initialCategory={selectedMenuCategory}
            onAddToCart={handleAddToCart}
            onOpenProductModal={(product) => setModalProduct(product)}
          />
        )}

        {activePage === 'about' && (
          <AboutPage onNavigateToMenu={() => navigateToMenuWithCategory()} />
        )}

        {activePage === 'gallery' && <GalleryPage />}

        {activePage === 'contact' && <ContactPage />}

        {activePage === 'order' && (
          <OrderPage
            cartItems={cartItems}
            onClearCart={handleClearCart}
            onNavigateToMenu={() => navigateToMenuWithCategory()}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToOrder={() => {
          setActivePage('order');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Interactive Product Detail Modal */}
      <ProductModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Subtle Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#1e130c] border border-[#dfad7d]/60 text-[#faede1] shadow-2xl animate-in slide-in-from-bottom-3 duration-300">
          <div className="w-5 h-5 rounded-full bg-[#dfad7d] text-[#1a0f09] flex items-center justify-center">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
