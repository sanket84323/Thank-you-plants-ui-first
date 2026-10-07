import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { UserCheck, ShieldCheck, Store, Gift, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RoleSwitcherBar: React.FC = () => {
  const { currentUser, switchUserRole } = useApp();
  const navigate = useNavigate();

  const roles: { role: UserRole; label: string; icon: React.ReactNode; dashboardUrl: string }[] = [
    {
      role: 'CUSTOMER',
      label: 'Customer / Sender',
      icon: <UserCheck className="w-3.5 h-3.5" />,
      dashboardUrl: '/customer/dashboard'
    },
    {
      role: 'REVIEWER',
      label: 'Recipient / Reviewer',
      icon: <Gift className="w-3.5 h-3.5" />,
      dashboardUrl: '/reviewer/dashboard'
    },
    {
      role: 'PARTNER',
      label: 'Partner Nursery',
      icon: <Store className="w-3.5 h-3.5" />,
      dashboardUrl: '/partner/dashboard'
    },
    {
      role: 'ADMIN',
      label: 'Platform Admin',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      dashboardUrl: '/admin/dashboard'
    }
  ];

  return (
    <div className="bg-[#132E20] text-white py-1.5 px-4 text-xs font-medium flex flex-wrap items-center justify-between border-b border-emerald-900/40 z-50">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-800/60 text-emerald-200 text-[10px] uppercase font-bold tracking-wider">
          Demo Role Switcher
        </span>
        <span className="hidden sm:inline text-emerald-300/80">
          Current Role: <strong className="text-white underline decoration-emerald-500/50">{currentUser.role}</strong> ({currentUser.name})
        </span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
        {roles.map(r => {
          const isActive = currentUser.role === r.role;
          return (
            <button
              key={r.role}
              onClick={() => {
                switchUserRole(r.role);
                navigate(r.dashboardUrl);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/60 hover:text-white'
              }`}
            >
              {r.icon}
              <span className="whitespace-nowrap">{r.label}</span>
              {isActive && <ChevronRight className="w-3 h-3 text-emerald-200" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
