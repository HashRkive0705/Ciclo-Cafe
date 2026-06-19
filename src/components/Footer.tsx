import React, { useState } from 'react';
import { Bike, Globe, Share2, ArrowRight, Instagram } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSuccess(true);
    setEmail('');
    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  return (
    <footer className="bg-primary text-[#e6e2dd] rounded-t-3xl overflow-hidden mt-16 border-t border-[#4a2c2a] shadow-inner font-sans text-xs">
      
      {/* Top newsletter & main block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        
        {/* Col 1: Bio */}
        <div className="space-y-6">
          <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#ffdad7] tracking-tighter">
            CICLO CAFÉ
          </h3>
          <p className="opacity-80 text-xs leading-relaxed">
            Elevating the café experience with a genuine passion for cycling sports, warm community gatherings, and artisanal cuisine since 2014.
          </p>
          <div className="flex gap-4">
            <span className="p-2 bg-[#4a2c2a] rounded-full text-[#ffdad7] hover:scale-110 hover:text-white transition-all cursor-pointer">
              <Instagram size={14} />
            </span>
            <span className="p-2 bg-[#4a2c2a] rounded-full text-[#ffdad7] hover:scale-110 hover:text-white transition-all cursor-pointer">
              <Share2 size={14} />
            </span>
            <span className="p-2 bg-[#4a2c2a] rounded-full text-[#ffdad7] hover:scale-110 hover:text-white transition-all cursor-pointer">
              <Globe size={14} />
            </span>
          </div>
        </div>

        {/* Col 2: Experience */}
        <div>
          <h4 className="font-semibold text-xs tracking-[0.2em] uppercase text-[#bd928f] mb-6">
            Experience
          </h4>
          <ul className="space-y-3">
            <li>
              <a href="#menu" className="text-secondary-fixed-dim hover:text-white transition-colors">
                Artisanal Menu
              </a>
            </li>
            <li>
              <a href="#story" className="text-secondary-fixed-dim hover:text-white transition-colors">
                Our Story
              </a>
            </li>
            <li>
              <a href="#community" className="text-secondary-fixed-dim hover:text-white transition-colors">
                Cycling Club
              </a>
            </li>
            <li>
              <a href="#events" className="text-secondary-fixed-dim hover:text-white transition-colors">
                Community Events
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Outlet list */}
        <div>
          <h4 className="font-semibold text-xs tracking-[0.2em] uppercase text-[#bd928f] mb-6">
            Locations
          </h4>
          <ul className="space-y-3">
            <li className="text-secondary-fixed-dim hover:text-white transition-colors">
              Kotturpuram, Chennai
            </li>
            <li className="text-secondary-fixed-dim hover:text-white transition-colors">
              Indiranagar, Bangalore
            </li>
            <li className="text-secondary-fixed-dim hover:text-white transition-colors">
              Sector 29, Gurgaon NCR
            </li>
            <li className="text-secondary-fixed-dim hover:text-white transition-colors">
              Jubilee Hills, Hyderabad
            </li>
          </ul>
        </div>

        {/* Col 4: Mailing */}
        <div>
          <h4 className="font-semibold text-xs tracking-[0.2em] uppercase text-[#bd928f] mb-6">
            Stay Updated
          </h4>
          <p className="opacity-80 leading-relaxed mb-4">
            Join our mailing list to receive exclusive ride announcements and menu previews.
          </p>

          {success ? (
            <div className="bg-emerald-900/30 text-emerald-300 border border-emerald-800 p-3 rounded-xl text-[10px] font-semibold animate-bounce">
              ✓ Splendid! You have joined the mailing roster.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex border-b border-[#bd928f]/40 py-2 items-center">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="bg-transparent border-none text-white placeholder-[#827472] outline-none focus:ring-0 w-full text-xs"
              />
              <button 
                type="submit" 
                className="text-[#ffdad7] hover:text-white p-1 transition-all"
                title="Subscribe"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-white/5 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-wider font-semibold opacity-75">
        <span>© 2026 CICLO CAFÉ CHENNAI. ALL RIGHTS RESERVED.</span>
        <div className="flex gap-6 uppercase">
          <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>

    </footer>
  );
}
