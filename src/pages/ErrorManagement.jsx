import React, { useState } from 'react';
import { AlertTriangle, XCircle, CheckCircle2, RefreshCw, ChevronDown, ChevronRight, Search, Filter, FileWarning, Zap, Info, Clock, RotateCcw, Shield, Server, Activity, ShieldOff } from 'lucide-react';
import { systemActivityLogs } from '../data/mockData';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

const mockErrors = [
  {
    id: 'ERR-2401',
    invoiceId: 'INV-003',
    company: 'Global Tech',
    trn: '1007894561',
    timestamp: '2024-03-21 16:44:02',
    severity: 'Critical',
    category: 'FTA Rejection',
    code: 'FTA-ERR-422',
    message: 'Invoice TRN does not match registered entity. Verify TRN with FTA portal and resubmit.',
    status: 'Unresolved',
  },
  {
    id: 'ERR-2398',
    invoiceId: 'INV-009',
    company: 'Nexus Corp',
    trn: '1002345678',
    timestamp: '2024-03-21 14:10:55',
    severity: 'High',
    category: 'Validation Failure',
    code: 'SCHEMA-ERR-101',
    message: 'Missing mandatory field: SellerTaxId. Ensure TRN is populated before submission.',
    status: 'Resolved',
  },
  {
    id: 'ERR-2390',
    invoiceId: 'INV-007',
    company: 'Al-Madina Ltd',
    trn: '1004561234',
    timestamp: '2024-03-19 09:22:11',
    severity: 'High',
    category: 'Validation Failure',
    code: 'SCHEMA-ERR-204',
    message: 'Invalid currency code "US" — must be ISO 4217 compliant (e.g., "USD", "AED").',
    status: 'Unresolved',
  },
  {
    id: 'ERR-2385',
    invoiceId: 'INV-005',
    company: 'Nexus Corp',
    trn: '1002345678',
    timestamp: '2024-03-18 14:05:33',
    severity: 'Critical',
    category: 'FTA Rejection',
    code: 'FTA-ERR-409',
    message: 'Duplicate invoice detected. An invoice with the same UUID was already cleared.',
    status: 'Resolved',
  },
  {
    id: 'ERR-2374',
    invoiceId: 'INV-002',
    company: 'Swift Logistics',
    trn: '1001237890',
    timestamp: '2024-03-17 11:30:00',
    severity: 'Medium',
    category: 'Peppol Network',
    code: 'PEPPOL-TIMEOUT-503',
    message: 'Network timeout during handshake with Peppol Access Point. Retry recommended.',
    status: 'Unresolved',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } }
};

const severityConfig = {
  Critical: { badge: 'bg-rose-50 text-rose-700 border-rose-200/70', dot: 'bg-rose-500', icon: XCircle },
  High:     { badge: 'bg-amber-50 text-amber-700 border-amber-200/70', dot: 'bg-amber-500', icon: AlertTriangle },
  Medium:   { badge: 'bg-sky-50 text-sky-700 border-sky-200/70', dot: 'bg-sky-500', icon: Info },
};

const categoryConfig = {
  'FTA Rejection':    'bg-rose-50 text-rose-700 border-rose-200/60',
  'Validation Failure': 'bg-amber-50 text-amber-700 border-amber-200/60',
  'Peppol Network':   'bg-indigo-50 text-indigo-700 border-indigo-200/60',
};

// Expandable Error Row
const ErrorRow = ({ error }) => {
  const [expanded, setExpanded] = useState(false);
  const [resubmitting, setResubmitting] = useState(false);
  const [resubmitted, setResubmitted] = useState(false);
  const sev = severityConfig[error.severity] || severityConfig.Medium;

  const handleResubmit = (e) => {
    e.stopPropagation();
    setResubmitting(true);
    setTimeout(() => { setResubmitting(false); setResubmitted(true); }, 2000);
  };

  return (
    <>
      <motion.tr
        variants={itemVariants}
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "hover:bg-zinc-50/80 transition-colors cursor-pointer group",
          expanded && "bg-zinc-50/60"
        )}
      >
        <td className="px-5 py-3">
          {expanded
            ? <ChevronDown size={14} className="text-zinc-400" />
            : <ChevronRight size={14} className="text-zinc-300 group-hover:text-zinc-400 transition-colors" />}
        </td>
        <td className="px-5 py-3 font-mono text-[11px] text-zinc-400">{error.id}</td>
        <td className="px-5 py-3 font-semibold text-zinc-900 text-[13px]">{error.invoiceId}</td>
        <td className="px-5 py-3 text-zinc-600 text-[13px]">{error.company}</td>
        <td className="px-5 py-3">
          <span className={cn("px-2 py-0.5 rounded-md text-[11px] font-semibold border", categoryConfig[error.category] || '')}>
            {error.category}
          </span>
        </td>
        <td className="px-5 py-3">
          <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold border", sev.badge)}>
            <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", sev.dot)}></span>
            {error.severity}
          </span>
        </td>
        <td className="px-5 py-3 text-zinc-500 text-[12px] whitespace-nowrap">{error.timestamp}</td>
        <td className="px-5 py-3 text-right">
          {resubmitted ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md">
              <CheckCircle2 size={11} /> Resubmitted
            </span>
          ) : error.status === 'Resolved' ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-500 bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded-md">
              <Shield size={11} /> Resolved
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 bg-rose-50 border border-rose-200/60 px-2 py-0.5 rounded-md">
              <XCircle size={11} /> Unresolved
            </span>
          )}
        </td>
      </motion.tr>

      {/* Expandable Detail Panel */}
      <AnimatePresence>
        {expanded && (
          <motion.tr
            key={`detail-${error.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <td colSpan={8} className="px-0 pb-0">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mx-4 mb-4 border border-[#eaeaea] rounded-xl bg-white shadow-sm overflow-hidden">
                  <div className="flex items-center gap-2 px-5 py-3 bg-zinc-50 border-b border-[#eaeaea]">
                    <FileWarning size={14} className="text-zinc-400" />
                    <span className="text-[12px] font-semibold text-zinc-700">Error Details — {error.code}</span>
                  </div>
                  <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left: Fix Guidance */}
                    <div className="md:col-span-2 space-y-3">
                      <div>
                        <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Error Message</p>
                        <p className="text-[13px] text-zinc-700 leading-relaxed font-medium">{error.message}</p>
                      </div>
                      <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg flex items-start gap-2">
                        <Zap size={14} className="text-indigo-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[11px] font-bold text-indigo-800 mb-0.5">Fix Guidance</p>
                          <p className="text-[12px] text-indigo-700 leading-relaxed">
                            {error.category === 'FTA Rejection' && 'Log into the FTA e-Invoice Portal and verify the TRN and UUID integrity. Correct the field and use the one-click resubmit button.'}
                            {error.category === 'Validation Failure' && 'Review the invoice XML schema against the PINT AE mandate. Correct the flagged field in the Invoice Posting Portal and resubmit.'}
                            {error.category === 'Peppol Network' && 'This is a transient network error. Wait a few minutes for the Access Point to recover, then use the Resubmit button to retry the handshake.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Meta + Actions */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-[12px]">
                          <span className="text-zinc-400 font-medium">Invoice</span>
                          <span className="font-semibold text-zinc-900">{error.invoiceId}</span>
                        </div>
                        <div className="flex justify-between text-[12px]">
                          <span className="text-zinc-400 font-medium">TRN</span>
                          <span className="font-mono text-zinc-700">{error.trn}</span>
                        </div>
                        <div className="flex justify-between text-[12px]">
                          <span className="text-zinc-400 font-medium">Error Code</span>
                          <span className="font-mono text-zinc-700">{error.code}</span>
                        </div>
                        <div className="flex justify-between text-[12px]">
                          <span className="text-zinc-400 font-medium">Logged At</span>
                          <span className="text-zinc-700">{error.timestamp.split(' ')[1]}</span>
                        </div>
                      </div>

                      {!resubmitted && error.status !== 'Resolved' && (
                        <button
                          onClick={handleResubmit}
                          disabled={resubmitting}
                          className={cn(
                            "w-full btn-primary h-9 flex items-center justify-center gap-2 text-[13px]",
                            resubmitting && "opacity-80 pointer-events-none"
                          )}
                        >
                          {resubmitting
                            ? <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
                            : <><RotateCcw size={14} /> Resubmit</>}
                        </button>
                      )}
                      {(resubmitted || error.status === 'Resolved') && (
                        <div className="w-full h-9 flex items-center justify-center gap-2 text-[12px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg">
                          <CheckCircle2 size={14} /> {resubmitted ? 'Successfully Resubmitted' : 'Already Resolved'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
};

// System Activity Log Table Component
const SystemLogTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[13px]">
        <thead>
          <tr className="border-b border-[#eaeaea] bg-zinc-50">
            <th className="px-5 py-3 font-medium text-zinc-500 w-24">Log ID</th>
            <th className="px-5 py-3 font-medium text-zinc-500">Timestamp</th>
            <th className="px-5 py-3 font-medium text-zinc-500">User / Role</th>
            <th className="px-5 py-3 font-medium text-zinc-500">Action</th>
            <th className="px-5 py-3 font-medium text-zinc-500">IP Address</th>
            <th className="px-5 py-3 font-medium text-zinc-500">Details</th>
            <th className="px-5 py-3 font-medium text-zinc-500 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eaeaea] bg-white">
          {systemActivityLogs.map(log => (
            <tr key={log.id} className="hover:bg-zinc-50/80 transition-colors">
              <td className="px-5 py-3 font-mono text-[11px] text-zinc-400">{log.id}</td>
              <td className="px-5 py-3 text-zinc-500 text-[12px] whitespace-nowrap">{log.timestamp}</td>
              <td className="px-5 py-3">
                <div className="flex flex-col">
                  <span className="font-semibold text-zinc-900 text-[13px]">{log.user}</span>
                  <span className="text-[11px] text-zinc-500">{log.role}</span>
                </div>
              </td>
              <td className="px-5 py-3 font-medium text-zinc-700">{log.action}</td>
              <td className="px-5 py-3 font-mono text-[11px] text-zinc-500">{log.ip}</td>
              <td className="px-5 py-3 text-zinc-600 text-[12px] max-w-xs truncate" title={log.detail}>{log.detail}</td>
              <td className="px-5 py-3 text-right">
                {log.status === 'Success' && <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md"><CheckCircle2 size={11} /> Success</span>}
                {log.status === 'Warning' && <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md"><AlertTriangle size={11} /> Warning</span>}
                {log.status === 'Error' && <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200/60 px-2 py-0.5 rounded-md"><XCircle size={11} /> Error</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// MAIN PAGE
const ErrorManagement = () => {
  const [activeTab, setActiveTab] = useState('invoice-errors');
  const unresolvedCount = mockErrors.filter(e => e.status === 'Unresolved').length;
  const criticalCount = mockErrors.filter(e => e.severity === 'Critical').length;

  return (
    <div className="max-w-6xl mx-auto mt-4 pb-20">
      {/* Header */}
      <motion.div
        variants={containerVariants} initial="hidden" animate="visible"
        className="flex items-start justify-between mb-8"
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-display font-semibold text-zinc-900 tracking-tight">Error Log & Resolution</h2>
          <p className="text-zinc-500 text-sm mt-1">Full error codes from Taxilla/FTA with fix guidance and one-click resubmission.</p>
        </motion.div>
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-50 text-rose-700 border border-rose-200/60 rounded-lg text-[12px] font-semibold">
            <XCircle size={13} />
            {unresolvedCount} Unresolved
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 text-white rounded-lg text-[12px] font-semibold">
            <AlertTriangle size={13} className="text-amber-400" />
            {criticalCount} Critical
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        variants={containerVariants} initial="hidden" animate="visible"
        className="grid grid-cols-3 gap-4 mb-8"
      >
        {[
          { label: 'Total Errors', value: mockErrors.length, color: 'text-zinc-900' },
          { label: 'Unresolved', value: unresolvedCount, color: 'text-rose-600' },
          { label: 'Resolved', value: mockErrors.length - unresolvedCount, color: 'text-emerald-600' },
        ].map(stat => (
          <motion.div key={stat.label} variants={itemVariants} className="premium-card p-5 bg-white">
            <p className="text-[12px] font-medium text-zinc-500 mb-1">{stat.label}</p>
            <p className={cn("text-3xl font-display font-semibold tracking-tight", stat.color)}>{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Table */}
      <motion.section
        variants={containerVariants} initial="hidden" animate="visible"
        className="premium-card bg-white"
      >
        {/* Tab Selection */}
        <div className="flex px-5 pt-3 border-b border-[#eaeaea]">
          <button 
            onClick={() => setActiveTab('invoice-errors')}
            className={cn("px-4 py-2.5 text-[13px] font-bold border-b-2 flex items-center gap-2 outline-none transition-colors", 
              activeTab === 'invoice-errors' ? "border-indigo-600 text-indigo-600" : "border-transparent text-zinc-500 hover:text-zinc-800"
            )}
          >
            <ShieldOff size={16} /> Invoice API Errors
          </button>
          <button 
            onClick={() => setActiveTab('system-logs')}
            className={cn("px-4 py-2.5 text-[13px] font-bold border-b-2 flex items-center gap-2 outline-none transition-colors", 
              activeTab === 'system-logs' ? "border-indigo-600 text-indigo-600" : "border-transparent text-zinc-500 hover:text-zinc-800"
            )}
          >
            <Server size={16} /> System Activity Logs
          </button>
        </div>

        {/* Toolbar */}
        <motion.div variants={itemVariants} className="px-5 py-4 border-b border-[#eaeaea] bg-zinc-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {activeTab === 'invoice-errors' ? <FileWarning size={16} className="text-zinc-400" /> : <Activity size={16} className="text-zinc-400" />}
            <h3 className="text-sm font-semibold text-zinc-900">{activeTab === 'invoice-errors' ? 'Error Registry' : 'Activity Ledger'}</h3>
            <span className="text-[11px] font-semibold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-md">
              {activeTab === 'invoice-errors' ? mockErrors.length : systemActivityLogs.length} entries
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" size={13} />
              <input type="text" placeholder="Search errors..." className="pl-8 pr-3 py-1.5 bg-white border border-[#eaeaea] rounded-md text-[12px] placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-44 shadow-sm" />
            </div>
            <button className="ghost-btn border border-[#eaeaea] text-[12px]">
              <Filter size={13} /> Filter
            </button>
            <button className="ghost-btn border border-[#eaeaea] text-[12px]">
              <RefreshCw size={13} /> Refresh
            </button>
          </div>
        </motion.div>

        {activeTab === 'invoice-errors' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-[#eaeaea] bg-zinc-50">
                  <th className="px-5 py-3 w-8"></th>
                  <th className="px-5 py-3 font-medium text-zinc-500">Log ID</th>
                  <th className="px-5 py-3 font-medium text-zinc-500">Invoice</th>
                  <th className="px-5 py-3 font-medium text-zinc-500">Company</th>
                  <th className="px-5 py-3 font-medium text-zinc-500">Category</th>
                  <th className="px-5 py-3 font-medium text-zinc-500">Severity</th>
                  <th className="px-5 py-3 font-medium text-zinc-500">Logged At</th>
                  <th className="px-5 py-3 font-medium text-zinc-500 text-right">Status</th>
                </tr>
              </thead>
              <motion.tbody
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="divide-y divide-[#eaeaea] bg-white"
              >
                {mockErrors.map(error => (
                  <ErrorRow key={error.id} error={error} />
                ))}
              </motion.tbody>
            </table>
          </div>
        ) : (
          <SystemLogTable />
        )}
      </motion.section>
    </div>
  );
};

export default ErrorManagement;
