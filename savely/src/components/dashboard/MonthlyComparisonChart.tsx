import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { MonthlyData } from '../../types';
import { ArrowBtn } from '../ui/primitives';

export function MonthlyComparisonChart({ data }: { data: MonthlyData[] }) {
  return (
    <div style={{
      background: '#1a1a1a', borderRadius: 16, padding: 20,
      display: 'flex', flexDirection: 'column', gap: 12,
      height: '100%', boxSizing: 'border-box',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ color: 'white', fontWeight: 500, fontSize: 15 }}>Monthly Comparison</span>
        <ArrowBtn />
      </div>
      <div style={{ flex: 1, minHeight: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="35%" barGap={4} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#888', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ background: '#2a2a2a', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12 }}
              formatter={(value) => typeof value === 'number' ? `₹${value.toLocaleString('en-IN')}` : ''}
            />
            <Bar dataKey="income"   name="Income"   fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" name="Expenses" fill="#d1d5db" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}