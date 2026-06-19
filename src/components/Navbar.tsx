import React, { useState } from 'react';
import { Menu, X, CalendarCheck, MapPin, Bike, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenReserve: () => void;
  cartCount: number;
  onOpenCart: () => void;
  bookingCount: number;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  onOpenReserve,
  cartCount,
  onOpenCart,
  bookingCount
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'menu', label: 'MENU', icon: Bike },
    { id: 'bookings', label: `MY BOOKINGS ${bookingCount > 0 ? `(${bookingCount})` : ''}`, icon: CalendarCheck },
    { id: 'story', label: 'OUR STORY', icon: MapPin },
  ];

  return (
    <header className="fixed top-0 w-full z-40 bg-[#fcf9f8]/90 backdrop-blur-md border-b border-surface-highest transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Left Section: Menu Toggle + Brand */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary p-2 focus:outline-none hover:bg-surface-container rounded-full transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="flex flex-col cursor-pointer" onClick={() => setActiveTab('menu')}>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tighter text-primary select-none">
              CICLO CAFÉ
            </h1>
            <span className="text-[9px] tracking-[0.25em] text-secondary font-semibold -mt-1 uppercase text-center sm:text-left">
              Bicycle & Artisanal Hub
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 font-semibold text-xs tracking-wider transition-all duration-200 py-2 border-b-2 ${
                  isActive
                    ? 'text-primary border-primary'
                    : 'text-on-surface-variant border-transparent hover:text-primary hover:border-outline-variant'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-primary' : 'text-outline'} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Section: Reserve CTA + Cart Bag */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Shopping Bag Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full border border-surface-highest bg-white text-primary hover:bg-surface-low transition-all duration-200 active:scale-95 group focus:outline-none"
            title="View Cart"
          >
            <ShoppingBag size={20} className="group-hover:rotate-6 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* Reserve CTA */}
          <button
            onClick={onOpenReserve}
            className="bg-primary text-white text-xs sm:text-sm font-semibold tracking-wider px-5 sm:px-6 py-2.5 rounded-full hover:bg-primary-light transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg focus:outline-none"
          >
            RESERVE
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-surface-bright border-b border-surface-highest absolute top-full left-0 w-full px-6 py-4 space-y-3 z-50 shadow-xl transition-all duration-300">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 text-left py-3 px-4 rounded-xl text-sm font-semibold ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'bg-surface-low text-on-surface hover:bg-surface-highest'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
          
          <div className="pt-4 border-t border-surface-highest flex flex-col gap-2">
            <p className="text-xs text-secondary text-center">
              Active community of coffee & cycle lovers since 2014.
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
