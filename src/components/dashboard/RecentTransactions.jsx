import React from 'react';
import { cn } from '../../utils/cn';

const RecentTransactions = ({ transactions }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Validated':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200/60';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200/60';
      default:
        return 'bg-zinc-50 text-zinc-600 border-zinc-200/60';
    }
  };

  return (
    <div className="premium-card">
      <div className="px-5 py-4 border-b border-[#eaeaea] flex items-center justify-between bg-white">
        <h3 className="text-sm font-semibold text-zinc-900">Recent Transactions</h3>
        <button className="text-[13px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
          View all →
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-[#eaeaea] bg-zinc-50/50">
              <th className="px-5 py-3 font-medium text-zinc-500">Invoice ID</th>
              <th className="px-5 py-3 font-medium text-zinc-500">Company</th>
              <th className="px-5 py-3 font-medium text-zinc-500">TRN</th>
              <th className="px-5 py-3 font-medium text-zinc-500 text-right">Amount</th>
              <th className="px-5 py-3 font-medium text-zinc-500">Status</th>
              <th className="px-5 py-3 font-medium text-zinc-500 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eaeaea] bg-white">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-zinc-50/80 transition-colors group">
                <td className="px-5 py-3 font-medium text-zinc-900 cursor-pointer">
                  {tx.id}
                </td>
                <td className="px-5 py-3 text-zinc-600">
                  {tx.company}
                </td>
                <td className="px-5 py-3 text-zinc-500 font-mono text-[12px]">
                  {tx.trn}
                </td>
                <td className="px-5 py-3 font-medium text-zinc-900 text-right">
                  {tx.amount}
                </td>
                <td className="px-5 py-3">
                  <span className={cn(
                    "px-2 py-0.5 rounded-md text-[11px] font-semibold border",
                    getStatusColor(tx.status)
                  )}>
                    {tx.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-zinc-500 text-right">
                  {tx.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;
