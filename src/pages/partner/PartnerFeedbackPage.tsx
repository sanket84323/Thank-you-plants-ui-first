import React from 'react';
import { useApp } from '../../context/AppContext';
import { Star } from 'lucide-react';

export const PartnerFeedbackPage: React.FC = () => {
  const { feedbackList } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block mb-1">Customer Reviews</span>
        <h1 className="font-heading font-extrabold text-3xl text-[#132E20]">Nursery Plant Feedback</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {feedbackList.map(fb => (
          <div key={fb.id} className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#132E20]">{fb.productName}</span>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{fb.overallRating}.0</span>
              </div>
            </div>

            <p className="text-xs text-stone-600 italic">"{fb.comment}"</p>

            <div className="flex items-center justify-between text-[11px] text-stone-400 border-t border-stone-100 pt-3">
              <span>Recipient: {fb.recipientName}</span>
              <span>Sender: {fb.senderName}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
