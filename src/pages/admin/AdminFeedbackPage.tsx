import React from 'react';
import { useApp } from '../../context/AppContext';
import { Star, CheckCircle2, XCircle } from 'lucide-react';

export const AdminFeedbackPage: React.FC = () => {
  const { feedbackList, moderateFeedback } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block mb-1">Feedback Moderation</span>
        <h1 className="font-heading font-extrabold text-3xl text-[#132E20]">Recipient Reviews Moderation</h1>
      </div>

      <div className="space-y-4">
        {feedbackList.map(fb => (
          <div key={fb.id} className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#132E20]">{fb.productName}</span>
                <span className="text-amber-500 font-bold text-xs">{fb.overallRating} ★</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${fb.isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {fb.isApproved ? 'Approved' : 'Hidden'}
                </span>
              </div>
              <p className="text-xs text-stone-600 italic">"{fb.comment}"</p>
              <p className="text-[10px] text-stone-400">Recipient: {fb.recipientName} • Sender: {fb.senderName}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => moderateFeedback(fb.id, true)}
                className="px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs"
              >
                Approve Review
              </button>
              <button
                onClick={() => moderateFeedback(fb.id, false)}
                className="px-3 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs"
              >
                Reject / Hide
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
