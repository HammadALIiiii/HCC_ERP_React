import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

const Layout = ({ children, activeTab, onTabChange, onLogout, user }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleTabChange = (tabId) => {
    onTabChange(tabId);
    if (tabId !== 'overview') {
      setIsDrawerOpen(false);
    }
  };

  const isOverview = activeTab === 'overview';

  return (
    <div className="flex h-screen bg-[#fafafa] overflow-hidden font-sans text-zinc-900 relative">
      {/* Sidebar - Hybrid Smart Logic */}
      <div 
        className={cn(
          "z-50 transition-all duration-300 ease-in-out flex-shrink-0 overflow-hidden",
          isOverview 
            ? "fixed inset-y-0 left-0 bg-white shadow-[10px_0_40px_-15px_rgba(0,0,0,0.1)] h-full" 
            : "relative h-full bg-white",
          isOverview 
            ? (!isDrawerOpen ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100")
            : (!isDrawerOpen ? "w-0 opacity-0 border-transparent" : "w-64 opacity-100 border-r border-[#eaeaea]")
        )}
      >
        <div className="w-64 h-full">
          <Sidebar activeTab={activeTab} onTabChange={handleTabChange} onLogout={onLogout} user={user} />
        </div>
      </div>

      {/* Backdrop for Overview Landing Hub */}
      <AnimatePresence>
        {isOverview && isDrawerOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-900/5 backdrop-blur-[2px] z-40"
            onClick={() => setIsDrawerOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header 
          activeTab={activeTab} 
          onToggleSidebar={() => setIsDrawerOpen(!isDrawerOpen)} 
          onTabChange={handleTabChange}
          showBrand={!isDrawerOpen} 
          user={user}
        />
        
        <main className="flex-1 overflow-y-auto px-8 py-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="max-w-6xl mx-auto w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Layout;
