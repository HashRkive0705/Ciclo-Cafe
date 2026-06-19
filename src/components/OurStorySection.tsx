import React from 'react';
import { Bike, Shield, Award, Heart, Compass, HeartHandshake } from 'lucide-react';

export default function OurStorySection() {
  return (
    <section className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Hero Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-surface-highest pb-16">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#cf594a] uppercase bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-200 inline-block">
            Est. 2014 in Chennai
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-primary font-bold tracking-tight leading-none">
            Where Cyling Gears <br />Meet Hand-Pressed Beans.
          </h2>
          <p className="font-sans text-xs text-secondary leading-relaxed max-w-2xl">
            CICLO CAFÉ was born out of a singular, heartfelt vision: to create a cozy sanctuary for the cycling community of India, wrapped in the comforting aroma of world-class gourmet coffee and artisanal slow-cooked recipes. 
          </p>
          <p className="font-sans text-xs text-secondary leading-relaxed max-w-2xl">
            From our vintage brick-and-mortar beginnings in Kotturpuram, Chennai, we became India’s very first bicycle-themed cafe. Today, we are proud hubs in Chennai, Bangalore, Gurgaon, and Hyderabad. Whether you arrive on carbon-fiber wheels or walking boots, there’s a warm wooden booth and an espresso double shot with your name on it.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs font-bold text-primary">
              <Shield size={16} className="text-secondary" />
              <span>Full service bike stands</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-primary">
              <Award size={16} className="text-secondary" />
              <span>Single-Origin Grade Roasts</span>
            </div>
          </div>
        </div>

        {/* Diagonal scrapbook style offset image */}
        <div className="lg:col-span-5 relative">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-lg bg-surface-low border border-surface-highest">
            <img
              src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80"
              alt="Artisanal Cafe Interior design"
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-primary text-white p-5 rounded-2xl shadow-xl max-w-[200px] border border-[#4a2c2a] hidden sm:block">
            <div className="flex items-center gap-2 mb-2">
              <Bike size={20} className="text-[#ffdad7]" />
              <span className="font-serif text-sm font-bold text-[#ffdad7]">Cyclists Hub</span>
            </div>
            <p className="text-[10px] text-secondary-fixed-dim leading-relaxed">
              We offer free puncture kits, carbon cleaning tools, and route map recommendations to all visiting clubs.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Values - Three Pillars */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h3 className="font-serif text-3xl text-primary font-bold">Our Pillars of Craft</h3>
          <p className="text-xs text-secondary mt-2">
            We don't settle for shortcuts—whether laminating thin pastry layers or matching perfect gear segments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Item 1 */}
          <div className="bg-white border border-surface-highest rounded-2xl p-6 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-[#ffdad7] text-primary rounded-xl flex items-center justify-center font-bold shadow-xs">
              <Compass className="text-[#5f3e3c]" size={20} />
            </div>
            <h4 className="font-serif text-xl font-bold text-primary">The Community Spine</h4>
            <p className="text-xs text-secondary leading-relaxed">
              We coordinate weekly sunrise group-rides, bike gear trade fairs, and charity cyclothons designed to unite seasoned racers and absolute beginners under a shared passion.
            </p>
          </div>

          {/* Item 2 */}
          <div className="bg-white border border-surface-highest rounded-2xl p-6 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-[#ffdad7] text-primary rounded-xl flex items-center justify-center font-bold shadow-xs">
              <Compass className="text-[#5f3e3c]" size={20} />
            </div>
            <h4 className="font-serif text-xl font-bold text-primary">Slow Baking Manifesto</h4>
            <p className="text-xs text-secondary leading-relaxed">
              Our master bakers employ heritage starter cultures and a strict, unhurried 48-hour cold fermentation process. The result is Sourdoughs with incomparable crispy, blistered crusts.
            </p>
          </div>

          {/* Item 3 */}
          <div className="bg-white border border-surface-highest rounded-2xl p-6 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-[#ffdad7] text-primary rounded-xl flex items-center justify-center font-bold shadow-xs">
              <HeartHandshake className="text-[#5f3e3c]" size={20} />
            </div>
            <h4 className="font-serif text-xl font-bold text-primary">Uncompromising Brews</h4>
            <p className="text-xs text-secondary leading-relaxed">
              We source directly from premium family estates in Chikmagalur and Nilgiri Hills. Our baristas precisely control water chemistry, brew times, and froth states to deliver authentic roasts.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}
