import React from 'react';
import { useMemo } from 'react';
import UsageProgressCard from '../components/dashboard/UsageProgressCard';
import { billingUsage } from '../data/mockData';
import { ShieldCheck, FileText, Download, Building2, TrendingUp, Info } from 'lucide-react';
import { cn } from '../utils/cn';

const UsageMonitor = () => {
  const usage = billingUsage;
  const isOverLimit = usage.consumed > usage.tierLimit;

  return (
    <div className="max-w-6xl mx-auto pb-20 space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-display font-bold text-zinc-900 tracking-tight leading-tight">Usage & Overage Monitor</h2>
            <div className="px-2 py-0.5 bg-zinc-100 text-zinc-500 border border-zinc-200 text-[10px] uppercase font-black tracking-widest rounded-md translate-y-[-2px]">
              v2.4
            </div>
          </div>
          <p className="text-zinc-500 text-sm max-w-xl leading-relaxed font-medium">
            Track combined invoice volume across all registered TRNs. System flags when nearing tier limits for proactive planning.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="ghost-btn border border-[#eaeaea]">
            <Download size={14} /> Export Usage Report
          </button>
          <button className="btn-primary h-10 px-5 text-[13px] font-bold shadow-md shadow-indigo-100">
            Billing Support
          </button>
        </div>
      </div>

      {/* Main Feature: Usage Progress & Projections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-2">
        <div className="lg:col-span-2">
          <UsageProgressCard usage={usage} />
        </div>
        
        {/* Quick Stats Sidebar */}
        <div className="space-y-6">
          <div className="premium-card p-6 bg-white space-y-4">
            <div className="flex items-center gap-2 text-zinc-400 mb-2">
              <ShieldCheck size={16} />
              <span className="text-[11px] font-bold uppercase tracking-wider">Subscription Details</span>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-xl font-black text-zinc-900 leading-none">Annual Enterprise</span>
                <span className="text-[11px] font-medium text-zinc-400 mt-1 uppercase tracking-tight">Plan Type</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-zinc-900 leading-none">Tier 2 (Standard)</span>
                <span className="text-[11px] font-medium text-zinc-400 mt-1 uppercase tracking-tight">Current Level</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-zinc-900 leading-none">Active</span>
                <span className="text-[11px] font-medium text-zinc-400 mt-1 uppercase tracking-tight">Overage Protection</span>
              </div>
            </div>
          </div>

          <div className="p-5 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl text-white space-y-3 shadow-xl">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <TrendingUp size={20} className="text-white" />
            </div>
            <div>
              <h4 className="text-base font-bold font-display leading-tight">Tier 2 Status</h4>
              <p className="text-[11px] text-white/80 mt-2 leading-relaxed">
                Your organization is currently operating on the **Standard Enterprise Tier**. All compliance features and FTA-ready archiving are fully active.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Section */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 size={18} className="text-zinc-900" />
            <h3 className="text-lg font-display font-bold text-zinc-900 tracking-tight">Volume by Legal Entity (TRN)</h3>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-50 border border-zinc-200 rounded text-zinc-500 text-[11px] font-medium italic">
            <Info size={12} /> Live tracking across all subsidiaries
          </div>
        </div>

        <div className="premium-card bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-[#eaeaea] bg-zinc-50/50">
                  <th className="px-6 py-4 font-bold text-zinc-500 uppercase tracking-wider text-[11px]">Organization Name</th>
                  <th className="px-6 py-4 font-bold text-zinc-500 uppercase tracking-wider text-[11px]">TRN Identifier</th>
                  <th className="px-6 py-4 font-bold text-zinc-500 uppercase tracking-wider text-[11px]">Entity Type</th>
                  <th className="px-6 py-4 font-bold text-zinc-500 uppercase tracking-wider text-[11px] text-right">Consumption</th>
                  <th className="px-6 py-4 font-bold text-zinc-500 uppercase tracking-wider text-[11px] text-right">Quota Contribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaeaea]">
                {usage.trnBreakdown.map((trn) => (
                  <tr key={trn.trn} className="hover:bg-zinc-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-zinc-900 tracking-tight">{trn.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-mono text-zinc-500">{trn.trn}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[11px] font-medium text-zinc-500 border border-[#eaeaea] px-2 py-0.5 rounded-full bg-zinc-50">
                        {trn.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-black text-zinc-900">
                      {trn.usage.toLocaleString()} invoices
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3 font-medium text-zinc-600">
                        <div className="w-24 h-1.5 bg-zinc-100 rounded-full overflow-hidden border border-[#eaeaea]">
                          <div 
                            className="h-full bg-indigo-500"
                            style={{ width: `${(trn.usage / usage.consumed) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-[11px] w-8">
                          {Math.round((trn.usage / usage.consumed) * 100)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UsageMonitor;
