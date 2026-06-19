import React, { useState, useMemo } from 'react';
import { X, Calendar, Clock, Users, MapPin, Coffee, Check, Landmark, Sparkles } from 'lucide-react';
import { LOCATIONS } from '../data';
import { Reservation, LocationInfo } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBooking: (booking: Reservation) => void;
}

// Seat / Table layout structure for interactive mapping
interface TableNode {
  id: number;
  name: string;
  capacity: number;
  zone: 'Lounge' | 'Window Side' | 'Garden Patio' | 'Bicycle Vault';
  isPreReserved?: boolean;
}

const TABLES_LAYOUT: TableNode[] = [
  { id: 1, name: "Sprocket Booth 1", capacity: 2, zone: "Lounge" },
  { id: 2, name: "Sprocket Booth 2", capacity: 2, zone: "Lounge", isPreReserved: true },
  { id: 3, name: "Handlebar Window 3", capacity: 4, zone: "Window Side" },
  { id: 4, name: "Handlebar Window 4", capacity: 4, zone: "Window Side" },
  { id: 5, name: "Bicycle Vault 5", capacity: 6, zone: "Bicycle Vault" },
  { id: 6, name: "Bicycle Vault 6", capacity: 8, zone: "Bicycle Vault", isPreReserved: true },
  { id: 7, name: "Garden Patio 7", capacity: 2, zone: "Garden Patio" },
  { id: 8, name: "Garden Patio 8", capacity: 4, zone: "Garden Patio" },
  { id: 9, name: "Garden Patio 9", capacity: 6, zone: "Garden Patio" },
];

const TIME_SLOTS = [
  "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "4:00 PM", 
  "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"
];

export default function ReservationModal({ isOpen, onClose, onAddBooking }: ReservationModalProps) {
  const [step, setStep] = useState<1 | 2>(1); // 1: Info & Seating, 2: Customer details
  const [locationIndex, setLocationIndex] = useState(0);
  const [guests, setGuests] = useState(2);
  
  // Default date: Tomorrow
  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);
  
  const [date, setDate] = useState(tomorrow);
  const [time, setTime] = useState("7:00 PM");
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);

  // Customer Info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Finished booking ref for success state
  const [successBooking, setSuccessBooking] = useState<Reservation | null>(null);

  const selectedLocation = LOCATIONS[locationIndex];

  // Helper to find compatible tables
  const filteredTables = useMemo(() => {
    return TABLES_LAYOUT.map(table => {
      const isCompat = table.capacity >= guests;
      return {
        ...table,
        isCompatible: isCompat
      };
    });
  }, [guests]);

  const handleSelectTable = (table: TableNode) => {
    if (table.isPreReserved) return;
    setSelectedTableId(table.id);
  };

  const selectedTable = useMemo(() => {
    return TABLES_LAYOUT.find(t => t.id === selectedTableId) || null;
  }, [selectedTableId]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTableId) {
      alert("Please choose a table spot from our interactive map floor plan.");
      return;
    }
    setStep(2);
  };

  const handleConfirmReservation = async (e: React.FormEvent) => {
  e.preventDefault();

  console.log("CONFIRM BUTTON CLICKED");
  console.log({
    name,
    email,
    phone,
    date,
    time,
    guests
  });

    const randomTableNum = selectedTableId || Math.floor(Math.random() * 10) + 1;
    setIsSubmitting(true);

    try {
    console.log("SENDING TO BACKEND");

const response = await fetch(
  'https://script.google.com/macros/s/AKfycbxkuGJ7XVUpBjqjWeG7vOmpW3YW1IixF8MjANPlL7XOxLF_phnFMltB-3KP_XDF8B5qZA/exec',
  {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      phone,
      date,
      time,
      guests,
      location: selectedLocation.name,
      tableNumber: randomTableNum
    })
  }
);

console.log("GOOGLE SHEETS RESPONSE:", response);
      if (!response.ok) {
        throw new Error("HTTP error on reservation placement");
      }

      const localBooking: Reservation = {
  id: `REF-CICLO-${Math.floor(1000 + Math.random() * 9000)}`,
  name,
  email,
  phone,
  date,
  time,
  guests,
  location: selectedLocation.name,
  status: 'confirmed',
  tableNumber: randomTableNum,
  createdAt: new Date().toLocaleString()
};

onAddBooking(localBooking);
setSuccessBooking(localBooking);
    } catch (err) {
      console.warn("Failed to place booking on backend, falling back to local memory simulation:", err);
      const guestId = `REF-CICLO-${Math.floor(1000 + Math.random() * 9000)}`;
      const localBooking: Reservation = {
        id: guestId,
        name,
        email,
        phone,
        date,
        time,
        guests,
        location: selectedLocation.name,
        status: 'confirmed',
        tableNumber: randomTableNum,
        createdAt: new Date().toLocaleString()
      };
      onAddBooking(localBooking);
      setSuccessBooking(localBooking);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedTableId(null);
    setName('');
    setEmail('');
    setPhone('');
    setSuccessBooking(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      {/* Modal Card */}
      <div className="relative bg-[#fcf9f8] rounded-2xl w-full max-w-4xl border border-surface-highest shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto max-h-[90dvh]">
        
        {/* Left column decorative & details panel (Kotturpuram / Address) */}
        {!successBooking && (
          <div className="w-full md:w-1/3 bg-primary text-white p-6 sm:p-8 flex flex-col justify-between border-r border-[#4a2c2a]">
            <div>
              <div className="flex items-center gap-2 text-[#eabcb8] mb-4">
                <Coffee size={20} />
                <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase">Ciclo Hospitality</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3.5xl font-bold mb-4 tracking-wide text-[#ffdad7]">
                Craft Your Table Booking
              </h3>
              <p className="font-sans text-xs text-secondary-fixed opacity-90 leading-relaxed mb-6">
                Reserve an tables spot for an authentic visual experience. Savor warm community atmospheres, cyclist meetups, and slow-pressed brews.
              </p>

              {/* Branch Locations list */}
              <div className="space-y-4">
                <label className="block text-[10px] font-bold tracking-widest text-[#bd928f] uppercase">
                  Select Branch Location
                </label>
                <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                  {LOCATIONS.map((loc, idx) => (
                    <button
                      key={loc.id}
                      onClick={() => {
                        setLocationIndex(idx);
                        setSelectedTableId(null); // clean table select
                      }}
                      className={`w-full text-left p-3 rounded-xl border transition-all duration-200 text-xs ${
                        locationIndex === idx
                          ? 'bg-[#4a2c2a] border-[#eabcb8] text-white'
                          : 'bg-[#2e1413]/40 border-transparent text-[#e6e2dd] hover:bg-[#2e1413]/80'
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1.5 mb-1 text-[#ffdad7]">
                        <MapPin size={12} className="text-[#eabcb8]" />
                        {loc.name}
                      </div>
                      <p className="opacity-80 text-[10px] truncate">{loc.address}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-[#4a2c2a] pt-4 text-[10px] text-secondary-fixed-dim">
              <span className="block font-semibold text-white">Cancellation Policy</span>
              <p className="opacity-70 mt-1">We hold your custom table for up to 15 minutes past your booking slot time.</p>
            </div>
          </div>
        )}

        {/* Right column booking wizard flows */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {/* Close button top right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-on-surface-variant hover:text-primary p-2 rounded-full hover:bg-surface-low transition-all duration-200"
          >
            <X size={20} />
          </button>

          {successBooking ? (
            /* ================= SUCCESS STATE ================= */
            <div className="text-center py-8 px-4 flex flex-col items-center justify-center h-full max-w-lg mx-auto">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-800 mb-6 border border-emerald-300">
                <Check size={32} className="stroke-[3]" />
              </div>
              <span className="text-[10px] font-bold tracking-widest text-[#cf594a] uppercase bg-rose-100 px-3 py-1 rounded-full mb-2">
                Booking Confirmed
              </span>
              <h4 className="font-serif text-3xl font-bold text-primary mb-2">
                See You Soon!
              </h4>
              <p className="text-xs text-secondary mb-6 leading-relaxed">
                Your luxury dining reservation at <strong>Ciclo Café ({successBooking.location})</strong> is locked in. We have sent the confirmation voucher to <strong>{successBooking.email}</strong>.
              </p>

              {/* Physical style receipt ticket badge */}
              <div className="w-full bg-white border border-surface-highest rounded-2xl p-5 text-left space-y-3.5 shadow-md relative overflow-hidden mb-8">
                <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
                
                <div className="flex justify-between items-center text-xs pb-3 border-b border-surface-low font-bold">
                  <span className="text-primary font-mono text-xs">{successBooking.id}</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Table Assigned</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                  <div>
                    <span className="text-outline text-[10px] uppercase block mb-0.5">Guest Contact</span>
                    <span className="text-on-surface font-bold">{successBooking.name}</span>
                  </div>
                  <div>
                    <span className="text-outline text-[10px] uppercase block mb-0.5">Seats Booked</span>
                    <span className="text-on-surface font-bold">{successBooking.guests} Guests</span>
                  </div>
                  <div>
                    <span className="text-outline text-[10px] uppercase block mb-0.5">Date & Time</span>
                    <span className="text-on-surface font-bold">{successBooking.date} at {successBooking.time}</span>
                  </div>
                  <div>
                    <span className="text-outline text-[10px] uppercase block mb-0.5">Physical Table</span>
                    <span className="text-primary font-serif font-bold text-sm">
                      Table #{successBooking.tableNumber} - {selectedTable ? selectedTable.name : 'Vague'}
                    </span>
                  </div>
                </div>

                <div className="bg-surface-low/80 rounded-xl p-3 text-[10px] text-[#504443] flex items-center gap-2 border border-surface-high">
                  <Clock size={12} className="text-primary shrink-0" />
                  <span>Be sure to arrive by <b>{successBooking.time}</b>. We will keep your table secured.</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="bg-primary text-white text-xs font-semibold px-6 py-3 rounded-full hover:bg-primary-light transition-all"
                >
                  Done, Return to Menu
                </button>
              </div>
            </div>
          ) : step === 1 ? (
            /* ================= STEP 1: FORM CONTROLS & SEATING FLOOR PLAN ================= */
            <form onSubmit={handleNextStep} className="space-y-6">
              <div className="border-b border-surface-highest pb-2 mb-2">
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-primary">
                  1. Date, Time & Spot Selection
                </h4>
                <p className="text-[11px] text-[#504443]">
                  Select your party capacity and choose your signature spot from our restaurant floor plan.
                </p>
              </div>

              {/* Grid selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* 1. Guests Count */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-outline tracking-wider mb-1.5 flex items-center gap-1">
                    <Users size={12} className="text-primary" />
                    Guest Count
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => {
                      setGuests(Number(e.target.value));
                      setSelectedTableId(null); // reset table select
                    }}
                    className="w-full bg-white border border-surface-highest rounded-full px-4 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-primary/20 text-on-surface"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest (1 Seat)' : `${num} Guests`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Date */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-outline tracking-wider mb-1.5 flex items-center gap-1">
                    <Calendar size={12} className="text-primary" />
                    Reservation Date
                  </label>
                  <input
                    type="date"
                    min={tomorrow}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white border border-surface-highest rounded-full px-4 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-primary/20 text-on-surface"
                    required
                  />
                </div>

                {/* 3. Time */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-outline tracking-wider mb-1.5 flex items-center gap-1">
                    <Clock size={12} className="text-primary" />
                    Preferred Slot
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-white border border-surface-highest rounded-full px-4 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-primary/20 text-on-surface"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Seating Map Container */}
              <div className="bg-white border border-surface-highest rounded-2xl p-4 sm:p-5 shadow-inner">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-bold uppercase text-outline tracking-wider flex items-center gap-1.5">
                    <Landmark size={12} className="text-primary" />
                    Interactive Seat Selector Floor Map ({selectedLocation.name})
                  </span>
                  {/* Legend indicators */}
                  <div className="flex items-center gap-3 text-[9px] font-bold uppercase">
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-white border border-surface-highest rounded" />
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-[#ffdad7] border border-[#bd928f] rounded animate-pulse" />
                      <span>Fits {guests}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-primary rounded" />
                      <span>Selected</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-surface-highest opacity-50 rounded line-through" />
                      <span>Reserved</span>
                    </div>
                  </div>
                </div>

                {/* Floor Grid mapping */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {filteredTables.map((table) => {
                    const isSelected = selectedTableId === table.id;
                    const isRec = table.isCompatible && !table.isPreReserved;

                    return (
                      <button
                        type="button"
                        key={table.id}
                        disabled={table.isPreReserved}
                        onClick={() => handleSelectTable(table)}
                        className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between h-24 ${
                          table.isPreReserved
                            ? 'bg-surface-low border-surface-highest text-outline/50 cursor-not-allowed opacity-5 w-full line-through shadow-none'
                            : isSelected
                            ? 'bg-primary border-primary text-white scale-[1.02] shadow-md ring-2 ring-[#eabcb8]'
                            : isRec
                            ? 'bg-[#ffdad7]/55 border-[#bd928f] text-on-primary-fixed-variant hover:bg-[#ffdad7] cursor-pointer'
                            : 'bg-white border-surface-highest text-on-surface hover:bg-surface-low cursor-pointer'
                        }`}
                      >
                        <div className="w-full flex justify-between items-start gap-1">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-sm font-bold uppercase ${
                            isSelected ? 'bg-white/20 text-[#ffdad7]' : 'bg-surface-container text-secondary'
                          }`}>
                            Fits {table.capacity}
                          </span>
                          <span className="text-[9px] font-mono opacity-80 uppercase tracking-widest">
                            {table.zone}
                          </span>
                        </div>
                        
                        <div className="mt-2 text-xs font-bold leading-tight">
                          {table.name}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Live selection description footer */}
                {selectedTable ? (
                  <div className="mt-4 bg-[#c8ecc8]/60 text-[#03210b] p-3 rounded-xl flex items-center gap-2 border border-emerald-300 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-700 animate-ping"></span>
                    <span>Excellent choice! You selected <b>{selectedTable.name}</b> in our high-end <b>{selectedTable.zone} zone</b>.</span>
                  </div>
                ) : (
                  <div className="mt-4 bg-[#ffdad6]/60 text-[#93000a] p-3 rounded-xl text-xs font-medium border border-rose-300">
                    * Choose your preferred seating compartment on the floor plan above to continue details.
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-secondary font-semibold">
                  Branch Selected: <b>{selectedLocation.name}</b>
                </span>
                <button
                  type="submit"
                  disabled={!selectedTableId}
                  className={`px-8 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                    selectedTableId
                      ? 'bg-primary text-white hover:bg-primary-light shadow-md hover:shadow-lg focus:outline-none'
                      : 'bg-surface-highest text-outline cursor-not-allowed'
                  }`}
                >
                  Next: Contact details
                </button>
              </div>
            </form>
          ) : (
            /* ================= STEP 2: PERSONAL/CONTACT DETAILS ================= */
            <form onSubmit={handleConfirmReservation} className="space-y-6">
              <div className="border-b border-surface-highest pb-2 mb-2 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-primary">
                    2. Complete Your Booking Details
                  </h4>
                  <p className="text-[11px] text-[#504443] mt-0.5">
                    We will send the table assignment slip details to this email and cell number.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-primary hover:underline text-xs font-semibold"
                >
                  ← Edit Seating
                </button>
              </div>

              {/* Info grid */}
              <div className="space-y-4">
                {/* Full name */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-outline mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your booking name"
                    className="w-full bg-white border border-surface-highest rounded-xl px-4 py-3 text-xs font-semibold focus:ring-2 focus:ring-primary/20 text-on-surface"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email address */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-outline mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. foodlover@gmail.com"
                      className="w-full bg-white border border-surface-highest rounded-xl px-4 py-3 text-xs font-semibold focus:ring-2 focus:ring-primary/20 text-on-surface"
                    />
                  </div>

                  {/* Phone number */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-outline mb-1.5">
                      Cell Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-white border border-surface-highest rounded-xl px-4 py-3 text-xs font-semibold focus:ring-2 focus:ring-primary/20 text-on-surface"
                    />
                  </div>
                </div>
              </div>

              {/* Summary checkout panel */}
              <div className="bg-surface-low border border-surface-highest rounded-2xl p-4 space-y-2 text-xs">
                <span className="block font-bold text-primary uppercase text-[10px] tracking-wider mb-2">
                  Review Selections
                </span>
                <div className="flex justify-between border-b border-surface-high pb-2">
                  <span className="text-outline">Reserved Table:</span>
                  <span className="font-bold text-primary">{selectedTable?.name} ({selectedTable?.zone})</span>
                </div>
                <div className="flex justify-between border-b border-surface-high pb-2">
                  <span className="text-outline">Cafe Location:</span>
                  <span className="font-bold text-primary">{selectedLocation?.name}</span>
                </div>
                <div className="flex justify-between border-b border-surface-high pb-2">
                  <span className="text-outline">Schedule:</span>
                  <span className="font-bold text-primary">{date} at {time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">Party Count:</span>
                  <span className="font-bold text-primary">{guests} Guests</span>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-secondary hover:text-primary text-xs font-bold"
                >
                  Go Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-primary text-white text-xs font-semibold px-8 py-3 rounded-full hover:bg-primary-light shadow-md hover:shadow-lg transition-all duration-200 uppercase tracking-widest ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Securing Spot...' : 'Confirm Table Allocation'}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
