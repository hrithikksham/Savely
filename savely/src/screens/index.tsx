import { useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTransactions } from '../hooks/useTransactions';
import { KpiCard } from '../components/dashboard/KpiCard';
import { BalanceTrendChart } from '../components/dashboard/BalanceTrendChart';
import { MonthlyComparisonChart } from '../components/dashboard/MonthlyComparisonChart';
import { SpendingsBreakdown } from '../components/dashboard/SpendingsBreakdown';
import { computeTotals, computeCategoryBreakdown, computeMonthlyComparison, computeBalanceTrend, formatDollar } from '../lib/calculations';

export function DashboardScreen() {
  const { data: transactions = [], isLoading } = useTransactions();

  const { income, expenses, balance, savingsRate } = useMemo(() => computeTotals(transactions), [transactions]);
  const breakdown   = useMemo(() => computeCategoryBreakdown(transactions), [transactions]);
  const monthlyData = useMemo(() => computeMonthlyComparison(transactions), [transactions]);
  const trendData   = useMemo(() => computeBalanceTrend(transactions), [transactions]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-5 h-full" style={{ animation: 'pulse 2s infinite' }}>
        <div className="h-8 w-48 rounded-xl" style={{ background: '#3a3a3a' }} />
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-32 rounded-2xl" style={{ background: '#3a3a3a' }} />)}
        </div>
        <div className="h-48 rounded-2xl" style={{ background: '#3a3a3a' }} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5" style={{ height: '100%' }}>
      {/* Title row */}
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-white font-bold" style={{ fontSize: 28 }}>Hello, Hrithik!</h1>
        <button className="flex items-center gap-1.5 text-gray-300 text-sm rounded-full px-4 py-2 hover:opacity-80 transition-opacity cursor-pointer" style={{ background: '#3a3a3a' }}>
          this month <ChevronDown size={14} />
        </button>
      </div>

      {/* Top section: KPIs + Balance Trend */}
      <div className="grid gap-4 shrink-0" style={{ gridTemplateColumns: '1fr 1fr 2fr', gridTemplateRows: 'auto auto', alignItems: 'stretch' }}>
        <KpiCard title="Total Balance"  value={formatDollar(balance)}   blueArrow />
        <KpiCard title="Total Incomes"  value={formatDollar(income)}    delta="+4.2% vs last month" deltaPositive />
        <div className="row-span-2" style={{ minHeight: 240 }}>
          <BalanceTrendChart data={trendData} />
        </div>
        <KpiCard title="Total Expenses" value={formatDollar(expenses)}  delta="-1.2% vs last month" deltaPositive={false} />
        <KpiCard title="Savings Rate"   value={`${savingsRate}%`} />
      </div>

      {/* Bottom section: Monthly Comparison + Spendings Breakdown */}
      <div className="grid gap-4 shrink-0" style={{ gridTemplateColumns: '3fr 2fr' }}>
        <MonthlyComparisonChart data={monthlyData} />
        <SpendingsBreakdown data={breakdown} />
      </div>
    </div>
  );
}