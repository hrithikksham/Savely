import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTransactions } from '../hooks/useTransactions';
import { Header } from '../components/layout/Header';
import { BalanceTrendChart } from '../components/dashboard/BalanceTrendChart';
import { MonthlyComparisonChart } from '../components/dashboard/MonthlyComparisonChart';
import { SpendingsBreakdown } from '../components/dashboard/SpendingsBreakdown';
import { KpiCard } from '../components/dashboard/KpiCard';
import { computeTotals, computeCategoryBreakdown, computeMonthlyComparison, computeBalanceTrend, formatDollar } from '../lib/calculations';
export function DashboardScreen() {
    const { data: tx = [], isLoading } = useTransactions();
    // Memoize heavy calculations so they don't re-run on every render
    const { income, expenses, balance, savingsRate } = useMemo(() => computeTotals(tx), [tx]);
    const breakdown = useMemo(() => computeCategoryBreakdown(tx), [tx]);
    const monthlyData = useMemo(() => computeMonthlyComparison(tx), [tx]);
    const trendData = useMemo(() => computeBalanceTrend(tx), [tx]);
    // ── Skeleton Loader ────────────────────────────────────────────────
    if (isLoading) {
        return (_jsxs("div", { className: "flex flex-col gap-6 animate-pulse pb-6 pr-2", children: [_jsx("div", { className: "h-12 w-full bg-[#2a2a2a] rounded-xl mb-2" }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("div", { className: "h-10 w-64 bg-[#2a2a2a] rounded-xl" }), _jsx("div", { className: "h-10 w-32 bg-[#2a2a2a] rounded-full" })] }), _jsxs("div", { className: "flex gap-4", children: [_jsx("div", { className: "grid grid-cols-2 grid-rows-2 gap-4 w-[55%] shrink-0", children: [...Array(4)].map((_, i) => _jsx("div", { className: "h-[140px] bg-[#2a2a2a] rounded-[24px]" }, i)) }), _jsx("div", { className: "flex-1 bg-[#2a2a2a] rounded-[24px]" })] }), _jsxs("div", { className: "flex gap-4", children: [_jsx("div", { className: "w-[55%] shrink-0 h-[280px] bg-[#2a2a2a] rounded-[24px]" }), _jsx("div", { className: "flex-1 h-[280px] bg-[#2a2a2a] rounded-[24px]" })] })] }));
    }
    // ── Main UI ────────────────────────────────────────────────────────
    return (_jsxs("div", { className: "flex flex-col gap-6 pb-6 font-sans h-full overflow-y-auto pr-2 custom-scrollbar", children: [_jsx(Header, { showSearch: true }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: "text-white text-[32px] font-semibold tracking-tight m-0", children: "Hello, Hrithik!" }), _jsxs("button", { className: "flex items-center gap-1.5 bg-[#2a2a2a] text-gray-300 border border-transparent rounded-full px-5 py-2.5 text-[13px] hover:bg-[#333] hover:border-[#444] transition-colors", children: ["this month ", _jsx(ChevronDown, { size: 14, className: "ml-1 text-gray-400" })] })] }), _jsxs("div", { className: "flex gap-4 items-stretch", children: [_jsxs("div", { className: "grid grid-cols-2 grid-rows-2 gap-4 w-[55%] shrink-0", children: [_jsx(KpiCard, { title: "Total Balance", value: formatDollar(balance), blueArrow: true }), _jsx(KpiCard, { title: "Total Incomes", value: formatDollar(income), delta: "+ 4.2% vs last month", deltaPositive: true }), _jsx(KpiCard, { title: "Total Expenses", value: formatDollar(expenses), delta: "- 1.2% vs last month", deltaPositive: false }), _jsx(KpiCard, { title: "Savings Rate", value: `${savingsRate}%` })] }), _jsx("div", { className: "flex-1 min-h-[280px] bg-[#2a2a2a] rounded-[24px] p-6 shadow-sm overflow-hidden", children: _jsx(BalanceTrendChart, { data: trendData }) })] }), _jsxs("div", { className: "flex gap-4 items-stretch", children: [_jsx("div", { className: "w-[55%] shrink-0 bg-[#2a2a2a] rounded-[24px] p-6 shadow-sm overflow-hidden", children: _jsx(MonthlyComparisonChart, { data: monthlyData }) }), _jsx("div", { className: "flex-1 bg-white rounded-[24px] p-6 shadow-sm overflow-hidden", children: _jsx(SpendingsBreakdown, { data: breakdown }) })] })] }));
}
