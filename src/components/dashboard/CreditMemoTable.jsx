import React from 'react';
import SubmissionHistoryTable from './SubmissionHistoryTable';
import { Plus, Info } from 'lucide-react';

const CreditMemoTable = ({ title, subtitle, data, onAddNew }) => {
  return (
    <div className="max-w-6xl mx-auto mt-4 pb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-display font-semibold text-zinc-900 tracking-tight">{title}</h2>
          <p className="text-zinc-500 text-sm mt-1">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-sky-50 border border-sky-100 rounded-lg text-sky-700 text-[12px] font-medium">
            <Info size={14} />
            Negative amounts are automatically tagged as adjustments
          </div>
          <button 
            onClick={onAddNew}
            className="btn-primary flex items-center gap-2 h-10 px-4 text-[13px] font-semibold tracking-tight shadow-md"
          >
            <Plus size={16} />
            Create {title.includes('AR') ? 'AR' : 'AP'} Memo
          </button>
        </div>
      </div>

      <SubmissionHistoryTable 
        data={data} 
        type={title.includes('AR') ? 'Adjustment - Receivable' : 'Adjustment - Payable'} 
      />
    </div>
  );
};

export default CreditMemoTable;
