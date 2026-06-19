import React, { useState, useMemo } from 'react';
import { X, Trash2, ShoppingBag, Tag, CreditCard, Clock, MapPin, CheckCircle, Bike, Heart } from 'lucide-react';
import { CartItem, MenuItem, Reservation } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  activeBookings: Reservation[];
}

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  activeBookings
}: CartSidebarProps) {
  const [orderMethod, setOrderMethod] = useState<'dine-in' | 'pickup' | 'delivery'>('dine-in');
  const [selectedTableNo, setSelectedTableNo] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  
  // Promo codes handling
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  // Chef Simulation Status
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'preparing' | 'completed'>('cart');
  const [prepStatus, setPrepStatus] = useState<'accepted' | 'cooking' | 'plating' | 'ready'>('accepted');
  const [simulatedSecondsLeft, setSimulatedSecondsLeft] = useState(15);
  const [simInterval, setSimInterval] = useState<any>(null);

  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');

  // Totals calculations
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    if (!appliedDiscount) return 0;
    return Math.round((subtotal * appliedDiscount.percent) / 100);
  }, [subtotal, appliedDiscount]);

  const taxAmount = useMemo(() => {
    const discounted = subtotal - discountAmount;
    return Math.round(discounted * 0.05); // 5% GST
  }, [subtotal, discountAmount]);

  const total = useMemo(() => {
    return subtotal - discountAmount + taxAmount;
  }, [subtotal, discountAmount, taxAmount]);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();

    if (code === 'CICLO10') {
      setAppliedDiscount({ code: 'CICLO10', percent: 10 });
      setPromoCode('');
    } else if (code === 'BICYCLE20') {
      setAppliedDiscount({ code: 'BICYCLE20', percent: 20 });
      setPromoCode('');
    } else if (code === 'WELCOME') {
      setAppliedDiscount({ code: 'WELCOME', percent: 15 });
      setPromoCode('');
    } else {
      setPromoError('Invalid promo code. Try "CICLO10" or "BICYCLE20"!');
    }
  };

  const handleClearPromo = () => {
    setAppliedDiscount(null);
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;
    if (orderMethod === 'delivery' && !deliveryAddress.trim()) {
      alert('Please fill in your home delivery address details.');
      return;
    }
    
    setIsSubmittingOrder(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            menuItemId: item.menuItem.id,
            quantity: item.quantity,
            name: item.menuItem.name,
            price: item.menuItem.price
          })),
          method: orderMethod,
          selectedTableNo,
          deliveryAddress,
          discountCode: appliedDiscount ? appliedDiscount.code : "",
          subtotal,
          discount: discountAmount,
          tax: taxAmount,
          total
        })
      });

      if (!response.ok) {
        throw new Error("Failed to place order on the backend.");
      }

      const orderData = await response.json();
      setPlacedOrderId(orderData.id);

      // Begin real-time server status polling
      setCheckoutStep('preparing');
      setPrepStatus('accepted');
      setSimulatedSecondsLeft(15);

      const interval = setInterval(() => {
        fetch(`/api/orders/${orderData.id}/status`)
          .then((res) => {
            if (!res.ok) throw new Error("Status query failed");
            return res.json();
          })
          .then((statusData) => {
            setPrepStatus(statusData.status);
            setSimulatedSecondsLeft(statusData.secondsLeft);
            if (statusData.status === 'ready') {
              setCheckoutStep('completed');
              clearInterval(interval);
            }
          })
          .catch((err) => {
            console.warn("Status polling error, falling back to static countdown:", err);
            // safe fallback countdown in case server becomes temporarily unreachable
            setSimulatedSecondsLeft((prev) => {
              if (prev <= 1) {
                setPrepStatus('ready');
                setCheckoutStep('completed');
                clearInterval(interval);
                return 0;
              }
              const nextVal = prev - 1;
              if (nextVal <= 4) setPrepStatus('plating');
              else if (nextVal <= 9) setPrepStatus('cooking');
              return nextVal;
            });
          });
      }, 1000);

      setSimInterval(interval);
    } catch (err) {
      console.warn("Connection problem while placing order, launching local pipeline fallback:", err);
      setCheckoutStep('preparing');
      setPrepStatus('accepted');
      setSimulatedSecondsLeft(15);

      let currentSec = 15;
      const interval = setInterval(() => {
        currentSec -= 1;
        setSimulatedSecondsLeft(currentSec);

        if (currentSec === 11) {
          setPrepStatus('cooking');
        } else if (currentSec === 6) {
          setPrepStatus('plating');
        } else if (currentSec <= 0) {
          setPrepStatus('ready');
          setCheckoutStep('completed');
          clearInterval(interval);
        }
      }, 1000);

      setSimInterval(interval);
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  const handleResetCart = () => {
    if (simInterval) clearInterval(simInterval);
    onClearCart();
    setCheckoutStep('cart');
    setPromoCode('');
    setAppliedDiscount(null);
    setDeliveryAddress('');
    setSelectedTableNo('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      {/* Slider core panel */}
      <div className="w-full max-w-md bg-[#fcf9f8] h-full flex flex-col justify-between shadow-2xl relative border-l border-surface-highest animate-slide-in">
        
        {/* Top Header */}
        <div className="p-5 border-b border-surface-highest flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-primary" size={20} />
            <h3 className="font-serif text-xl font-bold text-primary">Your Order Bag</h3>
            <span className="text-xs bg-primary/15 text-primary px-2.5 py-0.5 rounded-full font-semibold">
              {cartItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-outline hover:text-primary hover:bg-surface-low rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {checkoutStep === 'cart' ? (
          /* ================= STEP 1: INSPECT CART ITEMS ================= */
          <>
            {cartItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#fcf9f8]">
                <div className="w-16 h-16 bg-surface-low rounded-full flex items-center justify-center text-outline/50 mb-4 border border-surface-container">
                  <ShoppingBag size={28} />
                </div>
                <h4 className="font-serif text-lg font-bold text-primary mb-1">Your bag is empty</h4>
                <p className="text-xs text-secondary leading-relaxed max-w-xs mb-6">
                  Add delicious hand-pressed roasts, fresh bento pastries, or sourdough pizzas from our specials to begin!
                </p>
                <button
                  onClick={onClose}
                  className="bg-primary text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-primary-light transition-all cursor-pointer"
                >
                  Explore Menu Specials
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                
                {/* List of Cart Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.menuItem.id}
                      className="bg-white rounded-xl border border-surface-highest p-3.5 flex gap-3 shadow-none hover:shadow-xs transition-shadow relative"
                    >
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        className="w-16 h-16 object-cover rounded-lg shrink-0 border border-surface-low"
                        referrerPolicy="no-referrer"
                      />
                      
                      <div className="flex-1 min-w-0 pr-6 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-1">
                            <h5 className="text-xs font-bold text-primary truncate leading-tight">
                              {item.menuItem.name}
                            </h5>
                          </div>
                          <span className="text-[10px] text-outline block mt-0.5">
                            Category: {item.menuItem.category}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs font-bold text-primary">
                            ₹{item.menuItem.price * item.quantity}
                          </span>
                          
                          {/* Stepper controls */}
                          <div className="flex items-center border border-surface-highest bg-surface-low rounded-full px-1.5 py-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity - 1)}
                              className="text-primary hover:bg-surface-highest font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center focus:outline-none"
                            >
                              -
                            </button>
                            <span className="px-2.5 text-xs text-on-surface font-semibold shrink-0">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity + 1)}
                              className="text-primary hover:bg-surface-highest font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center focus:outline-none"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Trash action top right of card */}
                      <button
                        onClick={() => onRemoveItem(item.menuItem.id)}
                        className="absolute top-3.5 right-3.5 text-outline hover:text-red-700 p-1.5 hover:bg-red-50 rounded-full transition-all"
                        title="Remove"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Service Method selectors */}
                <div className="bg-white border border-surface-highest rounded-2xl p-4 space-y-4">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-outline mb-2">
                    Service Preference
                  </span>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setOrderMethod('dine-in')}
                      className={`py-2 rounded-xl border text-center font-bold text-[10px] uppercase transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                        orderMethod === 'dine-in'
                          ? 'bg-primary border-primary text-white shadow-xs'
                          : 'bg-white border-surface-highest text-secondary hover:bg-surface-low'
                      }`}
                    >
                      Dine-In
                    </button>
                    <button
                      onClick={() => setOrderMethod('pickup')}
                      className={`py-2 rounded-xl border text-center font-bold text-[10px] uppercase transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                        orderMethod === 'pickup'
                          ? 'bg-primary border-primary text-white shadow-xs'
                          : 'bg-white border-surface-highest text-secondary hover:bg-surface-low'
                      }`}
                    >
                      Pickup
                    </button>
                    <button
                      onClick={() => setOrderMethod('delivery')}
                      className={`py-2 rounded-xl border text-center font-bold text-[10px] uppercase transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                        orderMethod === 'delivery'
                          ? 'bg-primary border-primary text-white shadow-xs'
                          : 'bg-white border-surface-highest text-secondary hover:bg-surface-low'
                      }`}
                    >
                      Delivery
                    </button>
                  </div>

                  {/* Dine-in specifics: list active bookings Table assignment */}
                  {orderMethod === 'dine-in' && (
                    <div className="bg-surface-low p-3 rounded-xl border border-surface-high space-y-2">
                      <label className="block text-[9px] font-bold text-outline uppercase tracking-wider">
                        Select Allocated Table Spot
                      </label>
                      {activeBookings.length > 0 ? (
                        <select
                          value={selectedTableNo}
                          onChange={(e) => setSelectedTableNo(e.target.value)}
                          className="w-full bg-white border border-surface-highest rounded-xl px-3 py-2 text-xs font-medium text-on-surface"
                        >
                          <option value="">-- Choose active booking spot --</option>
                          {activeBookings.map((res) => (
                            <option key={res.id} value={res.tableNumber}>
                              Table #{res.tableNumber} - {res.name} ({res.time})
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-[10px] text-orange-900 font-medium">
                            No active table bookings found. You can enter table number directly or place a guest request.
                          </p>
                          <input
                            type="text"
                            placeholder="e.g. Table 4"
                            value={selectedTableNo}
                            onChange={(e) => setSelectedTableNo(e.target.value)}
                            className="w-full bg-white border border-surface-highest rounded-xl px-3 py-1.5 text-xs font-semibold text-on-surface"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Delivery specifics Address form */}
                  {orderMethod === 'delivery' && (
                    <div className="space-y-2">
                      <label className="block text-[9px] font-bold text-outline uppercase tracking-wider">
                        Home Delivery Address
                      </label>
                      <textarea
                        required
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="e.g. Unit 4B, Signature Crest Towers, Chennai"
                        className="w-full bg-white border border-surface-highest rounded-xl p-3 text-xs font-semibold outline-none focus:ring-1 focus:ring-primary h-20 text-on-surface"
                      />
                    </div>
                  )}
                </div>

                {/* Promo Code Input panel */}
                <div className="bg-white border border-surface-highest rounded-2xl p-4">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-outline mb-2">
                    Voucher / Promo Code
                  </span>

                  {appliedDiscount ? (
                    <div className="bg-emerald-50 text-emerald-800 border border-emerald-300 p-3 rounded-xl flex items-center justify-between text-xs font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Tag size={13} className="text-emerald-700 animate-pulse" />
                        <span>Code <b>{appliedDiscount.code}</b> active ({appliedDiscount.percent}% OFF)</span>
                      </div>
                      <button
                        onClick={handleClearPromo}
                        className="p-1 hover:bg-emerald-100 rounded-full text-emerald-900 text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Try CICLO10 or BICYCLE20"
                        className="flex-1 bg-white border border-surface-highest rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:ring-1 focus:ring-primary text-on-surface outline-none"
                      />
                      <button
                        type="submit"
                        className="bg-primary hover:bg-primary-light text-white px-4 rounded-xl text-xs font-semibold"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {promoError && (
                    <p className="text-[10px] font-semibold text-rose-700 mt-1.5 ml-1">{promoError}</p>
                  )}
                </div>

              </div>
            )}
          </>
        ) : checkoutStep === 'preparing' ? (
          /* ================= STEP 2: ACTIVE REALT-IME COOKING TRACKER ================= */
          <div className="flex-1 p-6 text-center flex flex-col items-center justify-center bg-[#fcf9f8] space-y-6">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#cf594a] bg-rose-50 px-4 py-1.5 rounded-full uppercase border border-rose-200 animate-pulse">
              Orders Live Pipeline
            </span>

            {/* Simulated Animated Radar / Timer circle */}
            <div className="relative w-44 h-44 rounded-full border-4 border-surface-highest flex items-center justify-center bg-white shadow-md">
              <div className="absolute inset-0 w-full h-full rounded-full border-4 border-dotted border-primary animate-spin" style={{ animationDuration: '10s' }} />
              <div className="text-center">
                <Clock size={36} className="text-primary-light mx-auto mb-2 animate-bounce" />
                <span className="block font-mono text-3xl font-extrabold text-primary">
                  {simulatedSecondsLeft}s
                </span>
                <span className="text-[9px] font-bold text-[#827472] uppercase tracking-wider">
                  Est. plating time
                </span>
              </div>
            </div>

            {/* Stepped status list */}
            <div className="w-full max-w-xs text-left space-y-4">
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                  prepStatus === 'accepted' || prepStatus === 'cooking' || prepStatus === 'plating'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-emerald-100 border-emerald-300 text-emerald-800'
                }`}>
                  <span className="text-xs font-bold">1</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-primary">Voucher Received & Checked</span>
                  <p className="text-[10px] text-secondary">Our executive chef accepted your artisanal request.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                  prepStatus === 'cooking' || prepStatus === 'plating'
                    ? 'bg-primary text-white border-primary animate-pulse'
                    : prepStatus === 'accepted'
                    ? 'border-surface-highest bg-white text-outline'
                    : 'bg-emerald-100 border-emerald-300 text-emerald-800'
                }`}>
                  <span className="text-xs font-bold">2</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-primary">Active Sourdough Baking / Brewing</span>
                  <p className="text-[10px] text-secondary">Brewing premium Arabicas at perfect 92°C temperatures.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                  prepStatus === 'plating'
                    ? 'bg-primary text-white border-primary animate-pulse'
                    : 'border-surface-highest bg-white text-outline'
                }`}>
                  <span className="text-xs font-bold">3</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-primary">Plating & Garnish Chiffonade</span>
                  <p className="text-[10px] text-secondary">Drizzling clean porcini herb oil overlays for final aesthetics.</p>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-outline max-w-xs italic">
              Please avoid closing your workspace window—the culinary team is actively executing your request!
            </p>
          </div>
        ) : (
          /* ================= STEP 3: COMPLETED STATE VOUCHER ================= */
          <div className="flex-1 p-6 text-center flex flex-col items-center justify-center bg-[#fcf9f8] space-y-6">
            <div className="w-16 h-16 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-full flex items-center justify-center shadow-xs">
              <CheckCircle size={32} className="stroke-[2.5]" />
            </div>

            <div>
              <span className="text-[9px] font-bold text-emerald-900 bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
                Ready to Savor
              </span>
              <h4 className="font-serif text-3xl font-bold text-primary mt-3 mb-1">
                Meal is Plated!
              </h4>
              <p className="text-xs text-secondary leading-relaxed max-w-xs">
                {orderMethod === 'dine-in'
                  ? `Your order has been delivered directly to Table #${selectedTableNo || '4'}. Bon appétit!`
                  : orderMethod === 'pickup'
                  ? 'Your warm order bag is packaged and waiting at the collection counter.'
                  : 'Your dispatch bicyclist is out delivering to your address.'}
              </p>
            </div>

            {/* Custom order detail sheet */}
            <div className="w-full bg-white border border-surface-highest rounded-2xl p-4 text-left space-y-2.5 shadow-xs text-xs">
              <span className="block font-bold uppercase text-[9px] text-[#bd928f]">Voucher summary</span>
              
              <div className="flex justify-between border-b border-surface-low pb-2 text-outline">
                <span>Total amount paid:</span>
                <span className="font-bold text-primary">₹{total}</span>
              </div>
              <div className="flex justify-between border-b border-surface-low pb-2 text-outline">
                <span>Method selected:</span>
                <span className="font-bold text-primary uppercase">{orderMethod}</span>
              </div>
              <div className="flex justify-between text-outline">
                <span>Estimated Prep-Time:</span>
                <span className="font-bold text-emerald-800 flex items-center gap-1">
                  15 Seconds (Standard Instant Grade)
                </span>
              </div>
            </div>

            <button
              onClick={handleResetCart}
              className="bg-primary hover:bg-[#5f3e3c] text-white text-xs font-semibold px-8 py-3 rounded-full cursor-pointer transition-colors shadow-md"
            >
              Order Additional Items
            </button>
          </div>
        )}

        {/* Bottom billing sheet (Total, Taxes, checkout Button) */}
        {checkoutStep === 'cart' && cartItems.length > 0 && (
          <div className="bg-white border-t border-surface-highest p-5 space-y-4 shadow-2xl relative">
            
            {/* Invoice rows */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#827472] font-medium">
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              {appliedDiscount && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Discount ({appliedDiscount.percent}%):</span>
                  <span>- ₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-[#827472] font-medium">
                <span>Taxes & GST (5%):</span>
                <span>₹{taxAmount}</span>
              </div>
              <div className="flex justify-between text-primary font-bold text-base pt-2 border-t border-surface-low">
                <span>Total Amount:</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* Complete checkout button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isSubmittingOrder}
              className={`w-full bg-primary hover:bg-primary-light text-white py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 focus:outline-none ${
                isSubmittingOrder ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <CreditCard size={15} />
              {isSubmittingOrder ? 'Placing Order...' : 'Confirm & Place Order'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
