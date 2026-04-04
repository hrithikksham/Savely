import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { CategoryBreakdown } from '../../types';
import { ArrowBtn } from '../ui/primitives';

interface SpendingsBreakdownProps {
  data: CategoryBreakdown[];
}

export function SpendingsBreakdown({ data }: SpendingsBreakdownProps) {
  const top4 = data.slice(0, 4);

  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-gray-900 font-medium">Spendings Breakdown</span>
        <ArrowBtn />
      </div>
      <div className="flex items-center gap-4">
        {/* Donut */}
        <div className="w-28 h-28 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={top4.length ? top4 : [{ amount: 1, color: '#e5e7eb' }]}
                dataKey="amount"
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="90%"
                strokeWidth={0}
              >
                {(top4.length ? top4 : [{ color: '#e5e7eb' }]).map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#2a2a2a', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12 }}
                formatter={(v) => {
                    if (typeof v === 'number') {
                        return `₹${v.toLocaleString('en-IN')}`;
                    }
                    return v;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2 flex-1">
          {top4.map((item) => (
            <div key={item.category} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
                <span className="text-gray-600 text-xs">{item.category}</span>
              </div>
              <span className="text-gray-800 text-xs font-medium">
                ₹{item.amount.toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}