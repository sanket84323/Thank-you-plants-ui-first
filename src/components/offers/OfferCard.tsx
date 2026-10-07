import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Offer } from '../../types';
import { Check, Gift, Sparkles, ArrowRight } from 'lucide-react';

export const OfferCard: React.FC<{ offer: Offer }> = ({ offer }) => {
  const navigate = useNavigate();

  return (
    <div className={`group bg-white rounded-3xl border ${offer.isPopular ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-xl' : 'border-stone-200/80 shadow-soft'} overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5`}>
      <div>
        {/* Package Image & Badge Header */}
        <div className="relative aspect-16/9 overflow-hidden bg-stone-100">
          <img
            src={offer.image}
            alt={offer.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent"></div>

          {offer.badge && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#132E20] text-emerald-300 text-xs font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              {offer.badge}
            </span>
          )}

          <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-md">
            Save ₹{offer.savings}
          </span>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-widest block mb-0.5">
              Occasion: {offer.occasion}
            </span>
            <h3 className="font-heading font-extrabold text-xl leading-tight">
              {offer.name}
            </h3>
          </div>
        </div>

        {/* Details & Items Included */}
        <div className="p-6">
          <p className="text-stone-600 text-xs leading-relaxed mb-4">
            {offer.tagline}
          </p>

          <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Gift className="w-3.5 h-3.5 text-emerald-600" />
            <span>Package Includes:</span>
          </h4>

          <ul className="space-y-2 mb-6">
            {offer.itemsIncluded.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="p-6 pt-0">
        <div className="flex items-center justify-between border-t border-stone-100 pt-4 mb-4">
          <div>
            <span className="text-stone-400 text-xs line-through block font-medium">
              Regular Price ₹{offer.originalPrice}
            </span>
            <span className="font-heading font-extrabold text-2xl text-[#132E20]">
              ₹{offer.discountedPrice}
            </span>
          </div>

          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            All-Inclusive Gift Pack
          </span>
        </div>

        <button
          onClick={() => navigate('/customer/checkout', { state: { selectedOffer: offer } })}
          className="w-full py-3 px-4 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
        >
          <span>Select Package</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
