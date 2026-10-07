import React from 'react';
import { useApp } from '../../context/AppContext';
import { OfferCard } from '../../components/offers/OfferCard';

export const PartnerOffersPage: React.FC = () => {
  const { offers } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block mb-1">Promotions & Bundles</span>
        <h1 className="font-heading font-extrabold text-3xl text-[#132E20]">Manage Nursery Deals & Packages</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {offers.slice(0, 3).map(offer => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  );
};
