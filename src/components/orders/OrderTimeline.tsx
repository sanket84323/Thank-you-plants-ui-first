import React from 'react';
import { OrderStatus } from '../../types';
import { CheckCircle2, Clock, PackageCheck, Truck, Gift, AlertTriangle } from 'lucide-react';

interface TimelineStep {
  status: OrderStatus;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const STEPS: TimelineStep[] = [
  {
    status: 'NEW',
    title: 'Order Placed',
    description: 'Payment confirmed & sent to partner nursery',
    icon: <Clock className="w-4 h-4" />
  },
  {
    status: 'CONFIRMED',
    title: 'Confirmed',
    description: 'Nursery accepted the plant order',
    icon: <CheckCircle2 className="w-4 h-4" />
  },
  {
    status: 'PREPARING',
    title: 'Preparing Gift',
    description: 'Potting fresh plant & printing custom message card',
    icon: <PackageCheck className="w-4 h-4" />
  },
  {
    status: 'READY_FOR_PICKUP',
    title: 'Ready for Courier',
    description: 'Handed over to eco courier partner',
    icon: <PackageCheck className="w-4 h-4" />
  },
  {
    status: 'OUT_FOR_DELIVERY',
    title: 'Out for Delivery',
    description: 'Rider is on the way to recipient address',
    icon: <Truck className="w-4 h-4" />
  },
  {
    status: 'DELIVERED',
    title: 'Delivered',
    description: 'Plant gift delivered with recipient smile',
    icon: <Gift className="w-4 h-4" />
  }
];

export const OrderTimeline: React.FC<{
  currentStatus: OrderStatus;
  history?: { status: OrderStatus; timestamp: string; note: string }[];
}> = ({ currentStatus, history = [] }) => {

  if (currentStatus === 'CANCELLED') {
    return (
      <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
        <div>
          <h4 className="font-bold text-sm">Order Cancelled</h4>
          <p className="text-xs text-rose-700">This gift order has been cancelled and refunded.</p>
        </div>
      </div>
    );
  }

  const getStatusIndex = (status: OrderStatus) => {
    const idx = STEPS.findIndex(s => s.status === status);
    return idx >= 0 ? idx : 0;
  };

  const currentIdx = getStatusIndex(currentStatus);

  return (
    <div className="py-4">
      {/* Horizontal Progress Bar for Desktop */}
      <div className="hidden md:flex items-center justify-between relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-stone-200 -translate-y-1/2 z-0"></div>
        <div
          className="absolute top-1/2 left-0 h-1 bg-[#2D6A4F] -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${(currentIdx / (STEPS.length - 1)) * 100}%` }}
        ></div>

        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentIdx;
          const isCurrent = idx === currentIdx;
          const historyEntry = history.find(h => h.status === step.status);

          return (
            <div key={step.status} className="relative z-10 flex flex-col items-center max-w-[120px] text-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  isCompleted
                    ? 'bg-[#2D6A4F] text-white ring-4 ring-emerald-100'
                    : isCurrent
                    ? 'bg-[#132E20] text-emerald-300 ring-4 ring-emerald-300/40 animate-pulse'
                    : 'bg-white text-stone-400 border-2 border-stone-200'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
              </div>

              <h4 className={`text-xs font-bold mt-2 ${isCurrent ? 'text-[#132E20]' : isCompleted ? 'text-stone-800' : 'text-stone-400'}`}>
                {step.title}
              </h4>

              {historyEntry && (
                <span className="text-[10px] font-medium text-stone-400 mt-0.5">
                  {historyEntry.timestamp.split(' ')[1] || historyEntry.timestamp}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Vertical Timeline for Mobile */}
      <div className="md:hidden space-y-6 relative border-l-2 border-stone-200 ml-4 pl-6">
        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentIdx;
          const isCurrent = idx === currentIdx;
          const historyEntry = history.find(h => h.status === step.status);

          return (
            <div key={step.status} className="relative">
              <div
                className={`absolute -left-[35px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  isCompleted
                    ? 'bg-[#2D6A4F] text-white'
                    : isCurrent
                    ? 'bg-[#132E20] text-emerald-300 ring-4 ring-emerald-200'
                    : 'bg-white text-stone-400 border-2 border-stone-300'
                }`}
              >
                {step.icon}
              </div>

              <div>
                <h4 className={`text-xs font-bold ${isCurrent ? 'text-[#132E20]' : 'text-stone-700'}`}>
                  {step.title}
                </h4>
                <p className="text-[11px] text-stone-500 mt-0.5">{step.description}</p>
                {historyEntry && (
                  <p className="text-[10px] text-emerald-700 font-semibold mt-1">
                    {historyEntry.timestamp} — {historyEntry.note}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
