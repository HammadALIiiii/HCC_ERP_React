import React from 'react';
import { cn } from '../../utils/cn';
import { FileText, Download, ExternalLink, ShieldCheck, Clock, AlertCircle } from 'lucide-react';

const SubmissionHistoryTable = ({ data, type }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case 'Cleared':
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-700',
          border: 'border-emerald-200/60',
          icon: ShieldCheck,
          label: 'Cleared by FTA'
        };
      case 'Pending':
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-700',
          border: 'border-amber-200/60',
          icon: Clock,
          label: 'Processing'
        };
      case 'Rejected':
        return {
          bg: 'bg-rose-50',
          text: 'text-rose-700',
          border: 'border-rose-200/60',
          icon: AlertCircle,
          label: 'Rejected'
        };
      default:
        return {
          bg: 'bg-zinc-50',
          text: 'text-zinc-600',
          border: 'border-zinc-200/60',
          icon: Clock,
          label: status
        };
    }
  };

  return (
    <div className="premium-card bg-white overflow-hidden">
      <div className="px-5 py-4 border-b border-[#eaeaea] bg-zinc-50/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-zinc-400" />
          <h3 className="text-sm font-semibold text-zinc-900 tracking-tight">Clearance & Reporting History</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-zinc-400">Total processed: {data.length}</span>
        </div>
      </div>

      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left text-[13px] border-collapse">
          <thead>
            <tr className="border-b border-[#eaeaea] bg-zinc-50/50">
              <th className="px-5 py-3 font-medium text-zinc-500 whitespace-nowrap">Document ID</th>
              <th className="px-5 py-3 font-medium text-zinc-500 whitespace-nowrap">Recipient / Issuer</th>
              <th className="px-5 py-3 font-medium text-zinc-500 whitespace-nowrap">Amount</th>
              <th className="px-5 py-3 font-medium text-zinc-500 whitespace-nowrap line-clamp-1">IRN / Submission Code</th>
              <th className="px-5 py-3 font-medium text-zinc-500 whitespace-nowrap">Status</th>
              <th className="px-5 py-3 font-medium text-zinc-500 whitespace-nowrap text-right">Processed At</th>
              <th className="px-5 py-3 font-medium text-zinc-500 whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eaeaea]">
            {data.map((row) => {
              const status = getStatusStyles(row.status);
              const StatusIcon = status.icon;
              
              return (
                <tr key={row.id} className="hover:bg-zinc-50/80 transition-all group">
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-zinc-900">{row.id}</span>
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">{type}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-zinc-700">{row.company}</span>
                      <span className="text-[11px] text-zinc-400 font-mono">TRN: {row.trn}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-zinc-900 font-semibold italic">
                    {row.amount}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <span className="text-[12px] font-mono text-indigo-600 bg-indigo-50/50 px-1.5 py-0.5 rounded border border-indigo-100/50 w-fit">
                        {row.irn}
                      </span>
                      <span className="text-[10px] text-zinc-400 mt-1 truncate max-w-[120px]">
                        UUID: {row.uuid}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className={cn(
                      "flex items-center gap-1.5 px-2.5 py-1 rounded-full border w-fit whitespace-nowrap",
                      status.bg, status.text, status.border
                    )}>
                      <StatusIcon size={12} />
                      <span className="text-[11px] font-bold tracking-tight">{status.label}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="text-zinc-600 font-medium">{row.submissionDate.split(' ')[0]}</div>
                    <div className="text-[11px] text-zinc-400">{row.submissionDate.split(' ')[1]}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 hover:bg-zinc-100 rounded-md text-zinc-400 hover:text-zinc-900 transition-colors title='Download PDF'">
                        <Download size={14} />
                      </button>
                      <button className="p-1.5 hover:bg-zinc-100 rounded-md text-indigo-500 hover:text-indigo-700 transition-colors title='View XML Content'">
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="px-5 py-3 border-t border-[#eaeaea] bg-zinc-50/30 flex items-center justify-between">
        <div className="text-[12px] text-zinc-500">
          Showing <span className="font-semibold text-zinc-900">{data.length}</span> documents
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-white border border-[#eaeaea] rounded-md text-[12px] font-medium text-zinc-400 cursor-not-allowed">Previous</button>
          <button className="px-3 py-1.5 bg-white border border-[#eaeaea] rounded-md text-[12px] font-medium text-zinc-400 cursor-not-allowed">Next</button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionHistoryTable;
