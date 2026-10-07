import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { StatsCard } from '../../components/common/StatsCard';
import { OrderTimeline } from '../../components/orders/OrderTimeline';
import { Gift, Package, Heart, Leaf, ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const { currentUser, orders, impactStats, products } = useApp();
  const navigate = useNavigate();

  const myOrders = orders.filter(o => o.customerId === currentUser.id);
  const activeOrders = myOrders.filter(o => o.orderStatus !== 'DELIVERED' && o.orderStatus !== 'CANCELLED');
  const deliveredOrders = myOrders.filter(o => o.orderStatus === 'DELIVERED');
  const totalSpent = myOrders.reduce((sum, o) => sum + o.total, 0);

  const recommendedPlants = products.filter(p => p.isFeatured).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#132E20] to-[#2D6A4F] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            Customer Dashboard
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            Good morning, {currentUser.name.split(' ')[0]} 👋
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm max-w-xl">
            You've sent <strong>{deliveredOrders.length + activeOrders.length} green gifts</strong> creating a lasting impact on your recipients and environment.
          </p>
        </div>

        <button
          onClick={() => navigate('/products')}
          className="py-3 px-6 rounded-2xl bg-white text-[#132E20] hover:bg-emerald-50 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-colors whitespace-nowrap"
        >
          <Gift className="w-4 h-4 text-emerald-700" />
          <span>Send New Plant Gift</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Orders"
          value={myOrders.length}
          subtitle="All plant gifts created"
          icon={<Package className="w-5 h-5" />}
        />
        <StatsCard
          title="Active Gifts"
          value={activeOrders.length}
          subtitle="Currently in transit"
          icon={<Gift className="w-5 h-5" />}
        />
        <StatsCard
          title="Delivered Gifts"
          value={deliveredOrders.length}
          subtitle="Received with joy"
          icon={<Heart className="w-5 h-5 text-rose-500" />}
        />
        <StatsCard
          title="Green Impact"
          value="18.5 kg"
          subtitle="Estimated CO₂ Offset"
          icon={<Leaf className="w-5 h-5" />}
          bgColor="bg-emerald-50/60"
        />
      </div>

      {/* Active Order Tracker */}
      {activeOrders.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-300/80 shadow-soft space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-lg text-[#132E20] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-700" />
              <span>Live Active Gift Tracker — {activeOrders[0].orderNumber}</span>
            </h2>
            <Link
              to={`/customer/orders/${activeOrders[0].id}`}
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
            >
              <span>View Order Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <span className="text-stone-400 font-bold uppercase text-[10px]">Recipient</span>
              <p className="font-bold text-stone-900 mt-0.5">{activeOrders[0].recipientName}</p>
              <p className="text-stone-500 text-[11px]">{activeOrders[0].recipientAddress}</p>
            </div>
            <div>
              <span className="text-stone-400 font-bold uppercase text-[10px]">Gift Item</span>
              <p className="font-bold text-stone-900 mt-0.5">{activeOrders[0].items[0]?.name}</p>
              <p className="text-stone-500 text-[11px]">{activeOrders[0].partnerName}</p>
            </div>
            <div>
              <span className="text-stone-400 font-bold uppercase text-[10px]">Expected Delivery</span>
              <p className="font-bold text-emerald-800 mt-0.5">{activeOrders[0].expectedDeliveryDate}</p>
            </div>
          </div>

          <OrderTimeline
            currentStatus={activeOrders[0].orderStatus}
            history={activeOrders[0].trackingHistory}
          />
        </div>
      )}

      {/* Recent Orders Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-lg text-[#132E20]">Recent Gift Orders</h2>
          <Link to="/customer/orders" className="text-xs font-bold text-emerald-700 hover:underline">
            View All Orders
          </Link>
        </div>

        {myOrders.length === 0 ? (
          <div className="text-center py-8 text-xs text-stone-500">
            You haven't placed any gift orders yet. Start by sending a living plant to a teammate!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-stone-50 text-stone-500 uppercase font-bold text-[10px] border-b border-stone-200">
                <tr>
                  <th className="p-3">Order Number</th>
                  <th className="p-3">Recipient</th>
                  <th className="p-3">Gift Item</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {myOrders.slice(0, 5).map(ord => (
                  <tr key={ord.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="p-3 font-bold text-[#132E20]">{ord.orderNumber}</td>
                    <td className="p-3">
                      <div className="font-semibold text-stone-900">{ord.recipientName}</div>
                      <div className="text-[10px] text-stone-400">{ord.recipientEmail}</div>
                    </td>
                    <td className="p-3 font-medium">{ord.items[0]?.name}</td>
                    <td className="p-3 font-bold text-stone-900">₹{ord.total}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        ord.orderStatus === 'DELIVERED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ord.orderStatus === 'CANCELLED'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {ord.orderStatus}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        to={`/customer/orders/${ord.id}`}
                        className="px-3 py-1 rounded-lg bg-stone-100 hover:bg-emerald-100 text-stone-800 hover:text-emerald-900 font-bold text-[11px]"
                      >
                        Track
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
