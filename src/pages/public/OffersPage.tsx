import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OfferCard } from '../../components/offers/OfferCard';
import { Sparkles, Gift } from 'lucide-react';

export const OffersPage: React.FC = () => {
  const { offers } = useApp();
  const [selectedOccasion, setSelectedOccasion] = useState<string>('All');

  const occasions = [
    'All',
    'Thank You',
    'Employee Appreciation',
    'Client Appreciation',
    'Work Anniversary',
    'Teacher Appreciation',
    'Welcome Gift',
    'Festival',
    'Corporate Gifting'
  ];

  const filteredOffers = selectedOccasion === 'All'
    ? offers
    : offers.filter(o => o.occasion.toLowerCase() === selectedOccasion.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block mb-1">
          Special Appreciation Bundles
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#132E20]">
          Offers & Gift Packages
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm mt-2">
          Save on complete living plant gifts paired with custom ceramic pots, engraved message cards, and plant nutrition.
        </p>
      </div>

      {/* Occasion Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 justify-start sm:justify-center">
        {occasions.map(occ => (
          <button
            key={occ}
            onClick={() => setSelectedOccasion(occ)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedOccasion === occ
                ? 'bg-[#132E20] text-emerald-300 shadow-md'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {occ}
          </button>
        ))}
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredOffers.map(offer => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>

    </div>
  );
};
