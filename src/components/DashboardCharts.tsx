'use client';

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export default function DashboardCharts({ data }: { data: any[] }) {
  // Format dates for display
  const formattedData = data.map(item => ({
    ...item,
    displayDate: new Date(item.date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
        <XAxis 
          dataKey="displayDate" 
          stroke="#64748b" 
          fontSize={10}
          tickLine={false}
          axisLine={false}
          dy={10}
        />
        <YAxis 
          stroke="#64748b" 
          fontSize={10}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}₽`}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#0f172a', 
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            padding: '12px'
          }}
          cursor={{ stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '5 5' }}
          itemStyle={{ color: '#fff', fontWeight: 'bold' }}
        />
        <Area 
          type="monotone" 
          dataKey="amount" 
          stroke="#3b82f6" 
          strokeWidth={4}
          fillOpacity={1}
          fill="url(#colorAmount)"
          animationDuration={2000}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
