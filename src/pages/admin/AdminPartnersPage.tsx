import React from 'react';
import { useApp } from '../../context/AppContext';
import { Store, Star, DollarSign } from 'lucide-react';

export const AdminPartnersPage: React.FC = () => {
  const { partnerProfiles } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block mb-1">Nursery Network</span>
        <h1 className="font-heading font-extrabold text-3xl text-[#132E20]">Verified Nursery Partners ({partnerProfiles.length})</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {partnerProfiles.map(part => (
          <div key={part.id} className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-soft space-y-4">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
              <div className="w-12 h-12 rounded-xl bg-[#132E20] text-emerald-300 flex items-center justify-center font-bold text-xl">
                🌿
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-[#132E20]">{part.businessName}</h3>
                <p className="text-xs text-stone-500">{part.ownerName} • {part.city}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-stone-600">
              <div className="bg-stone-50 p-2.5 rounded-xl">
                <span className="text-[10px] text-stone-400 font-bold block uppercase">Rating</span>
                <span className="font-bold text-amber-600">{part.rating} ★ ({part.reviewCount})</span>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-xl">
                <span className="text-[10px] text-stone-400 font-bold block uppercase">Revenue</span>
                <span className="font-bold text-emerald-800">₹{(part.totalRevenue / 1000).toFixed(1)}k</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
