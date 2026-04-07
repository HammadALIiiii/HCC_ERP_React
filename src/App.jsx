import React, { useState, useEffect } from 'react';
import Layout from './components/layout/Layout';
import Overview from './pages/Overview';
import Dashboard from './pages/Dashboard';
import InvoicePortal from './pages/InvoicePortal';
import TransactionForm from './pages/TransactionForm';
import UsageMonitor from './pages/UsageMonitor';
import AuditTrail from './pages/AuditTrail';
import AlertsSettings from './pages/AlertsSettings';
import ErrorManagement from './pages/ErrorManagement';
import UnderConstruction from './pages/UnderConstruction';
import LoginPage from './pages/LoginPage';

import MasterDataView from './components/dashboard/MasterDataView';
import RecentTransactions from './components/dashboard/RecentTransactions';
import CreditMemoTable from './components/dashboard/CreditMemoTable';
import TransactionListView from './components/dashboard/TransactionListView';
import { businessPartners, items, transactions, arCreditMemos, apCreditMemos } from './data/mockData';

function App() {
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash ? hash.split('/')[0] : 'overview';
  });
  const [viewMode, setViewMode] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash.includes('/') ? hash.split('/')[1] : 'list';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('hcc_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!currentUser;

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === 'overview') {
        setActiveTab('overview');
        setViewMode('list');
        // Trap: prevent backward exit from overview
        window.history.pushState(null, '', '#overview');
      } else {
        const parts = hash.split('/');
        setActiveTab(parts[0] || 'overview');
        setViewMode(parts[1] || 'list');
      }
    };

    // Normalize empty URL to overview efficiently
    if (!window.location.hash || window.location.hash === '#') {
      window.history.replaceState(null, '', '#overview');
    }
    
    // Initial trap setup so back button doesn't exit immediately on first load
    window.history.pushState(null, '', window.location.hash);

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('hcc_user', JSON.stringify(user));
    window.location.hash = 'overview';
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('hcc_user');
  };

  const handleTabChange = (tab) => {
    window.location.hash = tab;
  };

  const handleModeChange = (mode) => {
    window.location.hash = mode === 'list' ? activeTab : `${activeTab}/${mode}`;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview onTabChange={handleTabChange} />;
      case 'dashboard':
        return <Dashboard onTabChange={handleTabChange} />;
      
      // Transactions Submodule
      case 'tx-ar-invoice':
        return viewMode === 'list' ? (
          <TransactionListView 
            title="AR Invoice" 
            subtitle="Manage outbound customer invoices and billing history."
            data={transactions} 
            onAddNew={() => handleModeChange('form')}
          />
        ) : (
          <TransactionForm type="ar-invoice" onBack={() => handleModeChange('list')} />
        );
      case 'tx-ap-invoice':
        return viewMode === 'list' ? (
          <TransactionListView 
            title="AP Invoice" 
            subtitle="Track incoming vendor invoices and overhead expenses."
            data={transactions} 
            onAddNew={() => handleModeChange('form')}
          />
        ) : (
          <TransactionForm type="ap-invoice" onBack={() => handleModeChange('list')} />
        );
      case 'tx-ar-credit':
        return viewMode === 'list' ? (
          <CreditMemoTable
            title="AR Credit Memo"
            subtitle="Customer-side credit adjustments issued against validated AR Invoices."
            data={arCreditMemos}
            onAddNew={() => handleModeChange('form')}
          />
        ) : (
          <TransactionForm type="ar-credit" onBack={() => handleModeChange('list')} />
        );
      case 'tx-ap-credit':
        return viewMode === 'list' ? (
          <CreditMemoTable
            title="AP Credit Memo"
            subtitle="Vendor-side credit notes received against processed AP Invoices."
            data={apCreditMemos}
            onAddNew={() => handleModeChange('form')}
          />
        ) : (
          <TransactionForm type="ap-credit" onBack={() => handleModeChange('list')} />
        );

      // Master Submodule
      case 'master-bp':
        return <MasterDataView 
            title="Business Partner Master" 
            onAddNew={() => handleTabChange('tx-ar-invoice')} // Redirect to form as a demo action
            columns={[
              { header: 'BP Code', accessor: 'id' },
              { header: 'Name', accessor: 'name' },
              { header: 'Type', accessor: 'type' },
              { header: 'Group', accessor: 'group' },
              { header: 'Currency', accessor: 'currency' },
              { header: 'Balance', accessor: 'balance', align: 'right' }
            ]} 
            data={businessPartners} 
          />;
      case 'master-item':
        return <MasterDataView 
            title="Item Master" 
            onAddNew={() => handleModeChange('form')}
            columns={[
              { header: 'Item Code', accessor: 'id' },
              { header: 'Description', accessor: 'description' },
              { header: 'Group', accessor: 'group' },
              { header: 'UoM', accessor: 'uom' },
              { header: 'In Stock', accessor: 'stock' },
              { header: 'Price', accessor: 'price', align: 'right' }
            ]} 
            data={items} 
          />;

      case 'usage-monitor':
        return <UsageMonitor />;
      case 'audit-trail':
        return <AuditTrail />;
      case 'alerts':
        return <AlertsSettings />;
      case 'error-management':
        return <ErrorManagement />;
      default:
        return <UnderConstruction title="Module Configuration" />;
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Layout activeTab={activeTab} onTabChange={handleTabChange} onLogout={handleLogout} user={currentUser}>
      {renderContent()}
    </Layout>
  );
}

export default App;

