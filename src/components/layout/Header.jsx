import React from 'react';
import { Search, Bell, Command, ChevronDown, Menu, ChevronRight } from 'lucide-react';

const Header = ({ activeTab, onToggleSidebar, showBrand = true, user }) => {
  const getTitle = () => {
    const titles = {
      overview: 'Module Overview',
      dashboard: 'Transaction Dashboard',
      'invoice-portal': 'Invoice Posting',
      alerts: 'Email Alerts & Notifications',
      'error-management': 'Error Log & Resolution',
      'usage-monitor': 'Usage & Overage Monitor',
      'audit-trail': 'Audit Trail & Archiving',
      
      // Invoice -> Master
      'master-bp': 'Master / Business Partner',
      'master-item': 'Master / Item Setup',
      
      // Invoice -> Transactions
      'tx-ar-invoice': 'Transaction / AR Invoice',
      'tx-ap-invoice': 'Transaction / AP Invoice',
      'tx-ar-credit':  'Transaction / AR Credit Memo',
      'tx-ap-credit':  'Transaction / AP Credit Memo',

      companies: 'Company Management',
      settings: 'Account Settings',
    };
    return titles[activeTab] || 'Overview';
  };

  return (
    <header className="h-14 bg-white/80 backdrop-blur-[12px] border-b border-[#eaeaea] sticky top-0 z-30 flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-4 text-sm">
        <button 
          onClick={onToggleSidebar}
          className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-all active:scale-95 flex items-center justify-center border border-zinc-200 bg-white shadow-sm"
          title="Toggle Navigation"
        >
          <Menu size={18} />
        </button>
        
        {/* Persistent Branding */}
        {showBrand && (
          <div className="flex items-center gap-2.5 pr-4 border-r border-[#eaeaea]">
            <img src="/logo.png" alt="HCC Logo" className="h-6 w-auto object-contain brightness-110" />
            <span className="font-bold text-zinc-700 text-[13px] tracking-tight whitespace-nowrap">e-Invoice Middleware Platform</span>
          </div>
        )}

        <div className="flex items-center gap-2 ml-1">
          <h2 className="font-semibold text-zinc-500 text-[13px] uppercase tracking-wider">{getTitle()}</h2>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <div className="relative group hidden md:flex items-center">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-12 py-1.5 bg-zinc-50 border border-[#eaeaea] rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all w-56 placeholder:text-zinc-400 outline-none text-[13px]"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-zinc-400 bg-white border border-[#eaeaea] px-1.5 rounded shadow-sm text-[10px] font-mono">
            <Command size={10} />
            <span>K</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors relative">
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
          </button>
          
          <div className="w-px h-4 bg-[#eaeaea] mx-1"></div>

          <button className="flex items-center gap-2.5 p-1 px-2 hover:bg-zinc-50 rounded-lg transition-all border border-transparent hover:border-[#eaeaea] group outline-none">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-[12px] font-bold text-zinc-900 leading-none mb-1 tracking-tight">{user?.name || 'Administrator'}</span>
              <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest leading-none">{user?.role || 'System'}</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white text-[11px] font-bold shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform">
              {user?.initials || 'AD'}
            </div>
            <ChevronDown size={14} className="text-zinc-400 group-hover:text-zinc-600 transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
