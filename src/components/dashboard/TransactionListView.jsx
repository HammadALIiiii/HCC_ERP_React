import React from 'react';
import SubmissionHistoryTable from './SubmissionHistoryTable';
import { Plus, Download, FileSpreadsheet } from 'lucide-react';

const TransactionListView = ({ title, subtitle, data, onAddNew }) => {
  return (
    <div className="max-w-6xl mx-auto mt-4 pb-12">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-2xl font-display font-semibold text-zinc-900 tracking-tight">{title}</h2>
          <p className="text-zinc-500 text-sm mt-1">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-[#eaeaea] rounded-lg p-1.5 shadow-sm">
            <button className="p-1.5 hover:bg-zinc-50 text-zinc-500 hover:text-zinc-900 transition-all rounded title='Export as CSV'">
              <FileSpreadsheet size={16} />
            </button>
            <div className="w-px h-4 bg-[#eaeaea] mx-1" />
            <button className="p-1.5 hover:bg-zinc-50 text-zinc-500 hover:text-zinc-900 transition-all rounded title='Download All PDF Reports'">
              <Download size={16} />
            </button>
          </div>
          <button 
            onClick={onAddNew}
            className="btn-primary flex items-center gap-2 h-10 px-4 text-[13px] font-semibold tracking-tight shadow-md"
          >
            <Plus size={16} />
            Create New {title.includes('Invoice') ? 'Invoice' : 'Memo'}
          </button>
        </div>
      </div>
      
      <SubmissionHistoryTable data={data} type={title === 'AR Invoice' ? 'Receivable' : 'Payable'} />
    </div>
  );
};

export default TransactionListView;
