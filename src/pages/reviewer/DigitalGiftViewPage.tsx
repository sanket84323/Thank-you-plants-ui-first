import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Gift, Heart, Star, Sun, Droplet, ShieldCheck, CheckCircle2, Sparkles, Send, ArrowLeft } from 'lucide-react';

export const DigitalGiftViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { orders, submitFeedback, addToast } = useApp();

  const gift = orders.find(o => o.id === id || o.orderNumber === id) || orders[0];

  const [isOpen, setIsOpen] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [confirmedReceipt, setConfirmedReceipt] = useState(false);

  // Feedback form state
  const [overallRating, setOverallRating] = useState(5);
  const [plantQualityRating, setPlantQualityRating] = useState(5);
  const [packagingRating, setPackagingRating] = useState(5);
  const [deliveryRating, setDeliveryRating] = useState(5);
  const [comment, setComment] = useState('Beautiful plant and thoughtful packaging. The personalized message made it extra special!');

  const handleConfirmReceipt = () => {
    setConfirmedReceipt(true);
    addToast({
      type: 'success',
      title: 'Receipt Confirmed! 🌱',
      message: 'Sender has been notified that you safely received your plant gift.'
    });
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFeedback({
      orderId: gift.id,
      orderNumber: gift.orderNumber,
      recipientName: gift.recipientName,
      senderName: gift.customerName,
      productName: gift.items[0]?.name || 'Peace Lily',
      productImage: gift.items[0]?.image || 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&q=80&w=800',
      partnerId: gift.partnerId,
      overallRating,
      plantQualityRating,
      packagingRating,
      deliveryRating,
      comment
    });
    setShowFeedbackModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      
      {/* Back Button */}
      <Link
        to="/reviewer/dashboard"
        className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-[#132E20]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Recipient Dashboard</span>
      </Link>

      {!isOpen ? (
        /* UNBOXING PRESENTATION COVER */
        <div className="bg-gradient-to-b from-[#132E20] via-[#1E3A2B] to-[#132E20] text-white rounded-3xl p-10 sm:p-16 text-center space-y-8 shadow-2xl border border-emerald-800/40 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 p-8 text-emerald-800/30 text-9xl font-bold select-none pointer-events-none">
            🌱
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-800/60 border border-emerald-500/40 text-emerald-200 text-xs font-bold tracking-wider uppercase animate-bounce">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Digital Gift Box Unboxing</span>
          </div>

          <div className="space-y-3 max-w-lg mx-auto">
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white">
              Someone thought of you 🌱
            </h1>
            <p className="text-emerald-200 text-sm sm:text-base font-medium">
              <strong>{gift.customerName}</strong> sent you a living plant gift to express their appreciation!
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setIsOpen(true)}
              className="py-4 px-10 rounded-2xl bg-white text-[#132E20] hover:bg-emerald-100 font-extrabold text-base shadow-2xl hover:scale-105 transition-all flex items-center gap-3 mx-auto"
            >
              <Gift className="w-6 h-6 text-emerald-700 animate-pulse" />
              <span>Open Your Living Gift</span>
            </button>
          </div>

        </div>
      ) : (
        /* OPENED GIFT CONTENT */
        <div className="space-y-8 animate-fade-in">
          
          {/* Top Sender & Message Presentation */}
          <div className="bg-white rounded-3xl p-8 border border-emerald-300/80 shadow-xl space-y-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block mb-1">
                  Sent With Gratitude
                </span>
                <h2 className="font-heading font-extrabold text-2xl text-[#132E20]">
                  Gift from {gift.customerName}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                {!confirmedReceipt ? (
                  <button
                    onClick={handleConfirmReceipt}
                    className="py-2.5 px-4 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Confirm Receipt</span>
                  </button>
                ) : (
                  <span className="py-1.5 px-3 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Receipt Confirmed
                  </span>
                )}

                <button
                  onClick={() => setShowFeedbackModal(true)}
                  className="py-2.5 px-4 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>Send Feedback</span>
                </button>
              </div>
            </div>

            {/* Personalized Note */}
            <div className="bg-emerald-50/70 p-6 rounded-2xl border border-emerald-200 text-sm text-stone-800 italic leading-relaxed space-y-2">
              <span className="text-xs font-bold text-emerald-900 uppercase not-italic block">Personal Note from Sender:</span>
              <p>"{gift.giftMessage || 'Thank you for your amazing contribution!'}"</p>
            </div>
          </div>

          {/* Plant Details & Care Guide */}
          <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-soft space-y-6">
            <h3 className="font-heading font-bold text-xl text-[#132E20] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-700" />
              <span>Meet Your New Plant: {gift.items[0]?.name}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5">
                <img
                  src={gift.items[0]?.image || 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&q=80&w=800'}
                  alt={gift.items[0]?.name}
                  className="rounded-2xl object-cover w-full h-64 shadow-md"
                />
              </div>

              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    Care Level: {gift.items[0]?.careLevel || 'Easy'}
                  </span>
                  <span>Supplied by {gift.partnerName}</span>
                </div>

                <h4 className="font-heading font-bold text-lg text-stone-900">
                  Care Guide & Tips for Long Growth
                </h4>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <Sun className="w-4 h-4 text-amber-500 mb-1" />
                    <span className="font-bold text-stone-900 block">Sunlight</span>
                    <span className="text-stone-600">Bright indirect light. Avoid burning direct sun.</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <Droplet className="w-4 h-4 text-sky-500 mb-1" />
                    <span className="font-bold text-stone-900 block">Watering</span>
                    <span className="text-stone-600">Water once a week when topsoil feels dry.</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-stone-700">
                  <strong className="text-emerald-900">Eco Pot Note:</strong> Your plant arrived in a self-watering ceramic pot designed to regulate moisture automatically.
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* FEEDBACK MODAL */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-heading font-bold text-lg text-[#132E20]">
                Submit Feedback for Plant Gift
              </h3>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="text-stone-400 hover:text-stone-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              
              {/* Overall Rating */}
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Overall Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setOverallRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-6 h-6 ${star <= overallRating ? 'fill-amber-400' : 'text-stone-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Plant Quality Rating */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-stone-600 block mb-1">Plant Quality</label>
                  <select
                    value={plantQualityRating}
                    onChange={e => setPlantQualityRating(parseInt(e.target.value))}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl font-bold"
                  >
                    {[5, 4, 3, 2, 1].map(n => (
                      <option key={n} value={n}>{n} Stars</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-stone-600 block mb-1">Packaging</label>
                  <select
                    value={packagingRating}
                    onChange={e => setPackagingRating(parseInt(e.target.value))}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl font-bold"
                  >
                    {[5, 4, 3, 2, 1].map(n => (
                      <option key={n} value={n}>{n} Stars</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-stone-600 block mb-1">Delivery</label>
                  <select
                    value={deliveryRating}
                    onChange={e => setDeliveryRating(parseInt(e.target.value))}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl font-bold"
                  >
                    {[5, 4, 3, 2, 1].map(n => (
                      <option key={n} value={n}>{n} Stars</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Review Comment */}
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Feedback Comment</label>
                <textarea
                  rows={3}
                  required
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Submit Recipient Feedback</span>
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
