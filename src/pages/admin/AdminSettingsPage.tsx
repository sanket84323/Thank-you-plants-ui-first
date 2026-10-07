import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Save } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { addToast } = useApp();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Settings Saved',
      message: 'Platform configurations updated successfully.'
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div>
        <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block mb-1">Configuration</span>
        <h1 className="font-heading font-extrabold text-3xl text-[#132E20]">Platform Settings</h1>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-soft space-y-6">
        <div>
          <label className="text-xs font-bold text-stone-700 block mb-1">Platform Name</label>
          <input
            type="text"
            defaultValue="Thank You Plants"
            className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-stone-700 block mb-1">Commission Rate (%)</label>
          <input
            type="number"
            defaultValue={15}
            className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-stone-700 block mb-1">Default Delivery Fee Threshold (₹)</label>
          <input
            type="number"
            defaultValue={1000}
            className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900"
          />
        </div>

        <button
          type="submit"
          className="py-3 px-6 rounded-xl bg-[#2D6A4F] text-white text-xs font-bold shadow-md hover:bg-[#1B4332]"
        >
          Save Platform Settings
        </button>
      </form>
    </div>
  );
};
