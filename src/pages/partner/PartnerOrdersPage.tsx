import React from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatus } from '../../types';
import { Package, Truck, CheckCircle2, Clock } from 'lucide-react';

export const PartnerOrdersPage: React.FC = () => {
  const { orders, updateOrderStatus, partnerProfiles, currentUser } = useApp();
  const myProfile = partnerProfiles.find(p => p.userId === currentUser.id || p.id === 'part-1') || partnerProfiles[0];
  const myOrders = orders.filter(o => o.partnerId === myProfile.id || o.partnerName.includes(myProfile.businessName));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block mb-1">
          Nursery Order Fulfillment
        </span>
        <h1 className="font-heading font-extrabold text-3xl text-[#132E20]">
          Manage Nursery Orders ({myOrders.length})
        </h1>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-50 text-stone-500 uppercase font-bold text-[10px] border-b border-stone-200">
              <tr>
                <th className="p-3">Order Number</th>
                <th className="p-3">Customer (Sender)</th>
                <th className="p-3">Recipient & Delivery Address</th>
                <th className="p-3">Item Ordered</th>
                <th className="p-3">Amount</th>
                <th className="p-3 text-right">Update Fulfillment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {myOrders.map(ord => (
                <tr key={ord.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="p-3 font-bold text-[#132E20]">{ord.orderNumber}</td>
                  <td className="p-3 font-semibold">{ord.customerName}</td>
                  <td className="p-3">
                    <div className="font-bold text-stone-900">{ord.recipientName} ({ord.recipientPhone})</div>
                    <div className="text-[10px] text-stone-400">{ord.recipientAddress}</div>
                  </td>
                  <td className="p-3 font-medium">{ord.items[0]?.name}</td>
                  <td className="p-3 font-bold text-stone-900">₹{ord.total}</td>
                  <td className="p-3 text-right">
                    <select
                      value={ord.orderStatus}
                      onChange={e => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                      className="p-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-bold text-stone-800 focus:outline-none focus:border-emerald-600"
                    >
                      {['NEW', 'CONFIRMED', 'PREPARING', 'READY_FOR_PICKUP', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
