import React from 'react';
import { useApp } from '../../context/AppContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const AdminAnalyticsPage: React.FC = () => {
  const { impactStats } = useApp();

  const categoryShare = [
    { name: 'Indoor Plants', count: 420 },
    { name: 'Air Purifying', count: 310 },
    { name: 'Succulents & Cacti', count: 210 },
    { name: 'Bonsai & Premium', count: 180 },
    { name: 'Flowering Plants', count: 150 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block mb-1">Platform Metrics</span>
        <h1 className="font-heading font-extrabold text-3xl text-[#132E20]">Global Platform & Impact Analytics</h1>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-soft space-y-4">
        <h3 className="font-heading font-bold text-lg text-[#132E20]">Product Category Distribution</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryShare}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#888" fontSize={11} />
              <YAxis stroke="#888" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#132E20', color: '#fff', borderRadius: '12px', border: 'none' }} />
              <Bar dataKey="count" fill="#2D6A4F" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
