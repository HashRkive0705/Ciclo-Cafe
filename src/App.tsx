import React, { useState, useEffect } from 'react';
import { Bike, ShoppingBag } from 'lucide-react';

import Navbar from './components/Navbar';
import MenuSection from './components/MenuSection';
import BakeryBento from './components/BakeryBento';
import OurStorySection from './components/OurStorySection';
import BookingsDashboard from './components/BookingsDashboard';
import ReservationModal from './components/ReservationModal';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';

import AdminPage from './pages/AdminPage';


import { MenuItem, CartItem, Reservation } from './types';

export default function App() {
 
  // ==========================
  // ADMIN ROUTING
  // ==========================

 const pathname = window.location.pathname;

// ADMIN PAGE ROUTES
if (pathname === "/admin") {
  return <AdminPage />;
}

  // ==========================
  // MAIN WEBSITE
  // ==========================

  const [activeTab, setActiveTab] = useState<string>('menu');
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [bookings, setBookings] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('ciclo_bookings');
    return saved ? JSON.parse(saved) : [];
  });

 

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ciclo_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      'ciclo_bookings',
      JSON.stringify(bookings)
    );
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(
      'ciclo_cart',
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({
      top: 300,
      behavior: 'smooth'
    });
  };

  const handleAddToCart = (item: MenuItem) => {
  setCartItems(prev => {
    const existing = prev.find(
      i => i.menuItem.id === item.id
    );

    if (existing) {
      return prev.map(i =>
        i.menuItem.id === item.id
          ? {
              ...i,
              quantity: i.quantity + 1
            }
          : i
      );
    }

    return [
      ...prev,
      {
        menuItem: item,
        quantity: 1
      }
    ];
  });
};

  const handleUpdateQuantity = (
  itemId: string,
  quantity: number
) => {
  if (quantity <= 0) {
    handleRemoveItem(itemId);
    return;
  }

  setCartItems(prev =>
    prev.map(item =>
      item.menuItem.id === itemId
        ? { ...item, quantity }
        : item
    )
  );
};


  const handleRemoveItem = (itemId: string) => {
    setCartItems(prev =>
      prev.filter(item => item.menuItem.id !== itemId)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleAddBooking = (
    booking: Reservation
  ) => {
    setBookings(prev => [
      booking,
      ...prev
    ]);
  };

  const handleCancelBooking = (bookingId: string) => {
  setBookings(prev =>
    prev.filter(b => b.id !== bookingId)
  );
};
  const totalCartCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
  <div className="min-h-screen bg-[#fcf9f8] flex flex-col justify-between">

    <Navbar
      activeTab={activeTab}
      setActiveTab={handleSetActiveTab}
      onOpenReserve={() => setIsReserveOpen(true)}
      cartCount={totalCartCount}
      onOpenCart={() => setIsCartOpen(true)}
      bookingCount={bookings.length}
    />

   <section className="pt-28 pb-20 border-b border-[#e5e0dc]">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-16 items-center">

      {/* LEFT CONTENT */}
      <div>
        <div className="flex items-center gap-2 text-[#cf594a] text-sm tracking-[0.25em] font-semibold uppercase mb-8">
          <Bike size={16} />
          India's Pioneer Bicycle Cafe
        </div>

        <h1 className="text-[#2d1111] text-6xl lg:text-7xl font-serif leading-[1.05] mb-8">
          Our Artisanal
          <br />
          Café Masterpiece
        </h1>

        <p className="text-[#6b6765] text-xl leading-10 max-w-2xl mb-10">
          A curated collection of global flavors, locally sourced
          ingredients, and the warmth of a bicycle-loving community.
          From hand-pressed roasts to artisanal slow-fermentation
          sourdough loaves, we pour craftsmanship into every slice and
          steep.
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setActiveTab('menu')}
            className="bg-[#3a1414] text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition"
          >
            DISCOVER SPECIALS ↓
          </button>

          <button
            onClick={() => setIsReserveOpen(true)}
            className="border border-[#6d4b4b] text-[#3a1414] px-8 py-4 rounded-full font-semibold hover:bg-white transition"
          >
            LOCATE SEATS & BOOK
          </button>
        </div>
      </div>

      {/* RIGHT IMAGE CARD */}
      <div className="relative">
        <div className="overflow-hidden rounded-[32px] shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop"
            alt="Cafe Interior"
            className="w-full h-[520px] object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute bottom-8 left-8 text-white">
            <p className="uppercase tracking-[0.2em] text-xs mb-3">
              Warmth & Craft
            </p>

            <h3 className="text-4xl font-serif mb-3">
              The Bicycle-Loving Nest
            </h3>

            <p className="max-w-md text-white/90">
              Come for the gear check, stay for the single-origin
              espresso. Since 2014, making friends over brews.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

    <main className="flex-grow">

      {activeTab === 'menu' && (
        <div className="space-y-6">
          <MenuSection onAddToCart={handleAddToCart} />
          <BakeryBento onAddToCart={handleAddToCart} />
        </div>
      )}

      {activeTab === 'bookings' && (
        <BookingsDashboard
          bookings={bookings}
          onCancelBooking={handleCancelBooking}
          onOpenReserve={() => setIsReserveOpen(true)}
        />
      )}

      {activeTab === 'story' && (
        <OurStorySection />
      )}

    </main>

    <Footer />

    <ReservationModal
      isOpen={isReserveOpen}
      onClose={() => setIsReserveOpen(false)}
      onAddBooking={handleAddBooking}
    />

    <CartSidebar
      isOpen={isCartOpen}
      onClose={() => setIsCartOpen(false)}
      cartItems={cartItems}
      onUpdateQuantity={handleUpdateQuantity}
      onRemoveItem={handleRemoveItem}
      onClearCart={handleClearCart}
      activeBookings={bookings}
    />

    {totalCartCount > 0 && !isCartOpen && (
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-30 bg-primary text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center"
      >
        <ShoppingBag size={22} />
        <span className="absolute -top-1 -right-1 bg-[#cf594a] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border border-white">
          {totalCartCount}
        </span>
      </button>
    )}

  </div>
);
}