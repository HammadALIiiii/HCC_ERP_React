import React from 'react';
import { Settings2, Hammer } from 'lucide-react';

const UnderConstruction = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
      <div className="relative">
        <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center shadow-inner border border-[#eaeaea]">
          <Hammer className="text-zinc-400" size={32} />
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-indigo-50 rounded-xl flex items-center justify-center border border-indigo-100 shadow-sm">
          <Settings2 className="text-indigo-600" size={16} />
        </div>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-zinc-900 tracking-tight">
          {title}
        </h2>
        <p className="text-[13px] text-zinc-500 max-w-md mx-auto">
          This submodule is currently being modeled. Master and transational data schemas are being integrated. Check back soon.
        </p>
      </div>
      
      <div className="flex gap-3">
        <button className="ghost-btn border border-[#eaeaea]">
          Notify me
        </button>
      </div>
    </div>
  );
};

export default UnderConstruction;
