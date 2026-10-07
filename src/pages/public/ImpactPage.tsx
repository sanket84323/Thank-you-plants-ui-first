import React from 'react';
import { useApp } from '../../context/AppContext';
import { Leaf, ShieldCheck, Heart, Truck, Sparkles, Award } from 'lucide-react';

export const ImpactPage: React.FC = () => {
  const { impactStats } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5">
          <Leaf className="w-4 h-4 text-emerald-700" />
          <span>Our Sustainability Pledge</span>
        </span>
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#132E20]">
          Growing a Greener Tomorrow, One Gift at a Time
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Every plant gifted through Thank You Plants replaces single-use plastics with living greenery that offsets CO₂ emissions and purifies indoor air for years to come.
        </p>
      </div>

      {/* Main Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#132E20] text-white rounded-3xl p-8 shadow-xl text-center space-y-2">
          <span className="text-4xl">🌱</span>
          <h3 className="font-heading font-extrabold text-4xl text-emerald-300">{impactStats.totalPlantsGifted.toLocaleString()}+</h3>
          <p className="text-xs text-stone-300 font-semibold uppercase tracking-wider">Plants Gifted</p>
          <p className="text-[11px] text-emerald-400/80">Thriving across homes & offices</p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-soft text-center space-y-2">
          <span className="text-4xl">💚</span>
          <h3 className="font-heading font-extrabold text-4xl text-[#132E20]">{impactStats.happyRecipients.toLocaleString()}+</h3>
          <p className="text-xs text-stone-500 font-semibold uppercase tracking-wider">Happy Recipients</p>
          <p className="text-[11px] text-stone-400">98.4% recipient satisfaction score</p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-soft text-center space-y-2">
          <span className="text-4xl">🌍</span>
          <h3 className="font-heading font-extrabold text-4xl text-[#132E20]">{impactStats.co2SavedTons} Tons</h3>
          <p className="text-xs text-stone-500 font-semibold uppercase tracking-wider">Estimated CO₂ Offset</p>
          <p className="text-[11px] text-stone-400">Calculated over 3-year plant lifecycle</p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-soft text-center space-y-2">
          <span className="text-4xl">📦</span>
          <h3 className="font-heading font-extrabold text-4xl text-[#132E20]">{impactStats.ecoPackagingPercent}%</h3>
          <p className="text-xs text-stone-500 font-semibold uppercase tracking-wider">Zero-Plastic Packaging</p>
          <p className="text-[11px] text-stone-400">Biodegradable kraft boxes & coir pots</p>
        </div>
      </div>

      {/* Storytelling Grid */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-soft grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block">
            Partnering With Local Nurseries
          </span>
          <h2 className="font-heading font-extrabold text-3xl text-[#132E20]">
            Empowering Local Botanical Artisans
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            We partner directly with verified regional plant nurseries across Maharashtra, Karnataka, Delhi-NCR, and Telangana. By eliminating long-distance air shipping and supporting local growers, we minimize freight carbon emissions while delivering healthy plants fresh from the soil.
          </p>

          <div className="pt-2 space-y-2 text-xs text-stone-700">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-700" />
              <span>Direct farmer fair-pricing guarantees</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-700" />
              <span>100% peat-free organic potting soil mix</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <img
            src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800"
            alt="Eco Nursery Growing"
            className="rounded-2xl object-cover w-full h-80 shadow-md"
          />
        </div>
      </div>

    </div>
  );
};
