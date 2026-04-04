import { useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTransactions } from '../hooks/useTransactions';
import { CategoryBreakdownList } from '../components/insights/CategoryBreakdown';
import { computeInsights, formatDollar, formatCurrency } from '../lib/calculations';

export function InsightsScreen() {
  const { data: transactions = [], isLoading } = useTransactions();

  const insights = useMemo(() => computeInsights(transactions), [transactions]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-5 animate-pulse">
        <div className="h-8 w-32 bg-[#3a3a3a] rounded-xl" />
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-28 bg-[#3a3a3a] rounded-2xl" />)}
        </div>
        <div className="h-64 bg-[#3a3a3a] rounded-2xl" />
      </div>
    );
  }

  const kpis = [
    {
      label: 'Monthly Comparison',
      value: formatCurrency(Math.abs(insights.monthlyComparison), true),
      sub: 'more than last month',
      dark: true,
    },
    {
      label: 'Highest Spending',
      value: insights.highestSpending,
      dark: false,
    },
    {
      label: 'Avg Monthly Expense',
      value: formatDollar(insights.avgMonthlyExpense),
      dark: false,
    },
    {
      label: 'Savings Rate',
      value: `${insights.savingsRate}%`,
      dark: false,
    },
  ];

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Title + filter */}
      <div className="flex items-center gap-3">
        <h1 className="text-white text-3xl font-bold">Insights</h1>
        <button className="flex items-center gap-1.5 bg-[#3a3a3a] text-gray-300 text-sm rounded-full px-3 py-1.5 hover:bg-[#444] transition-colors">
          this month <ChevronDown size={12} />
        </button>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map(({ label, value, sub, dark }) => (
          <div
            key={label}
            className={`rounded-2xl p-5 flex flex-col gap-2 ${dark ? 'bg-[#f0f0f0]' : 'bg-[#f0f0f0]'}`}
          >
            <span className="text-gray-500 text-sm">{label}</span>
            <span className="text-gray-900 text-2xl font-semibold leading-tight">{value}</span>
            {sub && <span className="text-gray-400 text-xs">{sub}</span>}
          </div>
        ))}
      </div>

      {/* Category breakdown */}
      <CategoryBreakdownList data={insights.breakdown} />
    </div>
  );
}