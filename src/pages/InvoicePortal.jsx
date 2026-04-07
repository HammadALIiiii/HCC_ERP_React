import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Send, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { companies } from '../data/mockData';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

const InvoicePortal = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    companyId: '',
    customerName: '',
    invoiceNumber: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    items: [{ id: 1, name: '', quantity: 1, price: 0, tax: 5 }],
  });

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { id: Date.now(), name: '', quantity: 1, price: 0, tax: 5 }],
    });
  };

  const removeItem = (id) => {
    if (formData.items.length === 1) return;
    setFormData({
      ...formData,
      items: formData.items.filter((item) => item.id !== id),
    });
  };

  const updateItem = (id, field, value) => {
    setFormData({
      ...formData,
      items: formData.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const totals = useMemo(() => {
    const subtotal = formData.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const taxTotal = formData.items.reduce((acc, item) => acc + (item.quantity * item.price * (item.tax / 100)), 0);
    return {
      subtotal,
      taxTotal,
      grandTotal: subtotal + taxTotal,
    };
  }, [formData.items]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 mt-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-display font-semibold text-zinc-900 tracking-tight">Invoice Posting</h2>
          <p className="text-zinc-500 text-sm mt-1">Submit transactions directly via the middleware web interface.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="ghost-btn border border-[#eaeaea]">
            <Save size={14} />
            Save Draft
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Company & Context */}
        <section className="premium-card">
          <div className="px-6 py-4 border-b border-[#eaeaea] bg-zinc-50/50 flex items-center justify-between">
            <h3 className="text-[13px] font-semibold text-zinc-900 tracking-tight flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-zinc-200 text-zinc-600 flex items-center justify-center text-[10px] font-bold">1</span>
              Invoice Metadata
            </h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 bg-white">
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-zinc-700">Select Company/TRN</label>
              <select 
                className="input-field"
                required
                value={formData.companyId}
                onChange={(e) => setFormData({...formData, companyId: e.target.value})}
              >
                <option value="">Select a company</option>
                {companies.map(c => (
                  <option key={c.id} value={c.id}>{c.name} - {c.trn}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-zinc-700">Customer Name</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Enter client name"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({...formData, customerName: e.target.value})}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-zinc-700">Invoice Number</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="INV-00000"
                required
                value={formData.invoiceNumber}
                onChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-zinc-700">Invoice Date</label>
              <input 
                type="date" 
                className="input-field"
                required
                value={formData.invoiceDate}
                onChange={(e) => setFormData({...formData, invoiceDate: e.target.value})}
              />
            </div>
          </div>
        </section>

        {/* Step 2: Line Items */}
        <section className="premium-card">
          <div className="px-6 py-4 border-b border-[#eaeaea] bg-zinc-50/50 flex items-center justify-between">
            <h3 className="text-[13px] font-semibold text-zinc-900 tracking-tight flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-zinc-200 text-zinc-600 flex items-center justify-center text-[10px] font-bold">2</span>
              Line Items
            </h3>
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
              <div className="col-span-12 md:col-span-5">Description</div>
              <div className="col-span-4 md:col-span-2 text-center">Qty</div>
              <div className="col-span-4 md:col-span-2 text-center">Price</div>
              <div className="col-span-4 md:col-span-2 text-center">Tax %</div>
              <div className="hidden md:block col-span-1"></div>
            </div>

            <AnimatePresence>
              {formData.items.map((item) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="grid grid-cols-12 gap-4 items-center bg-white p-2 rounded-lg group relative border border-transparent hover:border-[#eaeaea] transition-colors"
                >
                  <div className="col-span-12 md:col-span-5">
                    <input 
                      type="text" 
                      className="input-field shadow-none border-[#eaeaea]" 
                      placeholder="Service or Product"
                      value={item.name}
                      onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-span-4 md:col-span-2">
                    <input 
                      type="number" 
                      className="input-field text-center font-medium shadow-none border-[#eaeaea]" 
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>
                  <div className="col-span-4 md:col-span-2">
                    <input 
                      type="number" 
                      className="input-field text-center font-medium shadow-none border-[#eaeaea]" 
                      value={item.price}
                      onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                      required
                    />
                  </div>
                  <div className="col-span-4 md:col-span-2">
                    <select 
                      className="input-field text-center cursor-pointer font-medium shadow-none border-[#eaeaea]"
                      value={item.tax}
                      onChange={(e) => updateItem(item.id, 'tax', parseInt(e.target.value))}
                    >
                      <option value="0">0%</option>
                      <option value="5">5%</option>
                      <option value="15">15%</option>
                    </select>
                  </div>
                  <div className="hidden md:flex col-span-1 justify-center">
                    <button 
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 text-zinc-300 hover:text-rose-500 hover:bg-rose-50 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Summary & Submit */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
          <div className="lg:col-span-2 bg-zinc-50 border border-[#eaeaea] p-5 rounded-xl flex items-start gap-3 h-fit">
            <AlertCircle className="text-zinc-500 shrink-0 mt-0.5" size={16} />
            <div className="text-[13px] text-zinc-600 leading-relaxed">
              <p className="font-semibold mb-0.5 text-zinc-900">PINT AE Generation</p>
              Your manual invoice will be converted to XML format upon submission. You can view its validation status in the dashboard immediately after processing.
            </div>
          </div>

          <div className="premium-card p-6 flex flex-col gap-5 bg-white">
            <div className="space-y-2.5 pb-5 border-b border-[#eaeaea]">
              <div className="flex justify-between text-[13px] text-zinc-500">
                <span>Subtotal</span>
                <span className="font-medium text-zinc-900">${totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[13px] text-zinc-500">
                <span>Total Tax</span>
                <span className="font-medium text-zinc-900">${totals.taxTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-zinc-900 pt-2">
                <span>Total Due</span>
                <span>${totals.grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading || success}
              className={cn(
                "w-full btn-primary h-10 flex items-center justify-center gap-2",
                (loading || success) && "opacity-80 pointer-events-none"
              )}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : success ? (
                <>
                  <CheckCircle2 size={16} className="animate-bounce" />
                  <span>Submitted</span>
                </>
              ) : (
                <>
                  <Send size={15} />
                  <span>Submit Invoice</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InvoicePortal;
