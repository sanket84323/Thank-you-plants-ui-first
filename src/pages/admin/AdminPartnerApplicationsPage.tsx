import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Store, Search, CheckCircle2, XCircle, FileText } from 'lucide-react';

export const AdminPartnerApplicationsPage: React.FC = () => {
  const { partnerApplications, reviewPartnerApplication } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredApps = partnerApplications.filter(a => filterStatus === 'ALL' || a.status === filterStatus);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block mb-1">Onboarding Pipeline</span>
        <h1 className="font-heading font-extrabold text-3xl text-[#132E20]">Nursery Partner Applications</h1>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-soft flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {['ALL', 'PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                filterStatus === st ? 'bg-[#132E20] text-emerald-300' : 'bg-stone-50 text-stone-600'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-50 text-stone-500 uppercase font-bold text-[10px] border-b border-stone-200">
              <tr>
                <th className="p-3">Business Name</th>
                <th className="p-3">Owner Contact</th>
                <th className="p-3">Location & Address</th>
                <th className="p-3">Business Type</th>
                <th className="p-3">Categories</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Approval Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredApps.map(app => (
                <tr key={app.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="p-3 font-bold text-[#132E20]">{app.businessName}</td>
                  <td className="p-3">
                    <div className="font-semibold text-stone-900">{app.ownerName}</div>
                    <div className="text-[10px] text-stone-400">{app.email}</div>
                  </td>
                  <td className="p-3 text-stone-500">{app.city}, {app.state}</td>
                  <td className="p-3 font-medium">{app.businessType}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {app.plantCategories.map(c => (
                        <span key={c} className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[9px] font-bold">{c}</span>
                      ))}
                    </div>
                  </td>
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
                      <span className="text-stone-400 font-semibold text-[11px]">Completed</span>
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
