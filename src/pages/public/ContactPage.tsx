import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addToast } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast({
      type: 'success',
      title: 'Message Sent',
      message: 'Thank you for reaching out! Our team will respond shortly.'
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block">Get in Touch</span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#132E20]">Contact Thank You Plants</h1>
        <p className="text-stone-600 text-xs sm:text-sm max-w-lg mx-auto">
          Have questions about order tracking, corporate gifting, or partner nursery onboarding? We're here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-5 bg-[#132E20] text-white p-8 rounded-3xl space-y-6 shadow-xl">
          <h3 className="font-heading font-bold text-xl text-white">Contact Information</h3>
          <p className="text-xs text-stone-300">Reach out to our customer care or corporate team directly.</p>

          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>support@thankyouplants.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>+91 (022) 4987 6543 / +91 98765 43210</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
              <span>TYP Green Campus, Financial District, Hyderabad, TS 500032</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 bg-white p-8 rounded-3xl border border-stone-200/80 shadow-soft">
          {submitted ? (
            <div className="text-center py-8 space-y-2">
              <span className="text-4xl block">🌱</span>
              <h3 className="font-heading font-bold text-lg text-[#132E20]">Message Received</h3>
              <p className="text-xs text-stone-600">We will respond to your inquiry via email within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@company.com"
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we assist your green gifting needs?"
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
