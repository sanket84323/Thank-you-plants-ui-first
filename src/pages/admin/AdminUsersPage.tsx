import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Search, ShieldCheck } from 'lucide-react';

export const AdminUsersPage: React.FC = () => {
  const { allUsers, switchUserRole } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = allUsers.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block mb-1">User Directory</span>
        <h1 className="font-heading font-extrabold text-3xl text-[#132E20]">Platform User Management</h1>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-soft">
        <input
          type="text"
          placeholder="Search user name, email, or role..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full sm:w-80 p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
        />
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-50 text-stone-500 uppercase font-bold text-[10px] border-b border-stone-200">
              <tr>
                <th className="p-3">User Name</th>
                <th className="p-3">Email Address</th>
                <th className="p-3">Role</th>
                <th className="p-3">Company / Org</th>
                <th className="p-3">Created Date</th>
                <th className="p-3 text-right">Impersonate Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredUsers.map(usr => (
                <tr key={usr.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="p-3 font-bold text-[#132E20]">{usr.name}</td>
                  <td className="p-3 font-medium text-stone-600">{usr.email}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {usr.role}
                    </span>
                  </td>
                  <td className="p-3 text-stone-500">{usr.company || 'N/A'}</td>
                  <td className="p-3 text-stone-400">{new Date(usr.createdAt).toLocaleDateString()}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => switchUserRole(usr.role)}
                      className="px-3 py-1 rounded-lg bg-stone-100 hover:bg-emerald-100 text-stone-800 hover:text-emerald-900 font-bold text-[11px]"
                    >
                      Switch to {usr.role}
                    </button>
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
