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
  const breakdown   = useMemo(() => computeCategoryBreakdown(tx), [tx]);
  const monthlyData = useMemo(() => computeMonthlyComparison(tx), [tx]);
  const trendData   = useMemo(() => computeBalanceTrend(tx), [tx]);

  // ── Skeleton Loader ────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 animate-pulse pb-6 pr-2">
        <div className="h-12 w-full bg-[#2a2a2a] rounded-xl mb-2" />
        <div className="flex justify-between items-center">
          <div className="h-10 w-64 bg-[#2a2a2a] rounded-xl" />
          <div className="h-10 w-32 bg-[#2a2a2a] rounded-full" />
        </div>
        <div className="flex gap-4">
          <div className="grid grid-cols-2 grid-rows-2 gap-4 w-[55%] shrink-0">
            {[...Array(4)].map((_, i) => <div key={i} className="h-[140px] bg-[#2a2a2a] rounded-[24px]" />)}
          </div>
          <div className="flex-1 bg-[#2a2a2a] rounded-[24px]" />
        </div>
        <div className="flex gap-4">
          <div className="w-[55%] shrink-0 h-[280px] bg-[#2a2a2a] rounded-[24px]" />
          <div className="flex-1 h-[280px] bg-[#2a2a2a] rounded-[24px]" />
        </div>
      </div>
    );
  }

  // ── Main UI ────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-6 pb-6 font-sans h-full overflow-y-auto pr-2 custom-scrollbar">

      <Header showSearch={true} />

      {/* Title Row */}
      <div className="flex items-center justify-between">
        <h1 className="text-white text-[32px] font-semibold tracking-tight m-0">
          Hello, Hrithik!
        </h1>
        <button className="flex items-center gap-1.5 bg-[#2a2a2a] text-gray-300 border border-transparent rounded-full px-5 py-2.5 text-[13px] hover:bg-[#333] hover:border-[#444] transition-colors">
          this month <ChevronDown size={14} className="ml-1 text-gray-400" />
        </button>
      </div>

      {/* Top Section: KPI Grid + Balance Trend */}
      <div className="flex gap-4 items-stretch">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 w-[55%] shrink-0">
          <KpiCard title="Total Balance"  value={formatDollar(balance)}  blueArrow />
          <KpiCard title="Total Incomes"  value={formatDollar(income)}   delta="+ 4.2% vs last month" deltaPositive />
          <KpiCard title="Total Expenses" value={formatDollar(expenses)} delta="- 1.2% vs last month" deltaPositive={false} />
          <KpiCard title="Savings Rate"   value={`${savingsRate}%`} />
        </div>

        <div className="flex-1 min-h-[280px] bg-[#2a2a2a] rounded-[24px] p-6 shadow-sm overflow-hidden">
          <BalanceTrendChart data={trendData} />
        </div>
      </div>

      {/* Bottom Section: Monthly Comparison + Breakdown */}
      <div className="flex gap-4 items-stretch">
        <div className="w-[55%] shrink-0 bg-[#2a2a2a] rounded-[24px] p-6 shadow-sm overflow-hidden">
          <MonthlyComparisonChart data={monthlyData} />
        </div>
        <div className="flex-1 bg-white rounded-[24px] p-6 shadow-sm overflow-hidden">
          <SpendingsBreakdown data={breakdown} />
        </div>
      </div>

    </div>
  );
}