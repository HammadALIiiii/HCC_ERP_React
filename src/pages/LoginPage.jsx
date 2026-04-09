import React, { useState } from 'react';
import { Lock, User, Loader2, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { hardcodedUsers } from '../data/mockData';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const user = hardcodedUsers.find(
        (u) => u.username === username.toLowerCase() && u.password === password
      );

      if (user) {
        onLogin(user);
      } else {
        setError('Invalid credentials. Please try again.');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex bg-white overflow-hidden font-sans">
      
      {/* Left Pane: Brand & Visuals */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-zinc-900 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110"
          style={{ backgroundImage: 'url("/login_bg.png")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/95 via-indigo-900/80 to-transparent" />
        
        {/* Decorative Circles */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-500/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-64 h-64 bg-violet-500/20 rounded-full blur-[60px]" />

        {/* Content */}
        <div className="relative h-full w-full flex flex-col justify-between p-16 z-10 text-white">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                <Globe size={20} className="text-white" />
              </div>
              <span className="text-[14px] font-bold uppercase tracking-[0.2em]">UAE Enterprise ERP</span>
            </div>
            
            <h1 className="text-5xl font-bold font-display leading-[1.1] mb-6 tracking-tight">
                Streamline Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                  Compliance Workflow
                </span>
            </h1>
            <p className="text-indigo-100/70 text-lg max-w-md font-medium leading-relaxed">
              Empowering Middle Eastern enterprises with real-time tax synchronization, PINT AE certification, and seamless ERP integration.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-8"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-indigo-300">
                <ShieldCheck size={18} />
                <span className="text-[12px] font-bold uppercase tracking-widest">FTA Compliant</span>
              </div>
              <p className="text-[13px] text-indigo-100/50">Fully certified for digital tax submission and signing.</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sky-400">
                <Zap size={18} />
                <span className="text-[12px] font-bold uppercase tracking-widest">Real-time Sync</span>
              </div>
              <p className="text-[13px] text-indigo-100/50">Instant data reconciliation with local ERP databases.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Pane: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative bg-zinc-50 lg:bg-white">
        <div className="w-full max-w-sm">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Branding Logo */}
            <div className="flex flex-col items-center mb-10">
              <div className="mb-6 hover:scale-105 transition-transform">
                <img src="/HCC_logo.png" alt="HCC logo" className="h-20 w-auto object-contain" />
              </div>
              <h2 className="text-2xl font-bold font-display text-zinc-900 tracking-tight">Middleware Login</h2>
              <p className="text-zinc-400 text-sm mt-1.5 font-medium">Please enter your credentials to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-zinc-500 uppercase tracking-wider ml-1">Username</label>
                <div className="relative group">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username" 
                    className="w-full h-12 pl-11 pr-4 bg-zinc-50/50 border border-zinc-200 rounded-xl text-[14px] font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-[12px] font-bold text-zinc-500 uppercase tracking-wider">Password</label>
                  <button type="button" className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-widest">Forgot?</button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full h-12 pl-11 pr-4 bg-zinc-50/50 border border-zinc-200 rounded-xl text-[14px] font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all outline-none"
                    required
                  />
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 bg-rose-50 border border-rose-100 text-rose-600 text-[12px] font-bold rounded-xl text-center"
                >
                  {error}
                </motion.div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-12 bg-zinc-900 text-white rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all shadow-lg active:scale-[0.98] mt-2 group overflow-hidden relative"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Unlock Dashboard</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </button>
            </form>

            {/* Demo Credentials Helper */}
            <div className="mt-8 p-4 bg-zinc-50 border border-zinc-200 rounded-xl relative overflow-hidden">
              <div className="flex flex-col items-center gap-3 relative z-10">
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Demo Access Credentials</span>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center">
                    <span className="text-[11px] font-bold text-zinc-900">admin</span>
                    <span className="text-[10px] text-zinc-400 font-mono">admin123</span>
                  </div>
                  <div className="w-px h-5 bg-zinc-200" />
                  <div className="flex flex-col items-center">
                    <span className="text-[11px] font-bold text-zinc-900">hcc</span>
                    <span className="text-[10px] text-zinc-400 font-mono">hcc_erp</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-1 opacity-[0.03] select-none pointer-events-none">
                <ShieldCheck size={40} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer info */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-zinc-400 lg:bottom-6">
           <span className="text-[9px] font-bold uppercase tracking-[0.15em] whitespace-nowrap opacity-60">Cloud Middleware v4.1.0 • UAE Compliant</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
