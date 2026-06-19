import React, { useState, useMemo } from 'react';
import { Search, Star, Sparkles, SlidersHorizontal, ArrowUpDown, ChevronRight } from 'lucide-react';
import { MenuItem, Category } from '../types';
import { MENU_ITEMS } from '../data';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
}

const CATEGORIES: Category[] = [
  'All Specials',
  'Coffee',
  'Tea & Beverages',
  'Breakfast',
  'Appetizers',
  'Pasta',
  'Pizza',
  'Main Course',
  'Desserts',
  'Bakery'
];

export default function MenuSection({ onAddToCart }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('All Specials');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'rating'>('default');
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    let items = [...MENU_ITEMS];

    // Category Filter
    if (activeCategory !== 'All Specials') {
      items = items.filter(item => item.category === activeCategory);
    }

    // Search Query Filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }

    // Diet Filter
    if (dietFilter !== 'all') {
      items = items.filter(item => item.type === dietFilter);
    }

    // Sorting
    if (sortBy === 'price-low') {
      items.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      items.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return items;
  }, [activeCategory, searchQuery, dietFilter, sortBy]);

  const handleAddClick = (item: MenuItem) => {
    onAddToCart(item);
    setAddedItemName(item.name);
    setTimeout(() => {
      setAddedItemName(null);
    }, 2000);
  };

  return (
    <section className="py-8">
      {/* Search & Filter Bar Sticky panel */}
      <div className="sticky top-[72px] z-30 bg-[#fcf9f8]/95 backdrop-blur-sm border-y border-surface-highest mb-12 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for your favorites..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-surface-highest rounded-full text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:outline-none placeholder:text-outline-variant shadow-sm transition-all text-on-surface"
              />
            </div>

            {/* Quick Filters (Veg / Non Veg) + Sort */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end">
              {/* Diet buttons */}
              <div className="flex border border-surface-highest bg-white rounded-full p-1 shadow-sm text-xs font-semibold">
                <button
                  onClick={() => setDietFilter('all')}
                  className={`px-4 py-1.5 rounded-full transition-colors ${
                    dietFilter === 'all'
                      ? 'bg-primary text-white font-bold'
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setDietFilter('veg')}
                  className={`px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-colors ${
                    dietFilter === 'veg'
                      ? 'bg-emerald-800 text-white font-bold'
                      : 'text-emerald-700 hover:text-emerald-800'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Veg
                </button>
                <button
                  onClick={() => setDietFilter('non-veg')}
                  className={`px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-colors ${
                    dietFilter === 'non-veg'
                      ? 'bg-rose-900 text-white font-bold'
                      : 'text-rose-700 hover:text-rose-900'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span> Non-Veg
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5 border border-surface-highest bg-white rounded-full px-4 py-2 hover:bg-surface-low transition-colors text-xs font-semibold shadow-sm text-on-surface hover:cursor-pointer relative">
                <SlidersHorizontal size={14} className="text-secondary" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent border-none p-0 pr-6 text-xs font-semibold outline-none hover:cursor-pointer focus:ring-0 text-on-surface"
                >
                  <option value="default">Sorted: Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Popularity (⭐)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Tabs Scroll */}
          <nav className="flex items-center gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 py-1">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  // also highlight if category is Bakery we can scroll to the bakery bento
                }}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all uppercase duration-200 active:scale-95 ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-md font-bold'
                    : 'bg-white border border-surface-highest text-secondary hover:bg-surface-low hover:text-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Dynamic item indicator toasted bar */}
      {addedItemName && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#321716] text-[#fcf9f8] px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-bounce border border-outline-variant font-semibold text-sm">
          <Sparkles className="text-yellow-400 fill-yellow-400" size={16} />
          <span>Added {addedItemName} to order</span>
        </div>
      )}

      {/* Main Grid display according to design mockup */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Group of Signature Specials */}
        <div className="flex items-center justify-between mb-8 border-b border-surface-highest pb-4">
          <h3 className="font-serif text-2xl sm:text-3xl text-primary flex items-center gap-3 font-semibold">
            <span className="w-8 h-[1px] bg-outline-variant hidden sm:inline"></span>
            {activeCategory === 'All Specials' ? 'Signature Specials' : `${activeCategory} Curations`}
          </h3>
          <p className="font-sans text-xs font-bold tracking-wider text-outline uppercase">
            {filteredAndSortedItems.length} {filteredAndSortedItems.length === 1 ? 'ITEM' : 'ITEMS'} AVAILABLE
          </p>
        </div>

        {filteredAndSortedItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-surface-highest p-8 max-w-lg mx-auto">
            <Sparkles className="text-outline mx-auto mb-4" size={40} />
            <p className="font-serif text-xl font-semibold text-primary mb-2">No matching items</p>
            <p className="text-sm text-secondary">
              We couldn't find any specials in "{activeCategory}" matching your filters. Try clearing your search query or choosing another category!
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setDietFilter('all');
                setActiveCategory('All Specials');
              }}
              className="mt-6 inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-primary-light transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedItems.map((item) => (
              <div 
                key={item.id}
                className="group bg-white rounded-2xl border border-surface-highest overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Product image container */}
                <div className="relative h-64 overflow-hidden bg-surface-low">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  {/* Category Chip Left Bottom */}
                  <span className="absolute bottom-4 left-4 bg-[#fcf9f8]/95 backdrop-blur-sm text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm border border-surface-highest">
                    {item.category}
                  </span>

                  {/* Bestseller indicator */}
                  {item.isBestseller && (
                    <div className="absolute top-4 left-4 bg-tertiary-fixed text-on-tertiary-fixed border border-emerald-800/10 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                      <Star size={12} className="fill-current text-amber-500" />
                      Bestseller
                    </div>
                  )}

                  {/* Prep time card */}
                  {item.prepTime && (
                    <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium px-2.5 py-1 rounded-full">
                      {item.prepTime}
                    </span>
                  )}
                </div>

                {/* Info Container */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Header: Title + Food Dot indicator */}
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h4 className="font-serif text-xl font-semibold text-primary group-hover:text-primary-light transition-colors">
                        {item.name}
                      </h4>
                      
                      {/* Veg / Non-Veg Indicator Dot */}
                      <span 
                        className={`w-4 h-4 border-2 p-[2px] flex items-center justify-center rounded-sm shrink-0 mt-1 ${
                          item.type === 'veg' ? 'border-emerald-700' : 'border-rose-700'
                        }`}
                        title={item.type === 'veg' ? 'Vegetarian' : 'Contains Meat'}
                      >
                        <span className={`w-full h-full rounded-full ${
                          item.type === 'veg' ? 'bg-emerald-700' : 'bg-rose-700'
                        }`} />
                      </span>
                    </div>

                    {/* Rating if present */}
                    {item.rating && (
                      <div className="flex items-center gap-1 mb-3">
                        <div className="flex text-amber-500">
                          <Star size={13} className="fill-current" />
                        </div>
                        <span className="text-xs font-bold text-on-surface">{item.rating}</span>
                        <span className="text-[10px] text-outline">• (Premium Grade)</span>
                      </div>
                    )}

                    <p className="font-sans text-xs text-secondary leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer Action buttons */}
                  <div className="flex justify-between items-center pt-4 border-t border-surface-low">
                    <span className="font-bold text-primary text-base">₹{item.price}</span>
                    <button
                      onClick={() => handleAddClick(item)}
                      className="text-primary hover:text-primary-light font-bold text-xs tracking-wider flex items-center gap-1 border border-primary/20 px-4 py-2 rounded-full hover:bg-surface-low transition-all uppercase duration-200"
                    >
                      ADD +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
