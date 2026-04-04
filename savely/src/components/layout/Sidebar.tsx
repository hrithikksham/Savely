import { Home, List, BarChart2, Settings, Eye, LogOut } from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  active: string;
  onNavigate: (route: string) => void;
}

const TOP_NAV = [
  { icon: Home,     label: 'Dashboard',    route: '/' },
  { icon: List,     label: 'Transactions', route: '/transactions' },
  { icon: BarChart2,label: 'Insights',     route: '/insights' },
  { icon: Settings, label: 'Settings',     route: '/settings' },
];

export function Sidebar({ active, onNavigate }: SidebarProps) {
  return (
    <aside className="flex flex-col items-center py-4 gap-3 shrink-0 rounded-2xl" style={{ width: 64, background: '#e8e8e8' }}>
      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#c8c8c8' }}>
        <div className="w-5 h-5 rounded-full" style={{ background: '#888' }} />
      </div>
      <span className="text-gray-500 font-semibold tracking-wide" style={{ fontSize: 10 }}>Savely</span>
      <div className="w-6 mb-1" style={{ height: 1, background: '#bbb' }} />

      {TOP_NAV.map(({ icon: Icon, label, route }) => (
        <button
          key={route}
          title={label}
          onClick={() => onNavigate(route)}
          className={clsx(
            'w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer border-0',
            active === route
              ? 'bg-white text-gray-800 shadow-sm'
              : 'text-gray-500 hover:bg-white/70 hover:text-gray-800'
          )}
          style={{ background: active === route ? 'white' : undefined }}
        >
          <Icon size={18} />
        </button>
      ))}

      <div className="flex-1" />

      <button title="Preview" className="w-10 h-10 rounded-xl flex items-center justify-center text-white cursor-pointer" style={{ background: '#666' }}>
        <Eye size={16} />
      </button>
      <button title="Logout" className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 hover:bg-white/70 transition-all cursor-pointer border-0">
        <LogOut size={18} />
      </button>
    </aside>
  );
}