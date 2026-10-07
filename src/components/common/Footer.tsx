import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Heart, ShieldCheck, Truck, ArrowRight, Share2, Globe, MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { impactStats } = useApp();

  return (
    <footer className="bg-[#132E20] text-white pt-16 pb-12 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Impact Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 mb-16 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-3 rounded-xl bg-emerald-800/50 text-emerald-300">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xl font-bold font-heading text-white">{impactStats.totalPlantsGifted.toLocaleString()}+</p>
              <p className="text-xs text-emerald-300/80 font-medium">Plants Gifted</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-3 rounded-xl bg-emerald-800/50 text-emerald-300">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xl font-bold font-heading text-white">{impactStats.happyRecipients.toLocaleString()}+</p>
              <p className="text-xs text-emerald-300/80 font-medium">Happy Recipients</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-3 rounded-xl bg-emerald-800/50 text-emerald-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xl font-bold font-heading text-white">{impactStats.co2SavedTons} Tons</p>
              <p className="text-xs text-emerald-300/80 font-medium">Estimated CO₂ Impact</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-3 rounded-xl bg-emerald-800/50 text-emerald-300">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xl font-bold font-heading text-white">{impactStats.ecoPackagingPercent}%</p>
              <p className="text-xs text-emerald-300/80 font-medium">Eco-Friendly Deliveries</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/60">
          
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌱</span>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-white">
                Thank You Plants
              </span>
            </Link>
            <p className="text-stone-300 text-sm leading-relaxed max-w-sm">
              Turn everyday appreciation into something meaningful. We enable companies and individuals to gift living, air-purifying plants with zero hassle and maximum green impact.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-lg bg-emerald-900/60 text-emerald-300 hover:bg-emerald-700 hover:text-white flex items-center justify-center transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-emerald-900/60 text-emerald-300 hover:bg-emerald-700 hover:text-white flex items-center justify-center transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-emerald-900/60 text-emerald-300 hover:bg-emerald-700 hover:text-white flex items-center justify-center transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm text-stone-300">
              <li><Link to="/products" className="hover:text-emerald-300 transition-colors">All Products</Link></li>
              <li><Link to="/offers" className="hover:text-emerald-300 transition-colors">Gifting Offers</Link></li>
              <li><Link to="/gifting" className="hover:text-emerald-300 transition-colors">Corporate Gifting</Link></li>
              <li><Link to="/impact" className="hover:text-emerald-300 transition-colors">Our Green Impact</Link></li>
              <li><Link to="/reviewer/gifts/ord-1024" className="hover:text-emerald-300 transition-colors">Recipient Digital View</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4">Partners & Portals</h4>
            <ul className="space-y-2.5 text-sm text-stone-300">
              <li><Link to="/partner/apply" className="hover:text-emerald-300 transition-colors text-emerald-400 font-medium">Become a Partner Nursery</Link></li>
              <li><Link to="/partner/dashboard" className="hover:text-emerald-300 transition-colors">Partner Nursery Portal</Link></li>
              <li><Link to="/customer/dashboard" className="hover:text-emerald-300 transition-colors">Customer Portal</Link></li>
              <li><Link to="/reviewer/dashboard" className="hover:text-emerald-300 transition-colors">Recipient Portal</Link></li>
              <li><Link to="/admin/dashboard" className="hover:text-emerald-300 transition-colors">Platform Admin Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4">Stay Inspired</h4>
            <p className="text-xs text-stone-300 leading-normal mb-3">
              Subscribe to eco-gifting tips and seasonal plant releases.
            </p>
            <form onSubmit={e => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Enter work email..."
                className="w-full px-3 py-2 rounded-xl bg-emerald-950/80 border border-emerald-800 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-emerald-400"
              />
              <button
                type="submit"
                className="w-full py-2 px-3 rounded-xl bg-[#2D6A4F] hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} Thank You Plants Inc. Appreciation that keeps growing. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-stone-200">About</Link>
            <Link to="/contact" className="hover:text-stone-200">Contact</Link>
            <a href="#" className="hover:text-stone-200">Privacy Policy</a>
            <a href="#" className="hover:text-stone-200">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
