import React from 'react';
import ModuleCard from '../components/layout/ModuleCard';
import MetricCards from '../components/dashboard/MetricCards';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import { stats, transactions } from '../data/mockData';
import { Receipt, BarChart3, Bell, ShieldOff, TrendingUp, History, Database, ArrowRightLeft, Package, ChevronRight } from 'lucide-react';

const Overview = ({ onTabChange }) => {
  const handleMetricClick = (id) => {
    switch (id) {
      case 'rejected-invoices':
      case 'pending-invoices':
        onTabChange('error-management');
        break;
      case 'validated-invoices':
      case 'total-invoices':
        onTabChange('dashboard');
        break;
      default:
        onTabChange('dashboard');
    }
  };

  return (
    <div className="space-y-8 pb-12">


      {/* Top Section: Quick Analytics Mixup */}
      <section>
        <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={18} className="text-indigo-500" />
            <h2 className="text-xl font-display font-semibold text-zinc-900 tracking-tight leading-none">Operations Overview</h2>
        </div>
        <MetricCards stats={stats} onCardClick={handleMetricClick} />
      </section>
      {/* Modules Grid */}
      <section className="pt-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-500 border border-zinc-200">
                <Package size={18} />
             </div>
             <div>
                <h3 className="text-xl font-display font-bold text-zinc-900 tracking-tight leading-none">System Modules</h3>
                <p className="text-[13px] text-zinc-500 mt-1.5 font-medium">Navigate to specific compliance and reporting applications.</p>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl">
          {/* Card 1: Invoice Posting Portal */}
          <ModuleCard 
            type="portal"
            tagText="Data Entry"
            badgeColor="bg-sky-50 text-sky-700 border border-sky-200/50"
            borderColor="bg-sky-500"
            title="Invoice Posting"
            description="Securely generate and submit compliant digital tax documents. Enables complete processing without requiring local system integration."
            onClick={() => onTabChange('tx-ar-invoice')}
            icon={Receipt}
            subLinks={[
              { label: 'Master Data', icon: Database, onClick: () => onTabChange('master-bp') },
              { label: 'Transactions', icon: ArrowRightLeft, onClick: () => onTabChange('tx-ar-invoice') }
            ]}
          />
          
          {/* Card 2: Transaction Dashboard */}
          <ModuleCard 
            type="dashboard"
            tagText="Analytics"
            badgeColor="bg-slate-50 text-slate-700 border border-slate-200"
            borderColor="bg-slate-800"
            title="Transaction Dashboard"
            description="Track the real-time operational status of all processed documents. Gain immediate visual insights into submission volumes and compliance metrics across organizations."
            onClick={() => onTabChange('dashboard')}
            icon={BarChart3}
          />

          {/* Card 3: Automated Alerts */}
          <ModuleCard 
            type="alerts"
            tagText="System Alerts"
            badgeColor="bg-indigo-50 text-indigo-700 border border-indigo-200/50"
            borderColor="bg-indigo-500"
            title="Email Alerts & Notifications"
            description="Configure targeted email warnings for critical structural errors, external network rejections, and quota utilization limits. Manage specific recipients securely."
            onClick={() => onTabChange('alerts')}
            icon={Bell}
          />

          {/* Card 4: Error Management */}
          <ModuleCard 
            type="errors"
            tagText="Error Management"
            badgeColor="bg-rose-50 text-rose-700 border border-rose-200/50"
            borderColor="bg-rose-600"
            title="Error Log & Resolution"
            description="Full error codes from Taxilla and FTA displayed with precise fix guidance. Errors are categorised by severity with one-click resubmission once corrected."
            onClick={() => onTabChange('error-management')}
            icon={ShieldOff}
          />

          {/* Card 5: Usage & Overage Monitor */}
          <ModuleCard 
            type="usage"
            tagText="Billing Intelligence"
            badgeColor="bg-amber-50 text-amber-700 border border-amber-200/50"
            borderColor="bg-amber-500"
            title="Usage & Overage Monitor"
            description="Track combined invoice volume across all registered TRNs. System flags when nearing tier limit so HCC and customer can plan upgrades proactively."
            onClick={() => onTabChange('usage-monitor')}
            icon={TrendingUp}
          />

          {/* Card 6: Audit Trail & Archiving */}
          <ModuleCard 
            type="compliance"
            tagText="Compliance"
            badgeColor="bg-indigo-50 text-indigo-700 border border-indigo-200/50"
            borderColor="bg-indigo-600"
            title="Audit Trail & Archiving"
            description="Complete document history — submitted, accepted, and rejected invoices — with timestamps and response logs. Automatically syncs audit data securely back to your local ERP."
            onClick={() => onTabChange('audit-trail')}
            icon={History}
          />
        </div>
      </section>

      {/* Bottom Section: Recent Activity Mixup */}
      <section className="pt-4">
        <RecentTransactions transactions={transactions.slice(0, 3)} />
      </section>
    </div>
  );
};

export default Overview;
