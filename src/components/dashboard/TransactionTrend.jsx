import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TransactionTrend = ({ data }) => {
  return (
    <div className="premium-card h-[380px] flex flex-col">
      <div className="px-5 py-4 border-b border-[#eaeaea] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">Transaction Volume</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-medium text-zinc-500 px-2 py-0.5 bg-zinc-100 rounded">
            Last 7 days
          </span>
        </div>
      </div>

      <div className="flex-1 w-full p-4 pb-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#a1a1aa', fontSize: 11 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#a1a1aa', fontSize: 11 }}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid #eaeaea', 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                backgroundColor: '#fff',
                fontSize: '12px',
                color: '#18181b',
                padding: '8px 12px'
              }}
              cursor={{ stroke: '#e4e4e7', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#4f46e5" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorTrend)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionTrend;
