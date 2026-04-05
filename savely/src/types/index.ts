// 1. Better scalability: Group types conceptually
export type TransactionType = 'income' | 'expense';
export type FilterType = 'all' | TransactionType; // Reusing TransactionType for DRYness

// 2. Extracted arrays as read-only tuples (Optional but highly recommended)
// If you ever need to iterate over categories in a UI dropdown without importing a separate constant
export const CATEGORY_NAMES = [
  'Rent',
  'Shopping',
  'Food & Dining',
  'Transportation',
  'Healthcare',
  'Utilities',
  'Entertainment',
  'Salary',
  'Freelance',
  'Investment',
  'Other'
] as const;

// Automatically extract the union type from the array above.
// This prevents you from ever having to update a string in two places.
export type Category = typeof CATEGORY_NAMES[number];

// 3. Core Models
export interface Transaction {
  id: string;
  date: string; // Expected format: 'YYYY-MM-DD'
  description: string;
  category: Category;
  type: TransactionType;
  /**
   * Absolute value of the transaction.
   * Do not store negative numbers here; use `type` to determine cash flow direction.
   */
  amount: number; 
}

// 4. Derived / Computed Data Models (Used for Charts & Insights)
export interface CategoryBreakdown {
  category: Category;
  amount: number;
  percentage: number;
  color: string; // Hex code (e.g., '#ff0000')
}

export interface MonthlyData {
  month: string; // e.g., 'Jan', 'Feb'
  income: number;
  expenses: number;
}

export interface BalanceTrendPoint {
  date: string; // e.g., 'Jan 15'
  balance: number;
}

export interface InsightsSummary {
  monthlyComparison: number; // Difference between current and previous month's expenses
  highestSpending: Category | 'N/A'; // N/A if no data exists
  avgMonthlyExpense: number;
  savingsRate: number; // Percentage (0-100)
  breakdown: CategoryBreakdown[];
}