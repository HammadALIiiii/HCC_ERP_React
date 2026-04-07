import React, { useState } from 'react';
import { Mail, ShieldAlert, AlertTriangle, Activity, Plus, Trash2, Save, CheckCircle2, Clock, Gauge, X, Bell, Filter, RefreshCw, CheckCheck, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

const mockEmailLogs = [
  { id: 'LOG-001', timestamp: '2024-03-22 09:14:32', event: 'FTA Rejection', recipient: 'admin@company.com', subject: 'Invoice INV-003 rejected by FTA', status: 'Delivered' },
  { id: 'LOG-002', timestamp: '2024-03-22 09:14:33', event: 'FTA Rejection', recipient: 'finance@company.com', subject: 'Invoice INV-003 rejected by FTA', status: 'Delivered' },
  { id: 'LOG-003', timestamp: '2024-03-21 17:45:01', event: 'Validation Failure', recipient: 'admin@company.com', subject: 'Schema error on INV-009: Missing TRN field', status: 'Delivered' },
  { id: 'LOG-004', timestamp: '2024-03-20 11:30:15', event: 'Usage Threshold 80%', recipient: 'admin@company.com', subject: 'Warning: Subscription usage reached 80% of tier limit', status: 'Delivered' },
  { id: 'LOG-005', timestamp: '2024-03-19 08:02:44', event: 'Validation Failure', recipient: 'finance@company.com', subject: 'Schema error on INV-007: Invalid currency code', status: 'Failed' },
  { id: 'LOG-006', timestamp: '2024-03-18 14:22:18', event: 'FTA Rejection', recipient: 'admin@company.com', subject: 'Invoice INV-005 rejected — Duplicate TRN detected', status: 'Delivered' },
  { id: 'LOG-007', timestamp: '2024-03-17 09:55:00', event: 'Usage Threshold 100%', recipient: 'admin@company.com', subject: 'CRITICAL: Subscription capacity fully exhausted', status: 'Delivered' },
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } }
};

// Animated Number Counter
const AnimatedCounter = ({ value, total }) => {
  return (
    <motion.div
      key={value}
      initial={{ scale: 1.25, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="flex items-center gap-3"
    >
      <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 text-white rounded-lg shadow-sm">
        <Activity size={13} className="text-indigo-400" />
        <span className="text-sm font-bold tracking-tight">
          <span className="text-indigo-300">{value}</span>
          <span className="text-zinc-400">/{total}</span>
          <span className="text-zinc-400 text-xs font-medium ml-1">rules active</span>
        </span>
      </div>
      {value === total && (
        <motion.span
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[11px] font-bold text-emerald-600"
        >
          All active ✓
        </motion.span>
      )}
      {value === 0 && (
        <motion.span
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[11px] font-bold text-rose-500"
        >
          ⚠ No rules active
        </motion.span>
      )}
    </motion.div>
  );
};

// Individual Alert Toggle Row
const AlertToggleRow = ({ id, title, description, icon: Icon, active, onToggle, children, isLast }) => {
  return (
    <motion.div variants={itemVariants} className={cn("py-5", !isLast && "border-b border-[#eaeaea]")}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className={cn(
            "p-2 rounded-lg mt-0.5 transition-colors duration-300",
            active ? "bg-indigo-50 text-indigo-600" : "bg-zinc-100 text-zinc-400"
          )}>
            <Icon size={15} />
          </div>
          <div className="flex-1">
            <h4 className="text-[13px] font-semibold text-zinc-900 leading-tight">{title}</h4>
            <p className="text-[12px] text-zinc-500 mt-0.5 leading-relaxed">{description}</p>
          </div>
        </div>
        <button
          onClick={() => onToggle(id)}
          className={cn(
            "w-10 h-5 rounded-full relative transition-colors duration-300 ease-in-out focus:outline-none flex-shrink-0 mt-1",
            active ? "bg-indigo-600" : "bg-zinc-200"
          )}
        >
          <motion.span
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
            style={{ x: active ? 20 : 0 }}
          />
        </button>
      </div>

      {/* Expandable sub-settings */}
      <AnimatePresence>
        {active && children && (
          <motion.div
            key={`sub-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-4 ml-10 pl-3 border-l-2 border-indigo-100">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Toast for undo
const UndoToast = ({ email, onUndo, onDismiss }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.95 }}
    className="fixed bottom-6 right-6 z-50 bg-zinc-900 text-white rounded-xl px-4 py-3 flex items-center gap-4 shadow-xl border border-zinc-700"
  >
    <span className="text-[13px] text-zinc-300 max-w-[200px] truncate">Removed: <span className="text-white">{email}</span></span>
    <button onClick={onUndo} className="text-indigo-400 hover:text-indigo-300 text-[12px] font-bold transition-colors">Undo</button>
    <button onClick={onDismiss} className="text-zinc-500 hover:text-zinc-300 transition-colors">
      <X size={14} />
    </button>
  </motion.div>
);


// MAIN COMPONENT
const AlertsSettings = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [undoData, setUndoData] = useState(null);

  const [emails, setEmails] = useState([
    { address: 'admin@company.com', status: 'verified' },
    { address: 'finance@company.com', status: 'verified' },
  ]);

  const [toggles, setToggles] = useState({
    validation: true,
    ftaRejections: true,
    usage80: false,
    usage100: true,
  });

  const [severities, setSeverities] = useState({
    validation: 'high',
    ftaRejections: 'high',
    usage80: 'medium',
    usage100: 'critical',
  });

  const activeCount = Object.values(toggles).filter(Boolean).length;
  const totalCount = Object.keys(toggles).length;

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSeverity = (key, value) => {
    setSeverities(prev => ({ ...prev, [key]: value }));
  };

  const addEmail = (e) => {
    e.preventDefault();
    if (newEmail && !emails.find(e => e.address === newEmail) && newEmail.includes('@')) {
      setEmails(prev => [...prev, { address: newEmail, status: 'pending' }]);
      // Simulate email verification after 3 seconds
      const added = newEmail;
      setTimeout(() => {
        setEmails(prev => prev.map(e => e.address === added ? { ...e, status: 'verified' } : e));
      }, 3000);
      setNewEmail('');
    }
  };

  const removeEmail = (address) => {
    const removed = emails.find(e => e.address === address);
    setEmails(prev => prev.filter(e => e.address !== address));
    setUndoData(removed);
    setTimeout(() => setUndoData(null), 5000);
  };

  const handleUndo = () => {
    if (undoData) setEmails(prev => [...prev, undoData]);
    setUndoData(null);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); setTimeout(() => setSuccess(false), 3000); }, 1500);
  };

  const severityOptions = [
    { value: 'low', label: 'Low', color: 'text-zinc-500 bg-zinc-50' },
    { value: 'medium', label: 'Medium', color: 'text-amber-700 bg-amber-50' },
    { value: 'high', label: 'High', color: 'text-rose-700 bg-rose-50' },
    { value: 'critical', label: 'Critical', color: 'text-violet-700 bg-violet-50' },
  ];

  const SeverityPicker = ({ id }) => (
    <div className="flex items-center gap-4 py-2">
      <span className="text-[12px] font-medium text-zinc-500">Severity Level:</span>
      <div className="flex items-center gap-1.5">
        {severityOptions.map(opt => (
          <button
            key={opt.value}
            onClick={() => handleSeverity(id, opt.value)}
            className={cn(
              "px-2.5 py-0.5 rounded-md text-[11px] font-semibold transition-all border",
              severities[id] === opt.value
                ? `${opt.color} border-current shadow-sm scale-105`
                : "text-zinc-400 bg-white border-zinc-200 hover:border-zinc-300"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );

  const DeliveryPicker = ({ id }) => (
    <div className="flex items-center gap-4 py-1.5">
      <span className="text-[12px] font-medium text-zinc-500 flex items-center gap-1.5"><Clock size={12} /> Delivery:</span>
      <div className="flex items-center gap-1.5">
        {['Instant', 'Daily Digest', 'Weekly Summary'].map(opt => (
          <button key={opt} className="px-2.5 py-0.5 rounded-md text-[11px] font-medium text-zinc-500 bg-white border border-zinc-200 hover:border-indigo-400 hover:text-indigo-600 transition-all">
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto mt-4 pb-20 space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} initial="hidden" animate="visible" className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-semibold text-zinc-900 tracking-tight">Email Alerts & Notifications</h2>
          <p className="text-zinc-500 text-sm mt-1">Configure targeted email notifications for platform activity events.</p>
        </div>
        <div className="flex items-center gap-4">
          <AnimatedCounter value={activeCount} total={totalCount} />
          <button
            onClick={handleSave}
            disabled={loading || success}
            className={cn("btn-primary flex items-center gap-2 px-5 h-9", (loading || success) && "opacity-80 pointer-events-none")}
          >
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> :
              success ? <CheckCircle2 size={15} /> : <Save size={15} />}
            <span>{success ? 'Saved!' : 'Save Changes'}</span>
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT — Toggles */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2 premium-card bg-white"
        >
          <motion.div variants={itemVariants} className="px-6 py-4 border-b border-[#eaeaea] flex items-center gap-2">
            <ShieldAlert size={16} className="text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900">Event Triggers</h3>
          </motion.div>

          <div className="px-6 divide-y divide-[#eaeaea]">
            <AlertToggleRow
              id="validation"
              title="Validation Failures"
              description="Fire an alert when any submitted invoice fails internal schema or structural rule checks."
              icon={ShieldAlert}
              active={toggles.validation}
              onToggle={handleToggle}
            >
              <SeverityPicker id="validation" />
              <DeliveryPicker id="validation" />
            </AlertToggleRow>

            <AlertToggleRow
              id="ftaRejections"
              title="FTA / Peppol Rejections"
              description="Notify recipients when a clearance handshake is rejected by an external regulatory authority."
              icon={AlertTriangle}
              active={toggles.ftaRejections}
              onToggle={handleToggle}
            >
              <SeverityPicker id="ftaRejections" />
              <DeliveryPicker id="ftaRejections" />
            </AlertToggleRow>

            <AlertToggleRow
              id="usage80"
              title="Usage Threshold — 80%"
              description="Proactive warning when subscription tier capacity approaches its operational limit."
              icon={Gauge}
              active={toggles.usage80}
              onToggle={handleToggle}
            >
              <SeverityPicker id="usage80" />
              <DeliveryPicker id="usage80" />
            </AlertToggleRow>

            <AlertToggleRow
              id="usage100"
              title="Usage Threshold — 100%"
              description="Critical alert when subscription capacity is fully exhausted and service may pause."
              icon={Activity}
              active={toggles.usage100}
              onToggle={handleToggle}
              isLast={true}
            >
              <SeverityPicker id="usage100" />
              <DeliveryPicker id="usage100" />
            </AlertToggleRow>
          </div>
        </motion.section>

        {/* RIGHT — Recipients */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="premium-card bg-white flex flex-col"
        >
          <motion.div variants={itemVariants} className="px-5 py-4 border-b border-[#eaeaea] flex items-center gap-2">
            <Mail size={16} className="text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900">Recipients</h3>
          </motion.div>

          <div className="p-5 flex flex-col flex-1 gap-5">
            <motion.form variants={itemVariants} onSubmit={addEmail} className="flex items-center gap-2">
              <input
                type="email"
                placeholder="user@company.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="input-field shadow-none border-[#eaeaea] py-1.5 text-[13px] flex-1"
              />
              <button
                type="submit"
                disabled={!newEmail}
                className="w-8 h-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center justify-center transition-colors disabled:opacity-40 flex-shrink-0"
              >
                <Plus size={15} />
              </button>
            </motion.form>

            <div className="flex-1 space-y-2 overflow-y-auto">
              <AnimatePresence>
                {emails.map((email) => (
                  <motion.div
                    key={email.address}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="flex items-center justify-between p-2.5 bg-zinc-50 border border-[#eaeaea] rounded-lg group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[9px] font-bold">{email.address[0].toUpperCase()}</span>
                      </div>
                      <span className="text-[12px] font-medium text-zinc-700 truncate">{email.address}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {email.status === 'pending' ? (
                        <motion.span
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-md"
                        >
                          Verifying...
                        </motion.span>
                      ) : (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                          ✓ Active
                        </span>
                      )}
                      <button
                        onClick={() => removeEmail(email.address)}
                        className="text-zinc-300 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {emails.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 text-zinc-400 text-[12px]"
                >
                  <Bell size={24} className="mx-auto mb-2 opacity-30" />
                  No recipients. Alerts will not be dispatched.
                </motion.div>
              )}
            </div>

            <div className="pt-4 border-t border-[#eaeaea] flex items-start gap-2">
              <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={13} />
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                New recipients will receive a verification email before alerts are dispatched to their address.
              </p>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Email Dispatch Log */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="premium-card bg-white"
      >
        <motion.div variants={itemVariants} className="px-5 py-4 border-b border-[#eaeaea] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900">Email Dispatch Log</h3>
            <span className="text-[11px] font-semibold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-md ml-1">
              {mockEmailLogs.length} records
            </span>
          </div>
          <button className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors px-2 py-1 rounded-md hover:bg-zinc-100">
            <RefreshCw size={13} />
            Refresh
          </button>
        </motion.div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-[#eaeaea] bg-zinc-50/50">
                <th className="px-5 py-3 font-medium text-zinc-500 w-32">Log ID</th>
                <th className="px-5 py-3 font-medium text-zinc-500">Timestamp</th>
                <th className="px-5 py-3 font-medium text-zinc-500">Event Type</th>
                <th className="px-5 py-3 font-medium text-zinc-500">Recipient</th>
                <th className="px-5 py-3 font-medium text-zinc-500">Subject</th>
                <th className="px-5 py-3 font-medium text-zinc-500 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eaeaea] bg-white">
              {mockEmailLogs.map((log, idx) => (
                <motion.tr
                  key={log.id}
                  variants={itemVariants}
                  className="hover:bg-zinc-50/80 transition-colors group"
                >
                  <td className="px-5 py-3 font-mono text-[11px] text-zinc-400">{log.id}</td>
                  <td className="px-5 py-3 text-zinc-500 whitespace-nowrap text-[12px]">{log.timestamp}</td>
                  <td className="px-5 py-3">
                    <span className={cn(
                      "px-2 py-0.5 rounded-md text-[11px] font-semibold border",
                      log.event === 'FTA Rejection' && "bg-rose-50 text-rose-700 border-rose-200/60",
                      log.event === 'Validation Failure' && "bg-amber-50 text-amber-700 border-amber-200/60",
                      log.event.includes('Usage') && "bg-violet-50 text-violet-700 border-violet-200/60",
                    )}>
                      {log.event}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-zinc-600 text-[12px]">{log.recipient}</td>
                  <td className="px-5 py-3 text-zinc-500 max-w-xs truncate text-[12px]">{log.subject}</td>
                  <td className="px-5 py-3 text-right">
                    {log.status === 'Delivered' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md">
                        <CheckCheck size={11} /> Delivered
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200/60 px-2 py-0.5 rounded-md">
                        <XCircle size={11} /> Failed
                      </span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Undo Toast */}
      <AnimatePresence>
        {undoData && (
          <UndoToast
            email={undoData.address}
            onUndo={handleUndo}
            onDismiss={() => setUndoData(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AlertsSettings;
