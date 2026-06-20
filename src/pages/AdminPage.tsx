import { useEffect, useState } from "react";

interface Booking {
  timestamp: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  location: string;
  table: string;
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
  "https://script.google.com/macros/s/AKfycbz-c9uBQWikChIHD6SuB19S1gGbKdfMbACyFyMuUBq-PO5tR6hObCoZf4pvuidvmRCP6Q/exec"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Bookings:", data);
        setBookings(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen p-8 bg-[#fcf9f8]">
      <h1 className="text-4xl font-bold mb-6">
        Ciclo Reservations
      </h1>

      {loading ? (
        <p>Loading reservations...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Time</th>
                <th className="p-3 border">Guests</th>
                <th className="p-3 border">Location</th>
                <th className="p-3 border">Table</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td className="p-3 border">{booking.name}</td>
                  <td className="p-3 border">{booking.phone}</td>
                  <td className="p-3 border">{booking.email}</td>
                  <td className="p-3 border">{booking.date}</td>
                  <td className="p-3 border">{booking.time}</td>
                  <td className="p-3 border">{booking.guests}</td>
                  <td className="p-3 border">{booking.location}</td>
                  <td className="p-3 border">{booking.table}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}