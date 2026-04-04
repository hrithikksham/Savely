import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import type { MonthlyData } from '../../types';
import { ArrowBtn } from '../ui/primitives';

interface MonthlyComparisonChartProps {
  data: MonthlyData[];
}

export function MonthlyComparisonChart({ data }: MonthlyComparisonChartProps) {
  return (
    <div className="bg-[#1e1e1e] rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-white font-medium">Monthly Comparison</span>
        <ArrowBtn />
      </div>
      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="30%" barGap={4} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="month"
              tick={{ fill: '#888', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#888', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{ background: '#2a2a2a', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12 }}
              formatter={(v) => {
                if (typeof v === 'number') {
                  return `₹${v.toLocaleString('en-IN')}`;
                }
                return v;
              }}
            />
            <Bar dataKey="income"   fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}