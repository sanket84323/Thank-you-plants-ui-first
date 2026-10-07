import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../../components/products/ProductCard';
import { Search, Filter, RefreshCw, Sparkles, SlidersHorizontal } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { products, categories } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('All');
  const [selectedIndoorOutdoor, setSelectedIndoorOutdoor] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<string>('All');
  const [bestSellersOnly, setBestSellersOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query);
        const matchCat = product.category.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchCat) return false;
      }

      // Category
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Occasion
      if (selectedOccasion !== 'All' && !product.occasion.includes(selectedOccasion)) {
        return false;
      }

      // Indoor/Outdoor
      if (selectedIndoorOutdoor !== 'All' && product.indoorOutdoor !== selectedIndoorOutdoor && product.indoorOutdoor !== 'Both') {
        return false;
      }

      // Difficulty
      if (selectedDifficulty !== 'All' && product.careLevel !== selectedDifficulty) {
        return false;
      }

      // Size
      if (selectedSize !== 'All' && product.plantSize !== selectedSize) {
        return false;
      }

      // Price Range
      const effectivePrice = product.discountPrice || product.price;
      if (priceRange === 'under-500' && effectivePrice >= 500) return false;
      if (priceRange === '500-1000' && (effectivePrice < 500 || effectivePrice > 1000)) return false;
      if (priceRange === 'above-1000' && effectivePrice <= 1000) return false;

      // Best sellers
      if (bestSellersOnly && !product.isBestSeller) return false;

      return true;
    }).sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedOccasion,
    selectedIndoorOutdoor,
    selectedDifficulty,
    selectedSize,
    priceRange,
    bestSellersOnly,
    sortBy
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedOccasion('All');
    setSelectedIndoorOutdoor('All');
    setSelectedDifficulty('All');
    setSelectedSize('All');
    setPriceRange('All');
    setBestSellersOnly(false);
    setSortBy('featured');
  };

  const occasionsList = [
    'Thank You',
    'Employee Appreciation',
    'Birthday',
    'Work Anniversary',
    'Corporate Gifting',
    'Teacher Appreciation',
    'Client Appreciation',
    'Festival',
    'Welcome Gift'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Header */}
      <div className="mb-8">
        <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block mb-1">
          Living Appreciation Catalog
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#132E20]">
          Explore Plant Gifts
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm mt-1">
          Browse air-purifiers, succulents, bonsai, and flowering plants packaged for gifting.
        </p>
      </div>

      {/* Top Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-soft mb-8 flex flex-col md:flex-row items-center gap-4 justify-between">
        
        {/* Search Field */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search plant name, care level, category..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-bold text-stone-700 flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-semibold whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 focus:outline-none focus:border-emerald-600"
            >
              <option value="featured">Featured & Best Sellers</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT FILTER PANEL (Desktop & Mobile drawer) */}
        <aside className={`lg:col-span-3 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-soft space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <h3 className="font-heading font-bold text-sm text-[#132E20] flex items-center gap-2">
              <Filter className="w-4 h-4 text-emerald-700" />
              <span>Filter Products</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-[11px] font-bold text-stone-400 hover:text-emerald-700 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2.5">Category</h4>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                  selectedCategory === 'All' ? 'bg-emerald-100/70 text-[#132E20]' : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                <span>All Categories</span>
                <span className="text-[10px] text-stone-400">{products.length}</span>
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                    selectedCategory === cat.name ? 'bg-emerald-100/70 text-[#132E20]' : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] text-stone-400">
                    {products.filter(p => p.category === cat.name).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2.5">Price Range</h4>
            <div className="space-y-1">
              {[
                { id: 'All', label: 'All Prices' },
                { id: 'under-500', label: 'Under ₹500' },
                { id: '500-1000', label: '₹500 - ₹1,000' },
                { id: 'above-1000', label: 'Above ₹1,000' }
              ].map(p => (
                <label key={p.id} className="flex items-center gap-2 text-xs text-stone-700 font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={priceRange === p.id}
                    onChange={() => setPriceRange(p.id)}
                    className="accent-emerald-700"
                  />
                  <span>{p.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Occasion */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2.5">Occasion</h4>
            <select
              value={selectedOccasion}
              onChange={e => setSelectedOccasion(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 focus:outline-none focus:border-emerald-600"
            >
              <option value="All">All Occasions</option>
              {occasionsList.map(occ => (
                <option key={occ} value={occ}>{occ}</option>
              ))}
            </select>
          </div>

          {/* Environment */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2.5">Placement</h4>
            <div className="flex gap-1.5 flex-wrap">
              {['All', 'Indoor', 'Outdoor'].map(env => (
                <button
                  key={env}
                  onClick={() => setSelectedIndoorOutdoor(env)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedIndoorOutdoor === env
                      ? 'bg-[#132E20] text-emerald-300'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {env}
                </button>
              ))}
            </div>
          </div>

          {/* Care Difficulty */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2.5">Care Difficulty</h4>
            <div className="flex gap-1.5 flex-wrap">
              {['All', 'Very Easy', 'Easy', 'Medium', 'Advanced'].map(diff => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                    selectedDifficulty === diff
                      ? 'bg-emerald-700 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Plant Size */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2.5">Plant Size</h4>
            <div className="flex gap-1.5 flex-wrap">
              {['All', 'Small', 'Medium', 'Large', 'Extra Large'].map(sz => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                    selectedSize === sz
                      ? 'bg-emerald-700 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Best Sellers Checkbox */}
          <div className="pt-2 border-t border-stone-100">
            <label className="flex items-center gap-2 text-xs font-bold text-stone-800 cursor-pointer">
              <input
                type="checkbox"
                checked={bestSellersOnly}
                onChange={e => setBestSellersOnly(e.target.checked)}
                className="w-4 h-4 accent-emerald-700 rounded-sm"
              />
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Show Best Sellers Only
              </span>
            </label>
          </div>
        </aside>

        {/* RIGHT PRODUCT GRID */}
        <main className="lg:col-span-9 space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Showing <strong>{filteredProducts.length}</strong> products</span>
            {(selectedCategory !== 'All' || priceRange !== 'All' || searchQuery !== '') && (
              <button onClick={resetFilters} className="text-emerald-700 font-bold hover:underline">
                Clear all filters
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-stone-200/80 shadow-soft">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-3xl mx-auto mb-4">
                🔍
              </div>
              <h3 className="font-heading font-bold text-lg text-stone-900 mb-1">No plants found</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto mb-6">
                We couldn't find any products matching your active filters. Try clearing your search or price parameters.
              </p>
              <button
                onClick={resetFilters}
                className="py-2.5 px-6 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-bold transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
};
