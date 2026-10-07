import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { StatsCard } from '../../components/common/StatsCard';
import { ShieldCheck, Users, Store, Package, DollarSign, FileText, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const {
    allUsers,
    partnerProfiles,
    partnerApplications,
    products,
    orders,
    impactStats,
    reviewPartnerApplication
  } = useApp();
  const navigate = useNavigate();

  const pendingApps = partnerApplications.filter(a => a.status === 'PENDING' || a.status === 'UNDER_REVIEW');
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const salesTrendData = [
    { name: 'Oct', revenue: 145000, orders: 180 },
    { name: 'Nov', revenue: 210000, orders: 260 },
    { name: 'Dec', revenue: 380000, orders: 490 },
    { name: 'Jan', revenue: 420000, orders: 530 },
    { name: 'Feb', revenue: 510000, orders: 640 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#132E20] via-[#1E3A2B] to-[#2D6A4F] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Platform Admin Control Center</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            Thank You Plants Super Admin
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm">
            Complete platform management: Users, Partners, Applications, Catalog Moderation, Orders & Analytics.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/admin/partner-applications"
            className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#132E20] font-extrabold text-xs shadow-md transition-colors"
          >
            Applications ({pendingApps.length} Pending)
          </Link>
          <Link
            to="/admin/orders"
            className="py-2.5 px-4 rounded-xl bg-white text-[#132E20] hover:bg-emerald-50 font-bold text-xs shadow-md transition-colors"
          >
            All Orders ({orders.length})
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Platform Users"
          value={allUsers.length}
          subtitle="Customers, Recipients, Admins"
          icon={<Users className="w-5 h-5 text-emerald-700" />}
        />
        <StatsCard
          title="Active Nursery Partners"
          value={partnerProfiles.length}
          subtitle="Verified plant suppliers"
          icon={<Store className="w-5 h-5 text-emerald-700" />}
        />
        <StatsCard
          title="Total Plant Orders"
          value={orders.length}
          subtitle="Processed platform wide"
          icon={<Package className="w-5 h-5 text-emerald-700" />}
        />
        <StatsCard
          title="Gross Platform GMV"
          value={`₹${(totalRevenue / 1000).toFixed(1)}k`}
          subtitle="Revenue across all orders"
          icon={<DollarSign className="w-5 h-5 text-emerald-700" />}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200 text-center">
          <span className="text-[10px] text-stone-400 font-bold uppercase block">Pending Applications</span>
          <span className="font-heading font-extrabold text-2xl text-amber-600">{pendingApps.length}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-stone-200 text-center">
          <span className="text-[10px] text-stone-400 font-bold uppercase block">Total Plants Gifted</span>
          <span className="font-heading font-extrabold text-2xl text-[#132E20]">{impactStats.totalPlantsGifted.toLocaleString()}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-stone-200 text-center">
          <span className="text-[10px] text-stone-400 font-bold uppercase block">Catalog Products</span>
          <span className="font-heading font-extrabold text-2xl text-[#132E20]">{products.length}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-stone-200 text-center">
          <span className="text-[10px] text-stone-400 font-bold uppercase block">CO₂ Benefit</span>
          <span className="font-heading font-extrabold text-2xl text-emerald-700">{impactStats.co2SavedTons} Tons</span>
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-soft space-y-4">
        <h3 className="font-heading font-bold text-lg text-[#132E20]">Platform GMV & Order Growth</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#888" fontSize={11} />
              <YAxis stroke="#888" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#132E20', color: '#fff', borderRadius: '12px', border: 'none' }} />
              <Area type="monotone" dataKey="revenue" stroke="#132E20" fill="#D8F3DC" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pending Applications Review Panel */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-lg text-[#132E20]">Partner Applications Awaiting Review</h3>
          <Link to="/admin/partner-applications" className="text-xs font-bold text-emerald-700 hover:underline">
            View All Applications ({partnerApplications.length})
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-50 text-stone-500 uppercase font-bold text-[10px] border-b border-stone-200">
              <tr>
                <th className="p-3">Nursery / Business</th>
                <th className="p-3">Owner</th>
                <th className="p-3">Location</th>
                <th className="p-3">Business Type</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Admin Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {partnerApplications.map(app => (
                <tr key={app.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="p-3 font-bold text-[#132E20]">{app.businessName}</td>
                  <td className="p-3 font-semibold">{app.ownerName}</td>
                  <td className="p-3 text-stone-500">{app.city}, {app.state}</td>
                  <td className="p-3 font-medium">{app.businessType}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      app.status === 'APPROVED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : app.status === 'REJECTED'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    {app.status === 'PENDING' || app.status === 'UNDER_REVIEW' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => reviewPartnerApplication(app.id, 'APPROVED')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px]"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => reviewPartnerApplication(app.id, 'REJECTED')}
                          className="px-2.5 py-1 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-[11px]"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-stone-400 font-medium text-[11px]">Reviewed</span>
                    )}
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
