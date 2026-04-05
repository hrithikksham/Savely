import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function CategoryBreakdownList({ data = [] }) {
    const fallbackData = [
        { category: 'Rent', amount: 14000, percentage: 96.6, color: '#ef4444' },
        { category: 'Transportation', amount: 499, percentage: 3.4, color: '#3b82f6' },
        { category: 'Food & Dining', amount: 8000, percentage: 30, color: '#64748b' },
        { category: 'Entertainment', amount: 2000, percentage: 10, color: '#10b981' },
        { category: 'Healthcare', amount: 1500, percentage: 5, color: '#f97316' },
        { category: 'Utilities', amount: 1200, percentage: 4, color: '#06b6d4' },
        { category: 'Other', amount: 500, percentage: 2, color: '#8b5cf6' },
    ];
    const displayData = data.length > 0 ? data : fallbackData;
    return (_jsxs("div", { className: "bg-white rounded-[24px] p-8 flex-1 shadow-sm flex flex-col", children: [_jsx("h2", { className: "text-gray-900 text-[18px] font-medium mb-8 tracking-tight", children: "Spendings Breakdown" }), _jsx("div", { className: "flex flex-col gap-6", children: displayData.map((item, idx) => (_jsxs("div", { className: "flex flex-col gap-2.5", children: [_jsxs("div", { className: "flex justify-between items-center text-[13px]", children: [_jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx("div", { className: "w-2.5 h-2.5 rounded-[2px]", style: { backgroundColor: item.color } }), _jsx("span", { className: "text-gray-800 font-semibold tracking-wide", children: item.category })] }), _jsxs("div", { className: "text-gray-900 font-bold tracking-wide", children: ["\u20B9", item.amount.toLocaleString('en-IN'), _jsx("span", { className: "mx-1.5 font-normal text-gray-400", children: "\u00B7" }), _jsxs("span", { className: "text-gray-500 font-semibold", children: [item.percentage, "%"] })] })] }), _jsx("div", { className: "w-full bg-[#f4f4f4] h-[6px] rounded-full overflow-hidden", children: _jsx("div", { className: "h-full rounded-full transition-all duration-1000 ease-out", style: {
                                    width: `${item.percentage}%`,
                                    backgroundColor: item.color
                                } }) })] }, idx))) })] }));
}
