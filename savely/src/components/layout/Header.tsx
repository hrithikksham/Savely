import { Bell, User, Search } from 'lucide-react';
import { format } from 'date-fns';

interface HeaderProps {
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
}

export function Header({ showSearch = false, searchValue = '', onSearchChange }: HeaderProps) {
  const today = format(new Date(), 'EEEE, d MMM yyyy');

  return (
    <div className="flex items-center gap-4 mb-6">
      {showSearch ? (
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={searchValue}
            onChange={e => onSearchChange?.(e.target.value)}
            placeholder="Search"
            className="w-full bg-[#1e1e1e] text-white placeholder-gray-500 rounded-full pl-9 pr-4 py-2 text-sm outline-none"
          />
        </div>
      ) : (
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Search"
            className="w-full bg-[#1e1e1e] text-white placeholder-gray-500 rounded-full pl-9 pr-4 py-2 text-sm outline-none"
          />
        </div>
      )}

      <span className="text-gray-300 text-sm font-medium">{today}</span>

      <div className="flex-1" />

      <button className="w-10 h-10 rounded-full bg-[#e8e8e8] flex items-center justify-center text-gray-600 hover:bg-white transition-all">
        <Bell size={16} />
      </button>
      <button className="w-10 h-10 rounded-full bg-[#e8e8e8] flex items-center justify-center text-gray-600 hover:bg-white transition-all">
        <User size={16} />
      </button>
    </div>
  );
}