import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowUpRight } from 'lucide-react';
export function SpendingsBreakdown({ data = [] }) {
    // SVG Math for the Donut Chart
    const radius = 14;
    const circumference = 2 * Math.PI * radius;
    let currentOffset = 0;
    // Take only the top 4 categories so the legend fits perfectly in the Dashboard card
    const displayData = data.slice(0, 4);
    return (_jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-gray-900 text-[18px] font-medium tracking-tight", children: "Spendings Breakdown" }), _jsx("button", { className: "w-8 h-8 rounded-full bg-[#f4f4f4] flex items-center justify-center text-gray-800 hover:bg-[#e6e6e6] transition-colors", children: _jsx(ArrowUpRight, { size: 16, strokeWidth: 2.5 }) })] }), _jsxs("div", { className: "flex items-center justify-center gap-8 flex-1 w-full px-4", children: [_jsx("div", { className: "w-[140px] h-[140px] shrink-0 relative", children: _jsxs("svg", { viewBox: "0 0 32 32", className: "w-full h-full -rotate-90 transform drop-shadow-sm", children: [_jsx("circle", { cx: "16", cy: "16", r: radius, fill: "none", stroke: "#f4f4f4", strokeWidth: "4" }), displayData.map((item, idx) => {
                                    const strokeLength = (item.percentage / 100) * circumference;
                                    // Add a 1px gap between slices if the slice is large enough to see
                                    const gap = strokeLength > 2 ? 1 : 0;
                                    const dasharray = `${Math.max(0, strokeLength - gap)} ${circumference}`;
                                    const dashoffset = -currentOffset;
                                    currentOffset += strokeLength;
                                    return (_jsx("circle", { cx: "16", cy: "16", r: radius, fill: "none", stroke: item.color || '#94a3b8', strokeWidth: "4", strokeDasharray: dasharray, strokeDashoffset: dashoffset, className: "transition-all duration-1000 ease-out origin-center" }, idx));
                                })] }) }), _jsxs("div", { className: "flex flex-col justify-center gap-4 flex-1", children: [displayData.map((item, idx) => (_jsxs("div", { className: "flex items-center justify-between text-[13px]", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-2.5 h-2.5 rounded-[2px]", style: { backgroundColor: item.color || '#94a3b8' } }), _jsx("span", { className: "text-gray-600 font-medium tracking-wide", children: item.category })] }), _jsxs("span", { className: "text-gray-900 font-bold tracking-wide", children: ["\u20B9", item.amount.toLocaleString('en-IN')] })] }, idx))), data.length > 4 && (_jsx("div", { className: "flex items-center justify-between text-[13px] opacity-50 mt-1", children: _jsxs("span", { className: "text-gray-600 font-medium tracking-wide pl-5", children: ["+ ", data.length - 4, " more"] }) }))] })] })] }));
}
