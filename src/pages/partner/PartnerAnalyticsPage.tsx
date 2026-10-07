import React from 'react';
import { useApp } from '../../context/AppContext';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const PartnerAnalyticsPage: React.FC = () => {
  const { partnerProfiles, currentUser } = useApp();
  const myProfile = partnerProfiles.find(p => p.userId === currentUser.id || p.id === 'part-1') || partnerProfiles[0];

  const analyticsData = [
    { month: 'Jan', revenue: 24000, orders: 40 },
    { month: 'Feb', revenue: 38000, orders: 62 },
    { month: 'Mar', revenue: 45000, orders: 75 },
    { month: 'Apr', revenue: 52000, orders: 88 },
    { month: 'May', revenue: 68000, orders: 110 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block mb-1">Performance Overview</span>
        <h1 className="font-heading font-extrabold text-3xl text-[#132E20]">Nursery Revenue Analytics</h1>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-soft space-y-6">
        <h3 className="font-heading font-bold text-lg text-[#132E20]">Monthly Growth Trajectory</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#888" fontSize={11} />
              <YAxis stroke="#888" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#132E20', color: '#fff', borderRadius: '12px', border: 'none' }} />
              <Area type="monotone" dataKey="revenue" stroke="#2D6A4F" fill="#D8F3DC" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
