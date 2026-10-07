import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, CheckCircle2, Send, Users, ShieldCheck, Gift, Sparkles } from 'lucide-react';

export const GiftingPage: React.FC = () => {
  const { addToast } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    workEmail: '',
    phone: '',
    recipientCount: '25-50',
    occasion: 'Employee Appreciation',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast({
      type: 'success',
      title: 'Quote Request Received',
      message: 'Our corporate gifting team will send your custom proposal within 2 hours.'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5">
          <Building2 className="w-4 h-4 text-emerald-700" />
          <span>Enterprise & Corporate Gifting</span>
        </span>
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#132E20]">
          Elevate Employee & Client Appreciation
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Replace generic gift cards with sustainable, living plant gifts. Custom branded pots, individual delivery scheduling, and live green impact dashboards.
        </p>
      </div>

      {/* Corporate Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: 'Custom Brand Integration',
            desc: 'Include your company logo on ceramic pot tags, custom greeting card sleeves, and digital unboxing screens.',
            icon: '🏷️'
          },
          {
            title: 'Automated Milestones',
            desc: 'Connect your HRIS or CSV lists to automatically send plants on birthdays, work anniversaries, and promotions.',
            icon: '⚡'
          },
          {
            title: 'Corporate Impact Portal',
            desc: 'Track total plants gifted, CO₂ offset metrics, and recipient happiness scores across your entire organization.',
            icon: '📊'
          }
        ].map((feature, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-soft space-y-3">
            <span className="text-4xl block">{feature.icon}</span>
            <h3 className="font-heading font-bold text-lg text-[#132E20]">{feature.title}</h3>
            <p className="text-xs text-stone-600 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Quote Request Form & Interactive Calculator */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block mb-1">
              Bulk Gifting Consultation
            </span>
            <h2 className="font-heading font-extrabold text-3xl text-[#132E20]">
              Get a Custom Proposal & Sample
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-2">
              Fill out your corporate gifting requirements and receive tailored pricing with complimentary sample plant delivery.
            </p>
          </div>

          <div className="space-y-3 text-xs text-stone-700">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Volume discounts from 15% up to 40% on bulk cohorts</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Multi-address individual recipient delivery across India</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>GST Invoicing & Flexible Payment Terms</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-[#FAF9F5] p-6 sm:p-8 rounded-2xl border border-stone-200">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl mx-auto">
                🌱
              </div>
              <h3 className="font-heading font-bold text-xl text-[#132E20]">Request Received!</h3>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Thank you, {formData.contactName}. Our corporate gifting strategist will reach out to {formData.workEmail} shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DesiColab Inc."
                    value={formData.companyName}
                    onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full p-2.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Contact Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sanket Deshmukh"
                    value={formData.contactName}
                    onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full p-2.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="sanket@company.com"
                    value={formData.workEmail}
                    onChange={e => setFormData({ ...formData, workEmail: e.target.value })}
                    className="w-full p-2.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Recipient Quantity</label>
                  <select
                    value={formData.recipientCount}
                    onChange={e => setFormData({ ...formData, recipientCount: e.target.value })}
                    className="w-full p-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="10-25">10 - 25 Recipients</option>
                    <option value="25-50">25 - 50 Recipients</option>
                    <option value="50-100">50 - 100 Recipients</option>
                    <option value="100+">100+ Enterprise Recipients</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Special Notes / Timeline</label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your event, occasion date, or branding requests..."
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-2.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Submit Corporate Proposal Request</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
