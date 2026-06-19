import React, { useState } from 'react';
import { ChefHat, ShoppingCart, Sparkles } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data';

interface BakeryBentoProps {
  onAddToCart: (item: MenuItem) => void;
}

export default function BakeryBento({ onAddToCart }: BakeryBentoProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Extract the specific bakery items
  const artisanalSourdough = MENU_ITEMS.find((item) => item.id === 'sourdough');
  const almondCroissant = MENU_ITEMS.find((item) => item.id === 'almond-croissants');
  const trufflePastry = MENU_ITEMS.find((item) => item.id === 'truffle-pastry');

  const handleAddWithFeedback = (item: MenuItem) => {
    onAddToCart(item);
    setToastMessage(`Added ${item.name} to order!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  return (
    <section className="py-12 bg-surface-low border-t border-b border-surface-highest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-serif text-2xl sm:text-3xl text-primary flex items-center gap-3 font-semibold">
            <span className="w-12 h-[1px] bg-outline-variant"></span>
            Fresh From The Bakery
          </h3>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-primary px-3 py-1 bg-white border border-surface-highest rounded-full uppercase tracking-wider">
            <ChefHat size={12} className="text-primary-light" />
            Baked Daily at 5 AM
          </span>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[550px]">
          
          {/* 1. Large Feature Card (Sourdough Slices) */}
          {artisanalSourdough && (
            <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-2xl bg-primary text-white flex flex-col justify-end p-6 sm:p-8 min-h-[350px] md:min-h-0 shadow-lg">
              {/* Background cover image with custom dim opacity overlay config from instructions */}
              <img
                src={artisanalSourdough.image}
                alt={artisanalSourdough.name}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent"></div>
              
              <div className="relative z-10 flex flex-col justify-end h-full">
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#bd928f] mb-2 flex items-center gap-1.5">
                  <Sparkles size={11} className="text-amber-400" />
                  Our Daily Special
                </span>
                
                <h4 className="font-serif text-2xl sm:text-3.5xl font-bold mb-3 tracking-wide">
                  {artisanalSourdough.name}
                </h4>
                
                <p className="font-sans text-xs text-surface-container opacity-90 max-w-md leading-relaxed mb-6">
                  {artisanalSourdough.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <span className="font-sans text-xl font-bold bg-[#4a2c2a] px-4 py-1.5 rounded-full border border-primary-light text-[#ffdad7]">
                    ₹{artisanalSourdough.price}
                  </span>
                  <button
                    onClick={() => handleAddWithFeedback(artisanalSourdough)}
                    className="bg-white text-primary hover:bg-[#F7F3EE] px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-colors duration-200 shadow-md flex items-center gap-2 active:scale-95"
                  >
                    <ShoppingCart size={13} />
                    ADD TO ORDER
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. Small Card 1 (Classic Almond Croissant) */}
          {almondCroissant && (
            <div className="md:col-span-2 group relative overflow-hidden rounded-2xl bg-white border border-surface-highest p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between gap-4 h-full">
                <div className="max-w-[65%] flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-2 py-0.5 rounded-md self-start mb-2 inline-block">
                      Laminated Paste
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl text-primary font-semibold mb-2 group-hover:text-primary-light transition-colors">
                      {almondCroissant.name}
                    </h4>
                    <p className="font-sans text-xs text-secondary leading-relaxed">
                      {almondCroissant.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <span className="font-bold text-primary text-base">₹{almondCroissant.price}</span>
                    <button
                      onClick={() => handleAddWithFeedback(almondCroissant)}
                      className="text-primary hover:text-primary-light font-bold text-xs tracking-wider uppercase flex items-center gap-1 active:scale-95"
                    >
                      ADD +
                    </button>
                  </div>
                </div>

                {/* Masked circle image container */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-surface-low shadow-md shrink-0 self-center">
                  <img
                    src={almondCroissant.image}
                    alt={almondCroissant.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 3. Small Card 2 (Dutch Truffle Pastry) */}
          {trufflePastry && (
            <div className="md:col-span-2 group relative overflow-hidden rounded-2xl bg-white border border-surface-highest p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between gap-4 h-full">
                <div className="max-w-[65%] flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[10px] font-bold text-rose-800 uppercase tracking-widest bg-rose-100 px-2 py-0.5 rounded-md self-start mb-2 inline-block">
                      Chef's Special
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl text-primary font-semibold mb-2 group-hover:text-primary-light transition-colors">
                      {trufflePastry.name}
                    </h4>
                    <p className="font-sans text-xs text-secondary leading-relaxed">
                      {trufflePastry.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <span className="font-bold text-primary text-base">₹{trufflePastry.price}</span>
                    <button
                      onClick={() => handleAddWithFeedback(trufflePastry)}
                      className="text-primary hover:text-primary-light font-bold text-xs tracking-wider uppercase flex items-center gap-1 active:scale-95"
                    >
                      ADD +
                    </button>
                  </div>
                </div>

                {/* Masked circle image container */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-surface-low shadow-md shrink-0 self-center">
                  <img
                    src={trufflePastry.image}
                    alt={trufflePastry.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Secondary Toaster notification inside Bento */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 bg-emerald-950 text-white border border-emerald-800 px-5 py-3 rounded-xl shadow-lg z-50 flex items-center gap-2 animate-fade-in text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            {toastMessage}
          </div>
        )}

      </div>
    </section>
  );
}
