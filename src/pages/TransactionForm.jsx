import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Send, Save, AlertCircle, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { companies, businessPartners } from '../data/mockData';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

// Config driven — one form, four document types
const TYPE_CONFIG = {
  'ar-invoice': {
    title: 'AR Invoice',
    subtitle: 'Accounts Receivable — Invoice issued to a customer for goods or services rendered.',
    fromLabel: 'Seller (Your Company/TRN)',
    toLabel: 'Customer / Bill-To Party',
    docLabel: 'Invoice Number',
    docPrefix: 'ARINV-',
    color: 'indigo',
    badge: 'Receivable',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  'ap-invoice': {
    title: 'AP Invoice',
    subtitle: 'Accounts Payable — Invoice received from a vendor for goods or services purchased.',
    fromLabel: 'Vendor / Supplier',
    toLabel: 'Your Company (Bill-To)',
    docLabel: 'Vendor Invoice Number',
    docPrefix: 'APINV-',
    color: 'violet',
    badge: 'Payable',
    badgeColor: 'bg-violet-50 text-violet-700 border-violet-200',
  },
  'ar-credit': {
    title: 'AR Credit Memo',
    subtitle: 'Credit note issued to a customer — reduces the amount owed by the customer.',
    fromLabel: 'Your Company (Credit Issuer)',
    toLabel: 'Customer Receiving Credit',
    docLabel: 'Credit Memo Number',
    docPrefix: 'ARCM-',
    color: 'sky',
    badge: 'Credit to Customer',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    refLabel: 'Reference AR Invoice',
    isCredit: true,
  },
  'ap-credit': {
    title: 'AP Credit Memo',
    subtitle: 'Credit note received from a vendor — reduces the amount owed to the vendor.',
    fromLabel: 'Vendor Issuing Credit',
    toLabel: 'Your Company (Receiving Credit)',
    docLabel: 'Credit Memo Number',
    docPrefix: 'APCM-',
    color: 'teal',
    badge: 'Credit from Vendor',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    refLabel: 'Reference AP Invoice',
    isCredit: true,
  },
};

const TransactionForm = ({ type = 'ar-invoice', onBack }) => {
  const config = TYPE_CONFIG[type];
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    companyId: '',
    partyName: '',
    docNumber: config.docPrefix + String(Math.floor(Math.random() * 9000) + 1000),
    docDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    refInvoice: '',
    remarks: '',
    items: [{ id: 1, name: '', quantity: 1, price: 0, tax: 5 }],
  });

  const addItem = () => setFormData(f => ({
    ...f, items: [...f.items, { id: Date.now(), name: '', quantity: 1, price: 0, tax: 5 }]
  }));

  const removeItem = (id) => {
    if (formData.items.length === 1) return;
    setFormData(f => ({ ...f, items: f.items.filter(i => i.id !== id) }));
  };

  const updateItem = (id, field, value) => {
    setFormData(f => ({ ...f, items: f.items.map(i => i.id === id ? { ...i, [field]: value } : i) }));
  };

  const totals = useMemo(() => {
    const subtotal = formData.items.reduce((a, i) => a + i.quantity * i.price, 0);
    const tax = formData.items.reduce((a, i) => a + (i.quantity * i.price * i.tax / 100), 0);
    return { subtotal, tax, grandTotal: subtotal + tax };
  }, [formData.items]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate multi-step e-invoice processing
    setTimeout(() => { 
      setLoading(false); 
      setSuccess(true); 
    }, 2500);
  };

  const accentMap = {
    indigo: 'from-indigo-600 to-violet-600',
    violet: 'from-violet-600 to-purple-600',
    sky:    'from-sky-500 to-indigo-500',
    teal:   'from-teal-500 to-sky-500',
  };

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto mt-20 text-center"
      >
        <div className="premium-card p-12 bg-white flex flex-col items-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 border border-emerald-100 shadow-sm shadow-emerald-100">
            <CheckCircle2 size={40} className="text-emerald-500" />
          </div>
          <h2 className="text-2xl font-display font-bold text-zinc-900 tracking-tight mb-2">Document Cleared Successfully</h2>
          <p className="text-zinc-500 text-sm max-w-sm mb-8">
            The {config.title} has been validated, converted to PINT AE XML, and cryptographically signed for FTA compliance.
          </p>

          <div className="w-full bg-zinc-50 rounded-xl border border-[#eaeaea] p-6 mb-8 text-left space-y-4">
            <div className="flex justify-between items-center border-b border-[#eaeaea] pb-3">
              <span className="text-[12px] font-medium text-zinc-500 uppercase tracking-wider">Internal Ref (IRN)</span>
              <span className="text-sm font-mono font-bold text-indigo-600">IRN-TEMP-{Math.floor(Math.random()*10000)}</span>
            </div>
            <div className="flex justify-between items-center border-b border-[#eaeaea] pb-3">
              <span className="text-[12px] font-medium text-zinc-500 uppercase tracking-wider">FTA UUID</span>
              <span className="text-sm font-mono text-zinc-600 truncate max-w-[200px]">{Math.random().toString(36).substring(2, 15)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[12px] font-medium text-zinc-500 uppercase tracking-wider">Total Amount</span>
              <span className="text-sm font-bold text-zinc-900">${totals.grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button 
              onClick={onBack}
              className="flex-1 h-11 bg-zinc-900 text-white rounded-lg font-semibold text-[13px] hover:bg-zinc-800 transition-all shadow-md shadow-zinc-200"
            >
              View in Submission History
            </button>
            <button 
              onClick={() => setSuccess(false)}
              className="flex-1 h-11 bg-white border border-[#eaeaea] text-zinc-600 rounded-lg font-semibold text-[13px] hover:bg-zinc-50 transition-all"
            >
              Create Another {config.title.split(' ')[1]}
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20 mt-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-600 transition-colors text-[12px] font-medium mb-3 group"
          >
            <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-0.5 transition-transform" />
            Back to Registry
          </button>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-display font-semibold text-zinc-900 tracking-tight">{config.title}</h2>
            <span className={cn("text-[11px] font-bold px-2 py-0.5 rounded-md border", config.badgeColor)}>
              {config.badge}
            </span>
          </div>
          <p className="text-zinc-500 text-sm max-w-xl">{config.subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="ghost-btn border border-[#eaeaea]">
            <Save size={14} /> Save Draft
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Document Header */}
        <section className="premium-card">
          <div className="px-6 py-4 border-b border-[#eaeaea] bg-zinc-50/50 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-zinc-200 text-zinc-600 flex items-center justify-center text-[10px] font-bold">1</span>
            <h3 className="text-[13px] font-semibold text-zinc-900">Document Header</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 bg-white">
            {/* From Party */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-zinc-700">{config.fromLabel}</label>
              <select
                className="input-field"
                required
                value={formData.companyId}
                onChange={e => setFormData(f => ({ ...f, companyId: e.target.value }))}
              >
                <option value="">Select...</option>
                {(type === 'ap-invoice' || type === 'ap-credit'
                  ? businessPartners.filter(bp => bp.type === 'Vendor')
                  : companies
                ).map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.trn || p.currency}
                  </option>
                ))}
              </select>
            </div>

            {/* To Party */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-zinc-700">{config.toLabel}</label>
              {type === 'ar-invoice' || type === 'ar-credit' ? (
                <select
                  className="input-field"
                  required
                  value={formData.partyName}
                  onChange={e => setFormData(f => ({ ...f, partyName: e.target.value }))}
                >
                  <option value="">Select customer...</option>
                  {businessPartners.filter(bp => bp.type === 'Customer').map(p => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              ) : (
                <select
                  className="input-field"
                  required
                  value={formData.partyName}
                  onChange={e => setFormData(f => ({ ...f, partyName: e.target.value }))}
                >
                  <option value="">Select company...</option>
                  {companies.map(c => (
                    <option key={c.id} value={c.name}>{c.name} — {c.trn}</option>
                  ))}
                </select>
              )}
            </div>

            {/* Doc Number */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-zinc-700">{config.docLabel}</label>
              <input
                type="text"
                className="input-field font-mono"
                required
                value={formData.docNumber}
                onChange={e => setFormData(f => ({ ...f, docNumber: e.target.value }))}
              />
            </div>

            {/* Doc Date */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-zinc-700">Document Date</label>
              <input
                type="date"
                className="input-field"
                required
                value={formData.docDate}
                onChange={e => setFormData(f => ({ ...f, docDate: e.target.value }))}
              />
            </div>

            {/* Due Date (invoices only) */}
            {!config.isCredit && (
              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-zinc-700">Due Date</label>
                <input
                  type="date"
                  className="input-field"
                  value={formData.dueDate}
                  onChange={e => setFormData(f => ({ ...f, dueDate: e.target.value }))}
                />
              </div>
            )}

            {/* Reference Invoice (credit memos only) */}
            {config.isCredit && (
              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-zinc-700">{config.refLabel}</label>
                <input
                  type="text"
                  className="input-field font-mono"
                  placeholder="e.g. ARINV-1023"
                  value={formData.refInvoice}
                  onChange={e => setFormData(f => ({ ...f, refInvoice: e.target.value }))}
                />
              </div>
            )}

            {/* Remarks */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-[13px] font-medium text-zinc-700">Remarks / Narration</label>
              <input
                type="text"
                className="input-field"
                placeholder={config.isCredit ? 'Reason for credit note...' : 'Optional payment terms or notes...'}
                value={formData.remarks}
                onChange={e => setFormData(f => ({ ...f, remarks: e.target.value }))}
              />
            </div>
          </div>
        </section>

        {/* Step 2: Line Items */}
        <section className="premium-card">
          <div className="px-6 py-4 border-b border-[#eaeaea] bg-zinc-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-zinc-200 text-zinc-600 flex items-center justify-center text-[10px] font-bold">2</span>
              <h3 className="text-[13px] font-semibold text-zinc-900">Line Items</h3>
            </div>
            <button
              type="button"
              onClick={addItem}
              className="text-[13px] font-medium text-indigo-600 flex items-center gap-1.5 hover:bg-indigo-50 px-2 py-1 rounded-md transition-colors border border-transparent hover:border-indigo-100"
            >
              <Plus size={14} /> Add Row
            </button>
          </div>

          <div className="p-6 bg-white space-y-3">
            <div className="grid grid-cols-12 gap-4 px-3 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider pb-2 border-b border-[#eaeaea]">
              <div className="col-span-5">Description</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-center">Unit Price</div>
              <div className="col-span-2 text-center">Tax %</div>
              <div className="col-span-1"></div>
            </div>

            <AnimatePresence>
              {formData.items.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="grid grid-cols-12 gap-4 items-center p-2 rounded-lg group border border-transparent hover:border-[#eaeaea] transition-colors"
                >
                  <div className="col-span-5">
                    <input
                      type="text"
                      className="input-field shadow-none border-[#eaeaea] text-[13px]"
                      placeholder="Item description..."
                      value={item.name}
                      onChange={e => updateItem(item.id, 'name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      className="input-field text-center shadow-none border-[#eaeaea] text-[13px]"
                      value={item.quantity}
                      onChange={e => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      className="input-field text-center shadow-none border-[#eaeaea] text-[13px]"
                      value={item.price}
                      onChange={e => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="col-span-2">
                    <select
                      className="input-field text-center cursor-pointer shadow-none border-[#eaeaea] text-[13px]"
                      value={item.tax}
                      onChange={e => updateItem(item.id, 'tax', parseInt(e.target.value))}
                    >
                      <option value="0">0%</option>
                      <option value="5">5%</option>
                      <option value="15">15%</option>
                    </select>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 text-zinc-300 hover:text-rose-500 hover:bg-rose-50 rounded transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Summary + Submit */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* PINT AE Note */}
          <div className="lg:col-span-2 bg-zinc-50 border border-[#eaeaea] p-5 rounded-xl flex items-start gap-3 h-fit">
            <AlertCircle className="text-zinc-400 shrink-0 mt-0.5" size={16} />
            <div className="text-[13px] text-zinc-600 leading-relaxed">
              <p className="font-semibold mb-0.5 text-zinc-900">PINT AE XML Generation</p>
              {config.isCredit
                ? 'This credit memo will be converted to a compliant XML credit document upon submission and linked to its reference invoice for FTA traceability.'
                : 'This invoice will be translated to PINT AE XML format, cryptographically signed, and dispatched to Taxilla / FTA for clearance.'}
            </div>
          </div>

          {/* Totals & Submit */}
          <div className="premium-card p-6 flex flex-col gap-5 bg-white">
            <div className="space-y-2.5 pb-5 border-b border-[#eaeaea]">
              <div className="flex justify-between text-[13px] text-zinc-500">
                <span>Subtotal</span>
                <span className="font-medium text-zinc-900">${totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[13px] text-zinc-500">
                <span>Total Tax</span>
                <span className="font-medium text-zinc-900">${totals.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-zinc-900 pt-2">
                <span>{config.isCredit ? 'Credit Amount' : 'Total Due'}</span>
                <span className={config.isCredit ? 'text-teal-600' : ''}>
                  {config.isCredit ? '-' : ''}${totals.grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className={cn(
                `w-full h-11 flex items-center justify-center gap-2 font-bold text-sm rounded-lg text-white bg-gradient-to-r ${accentMap[config.color]} shadow-md hover:opacity-90 active:scale-[0.98] transition-all`,
                (loading || success) && 'opacity-80 pointer-events-none'
              )}
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Requesting Clearance...</span></>
              ) : (
                <><Send size={15} /><span>Submit & Clear {config.title}</span></>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
