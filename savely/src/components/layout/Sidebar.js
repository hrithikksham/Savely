import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Home, Menu, BarChart2, Settings, Eye, Pencil, LogOut, ChevronRight, ChevronLeft } from 'lucide-react';
const NAV = [
    { icon: Home, label: 'Dashboard', route: '/' },
    { icon: Menu, label: 'Transactions', route: '/transactions' },
    { icon: BarChart2, label: 'Insights', route: '/insights' },
    { icon: Settings, label: 'Settings', route: '/settings' },
];
export function Sidebar({ active, onNavigate, role, onRoleToggle }) {
    const [isExpanded, setIsExpanded] = useState(false);
    return (_jsxs("aside", { className: `relative flex flex-col items-center py-6 px-4 shrink-0 transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-sm
        bg-gradient-to-b from-[#ebebeb] to-[#d4d4d4] rounded-[40px]
        ${isExpanded ? 'w-[240px]' : 'w-[88px]'}
      `, children: [_jsx("div", { className: `flex flex-col items-center w-full mb-2 ${isExpanded ? 'items-start px-2' : 'items-center'}`, children: _jsxs("div", { className: "flex items-center gap-3 w-full", children: [_jsx("div", { className: "w-12 h-12 shrink-0 rounded-full bg-gradient-to-br from-[#444] to-[#888] shadow-inner" }), _jsxs("div", { className: `flex flex-col transition-all duration-300 overflow-hidden ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`, children: [_jsx("span", { className: "text-[15px] font-bold text-gray-900 tracking-wide leading-tight", children: "Savely" }), _jsx("span", { className: "text-[11px] font-medium text-gray-500 uppercase tracking-widest", children: role })] })] }) }), _jsx("div", { className: `h-px bg-black/10 my-4 transition-all duration-300 ${isExpanded ? 'w-full' : 'w-10'}` }), _jsx("div", { className: "flex flex-col gap-3 w-full", children: NAV.map(({ icon: Icon, label, route }) => {
                    const isActive = active === route;
                    return (_jsxs("button", { title: isExpanded ? '' : label, onClick: () => onNavigate(route), className: `
                flex items-center h-12 rounded-[16px] border-none cursor-pointer transition-all duration-200 overflow-hidden
                ${isActive
                            ? 'bg-white text-gray-900 shadow-[0_2px_10px_rgba(0,0,0,0.06)]'
                            : 'bg-transparent text-gray-500 hover:text-gray-900 hover:bg-white/40'}
                ${isExpanded ? 'w-full px-3.5 justify-start gap-4' : 'w-12 justify-center mx-auto'}
              `, children: [_jsx(Icon, { size: 22, strokeWidth: isActive ? 2.5 : 2, className: "shrink-0" }), _jsx("span", { className: `text-[14px] font-semibold whitespace-nowrap transition-all duration-300 ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 w-0'}`, children: label })] }, route));
                }) }), _jsx("div", { className: "flex-1" }), _jsxs("div", { className: "flex flex-col gap-3 w-full", children: [_jsxs("button", { onClick: onRoleToggle, title: `Switch to ${role === 'editor' ? 'Viewer' : 'Editor'} mode`, className: `
            flex items-center h-12 rounded-[16px] border-none cursor-pointer transition-all duration-300 overflow-hidden text-white shadow-md
            ${role === 'editor' ? 'bg-[#1d4ed8] hover:bg-blue-600' : 'bg-[#777] hover:bg-[#666]'}
            ${isExpanded ? 'w-full px-3.5 justify-start gap-4' : 'w-12 justify-center mx-auto'}
          `, children: [role === 'editor' ? _jsx(Pencil, { size: 20, className: "shrink-0" }) : _jsx(Eye, { size: 20, className: "shrink-0" }), _jsx("span", { className: `text-[13px] font-medium whitespace-nowrap transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`, children: role === 'editor' ? 'Editor Mode' : 'Viewer Mode' })] }), _jsxs("button", { onClick: () => setIsExpanded(!isExpanded), className: `
            flex items-center h-12 rounded-[16px] border-none bg-transparent text-gray-500 cursor-pointer transition-all duration-200 overflow-hidden hover:bg-white/40 hover:text-gray-900
            ${isExpanded ? 'w-full px-3.5 justify-start gap-4' : 'w-12 justify-center mx-auto'}
          `, children: [isExpanded ? _jsx(ChevronLeft, { size: 22, className: "shrink-0" }) : _jsx(ChevronRight, { size: 22, className: "shrink-0" }), _jsx("span", { className: `text-[14px] font-semibold whitespace-nowrap transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`, children: "Collapse" })] }), _jsxs("button", { className: `
            flex items-center h-12 rounded-[16px] border-none bg-transparent text-rose-500/80 cursor-pointer transition-all duration-200 overflow-hidden hover:bg-rose-50 hover:text-rose-600
            ${isExpanded ? 'w-full px-3.5 justify-start gap-4' : 'w-12 justify-center mx-auto'}
          `, children: [_jsx(LogOut, { size: 22, className: "shrink-0" }), _jsx("span", { className: `text-[14px] font-semibold whitespace-nowrap transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`, children: "Log out" })] })] })] }));
}
