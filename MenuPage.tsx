import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Filter, Check } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/menuData';
import { ProductCard } from '../components/ProductCard';

interface MenuPageProps {
  initialCategory?: string;
  onAddToCart: (
    product: Product,
    quantity: number,
    size?: 'Regular' | 'Medium' | 'Large'
  ) => void;
  onOpenProductModal: (product: Product) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  initialCategory,
  onAddToCart,
  onOpenProductModal,
}) => {
  const categories = [
    'All Items',
    'Brownies',
    'Pizzas',
    'Mocktails',
    'Desserts',
    'Beverages',
    'Snacks',
    'Pasta',
  ] as const;

  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || 'All Items'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyVeg, setOnlyVeg] = useState(false);

  // Filter products by category, search query, and veg preference
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'All Items' || product.category === selectedCategory;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.ingredients?.some((ing) => ing.toLowerCase().includes(query));

      // Veg match
      const matchesVeg = !onlyVeg || product.isVeg;

      return matchesCategory && matchesSearch && matchesVeg;
    });
  }, [selectedCategory, searchQuery, onlyVeg]);

  return (
    <div id="menu-page" className="min-h-screen bg-[#100a07] text-[#faede1] pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Menu Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2a1b12] border border-[#533524] text-[#dfad7d] text-xs font-semibold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Artisan Kitchen &amp; Espresso Bar</span>
          </div>

          <h1 className="font-serif-elegant text-4xl sm:text-5xl lg:text-6xl font-normal text-[#FAF5EF] tracking-tight mb-4">
            Our Handcrafted Menu
          </h1>

          <p className="font-sans-clean text-sm sm:text-base text-[#d1bbaa] max-w-xl mx-auto font-light leading-relaxed">
            Every recipe is prepared to order using authentic Belgian chocolate, slow-fermented dough, and freshly extracted espresso.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#19100a] p-4 rounded-2xl border border-[#342217] shadow-lg">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a88a75]" />
            <input
              id="menu-search-input"
              type="text"
              placeholder="Search brownies, pizzas, mojitos, shakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#23160e] border border-[#3e271a] text-sm text-[#faede1] placeholder-[#8e7362] focus:outline-none focus:border-[#dfad7d] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#a88a75] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              id="menu-veg-toggle"
              type="button"
              onClick={() => setOnlyVeg(!onlyVeg)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                onlyVeg
                  ? 'bg-[#15341c] text-[#7ee787] border-[#2ea043]'
                  : 'bg-[#23160e] text-[#be9c85] border-[#3e271a] hover:border-[#633f2a]'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center border ${
                  onlyVeg ? 'bg-[#238636] border-[#2ea043]' : 'border-[#8e7362]'
                }`}
              >
                {onlyVeg && <Check className="w-3 h-3 text-white stroke-[3]" />}
              </div>
              <span>Pure Veg Only</span>
            </button>

            <span className="text-xs text-[#a98f7e] hidden sm:inline">
              Showing {filteredProducts.length} items
            </span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const count =
              cat === 'All Items'
                ? PRODUCTS.length
                : PRODUCTS.filter((p) => p.category === cat).length;
            const isActive = selectedCategory === cat;

            return (
              <button
                key={cat}
                id={`category-tab-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? 'bg-[#dfad7d] text-[#1c1109] border-[#dfad7d] shadow-md'
                    : 'bg-[#1a110a] text-[#ceb8a6] border-[#332014] hover:bg-[#28180e] hover:text-[#faede1]'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? 'bg-[#1c1109]/20 text-[#1c1109]'
                      : 'bg-[#2b1b11] text-[#9a7e6b]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#160f0a] rounded-3xl border border-[#301e13] p-8">
            <Filter className="w-12 h-12 text-[#684631] mx-auto mb-4 opacity-70" />
            <h3 className="font-serif-elegant text-2xl font-bold text-[#faf3eb] mb-2">
              No menu items matched your search
            </h3>
            <p className="text-sm text-[#bca594] max-w-sm mx-auto mb-6">
              Try adjusting your search terms or clearing the active filters to see our full catalogue.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All Items');
                setSearchQuery('');
                setOnlyVeg(false);
              }}
              className="px-6 py-2.5 rounded-full bg-[#dfad7d] text-[#1a0f09] text-xs font-semibold uppercase tracking-wider hover:bg-[#eac297] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onOpenModal={onOpenProductModal}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
