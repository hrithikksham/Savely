import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bell, User, Search } from 'lucide-react';
import { format } from 'date-fns';
export function Header({ showSearch = false, searchValue = '', onSearchChange }) {
    // Formats the date to match your mockup: "Monday, 6 Apr 2026"
    const today = format(new Date(), 'EEEE, d MMM yyyy');
    return (_jsxs("div", { className: "flex items-center justify-between w-full mb-2", children: [_jsxs("div", { className: "flex items-center gap-6", children: [showSearch && (_jsxs("div", { className: "relative w-[280px]", children: [_jsx(Search, { size: 16, className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" }), _jsx("input", { value: searchValue, onChange: e => onSearchChange?.(e.target.value), placeholder: "Search", className: "w-full bg-black text-gray-300 placeholder-gray-500 rounded-full pl-10 pr-4 py-2.5 text-[14px] outline-none border border-transparent focus:border-[#444] transition-colors" })] })), _jsx("span", { className: "text-gray-400 text-[15px] font-medium tracking-wide", children: today })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { className: "w-11 h-11 rounded-full bg-[#e6e6e6] flex items-center justify-center text-gray-800 hover:bg-white transition-colors shadow-sm", children: _jsx(Bell, { size: 20 }) }), _jsx("button", { className: "w-11 h-11 rounded-full bg-[#e6e6e6] flex items-center justify-center text-gray-800 hover:bg-white transition-colors shadow-sm", children: _jsx(User, { size: 20 }) })] })] }));
}
