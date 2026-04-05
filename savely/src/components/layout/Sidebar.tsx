import { useState } from 'react';
import { Home, Menu, BarChart2, Settings, Eye, Pencil, LogOut, ChevronRight, ChevronLeft } from 'lucide-react';

const NAV = [
  { icon: Home,      label: 'Dashboard',    route: '/' },
  { icon: Menu,      label: 'Transactions', route: '/transactions' },
  { icon: BarChart2, label: 'Insights',     route: '/insights' },
  { icon: Settings,  label: 'Settings',     route: '/settings' },
];

export type UserRole = 'editor' | 'viewer';

interface SidebarProps {
  active: string;
  onNavigate: (route: string) => void;
  role: UserRole;
  onRoleToggle: () => void;
}

export function Sidebar({ active, onNavigate, role, onRoleToggle }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside 
      className={`relative flex flex-col items-center py-6 px-4 shrink-0 transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-sm
        bg-gradient-to-b from-[#ebebeb] to-[#d4d4d4] rounded-[40px]
        ${isExpanded ? 'w-[240px]' : 'w-[88px]'}
      `}
    >
      {/* ── Top Logo / Brand ─────────────────────────────────────────────── */}
      <div className={`flex flex-col items-center w-full mb-2 ${isExpanded ? 'items-start px-2' : 'items-center'}`}>
        <div className="flex items-center gap-3 w-full">
          <div className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-br from-[#444] to-[#888] shadow-inner" />
          
          <div className={`flex flex-col transition-all duration-300 overflow-hidden ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
            <span className="text-[15px] font-bold text-gray-900 tracking-wide leading-tight">Savely</span>
            <span className="text-[11px] font-medium text-gray-500 uppercase tracking-widest">{role}</span>
          </div>
        </div>
      </div>
      
      {/* Divider */}
      <div className={`h-px bg-black/10 my-4 transition-all duration-300 ${isExpanded ? 'w-full' : 'w-10'}`} />

      {/* ── Nav Icons ────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 w-full">
        {NAV.map(({ icon: Icon, label, route }) => {
          const isActive = active === route;
          return (
            <button
              key={route} 
              title={isExpanded ? '' : label}
              onClick={() => onNavigate(route)}
              className={`
                flex items-center h-12 rounded-[16px] border-none cursor-pointer transition-all duration-200 overflow-hidden
                ${isActive 
                  ? 'bg-white text-gray-900 shadow-[0_2px_10px_rgba(0,0,0,0.06)]' 
                  : 'bg-transparent text-gray-500 hover:text-gray-900 hover:bg-white/40'
                }
                ${isExpanded ? 'w-full px-3.5 justify-start gap-4' : 'w-12 justify-center mx-auto'}
              `}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className="shrink-0" />
              
              <span className={`text-[14px] font-semibold whitespace-nowrap transition-all duration-300 ${
                isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 w-0'
              }`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex-1" />

      {/* ── Bottom Controls ──────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 w-full">
        
        {/* Role Toggle Button (Editor/Viewer) */}
        <button 
          onClick={onRoleToggle}
          title={`Switch to ${role === 'editor' ? 'Viewer' : 'Editor'} mode`}
          className={`
            flex items-center h-12 rounded-[16px] border-none cursor-pointer transition-all duration-300 overflow-hidden text-white shadow-md
            ${role === 'editor' ? 'bg-[#1d4ed8] hover:bg-blue-600' : 'bg-[#777] hover:bg-[#666]'}
            ${isExpanded ? 'w-full px-3.5 justify-start gap-4' : 'w-12 justify-center mx-auto'}
          `}
        >
          {role === 'editor' ? <Pencil size={20} className="shrink-0" /> : <Eye size={20} className="shrink-0" />}
          
          <span className={`text-[13px] font-medium whitespace-nowrap transition-all duration-300 ${
            isExpanded ? 'opacity-100' : 'opacity-0 w-0'
          }`}>
            {role === 'editor' ? 'Editor Mode' : 'Viewer Mode'}
          </span>
        </button>

        {/* Expand/Collapse Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            flex items-center h-12 rounded-[16px] border-none bg-transparent text-gray-500 cursor-pointer transition-all duration-200 overflow-hidden hover:bg-white/40 hover:text-gray-900
            ${isExpanded ? 'w-full px-3.5 justify-start gap-4' : 'w-12 justify-center mx-auto'}
          `}
        >
          {isExpanded ? <ChevronLeft size={22} className="shrink-0" /> : <ChevronRight size={22} className="shrink-0" />}
          <span className={`text-[14px] font-semibold whitespace-nowrap transition-all duration-300 ${
            isExpanded ? 'opacity-100' : 'opacity-0 w-0'
          }`}>
            Collapse
          </span>
        </button>
        
        {/* LogOut */}
        <button
          className={`
            flex items-center h-12 rounded-[16px] border-none bg-transparent text-rose-500/80 cursor-pointer transition-all duration-200 overflow-hidden hover:bg-rose-50 hover:text-rose-600
            ${isExpanded ? 'w-full px-3.5 justify-start gap-4' : 'w-12 justify-center mx-auto'}
          `}
        >
          <LogOut size={22} className="shrink-0" />
          <span className={`text-[14px] font-semibold whitespace-nowrap transition-all duration-300 ${
            isExpanded ? 'opacity-100' : 'opacity-0 w-0'
          }`}>
            Log out
          </span>
        </button>

      </div>
    </aside>
  );
}