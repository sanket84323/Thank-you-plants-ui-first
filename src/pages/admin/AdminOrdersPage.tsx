import React from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatus } from '../../types';
import { Package, ShieldCheck } from 'lucide-react';

export const AdminOrdersPage: React.FC = () => {
  const { orders, updateOrderStatus } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block mb-1">Global Monitoring</span>
        <h1 className="font-heading font-extrabold text-3xl text-[#132E20]">Platform Orders Overview ({orders.length})</h1>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-50 text-stone-500 uppercase font-bold text-[10px] border-b border-stone-200">
              <tr>
                <th className="p-3">Order Number</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Recipient</th>
                <th className="p-3">Nursery Partner</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Admin Override Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.map(ord => (
                <tr key={ord.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="p-3 font-bold text-[#132E20]">{ord.orderNumber}</td>
                  <td className="p-3 font-semibold">{ord.customerName}</td>
                  <td className="p-3">{ord.recipientName}</td>
                  <td className="p-3 text-emerald-800 font-semibold">{ord.partnerName}</td>
                  <td className="p-3 font-bold">₹{ord.total}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                      {ord.orderStatus}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <select
                      value={ord.orderStatus}
                      onChange={e => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                      className="p-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-bold"
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
