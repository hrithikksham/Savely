import { ArrowUpRight } from 'lucide-react';

interface BreakdownItem {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export function SpendingsBreakdown({ data = [] }: { data?: BreakdownItem[] }) {
  // SVG Math for the Donut Chart
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;

  // Take only the top 4 categories so the legend fits perfectly in the Dashboard card
  const displayData = data.slice(0, 4);

  return (
    <div className="flex flex-col h-full">
      
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-900 text-[18px] font-medium tracking-tight">
          Spendings Breakdown
        </h2>
        <button className="w-8 h-8 rounded-full bg-[#f4f4f4] flex items-center justify-center text-gray-800 hover:bg-[#e6e6e6] transition-colors">
          <ArrowUpRight size={16} strokeWidth={2.5} />
        </button>
      </div>

      {/* ── Chart & Legend Container ────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-8 flex-1 w-full px-4">
        
        {/* Donut Chart (SVG) */}
        <div className="w-[140px] h-[140px] shrink-0 relative">
          <svg viewBox="0 0 32 32" className="w-full h-full -rotate-90 transform drop-shadow-sm">
            {/* Background Track */}
            <circle 
              cx="16" cy="16" r={radius} 
              fill="none" stroke="#f4f4f4" strokeWidth="4" 
            />
            
            {/* Colored Slices */}
            {displayData.map((item, idx) => {
              const strokeLength = (item.percentage / 100) * circumference;
              
              // Add a 1px gap between slices if the slice is large enough to see
              const gap = strokeLength > 2 ? 1 : 0; 
              const dasharray = `${Math.max(0, strokeLength - gap)} ${circumference}`;
              const dashoffset = -currentOffset;
              
              currentOffset += strokeLength;

              return (
                <circle
                  key={idx}
                  cx="16"
                  cy="16"
                  r={radius}
                  fill="none"
                  stroke={item.color || '#94a3b8'}
                  strokeWidth="4"
                  strokeDasharray={dasharray}
                  strokeDashoffset={dashoffset}
                  className="transition-all duration-1000 ease-out origin-center"
                />
              );
            })}
          </svg>
        </div>

        {/* Legend List */}
        <div className="flex flex-col justify-center gap-4 flex-1">
          {displayData.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-[13px]">
              <div className="flex items-center gap-3">
                {/* Square Color Indicator */}
                <div 
                  className="w-2.5 h-2.5 rounded-[2px]" 
                  style={{ backgroundColor: item.color || '#94a3b8' }} 
                />
                <span className="text-gray-600 font-medium tracking-wide">
                  {item.category}
                </span>
              </div>
              <span className="text-gray-900 font-bold tracking-wide">
                ₹{item.amount.toLocaleString('en-IN')}
              </span>
            </div>
          ))}
          
          {/* Optional: Show "Other" if there are more than 4 categories */}
          {data.length > 4 && (
            <div className="flex items-center justify-between text-[13px] opacity-50 mt-1">
              <span className="text-gray-600 font-medium tracking-wide pl-5">
                + {data.length - 4} more
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}