import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { StatsCard } from '../../components/common/StatsCard';
import { OrderStatus } from '../../types';
import { Store, Package, DollarSign, Star, AlertTriangle, CheckCircle2, ArrowRight, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const PartnerDashboard: React.FC = () => {
  const { currentUser, products, orders, updateOrderStatus, partnerProfiles } = useApp();
  const navigate = useNavigate();

  // Filter partner data
  const myProfile = partnerProfiles.find(p => p.userId === currentUser.id || p.id === 'part-1') || partnerProfiles[0];
  const myProducts = products.filter(p => p.seller.partnerId === myProfile.id || p.seller.name.includes(myProfile.businessName));
  const myOrders = orders.filter(o => o.partnerId === myProfile.id || o.partnerName.includes(myProfile.businessName));

  const activeOrders = myOrders.filter(o => o.orderStatus !== 'DELIVERED' && o.orderStatus !== 'CANCELLED');
  const completedOrders = myOrders.filter(o => o.orderStatus === 'DELIVERED');
  const totalRevenue = myOrders.reduce((sum, o) => sum + o.total, 0);
  const lowStockProducts = myProducts.filter(p => p.stock < 20);

  const revenueChartData = [
    { name: 'Mon', revenue: 12400, orders: 12 },
    { name: 'Tue', revenue: 18900, orders: 18 },
    { name: 'Wed', revenue: 15200, orders: 15 },
    { name: 'Thu', revenue: 24500, orders: 22 },
    { name: 'Fri', revenue: 31000, orders: 28 },
    { name: 'Sat', revenue: 28400, orders: 25 },
    { name: 'Sun', revenue: 21000, orders: 19 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#132E20] to-[#1E3A2B] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            Partner Nursery Portal
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            {myProfile.businessName}
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm">
            Owner: {myProfile.ownerName} • {myProfile.city}, {myProfile.state} • Verification Status: <strong className="text-emerald-300">{myProfile.verificationStatus}</strong>
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/partner/products/new"
            className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
          >
            + Add New Product
          </Link>
          <Link
            to="/partner/orders"
            className="py-2.5 px-4 rounded-xl bg-white text-[#132E20] hover:bg-emerald-50 font-bold text-xs shadow-md transition-colors"
          >
            Manage Orders ({activeOrders.length})
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <StatsCard
          title="Total Products"
          value={myProducts.length}
          icon={<Store className="w-4 h-4" />}
        />
        <StatsCard
          title="Active Orders"
          value={activeOrders.length}
          icon={<Package className="w-4 h-4" />}
        />
        <StatsCard
          title="Completed"
          value={completedOrders.length}
          icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
        />
        <StatsCard
          title="Total Revenue"
          value={`₹${(totalRevenue / 1000).toFixed(1)}k`}
          icon={<DollarSign className="w-4 h-4 text-emerald-700" />}
        />
        <StatsCard
          title="Rating"
          value={`${myProfile.rating} ★`}
          icon={<Star className="w-4 h-4 text-amber-500" />}
        />
        <StatsCard
          title="Low Stock"
          value={lowStockProducts.length}
          icon={<AlertTriangle className="w-4 h-4 text-rose-500" />}
          bgColor="bg-rose-50/50"
        />
      </div>

      {/* Charts & Revenue Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-lg text-[#132E20]">Weekly Sales Analytics</h3>
              <p className="text-xs text-stone-500">Revenue & Order volume generated this week</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              +18.4% vs last week
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888" fontSize={11} />
                <YAxis stroke="#888" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#132E20', color: '#fff', borderRadius: '12px', border: 'none' }}
                />
                <Bar dataKey="revenue" fill="#2D6A4F" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Low Stock Alerts & Fast Actions */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-soft space-y-4">
          <h3 className="font-heading font-bold text-lg text-[#132E20] flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span>Low Stock Inventory</span>
          </h3>

          <div className="divide-y divide-stone-100 text-xs">
            {lowStockProducts.length === 0 ? (
              <p className="text-stone-500 py-4 text-center">All inventory levels are healthy!</p>
            ) : (
              lowStockProducts.map(prod => (
                <div key={prod.id} className="py-3 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-stone-900">{prod.name}</h4>
                    <span className="text-[10px] text-rose-600 font-semibold">Stock: {prod.stock} units</span>
                  </div>
                  <Link
                    to="/partner/inventory"
                    className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-[10px]"
                  >
                    Restock
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Orders Processing Queue */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-lg text-[#132E20]">Nursery Order Queue</h3>
          <Link to="/partner/orders" className="text-xs font-bold text-emerald-700 hover:underline">
            View All Partner Orders
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-50 text-stone-500 uppercase font-bold text-[10px] border-b border-stone-200">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Recipient & Address</th>
                <th className="p-3">Plant Item</th>
                <th className="p-3">Current Status</th>
                <th className="p-3 text-right">Update Order Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {myOrders.slice(0, 5).map(ord => (
                <tr key={ord.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="p-3 font-bold text-[#132E20]">{ord.orderNumber}</td>
                  <td className="p-3 font-semibold">{ord.customerName}</td>
                  <td className="p-3">
                    <div className="font-bold text-stone-900">{ord.recipientName}</div>
                    <div className="text-[10px] text-stone-400 truncate max-w-[180px]">{ord.recipientAddress}</div>
                  </td>
                  <td className="p-3 font-medium">{ord.items[0]?.name}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                      {ord.orderStatus}
                    </span>
                  </td>
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
