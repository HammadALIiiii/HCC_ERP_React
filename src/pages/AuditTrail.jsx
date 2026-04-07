import React, { useState } from 'react';
import { auditLogs } from '../data/mockData';
import { ShieldCheck, History, Search, Download, Eye, FileJson, Clock, Filter, AlertCircle, ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';

const AuditTrail = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);

  const filteredLogs = auditLogs.filter(log => 
    log.docId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLogStatusStyle = (status) => {
    switch (status) {
      case 'Success': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Error':   return 'bg-rose-50 text-rose-700 border-rose-200';
      default:        return 'bg-zinc-50 text-zinc-600 border-zinc-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20 space-y-8 animate-in fade-in duration-700">
      {/* Hero / Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-2xl border border-[#eaeaea] shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100/50 shrink-0">
            <History className="text-indigo-600" size={28} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <h2 className="text-2xl font-display font-bold text-zinc-900 tracking-tight">Audit Trail & Archiving</h2>
              <span className="flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] uppercase font-black rounded-full">
                <ShieldCheck size={12} /> FTA Compliant
              </span>
            </div>
            <p className="text-zinc-500 text-[13px] max-w-lg leading-relaxed font-medium">
              Complete document history — submitted, accepted, and rejected invoices — with timestamps and response logs. Data is securely synced to your local ERP database.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="p-4 bg-zinc-50 rounded-xl border border-[#eaeaea] flex flex-col items-center justify-center min-w-[140px]">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Data Storage</span>
            <span className="text-xl font-black text-zinc-900">ERP Sync</span>
          </div>
          <button className="btn-primary h-11 px-6 text-[13px] font-bold shadow-lg shadow-indigo-100 flex items-center gap-2">
            <Download size={16} /> Export Audit Log
          </button>
        </div>
      </div>

      {/* Filters & Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main List */}
        <div className="lg:col-span-3 space-y-4">
          {/* Toolbar */}
          <div className="premium-card p-4 bg-white flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
              <input 
                type="text" 
                placeholder="Search by ID, User, or Action..." 
                className="input-field pl-10 h-10 text-[13px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="ghost-btn border border-[#eaeaea] h-10 px-4 flex items-center gap-2 text-[13px]">
              <Filter size={14} /> Filters
            </button>
          </div>

          {/* Log Registry */}
          <div className="premium-card bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px] border-collapse">
                <thead>
                  <tr className="border-b border-[#eaeaea] bg-zinc-50/50">
                    <th className="px-6 py-4 font-bold text-zinc-500 uppercase tracking-wider text-[11px]">Timestamp</th>
                    <th className="px-6 py-4 font-bold text-zinc-500 uppercase tracking-wider text-[11px]">Doc ID</th>
                    <th className="px-6 py-4 font-bold text-zinc-500 uppercase tracking-wider text-[11px]">Activity</th>
                    <th className="px-6 py-4 font-bold text-zinc-500 uppercase tracking-wider text-[11px]">Initiator</th>
                    <th className="px-6 py-4 font-bold text-zinc-500 uppercase tracking-wider text-[11px] text-right">Raw Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eaeaea]">
                  {filteredLogs.map((log) => (
                    <tr 
                      key={log.id} 
                      className={cn(
                        "hover:bg-zinc-50/80 transition-colors group cursor-pointer",
                        selectedLog?.id === log.id && "bg-indigo-50/30"
                      )}
                      onClick={() => setSelectedLog(log)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-zinc-600">
                          <Clock size={14} className="text-zinc-400" />
                          <span className="font-medium">{log.timestamp.split(' ')[0]}</span>
                          <span className="text-zinc-400 text-[11px] font-mono">{log.timestamp.split(' ')[1]}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors uppercase">{log.docId}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className={cn(
                          "flex items-center gap-1.5 px-2.5 py-1 rounded-full border w-fit text-[11px] font-bold tracking-tight",
                          getLogStatusStyle(log.status)
                        )}>
                          <span>{log.action}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center border border-[#eaeaea]">
                            <History size={12} className="text-zinc-400" />
                          </div>
                          <span className="text-zinc-600 font-medium">{log.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-zinc-400 hover:text-indigo-600 transition-all border border-transparent hover:border-indigo-100">
                          <FileJson size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Inspector Sidebar / Preview */}
        <div className="space-y-6">
          <div className="premium-card p-6 bg-white border-2 border-indigo-100/50 min-h-[400px] flex flex-col">
            {selectedLog ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center justify-between pb-4 border-b border-[#eaeaea]">
                  <h4 className="text-[13px] font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                    <AlertCircle size={14} className="text-indigo-600" /> Event Details
                  </h4>
                  <button onClick={() => setSelectedLog(null)} className="text-zinc-400 hover:text-zinc-600 transition-colors">
                    <ChevronRight size={18} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">Document Hash</span>
                    <span className="text-[11px] font-mono text-zinc-600 break-all p-2 bg-zinc-50 rounded border border-[#eaeaea]">
                      SHA256:7f83b2...a9d2c1
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">Response Log (JSON)</span>
                    <pre className="text-[10px] text-indigo-700 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100/50 font-mono overflow-x-auto">
                      {JSON.stringify(selectedLog.rawLog, null, 2)}
                    </pre>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-[#eaeaea]">
                  <button className="w-full h-10 bg-zinc-900 text-white rounded-lg text-[12px] font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all shadow-md">
                    <Download size={14} /> Download Evidence Packet
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-zinc-50/50 rounded-xl border border-dashed border-zinc-200">
                <FileJson size={40} className="text-zinc-200 mb-4" />
                <h4 className="text-[14px] font-bold text-zinc-500 mb-2 font-display uppercase tracking-wider">Log Inspector</h4>
                <p className="text-[12px] text-zinc-400 leading-relaxed font-medium">
                  Select an event from the audit trail to inspect raw system-to-system response logs and compliance metadata.
                </p>
              </div>
            )}
          </div>

          <div className="p-5 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl text-white shadow-xl shadow-indigo-100/50">
            <h5 className="font-bold font-display text-[15px] mb-3 flex items-center gap-2">
              <ShieldCheck size={18} /> FTA Archive Active
            </h5>
            <p className="text-[11px] text-white/80 leading-relaxed font-medium">
              All documents are cryptographically hashed and stored in compliant AES-256 encrypted vaults. Data tampering detection is active.
            </p>
            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase text-white/60">Uptime</span>
              <span className="text-[12px] font-black">99.98%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditTrail;
