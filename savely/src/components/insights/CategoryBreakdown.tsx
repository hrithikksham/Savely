import type { CategoryBreakdown } from '../../types';
import { formatCurrency } from '../../lib/calculations';

interface CategoryBreakdownListProps {
  data: CategoryBreakdown[];
}

export function CategoryBreakdownList({ data }: CategoryBreakdownListProps) {
  const max = data[0]?.amount ?? 1;

  return (
    <div className="bg-white rounded-2xl p-6">
      <h3 className="text-gray-900 font-semibold mb-5">Spendings Breakdown</h3>
      <div className="flex flex-col gap-5">
        {data.map(item => (
          <div key={item.category}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ background: item.color }} />
                <span className="text-gray-700 text-sm">{item.category}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span>{formatCurrency(item.amount, true)}</span>
                <span>·</span>
                <span>{item.percentage}%</span>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(item.amount / max) * 100}%`,
                  background: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}