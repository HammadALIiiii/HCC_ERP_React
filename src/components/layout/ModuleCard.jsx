import React from 'react';
import { cn } from '../../utils/cn';

const ModuleCard = ({ type, tagText, title, description, badgeColor, borderColor, onClick, icon: Icon, subLinks }) => {
  return (
    <div 
      className={cn(
        "group relative text-left bg-white w-full rounded-2xl shadow-soft hover:shadow-premium transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-slate-100",
        "flex flex-col h-full"
      )}
    >
      {/* Top Accent Line */}
      <div className={cn("absolute top-0 left-0 w-full h-1.5 transition-opacity", borderColor)}></div>
      
      <div className="p-8 flex-1 flex flex-col">
        {/* Top Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className={cn("px-3 py-1 text-xs font-bold rounded-md whitespace-nowrap", badgeColor)}>
            {tagText}
          </div>
          <div className={cn(
              "p-2.5 rounded-xl transition-all duration-300",
              badgeColor
          )}>
            <Icon size={18} />
          </div>
        </div>

        {/* Header content */}
        <div className="mb-4">
          <h3 className="text-xl font-display font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            {title}
          </h3>
        </div>

        {/* Text Body */}
        <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
          {description}
        </p>

        {/* Sub-links or Main Action */}
        <div className="mt-auto pt-6 border-t border-slate-50">
          {subLinks ? (
            <div className="grid grid-cols-2 gap-2">
              {subLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); link.onClick(); }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 text-[12px] font-bold transition-colors border border-transparent hover:border-indigo-100/50"
                >
                  {link.icon && <link.icon size={14} />}
                  {link.label}
                </button>
              ))}
            </div>
          ) : (
            <button 
              onClick={onClick}
              className="w-full flex items-center justify-between text-indigo-600 group/btn"
            >
              <span className="text-sm font-bold tracking-wide">Enter Module</span>
              <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
