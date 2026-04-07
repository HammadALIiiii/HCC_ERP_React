import React, { useState } from 'react';
import { LayoutDashboard, Receipt, Settings, BarChart3, Users, ChevronRight, ChevronDown, LogOut, Package, Bell, Database, FileText, ArrowRightLeft, AlertOctagon, Plus, CreditCard, History } from 'lucide-react';
import { cn } from '../../utils/cn';

const Sidebar = ({ activeTab, onTabChange, onLogout, user }) => {
  const [expandedMenus, setExpandedMenus] = useState({ invoice: true });

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const isActiveGroup = (groupPrefixes) => {
    return groupPrefixes.some(prefix => activeTab.startsWith(prefix));
  };

  return (
    <aside className="w-56 h-screen bg-white border-r border-[#eaeaea] flex flex-col sticky top-0 flex-shrink-0 z-20 custom-scrollbar overflow-y-auto overflow-x-hidden">
      {/* Brand logo area */}
      <div className="px-5 py-5 border-b border-[#eaeaea] flex-shrink-0 bg-white sticky top-0 z-10 transition-all duration-300">
        <div className="flex flex-col items-center justify-center gap-2">
          <img src="/logo.png" alt="HCC Logo" className="h-12 w-auto object-contain brightness-110" />
          <div className="flex flex-col items-center">
            <span className="text-[12px] font-bold text-zinc-900 tracking-tight text-center">{user?.name || 'HCC ERP'}</span>
            <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest text-center">{user?.role || 'Middleware'}</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="px-3 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2 mt-2">Menu</p>
        

        <button
          onClick={() => onTabChange('overview')}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors duration-150 group text-[13px] font-medium outline-none",
            activeTab === 'overview' ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
          )}
        >
          <div className="flex items-center gap-2.5">
            <Package size={16} className={cn("transition-colors", activeTab === 'overview' ? "text-indigo-600" : "text-zinc-400 group-hover:text-zinc-600")} />
            <span>Overview</span>
          </div>
        </button>

        {/* Invoice Posting Portal Accordion */}
        <div className="pt-2 pb-1">
          <button
            onClick={() => toggleMenu('invoice')}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors duration-150 group text-[13px] font-semibold outline-none",
              isActiveGroup(['master', 'tx']) ? "text-zinc-900" : "text-zinc-700 hover:bg-zinc-50"
            )}
          >
            <div className="flex items-center gap-2.5">
              <Receipt size={16} className={cn("transition-colors", isActiveGroup(['master', 'tx']) ? "text-indigo-600" : "text-zinc-400 group-hover:text-zinc-600")} />
              <span>Invoice Posting</span>
            </div>
            {expandedMenus.invoice ? <ChevronDown size={14} className="text-zinc-400" /> : <ChevronRight size={14} className="text-zinc-400" />}
          </button>

          {expandedMenus.invoice && (
            <div className="mt-1 space-y-1 relative before:absolute before:left-[21px] before:top-0 before:bottom-0 before:w-px before:bg-zinc-200">
              
              {/* Master Category */}
              <div className="pl-9 pr-2 py-1.5 text-[11px] font-bold text-zinc-400 uppercase tracking-wider relative flex items-center gap-2">
                <Database size={10} /> Master Data
              </div>
              <button
                onClick={() => onTabChange('master-bp')}
                className={cn(
                  "w-full flex items-center px-9 py-1.5 rounded-md transition-colors duration-150 text-[12px] font-medium relative hover:bg-zinc-50",
                  activeTab === 'master-bp' ? "text-indigo-600 font-semibold" : "text-zinc-500 hover:text-zinc-900"
                )}
              >
                Business Partner
              </button>
              <button
                onClick={() => onTabChange('master-item')}
                className={cn(
                  "w-full flex items-center px-9 py-1.5 rounded-md transition-colors duration-150 text-[12px] font-medium hover:bg-zinc-50",
                  activeTab === 'master-item' ? "text-indigo-600 font-semibold" : "text-zinc-500 hover:text-zinc-900"
                )}
              >
                Item Master
              </button>

              {/* Transactions Category */}
              <div className="pl-9 pr-2 py-1.5 mt-2 text-[11px] font-bold text-zinc-400 uppercase tracking-wider relative flex items-center gap-2">
                <ArrowRightLeft size={10} /> Transactions
              </div>
              <button
                onClick={() => onTabChange('tx-ar-invoice')}
                className={cn(
                  "w-full flex items-center px-9 py-1.5 rounded-md transition-colors duration-150 text-[12px] font-medium hover:bg-zinc-50",
                  activeTab === 'tx-ar-invoice' ? "text-indigo-600 font-semibold bg-indigo-50/50" : "text-zinc-500 hover:text-zinc-900"
                )}
              >
                AR Invoice
              </button>
              <button
                onClick={() => onTabChange('tx-ap-invoice')}
                className={cn(
                  "w-full flex items-center px-9 py-1.5 rounded-md transition-colors duration-150 text-[12px] font-medium hover:bg-zinc-50",
                  activeTab === 'tx-ap-invoice' ? "text-indigo-600 font-semibold" : "text-zinc-500 hover:text-zinc-900"
                )}
              >
                AP Invoice
              </button>
              <button
                onClick={() => onTabChange('tx-ar-credit')}
                className={cn(
                  "w-full flex items-center px-9 py-1.5 rounded-md transition-colors duration-150 text-[12px] font-medium hover:bg-zinc-50",
                  activeTab === 'tx-ar-credit' ? "text-indigo-600 font-semibold" : "text-zinc-500 hover:text-zinc-900"
                )}
              >
                AR Credit Memo
              </button>
              <button
                onClick={() => onTabChange('tx-ap-credit')}
                className={cn(
                  "w-full flex items-center px-9 py-1.5 rounded-md transition-colors duration-150 text-[12px] font-medium hover:bg-zinc-50",
                  activeTab === 'tx-ap-credit' ? "text-indigo-600 font-semibold" : "text-zinc-500 hover:text-zinc-900"
                )}
              >
                AP Credit Memo
              </button>

            </div>
          )}
        </div>

        <button
          onClick={() => onTabChange('dashboard')}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors duration-150 group text-[13px] font-medium outline-none",
            activeTab === 'dashboard' ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
          )}
        >
          <div className="flex items-center gap-2.5">
            <BarChart3 size={16} className={cn("transition-colors", activeTab === 'dashboard' ? "text-indigo-600" : "text-zinc-400 group-hover:text-zinc-600")} />
            <span>Transaction Dashboard</span>
          </div>
        </button>

        <button
          onClick={() => onTabChange('alerts')}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors duration-150 group text-[13px] font-medium outline-none mt-1",
            activeTab === 'alerts' ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
          )}
        >
          <div className="flex items-center gap-2.5">
            <Bell size={16} className={cn("transition-colors", activeTab === 'alerts' ? "text-indigo-600" : "text-zinc-400 group-hover:text-zinc-600")} />
            <span>Email Alerts & Notifications</span>
          </div>
        </button>

        <button
          onClick={() => onTabChange('error-management')}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors duration-150 group text-[13px] font-medium outline-none",
            activeTab === 'error-management' ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
          )}
        >
          <div className="flex items-center gap-2.5">
            <AlertOctagon size={16} className={cn("transition-colors", activeTab === 'error-management' ? "text-rose-500" : "text-zinc-400 group-hover:text-zinc-600")} />
            <span>Error Log & Resolution</span>
          </div>
        </button>

        <button
          onClick={() => onTabChange('usage-monitor')}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors duration-150 group text-[13px] font-medium outline-none mt-1",
            activeTab === 'usage-monitor' ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
          )}
        >
          <div className="flex items-center gap-2.5">
            <CreditCard size={16} className={cn("transition-colors", activeTab === 'usage-monitor' ? "text-indigo-600" : "text-zinc-400 group-hover:text-zinc-600")} />
            <span>Usage & Overage Monitor</span>
          </div>
        </button>

        <button
          onClick={() => onTabChange('audit-trail')}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors duration-150 group text-[13px] font-medium outline-none mt-1",
            activeTab === 'audit-trail' ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
          )}
        >
          <div className="flex items-center gap-2.5">
            <History size={16} className={cn("transition-colors", activeTab === 'audit-trail' ? "text-indigo-600" : "text-zinc-400 group-hover:text-zinc-600")} />
            <span>Audit Trail & Archiving</span>
          </div>
        </button>

        <div className="w-full h-px bg-zinc-100 my-4"></div>

        <button
          onClick={() => onTabChange('companies')}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors duration-150 group text-[13px] font-medium outline-none",
            activeTab === 'companies' ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
          )}
        >
          <div className="flex items-center gap-2.5">
            <Users size={16} className={cn("transition-colors", activeTab === 'companies' ? "text-indigo-600" : "text-zinc-400 group-hover:text-zinc-600")} />
            <span>Companies</span>
          </div>
        </button>

        <button
          onClick={() => onTabChange('settings')}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors duration-150 group text-[13px] font-medium outline-none",
            activeTab === 'settings' ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
          )}
        >
          <div className="flex items-center gap-2.5">
            <Settings size={16} className={cn("transition-colors", activeTab === 'settings' ? "text-indigo-600" : "text-zinc-400 group-hover:text-zinc-600")} />
            <span>Settings</span>
          </div>
        </button>
      </nav>

      <div className="p-3 border-t border-[#eaeaea]">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-zinc-500 hover:bg-rose-50 hover:text-rose-600 transition-colors text-[13px] font-medium group"
        >
          <LogOut size={16} className="text-zinc-400 group-hover:text-rose-500 transition-colors" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
