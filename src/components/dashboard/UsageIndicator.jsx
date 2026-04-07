import React from 'react';

const UsageIndicator = ({ percentage, limit, current }) => {
  return (
    <div className="premium-card flex flex-col justify-between h-full">
      <div className="px-5 py-4 border-b border-[#eaeaea] flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900">Subscription Usage</h3>
        <span className="text-[10px] font-bold text-indigo-700 px-2 py-0.5 bg-indigo-50 border border-indigo-100 rounded">
          Monthly Limit
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-center space-y-5 bg-white">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-3xl font-display font-semibold tracking-tight text-zinc-900">{current.toLocaleString()}</p>
            <p className="text-[12px] text-zinc-500 font-medium">Invoices submitted this month</p>
          </div>
          <div className="text-right">
            <p className="text-[13px] font-semibold text-zinc-900">{limit.toLocaleString()} max</p>
            <p className="text-[11px] text-zinc-400">Resets in 12 days</p>
          </div>
        </div>

        <div className="relative h-2 w-full bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/50">
          <div 
            className="absolute top-0 left-0 h-full bg-zinc-900 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[12px] font-medium text-zinc-500">
            <span className="text-zinc-900 font-semibold">{percentage}%</span> capacity used
          </p>
          {percentage > 90 ? (
            <p className="text-[11px] font-bold text-rose-600 animate-pulse">Critical: Upgrade soon</p>
          ) : percentage > 70 ? (
            <p className="text-[11px] font-bold text-amber-600">Approaching limit</p>
          ) : (
            <p className="text-[11px] font-bold text-emerald-600">Healthy status</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsageIndicator;
