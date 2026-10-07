import React from 'react';
import { useApp } from '../../context/AppContext';
import { Store, MapPin, Mail, Phone, ShieldCheck } from 'lucide-react';

export const PartnerProfilePage: React.FC = () => {
  const { partnerProfiles, currentUser } = useApp();
  const myProfile = partnerProfiles.find(p => p.userId === currentUser.id || p.id === 'part-1') || partnerProfiles[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div>
        <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block mb-1">Business Profile</span>
        <h1 className="font-heading font-extrabold text-3xl text-[#132E20]">Nursery Partner Information</h1>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-soft space-y-6">
        <div className="flex items-center gap-4 border-b border-stone-100 pb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#132E20] text-emerald-300 flex items-center justify-center font-bold text-2xl">
            🌿
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-2xl text-[#132E20]">{myProfile.businessName}</h2>
            <p className="text-xs text-stone-500">Owner: {myProfile.ownerName} • Rating: {myProfile.rating} ★ ({myProfile.reviewCount} reviews)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-700">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50">
            <Mail className="w-4 h-4 text-emerald-700" />
            <span>{myProfile.email}</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50">
            <Phone className="w-4 h-4 text-emerald-700" />
            <span>{myProfile.phone}</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 sm:col-span-2">
            <MapPin className="w-4 h-4 text-emerald-700" />
            <span>{myProfile.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
