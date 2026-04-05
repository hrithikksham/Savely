import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { BalanceTrendPoint } from '../../types';
import { ArrowBtn } from '../ui/primitives';

export function BalanceTrendChart({ data }: { data: BalanceTrendPoint[] }) {
  return (
    <div style={{
      background: '#1a1a1a', borderRadius: 16, padding: 20,
      display: 'flex', flexDirection: 'column', gap: 12,
      height: '100%', boxSizing: 'border-box',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ color: 'white', fontWeight: 500, fontSize: 15 }}>Balance Trend</span>
        <ArrowBtn blue />
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#3B82F6" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: '#666', fontSize: 10 }}
              axisLine={false} tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: '#666', fontSize: 10 }}
              axisLine={false} tickLine={false}
              tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
              width={46}
            />
            <Tooltip
              contentStyle={{ background: '#2a2a2a', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12 }}
              formatter={(v) => {
                const amount = typeof v === 'number' ? v : 0;
                return [`₹${amount.toLocaleString('en-IN')}`, 'Balance'];
              }}
            />
            <Area
              type="monotone" dataKey="balance"
              stroke="#3B82F6" strokeWidth={2.5}
              fill="url(#blueGrad)" dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}