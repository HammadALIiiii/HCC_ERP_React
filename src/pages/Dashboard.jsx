import React from 'react';
import MetricCards from '../components/dashboard/MetricCards';
import TransactionTrend from '../components/dashboard/TransactionTrend';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import UsageIndicator from '../components/dashboard/UsageIndicator';
import { stats, transactions, chartData } from '../data/mockData';

const Dashboard = ({ onTabChange }) => {
  const handleMetricClick = (id) => {
    switch (id) {
      case 'rejected-invoices':
      case 'pending-invoices':
        onTabChange?.('error-management');
        break;
      case 'validated-invoices':
      case 'total-invoices':
        // Stay on dashboard
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-8 pb-12 mt-4">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-display font-semibold text-zinc-900 tracking-tight">Transaction Dashboard</h2>
        <p className="text-zinc-500 text-sm mt-1">Real-time operational status and compliance metrics.</p>
      </div>

      {/* Metrics Section */}
      <section>
        <MetricCards stats={stats} onCardClick={handleMetricClick} />
      </section>

      {/* Analytics & Usage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TransactionTrend data={chartData} />
        </div>
        <div>
          <UsageIndicator percentage={75} current={3750} limit={5000} />
        </div>
      </div>

      {/* Transactions Section */}
      <section>
        <RecentTransactions transactions={transactions} />
      </section>
    </div>
  );
};

export default Dashboard;
