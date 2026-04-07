import React from 'react';
import { cn } from '../../utils/cn';
import { AlertTriangle, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

const UsageProgressCard = ({ usage }) => {
  const { tierLimit, consumed, overageRate, currency } = usage;
  const isOverLimit = consumed > tierLimit;
  const basePercentage = Math.min((consumed / tierLimit) * 100, 100);
  const overagePercentage = isOverLimit ? Math.min(((consumed - tierLimit) / (tierLimit * 0.2)) * 100, 100) : 0;
  const overageAmount = isOverLimit ? (consumed - tierLimit) : 0;
  const overageCost = overageAmount * overageRate;

  return (
    <div className="premium-card bg-white h-full flex flex-col">
      <div className="px-6 py-5 border-b border-[#eaeaea] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap size={18} className="text-zinc-400" />
          <h3 className="text-[15px] font-bold text-zinc-900 tracking-tight">Active Tier Monitoring</h3>
        </div>
        <div className={cn(
          "px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5",
          isOverLimit ? "bg-rose-50 text-rose-600 border-rose-200" : "bg-emerald-50 text-emerald-600 border-emerald-200"
        )}>
          {isOverLimit ? <AlertTriangle size={12} /> : <ShieldCheck size={12} />}
          {isOverLimit ? 'Tier Limit Exceeded' : 'Within Tier Limits'}
        </div>
      </div>

      <div className="p-6 space-y-8 flex-1">
        {/* Main Meters */}
        <div className="space-y-6">
          {/* Base Tier Meter */}
          <div className="space-y-2">
            <div className="flex justify-between items-end mb-1.5">
              <span className="text-[12px] font-bold text-zinc-500 tracking-tight uppercase tracking-wider">Tier 2 (Standard) Base</span>
              <span className="text-sm font-black text-zinc-900">
                {Math.min(consumed, tierLimit).toLocaleString()} / {tierLimit.toLocaleString()}
              </span>
            </div>
            <div className="h-4 w-full bg-zinc-100 rounded-lg overflow-hidden border border-[#eaeaea] p-[2px]">
              <div 
                className={cn(
                  "h-full rounded-[4px] transition-all duration-1000 ease-out shadow-sm",
                  isOverLimit ? "bg-zinc-800" : "bg-gradient-to-r from-indigo-500 to-indigo-600"
                )}
                style={{ width: `${basePercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Overage Extension Meter (Only shows if over limit) */}
          {isOverLimit && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-500">
              <div className="flex justify-between items-end mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold text-rose-600 tracking-tight uppercase">Overage Volume (Extra)</span>
                  <span className="px-1.5 py-0.5 bg-rose-100 text-rose-700 text-[10px] font-black rounded italic">ACTIVE</span>
                </div>
                <span className="text-sm font-black text-rose-600">+{overageAmount.toLocaleString()} Units</span>
              </div>
              <div className="h-4 w-full bg-rose-50 rounded-lg overflow-hidden border border-rose-100 p-[2px]">
                <div 
                  className="h-full rounded-[4px] bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-1000 ease-out animate-pulse"
                  style={{ width: `${overagePercentage}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-zinc-400 font-medium">Standard $0.75 per invoice overage fee applies to these units.</p>
            </div>
          )}
        </div>

        {/* Financial Projection */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-50 border border-[#eaeaea] rounded-xl text-center">
            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Base Subscription</p>
            <p className="text-xl font-black text-zinc-900 leading-none">Annual</p>
            <p className="text-[10px] text-zinc-500 font-medium mt-1 italic">Renewing Jan 2025</p>
          </div>
          <div className={cn(
            "p-4 border rounded-xl text-center transition-colors",
            isOverLimit ? "bg-rose-50 border-rose-100" : "bg-zinc-50 border-[#eaeaea]"
          )}>
            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Overage Accrued</p>
            <p className={cn("text-xl font-black leading-none", isOverLimit ? "text-rose-600 font-display" : "text-zinc-900")}>
              {currency} {overageCost.toLocaleString()}
            </p>
            <p className="text-[10px] text-zinc-500 font-medium mt-1 italic">Pending Invoice</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UsageProgressCard;
