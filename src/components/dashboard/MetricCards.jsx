import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../utils/cn';

const MetricCards = ({ stats, onCardClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <button 
          key={stat.id} 
          onClick={() => onCardClick?.(stat.id)}
          className={cn(
            "premium-card p-5 group flex flex-col justify-between text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]",
            onCardClick ? "cursor-pointer" : "cursor-default"
          )}
        >
          <div className="flex items-center justify-between mb-4 text-zinc-500">
            <span className="text-[13px] font-medium tracking-tight bg-white group-hover:text-indigo-600 transition-colors">{stat.name}</span>
            <div className={cn(
              "px-1.5 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1",
              stat.status === 'up' ? "text-emerald-700 bg-emerald-50 border border-emerald-100" : "text-rose-700 bg-rose-50 border border-rose-100"
            )}>
              {stat.status === 'up' ? <TrendingUp size={10} strokeWidth={3} /> : <TrendingDown size={10} strokeWidth={3} />}
              {stat.change}
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-display font-semibold text-zinc-900 tracking-tight group-hover:scale-105 origin-left transition-transform">
              {stat.value}
            </h3>
          </div>
        </button>
      ))}
    </div>
  );
};

export default MetricCards;
