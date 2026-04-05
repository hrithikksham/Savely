import { CATEGORY_COLORS } from './data';
import { format, parseISO, isSameMonth, subMonths } from 'date-fns';
export function formatCurrency(amount, compact = false) {
    if (compact && amount >= 1000) {
        return `₹${(amount / 1000).toFixed(1)}k`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
}
export function formatDollar(amount) {
    return `$ ${amount.toLocaleString('en-US')}`;
}
export function formatDate(iso) {
    return format(parseISO(iso), 'yyyy-MM-dd');
}
export function formatMonthShort(iso) {
    return format(parseISO(iso), 'MMM');
}
// ─── Computed summaries ───────────────────────────────────────────────────────
export function computeTotals(transactions) {
    const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const balance = income - expenses;
    const savingsRate = income > 0 ? Math.round(((income - expenses) / income) * 100) : 0;
    return { income, expenses, balance, savingsRate };
}
export function computeCategoryBreakdown(transactions) {
    const expenses = transactions.filter(t => t.type === 'expense');
    const total = expenses.reduce((s, t) => s + t.amount, 0);
    const map = new Map();
    for (const t of expenses) {
        map.set(t.category, (map.get(t.category) ?? 0) + t.amount);
    }
    return Array.from(map.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([cat, amount]) => ({
        category: cat,
        amount,
        percentage: total > 0 ? Math.round((amount / total) * 1000) / 10 : 0,
        color: CATEGORY_COLORS[cat] ?? '#94a3b8',
    }));
}
export function computeMonthlyComparison(transactions) {
    const now = new Date();
    return Array.from({ length: 3 }, (_, i) => {
        const month = subMonths(now, 2 - i);
        const monthTxns = transactions.filter(t => isSameMonth(parseISO(t.date), month));
        const income = monthTxns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
        const expenses = monthTxns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
        return { month: format(month, 'MMM'), income, expenses };
    });
}
export function computeBalanceTrend(transactions) {
    const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));
    let balance = 0;
    return sorted.map(t => {
        balance += t.type === 'income' ? t.amount : -t.amount;
        return { date: format(parseISO(t.date), 'MMM d'), balance };
    });
}
export function computeInsights(transactions) {
    const now = new Date();
    const thisMonth = transactions.filter(t => isSameMonth(parseISO(t.date), now));
    const lastMonth = transactions.filter(t => isSameMonth(parseISO(t.date), subMonths(now, 1)));
    const thisExpenses = thisMonth.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const lastExpenses = lastMonth.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const monthlyComparison = thisExpenses - lastExpenses;
    const breakdown = computeCategoryBreakdown(thisMonth);
    const highestSpending = breakdown[0]?.category ?? 'N/A';
    const uniqueMonths = new Set(transactions.map(t => t.date.substring(0, 7))).size || 1;
    const { expenses: totalLifetimeExpenses } = computeTotals(transactions);
    const avgMonthlyExpense = totalLifetimeExpenses / uniqueMonths;
    // Calculate Savings Rate based on this month's performance
    const { savingsRate } = computeTotals(thisMonth);
    return {
        monthlyComparison,
        highestSpending,
        avgMonthlyExpense,
        savingsRate,
        breakdown,
    };
}
