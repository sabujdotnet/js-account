export type TransactionType = 'income' | 'expense';

export type TransactionCategory = 'materials' | 'labor' | 'equipment' | 'other' | 'income';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: TransactionCategory;
  description: string;
  date: string;
  createdAt: string;
}

export interface Worker {
  id: string;
  name: string;
  hourlyRate: number;
  createdAt: string;
}

export interface LaborPayment {
  id: string;
  workerId: string;
  workerName: string;
  hoursWorked: number;
  hourlyRate: number;
  totalAmount: number;
  weekStart: string;
  isPaid: boolean;
  notes: string;
  createdAt: string;
}

export interface Plugin {
  id: string;
  name: string;
  description: string;
  version: string;
  icon: string;
  isInstalled: boolean;
  isEnabled: boolean;
  author: string;
}

export interface WeekSummary {
  weekStart: string;
  weekEnd: string;
  totalPayroll: number;
  paidAmount: number;
  unpaidAmount: number;
  payments: LaborPayment[];
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  categoryBreakdown: Record<TransactionCategory, number>;
}

export type PeriodFilter = 'week' | 'month' | 'year';

/**
 * Bangladesh currency settings
 */
export interface CurrencySettings {
  code: 'BDT';
  symbol: '৳';
  name: 'Bangladeshi Taka';
  locale: 'bn-BD';
}

export const DEFAULT_CURRENCY: CurrencySettings = {
  code: 'BDT',
  symbol: '৳',
  name: 'Bangladeshi Taka',
  locale: 'bn-BD',
};
