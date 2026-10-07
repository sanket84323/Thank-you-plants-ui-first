import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  bgColor?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  bgColor = 'bg-white'
}) => {
  return (
    <div className={`${bgColor} rounded-2xl border border-stone-200/80 p-5 shadow-soft flex flex-col justify-between`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{title}</p>
          <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#132E20] mt-1.5 leading-none">
            {value}
          </h3>
        </div>

        <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
          {icon}
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          {subtitle && <span className="text-stone-500 font-medium">{subtitle}</span>}
          {trend && (
            <span
              className={`flex items-center gap-1 font-bold ${
                trend.isPositive ? 'text-emerald-700' : 'text-rose-600'
              }`}
            >
              {trend.isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>{trend.value}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
