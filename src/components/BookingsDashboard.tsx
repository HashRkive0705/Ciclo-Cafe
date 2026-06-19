import React from 'react';
import { CalendarCheck, MapPin, Clock, Users, Trash2, Calendar, Coffee, Sparkles } from 'lucide-react';
import { Reservation } from '../types';

interface BookingsDashboardProps {
  bookings: Reservation[];
  onCancelBooking: (bookingId: string) => void;
  onOpenReserve: () => void;
}

export default function BookingsDashboard({
  bookings,
  onCancelBooking,
  onOpenReserve
}: BookingsDashboardProps) {

  const handleCancelClick = (id: string, name: string) => {
    const confirmCancel = window.confirm(`Are you sure you want to cancel the reservation for ${name}?`);
    if (confirmCancel) {
      onCancelBooking(id);
    }
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Title block */}
      <div className="border-b border-surface-highest pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-[#cf594a] uppercase bg-rose-50 px-3 py-1 rounded-full mb-1 inline-block">
            Member Desk
          </span>
          <h2 className="font-serif text-3xl font-bold text-primary">Your Reservations</h2>
          <p className="text-xs text-secondary mt-1">Review active table allocations and branch detail records held in your device.</p>
        </div>

        {bookings.length > 0 && (
          <button
            onClick={onOpenReserve}
            className="bg-primary hover:bg-primary-light text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all self-start sm:self-auto"
          >
            + Reserve Another Spot
          </button>
        )}
      </div>

      {bookings.length === 0 ? (
        /* Empty booking list scenario: guidance */
        <div className="max-w-xl mx-auto text-center py-16 bg-white rounded-2xl border border-surface-highest p-8 shadow-sm">
          <CalendarCheck size={48} className="text-outline mx-auto mb-4" />
          <h3 className="font-serif text-xl font-bold text-primary mb-2">No active bookings found</h3>
          <p className="text-xs text-secondary leading-relaxed max-w-sm mx-auto">
            You haven't allocated any dining table spots yet. Reserve a custom table spot in Chennai, Bangalore, Delhi, or Hyderabad and visually select seats on our interactive floor map!
          </p>
          <button
            onClick={onOpenReserve}
            className="mt-6 bg-primary hover:bg-[#5f3e3c] text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md active:scale-95 transition-all"
          >
            Create Table Reservation
          </button>
        </div>
      ) : (
        /* Actual Bookings Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white border border-surface-highest rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              {/* Left Color Indicator strip */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />

              <div className="space-y-4">
                {/* Header: Ref ID & status */}
                <div className="flex justify-between items-center pb-3 border-b border-surface-low pl-2">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-primary">
                    <Sparkles size={12} className="text-amber-500" />
                    {booking.id}
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-emerald-200">
                    Confirmed
                  </span>
                </div>

                {/* Details layout */}
                <div className="pl-2 space-y-3">
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <Users size={15} className="text-outline" />
                    <span className="text-secondary">Host Guest:</span>
                    <span className="text-primary font-bold">{booking.name}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <MapPin size={15} className="text-outline" />
                    <span className="text-secondary">Branch:</span>
                    <span className="text-primary font-bold">{booking.location}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <Calendar size={15} className="text-outline" />
                    <span className="text-secondary">Schedule:</span>
                    <span className="text-primary font-bold">{booking.date} at {booking.time}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <Coffee size={15} className="text-outline" />
                    <span className="text-secondary">Allocated spot:</span>
                    <span className="text-primary font-serif font-bold text-sm">
                      Table #{booking.tableNumber} (Selected Unit)
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons footer */}
              <div className="mt-6 pt-4 border-t border-surface-low flex justify-between items-center pl-2">
                <span className="text-[10px] text-outline">
                  Created: {booking.createdAt}
                </span>

                <button
                  onClick={() => handleCancelClick(booking.id, booking.name)}
                  className="text-outline hover:text-red-700 font-semibold text-xs flex items-center gap-1 p-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={13} />
                  Cancel Table Spot
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}
