import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Store, Send, CheckCircle2, FileText, Sparkles } from 'lucide-react';

export const PartnerApplyPage: React.FC = () => {
  const { submitPartnerApplication } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    businessType: 'Organic Nursery',
    yearsInBusiness: 5,
    description: '',
    plantCategories: ['Indoor Plants', 'Air Purifying']
  });

  const handleCategoryToggle = (cat: string) => {
    setFormData(prev => ({
      ...prev,
      plantCategories: prev.plantCategories.includes(cat)
        ? prev.plantCategories.filter(c => c !== cat)
        : [...prev.plantCategories, cat]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitPartnerApplication({
      ...formData,
      documents: ['GSTIN_Document.pdf', 'Nursery_Registration_2025.pdf']
    });
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5">
          <Store className="w-4 h-4 text-emerald-700" />
          <span>Nursery & Shop Onboarding</span>
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#132E20]">
          Partner With Thank You Plants
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm max-w-lg mx-auto">
          Supply high quality plant gifts for corporate orders, expand your nursery revenue, and join India's top eco gifting platform.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-3xl p-10 border border-stone-200/80 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-3xl mx-auto">
            🌱
          </div>
          <h2 className="font-heading font-bold text-2xl text-[#132E20]">
            Application Submitted Successfully!
          </h2>
          <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
            Your application status is now <strong className="text-amber-700 uppercase bg-amber-50 px-2 py-0.5 rounded-md">PENDING ADMIN REVIEW</strong>. Our admin team will verify your details and notify you at <strong>{formData.email}</strong> within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-xl space-y-6">
          <h3 className="font-heading font-bold text-lg text-[#132E20] border-b border-stone-100 pb-3">
            Business & Nursery Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Nursery / Business Name</label>
              <input
                type="text"
                required
                placeholder="e.g. EcoRoots Bio-Farm"
                value={formData.businessName}
                onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Owner / Manager Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Sanjay Kulkarni"
                value={formData.ownerName}
                onChange={e => setFormData({ ...formData, ownerName: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Official Email</label>
              <input
                type="email"
                required
                placeholder="partner@ecoroots.in"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Contact Phone</label>
              <input
                type="tel"
                required
                placeholder="+91 98220 55443"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Full Nursery Address</label>
            <input
              type="text"
              required
              placeholder="Survey 108, Near Highway..."
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">City</label>
              <input
                type="text"
                required
                placeholder="Nashik"
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">State</label>
              <input
                type="text"
                required
                placeholder="Maharashtra"
                value={formData.state}
                onChange={e => setFormData({ ...formData, state: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Pincode</label>
              <input
                type="text"
                required
                placeholder="422003"
                value={formData.pincode}
                onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Business Type</label>
              <select
                value={formData.businessType}
                onChange={e => setFormData({ ...formData, businessType: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 focus:outline-none focus:border-emerald-600"
              >
                <option value="Organic Nursery">Organic Nursery</option>
                <option value="Bonsai Studio">Bonsai Studio</option>
                <option value="Commercial Farm">Commercial Farm</option>
                <option value="Boutique Plant Shop">Boutique Plant Shop</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Years in Business</label>
              <input
                type="number"
                min={1}
                value={formData.yearsInBusiness}
                onChange={e => setFormData({ ...formData, yearsInBusiness: parseInt(e.target.value) || 1 })}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-2">Plant Categories Supplied</label>
            <div className="flex flex-wrap gap-2">
              {['Indoor Plants', 'Air Purifying', 'Succulents & Cacti', 'Premium Gifts & Bonsai', 'Flowering Plants'].map(cat => {
                const isSelected = formData.plantCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryToggle(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                      isSelected
                        ? 'bg-[#132E20] text-emerald-300'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {cat} {isSelected && '✓'}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Business Overview & Specialties</label>
            <textarea
              rows={3}
              placeholder="Tell us about your nursery size, soil quality, and potting capabilities..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Submit Application for Admin Approval</span>
          </button>
        </form>
      )}

    </div>
  );
};
