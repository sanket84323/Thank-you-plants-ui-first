import React from 'react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block">About Thank You Plants</span>
        <h1 className="font-heading font-extrabold text-4xl text-[#132E20]">Our Story & Mission</h1>
        <p className="text-stone-600 text-sm max-w-2xl mx-auto leading-relaxed">
          Founded with a passion for sustainable appreciation, Thank You Plants connects organizations and individuals with living plant gifts that express heartfelt gratitude while helping our planet flourish.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-8 rounded-3xl border border-stone-200 shadow-soft">
        <img
          src="https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&q=80&w=800"
          alt="Our Mission"
          className="rounded-2xl object-cover w-full h-72"
        />
        <div className="space-y-4">
          <h2 className="font-heading font-bold text-2xl text-[#132E20]">Why We Exist</h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            Corporate appreciation and personal gifting have traditionally relied on plastic novelty items or cut flowers that quickly fade. We set out to pioneer green gifting—delivering resilient indoor plants in ceramic and coir pots with custom digital message cards.
          </p>
          <div className="pt-2">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
              🌱 Over 12,500+ Living Thank-Yous Sent
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
