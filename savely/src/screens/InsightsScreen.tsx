import { useMemo } from 'react';
import { ChevronDown, Bell, User } from 'lucide-react';
import { useTransactions } from '../hooks/useTransactions';
import { CategoryBreakdownList } from '../components/insights/CategoryBreakdown';
import { computeInsights, formatDollar } from '../lib/calculations';

export function InsightsScreen() {
  const { data: transactions = [], isLoading } = useTransactions();

  const insights = useMemo(() => computeInsights(transactions), [transactions]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-5 animate-pulse p-6">
        <div className="h-10 w-48 bg-[#2a2a2a] rounded-xl" />
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-[#2a2a2a] rounded-[24px]" />)}
        </div>
        <div className="h-96 bg-white rounded-[32px] opacity-10 mt-4" />
      </div>
    );
  }

  // KPIs are now fully dynamic
  const kpis = [
    {
      label: 'Monthly Comparison',
      value: formatDollar(insights.monthlyComparison), 
      sub: 'more than last month',
      isHighlight: true,
    },
    {
      label: 'Highest Spending',
      value: insights.highestSpending,
      isHighlight: false,
    },
    {
      label: 'Avg Monthly Expense',
      value: formatDollar(insights.avgMonthlyExpense),
      isHighlight: false,
    },
    {
      label: 'Savings Rate',
      value: `${insights.savingsRate}%`,
      isHighlight: false,
    },
  ];

  return (
    <div className="flex flex-col gap-6 h-full font-sans pb-6">
      
      {/* ── Top Header ────────────────────────────────────────────── */}
      <div className="flex justify-between items-center w-full">
        <h1 className="text-white text-[32px] font-semibold tracking-tight">
          Insights
        </h1>
        <div className="flex items-center gap-3">
          <button className="w-11 h-11 rounded-full bg-[#e0e0e0] flex items-center justify-center hover:bg-white transition-colors">
            <Bell size={20} className="text-gray-800" />
          </button>
          <button className="w-11 h-11 rounded-full bg-[#e0e0e0] flex items-center justify-center hover:bg-white transition-colors">
            <User size={20} className="text-gray-800" />
          </button>
        </div>
      </div>

      {/* ── Filter Pill ───────────────────────────────────────────── */}
      <div>
        <button className="flex items-center gap-1.5 bg-[#2a2a2a] text-gray-300 text-sm rounded-full px-4 py-2 hover:bg-[#333] transition-colors border border-[#3a3a3a]">
          this month <ChevronDown size={14} className="ml-1" />
        </button>
      </div>

      {/* ── KPI Cards Row ─────────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map(({ label, value, sub, isHighlight }) => (
          <div
            key={label}
            className={`rounded-[24px] p-6 flex flex-col gap-1 shadow-sm ${
              isHighlight ? 'bg-white' : 'bg-[#e6e6e6]'
            }`}
          >
            <span className="text-gray-600 text-[14px] font-medium mb-2">{label}</span>
            <span className="text-gray-900 text-[36px] font-semibold tracking-tight leading-none">
              {value}
            </span>
            {sub && <span className="text-gray-500 text-[11px] font-medium mt-1">{sub}</span>}
          </div>
        ))}
      </div>

      {/* ── Category Breakdown Component ──────────────────────────── */}
      <CategoryBreakdownList data={insights.breakdown} />
    </div>
  );
}

