import React from 'react';
import { Plus, Search, Filter, Download } from 'lucide-react';

const MasterDataView = ({ title, columns, data, onAddNew }) => {
  return (
    <div className="max-w-6xl mx-auto mt-4 pb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-display font-semibold text-zinc-900 tracking-tight">{title}</h2>
          <p className="text-zinc-500 text-sm mt-1">Manage master database records for your organization.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="ghost-btn border border-[#eaeaea]">
            <Download size={14} />
            Export
          </button>
          <button 
            onClick={onAddNew}
            className="btn-primary flex items-center gap-2 h-9 px-4"
          >
            <Plus size={16} />
            <span>Create New</span>
          </button>
        </div>
      </div>

      <div className="premium-card">
        {/* Toolbar */}
        <div className="px-5 py-4 border-b border-[#eaeaea] bg-zinc-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
            <input 
              type="text" 
              placeholder="Search records..." 
              className="pl-9 pr-4 py-1.5 w-full bg-white border border-[#eaeaea] rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-[13px] placeholder:text-zinc-400 shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#eaeaea] rounded-md text-[13px] font-medium text-zinc-600 hover:bg-zinc-50 transition-colors shadow-sm">
              <Filter size={14} />
              Filter
            </button>
          </div>
        </div>

        {/* Data Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-[#eaeaea] bg-zinc-50">
                {columns.map((col, idx) => (
                  <th key={idx} className={`px-5 py-3 font-medium text-zinc-500 ${col.align === 'right' ? 'text-right' : ''}`}>
                    {col.header}
                  </th>
                ))}
                <th className="px-5 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eaeaea] bg-white">
              {data.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-zinc-50/80 transition-colors group cursor-pointer">
                  {columns.map((col, cIdx) => (
                    <td 
                      key={cIdx} 
                      className={`px-5 py-3 ${cIdx === 0 ? 'font-semibold text-zinc-900' : 'text-zinc-600'} ${col.align === 'right' ? 'text-right' : ''}`}
                    >
                      {row[col.accessor]}
                    </td>
                  ))}
                  <td className="px-5 py-3 text-right">
                    <button className="text-zinc-300 hover:text-indigo-600 transition-colors opacity-0 group-hover:opacity-100 font-medium">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              
              {data.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 1} className="px-5 py-12 text-center text-zinc-500">
                    No records found in this dataset.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="px-5 py-3 border-t border-[#eaeaea] bg-zinc-50/50 flex items-center justify-between">
          <span className="text-[12px] text-zinc-500">Showing {data.length} of {data.length} records</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 rounded text-[12px] border border-[#eaeaea] bg-white text-zinc-400 cursor-not-allowed">Prev</button>
            <button className="px-2 py-1 rounded text-[12px] border border-[#eaeaea] bg-white text-zinc-400 cursor-not-allowed">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterDataView;
