export type TransactionType = 'income' | 'expense';

export type Category =
  | 'Rent'
  | 'Shopping'
  | 'Food & Dining'
  | 'Transportation'
  | 'Healthcare'
  | 'Utilities'
  | 'Entertainment'
  | 'Salary'
  | 'Freelance'
  | 'Investment'
  | 'Other';

export interface Transaction {
  id: string;
  date: string; // ISO date string YYYY-MM-DD
  description: string;
  category: Category;
  type: TransactionType;
  amount: number; // always positive; type determines sign
}

export interface CategoryBreakdown {
  category: Category;
  amount: number;
  percentage: number;
  color: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}

export interface BalanceTrendPoint {
  date: string;
  balance: number;
}

export interface InsightsSummary {
  monthlyComparison: number;
  highestSpending: Category;
  avgMonthlyExpense: number;
  savingsRate: number;
  breakdown: CategoryBreakdown[];
}

export type FilterType = 'all' | 'income' | 'expense';