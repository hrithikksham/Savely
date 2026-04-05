import { ArrowUpRight } from 'lucide-react'; // Using Lucide icon for the arrow

interface KpiCardProps {
  title: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  light?: boolean;
  blueArrow?: boolean;
}

export function KpiCard({ title, value, delta, deltaPositive, light, blueArrow }: KpiCardProps) {
  return (
    <div className={`rounded-[24px] p-6 flex flex-col justify-between shadow-sm min-h-[140px] transition-transform hover:-translate-y-1 ${light ? 'bg-white' : 'bg-[#e6e6e6]'}`}>
      
      {/* Header: Title and Arrow */}
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-medium text-gray-600 tracking-wide">
          {title}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${blueArrow ? 'bg-blue-600 text-white' : 'bg-[#333] text-white'}`}>
          <ArrowUpRight size={16} strokeWidth={2.5} />
        </div>
      </div>
      
      {/* Footer: Value and Delta */}
      <div>
        <div className="text-[36px] font-semibold text-gray-900 tracking-tight leading-none mt-3">
          {value}
        </div>
        {delta && (
          <span className={`text-[12px] font-medium mt-2 inline-block tracking-wide ${deltaPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
            {delta}
          </span>
        )}
      </div>

    </div>
  );
}