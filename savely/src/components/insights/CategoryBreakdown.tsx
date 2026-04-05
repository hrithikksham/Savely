import type { CategoryBreakdown } from '../../types';

interface Props {
  data?: CategoryBreakdown[];
}

export function CategoryBreakdownList({ data = [] }: Props) {
  

  const fallbackData: CategoryBreakdown[] = [
    { category: 'Rent', amount: 14000, percentage: 96.6, color: '#ef4444' },
    { category: 'Transportation', amount: 499, percentage: 3.4, color: '#3b82f6' },
    { category: 'Food & Dining', amount: 8000, percentage: 30, color: '#64748b' },
    { category: 'Entertainment', amount: 2000, percentage: 10, color: '#10b981' },
    { category: 'Healthcare', amount: 1500, percentage: 5, color: '#f97316' },
    { category: 'Utilities', amount: 1200, percentage: 4, color: '#06b6d4' },
    { category: 'Other', amount: 500, percentage: 2, color: '#8b5cf6' },
  ];

  const displayData = data.length > 0 ? data : fallbackData;

  return (
    <div className="bg-white rounded-[24px] p-8 flex-1 shadow-sm flex flex-col">
      <h2 className="text-gray-900 text-[18px] font-medium mb-8 tracking-tight">
        Spendings Breakdown
      </h2>
      
      <div className="flex flex-col gap-6">
        {displayData.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-2.5">
            
            {/* ── Row Header: Name and Values ── */}
            <div className="flex justify-between items-center text-[13px]">
              <div className="flex items-center gap-2.5">
                {/* Color Square Indicator */}
                <div 
                  className="w-2.5 h-2.5 rounded-[2px]" 
                  style={{ backgroundColor: item.color }} 
                />
                <span className="text-gray-800 font-semibold tracking-wide">
                  {item.category}
                </span>
              </div>
              
              <div className="text-gray-900 font-bold tracking-wide">
                ₹{item.amount.toLocaleString('en-IN')} 
                <span className="mx-1.5 font-normal text-gray-400">·</span> 
                <span className="text-gray-500 font-semibold">{item.percentage}%</span>
              </div>
            </div>

            {/* ── Horizontal Progress Bar ── */}
            <div className="w-full bg-[#f4f4f4] h-[6px] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.color
                }}
              />
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}