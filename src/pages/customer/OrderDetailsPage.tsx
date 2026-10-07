import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { OrderTimeline } from '../../components/orders/OrderTimeline';
import { ArrowLeft, Download, Gift, ExternalLink, ShieldCheck, MapPin, Truck } from 'lucide-react';

export const OrderDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { orders, addToast } = useApp();
  const navigate = useNavigate();

  const order = orders.find(o => o.id === id || o.orderNumber === id) || orders[0];

  const handleDownloadInvoice = () => {
    addToast({
      type: 'success',
      title: 'Invoice Downloaded',
      message: `Tax Invoice for order ${order.orderNumber} downloaded to your device.`
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          to="/customer/orders"
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-[#132E20]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Orders</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadInvoice}
            className="px-4 py-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 font-bold text-xs text-stone-700 flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-4 h-4 text-emerald-700" />
            <span>Download Tax Invoice</span>
          </button>

          <Link
            to={`/reviewer/gifts/${order.id}`}
            className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs flex items-center gap-1.5"
          >
            <Gift className="w-4 h-4 text-emerald-700" />
            <span>Preview Recipient Experience</span>
          </Link>
        </div>
      </div>

      {/* Main Order Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-soft space-y-8">
        
        {/* Header summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-6">
          <div>
            <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-widest block mb-1">
              Order Details & Tracking
            </span>
            <h1 className="font-heading font-extrabold text-2xl text-[#132E20]">
              {order.orderNumber}
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Placed on {new Date(order.orderDate).toLocaleString()} • Payment via {order.paymentMethod}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] text-stone-400 font-bold uppercase block">Current Order Status</span>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 inline-block mt-1">
              {order.orderStatus}
            </span>
          </div>
        </div>

        {/* Visual Progress Timeline */}
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-sm text-[#132E20]">Live Status Progress</h3>
          <OrderTimeline currentStatus={order.orderStatus} history={order.trackingHistory} />
        </div>

        {/* Tracking History Log Table */}
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-sm text-[#132E20]">Detailed Activity Logs</h3>
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 divide-y divide-stone-200 text-xs">
            {order.trackingHistory.map((step, idx) => (
              <div key={idx} className="py-2.5 flex items-start justify-between gap-4">
                <div>
                  <span className="font-bold text-stone-900">{step.status}</span>
                  <p className="text-stone-600 text-[11px] mt-0.5">{step.note}</p>
                </div>
                <span className="text-[10px] text-stone-400 font-medium whitespace-nowrap">{step.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Grid: Recipient & Item Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-100">
          
          <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3">
            <h4 className="font-bold text-xs text-[#132E20] uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>Recipient Shipping Information</span>
            </h4>
            <div className="text-xs space-y-1 text-stone-700">
              <p className="font-bold text-stone-900">{order.recipientName}</p>
              <p>{order.recipientAddress}</p>
              <p className="text-stone-500">Phone: {order.recipientPhone}</p>
              <p className="text-stone-500">Email: {order.recipientEmail}</p>
              <p className="text-emerald-800 font-semibold pt-1">Target Delivery: {order.expectedDeliveryDate}</p>
            </div>
          </div>

          <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3">
            <h4 className="font-bold text-xs text-[#132E20] uppercase tracking-wider flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-emerald-700" />
              <span>Personalized Greeting Note</span>
            </h4>
            <p className="text-xs text-stone-700 italic bg-white p-3 rounded-xl border border-stone-200 leading-relaxed">
              "{order.giftMessage || 'Thank you for your fantastic work!'}"
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
