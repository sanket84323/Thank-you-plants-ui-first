import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Offer } from '../../types';
import { Gift, CreditCard, ShieldCheck, CheckCircle2, ArrowRight, Truck } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, createOrder, currentUser } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const selectedOffer = (location.state as any)?.selectedOffer as Offer | undefined;

  const [recipientName, setRecipientName] = useState('Priya Mehta');
  const [recipientEmail, setRecipientEmail] = useState('priya.mehta@gmail.com');
  const [recipientPhone, setRecipientPhone] = useState('+91 99887 76655');
  const [recipientAddress, setRecipientAddress] = useState('Flat 104, Sunrise Apartments, HSR Layout, Bengaluru, KA 560102');
  const [giftMessage, setGiftMessage] = useState('Thank you for your incredible dedication and teamwork on our recent milestone! You are truly appreciated. 🌱');
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });
  const [paymentMethod, setPaymentMethod] = useState('UPI / GPay');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateSubtotal = () => {
    if (selectedOffer) return selectedOffer.discountedPrice;
    return cart.reduce((sum, item) => sum + (item.product.discountPrice || item.product.price) * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = subtotal > 1000 ? 0 : 49;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder = createOrder({
        recipientName,
        recipientEmail,
        recipientPhone,
        recipientAddress,
        giftMessage,
        deliveryDate,
        paymentMethod,
        offerId: selectedOffer?.id
      });
      setIsSubmitting(false);
      navigate(`/customer/orders/${newOrder.id}`);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div>
        <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block mb-1">
          Secure Green Checkout
        </span>
        <h1 className="font-heading font-extrabold text-3xl text-[#132E20]">
          Complete Plant Gift Order
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT RECIPIENT & MESSAGE FORM */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Sender & Recipient Details */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-soft space-y-4">
            <h3 className="font-heading font-bold text-base text-[#132E20] flex items-center gap-2 border-b border-stone-100 pb-3">
              <Gift className="w-5 h-5 text-emerald-700" />
              <span>Recipient Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Recipient Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Mehta"
                  value={recipientName}
                  onChange={e => setRecipientName(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Recipient Email (for Digital Unboxing)</label>
                <input
                  type="email"
                  required
                  placeholder="priya@gmail.com"
                  value={recipientEmail}
                  onChange={e => setRecipientEmail(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Recipient Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 99887 76655"
                  value={recipientPhone}
                  onChange={e => setRecipientPhone(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Preferred Delivery Date</label>
                <input
                  type="date"
                  required
                  value={deliveryDate}
                  onChange={e => setDeliveryDate(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Delivery Address</label>
              <textarea
                rows={2}
                required
                placeholder="Flat / Office Address, City, Pincode"
                value={recipientAddress}
                onChange={e => setRecipientAddress(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Personalized Message Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-300/80 shadow-soft space-y-4">
            <h3 className="font-heading font-bold text-base text-[#132E20]">
              Personalized Greeting Message
            </h3>
            <p className="text-xs text-stone-500">
              This message will be printed on an eco-friendly kraft card and embedded in their digital gift portal!
            </p>

            <textarea
              rows={3}
              required
              value={giftMessage}
              onChange={e => setGiftMessage(e.target.value)}
              className="w-full p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600 font-medium"
            />
          </div>

          {/* Payment Method Picker */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-soft space-y-4">
            <h3 className="font-heading font-bold text-base text-[#132E20] flex items-center gap-2 border-b border-stone-100 pb-3">
              <CreditCard className="w-5 h-5 text-emerald-700" />
              <span>Select Payment Method (Mock Prototype)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'UPI / GPay', label: 'UPI / Google Pay', desc: 'Instant 1-click mock payment' },
                { id: 'Credit Card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
                { id: 'Corporate NetBanking', label: 'Corporate NetBanking', desc: 'GST Invoice ready' }
              ].map(pay => (
                <button
                  key={pay.id}
                  type="button"
                  onClick={() => setPaymentMethod(pay.id)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    paymentMethod === pay.id
                      ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-200'
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#132E20]">{pay.label}</span>
                    {paymentMethod === pay.id && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <p className="text-[10px] text-stone-500 mt-1">{pay.desc}</p>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT SUMMARY & PLACE ORDER CTA */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-soft space-y-6">
          <h3 className="font-heading font-bold text-base text-[#132E20]">Order Summary</h3>

          {/* Selected Item / Offer Preview */}
          <div className="space-y-3 border-b border-stone-100 pb-4">
            {selectedOffer ? (
              <div className="flex gap-3 items-center">
                <img src={selectedOffer.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h4 className="font-bold text-xs text-stone-900">{selectedOffer.name}</h4>
                  <span className="text-[10px] text-emerald-700 font-semibold">{selectedOffer.badge} Package</span>
                </div>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <img src={item.product.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-bold text-xs text-stone-900 line-clamp-1">{item.product.name}</h4>
                      <span className="text-[10px] text-stone-400">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-bold text-xs text-stone-900">
                    ₹{(item.product.discountPrice || item.product.price) * item.quantity}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="space-y-2.5 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-stone-900">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Eco Courier Delivery</span>
              <span className="font-bold text-emerald-700">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Sender Account</span>
              <span className="font-semibold text-stone-800">{currentUser.name}</span>
            </div>
            <div className="border-t border-stone-100 pt-3 flex justify-between items-baseline">
              <span className="font-heading font-bold text-sm text-[#132E20]">Grand Total</span>
              <span className="font-heading font-extrabold text-2xl text-[#132E20]">₹{total}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-4 rounded-2xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Confirming Gift Payment...</span>
            ) : (
              <>
                <span>Place Plant Gift Order (₹{total})</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 font-medium pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>100% Secure Plant Guarantee</span>
          </div>
        </div>

      </form>
    </div>
  );
};
