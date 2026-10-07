import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { StatsCard } from '../../components/common/StatsCard';
import { Gift, Heart, Sparkles, Star, Eye } from 'lucide-react';

export const ReviewerDashboard: React.FC = () => {
  const { currentUser, orders, feedbackList } = useApp();
  const navigate = useNavigate();

  // Find gifts delivered to reviewer (or fallback to demo order if reviewer is Priya Mehta)
  const receivedGifts = orders.filter(o =>
    o.recipientEmail?.toLowerCase() === currentUser.email?.toLowerCase() ||
    o.recipientName?.toLowerCase().includes(currentUser.name?.split(' ')[0].toLowerCase()) ||
    o.id === 'ord-1024'
  );

  const myFeedback = feedbackList.filter(fb =>
    receivedGifts.some(g => g.id === fb.orderId || g.orderNumber === fb.orderNumber)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#132E20] via-[#1E3A2B] to-[#2D6A4F] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            Recipient Portal
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            Your Green Gifts 🌱
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm max-w-xl">
            Welcome, {currentUser.name}! Here are living plant gifts sent to you by colleagues, companies, and friends.
          </p>
        </div>

        <Link
          to={`/reviewer/gifts/${receivedGifts[0]?.id || 'ord-1024'}`}
          className="py-3 px-6 rounded-2xl bg-white text-[#132E20] hover:bg-emerald-50 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-colors whitespace-nowrap"
        >
          <Gift className="w-4 h-4 text-emerald-700" />
          <span>Open Digital Gift Box</span>
        </Link>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatsCard
          title="Gifts Received"
          value={receivedGifts.length}
          subtitle="Total plant gifts delivered"
          icon={<Gift className="w-5 h-5" />}
        />
        <StatsCard
          title="Plants Growing"
          value={receivedGifts.filter(g => g.orderStatus === 'DELIVERED').length}
          subtitle="Thriving on your desk/home"
          icon={<Sparkles className="w-5 h-5 text-emerald-600" />}
          bgColor="bg-emerald-50/60"
        />
        <StatsCard
          title="Feedback Submitted"
          value={myFeedback.length}
          subtitle="Ratings given to senders"
          icon={<Star className="w-5 h-5 text-amber-500" />}
        />
      </div>

      {/* Received Gift Cards List */}
      <div className="space-y-6">
        <h2 className="font-heading font-extrabold text-xl text-[#132E20]">
          Received Plant Gifts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {receivedGifts.map(gift => (
            <div key={gift.id} className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-soft hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                    Sender: {gift.customerName}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    {gift.orderStatus}
                  </span>
                </div>

                <div className="flex gap-4 items-center">
                  <img
                    src={gift.items[0]?.image || 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&q=80&w=200'}
                    alt=""
                    className="w-20 h-20 rounded-2xl object-cover"
                  />
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#132E20]">
                      {gift.items[0]?.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">Supplied by {gift.partnerName}</p>
                    <p className="text-[10px] text-stone-400 mt-1">Delivered: {gift.expectedDeliveryDate}</p>
                  </div>
                </div>

                {/* Personalized message bubble */}
                <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 text-xs text-stone-700 italic">
                  "{gift.giftMessage || 'Thank you for your amazing contribution!'}"
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-stone-100">
                <span className="text-[11px] text-stone-500 font-medium">Digital Gift Box Ready</span>
                <Link
                  to={`/reviewer/gifts/${gift.id}`}
                  className="py-2 px-4 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Gift</span>
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
