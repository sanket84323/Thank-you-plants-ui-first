import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Package, Search, Gift, ExternalLink, XCircle } from 'lucide-react';

export const CustomerOrdersPage: React.FC = () => {
  const { orders, currentUser, cancelOrder } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const myOrders = orders.filter(o => o.customerId === currentUser.id);

  const filteredOrders = myOrders.filter(ord => {
    if (filterStatus !== 'ALL' && ord.orderStatus !== filterStatus) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        ord.orderNumber.toLowerCase().includes(q) ||
        ord.recipientName.toLowerCase().includes(q) ||
        ord.items.some(i => i.name.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block mb-1">
            Order Management
          </span>
          <h1 className="font-heading font-extrabold text-3xl text-[#132E20]">
            My Plant Gift Orders
          </h1>
        </div>

        <Link
          to="/products"
          className="py-2.5 px-5 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors self-start sm:self-auto"
        >
          <Gift className="w-4 h-4" />
          <span>Send Another Gift</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search order #, recipient name..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'NEW', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                filterStatus === st
                  ? 'bg-[#132E20] text-emerald-300'
                  : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List Cards */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 shadow-soft">
            <Package className="w-12 h-12 text-stone-400 mx-auto mb-2" />
            <h3 className="font-heading font-bold text-base text-stone-900">No orders found</h3>
            <p className="text-xs text-stone-500 mt-1">Try changing your search filter or place a new plant gift order.</p>
          </div>
        ) : (
          filteredOrders.map(ord => (
            <div key={ord.id} className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-soft hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              <div className="flex items-start gap-4 flex-1">
                <img
                  src={ord.items[0]?.image || 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&q=80&w=200'}
                  alt=""
                  className="w-16 h-16 rounded-2xl object-cover shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-base text-[#132E20]">{ord.orderNumber}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      ord.orderStatus === 'DELIVERED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : ord.orderStatus === 'CANCELLED'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {ord.orderStatus}
                    </span>
                  </div>
                  <p className="text-xs text-stone-700 font-semibold">
                    To: <strong>{ord.recipientName}</strong> ({ord.recipientPhone})
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Plant: {ord.items[0]?.name} | Supplied by {ord.partnerName}
                  </p>
                  <p className="text-[10px] text-stone-400">Placed on: {new Date(ord.orderDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-stone-100">
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 block font-bold uppercase">Total Price</span>
                  <span className="font-heading font-extrabold text-lg text-[#132E20]">₹{ord.total}</span>
                </div>

                <div className="flex items-center gap-2">
                  {ord.orderStatus !== 'DELIVERED' && ord.orderStatus !== 'CANCELLED' && (
                    <button
                      onClick={() => cancelOrder(ord.id)}
                      className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs"
                    >
                      Cancel
                    </button>
                  )}
                  <Link
                    to={`/customer/orders/${ord.id}`}
                    className="px-4 py-2 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Track Gift</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};
