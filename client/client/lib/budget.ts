/**
 * Budget Planning Module
 * Author: sabujdotnet
 * Website: https://sabujdotnet.github.io
 * 
 * Budget planning and tracking for construction projects
 */

import { generateId, formatCurrency } from './storage';
import { EXPENSE_CATEGORIES, getCategory } from '@/constants/categories';

/**
 * Budget item interface
 */
export interface BudgetItem {
  id: string;
  categoryId: string;
  subcategoryId?: string;
  description: string;
  estimatedAmount: number;
  actualAmount: number;
  notes?: string;
}

/**
 * Budget interface
 */
export interface Budget {
  id: string;
  name: string;
  nameBn?: string;
  description?: string;
  
  // Project details
  projectName: string;
  projectAddress?: string;
  startDate?: string;
  endDate?: string;
  
  // Budget items
  items: BudgetItem[];
  
  // Totals
  totalEstimated: number;
  totalActual: number;
  variance: number;
  variancePercent: number;
  
  // Status
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  
  // Currency
  currency: string;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}

/**
 * Create a new budget
 */
export function createBudget(
  name: string,
  projectName: string,
  options: {
    description?: string;
    nameBn?: string;
    projectAddress?: string;
    startDate?: string;
    endDate?: string;
    currency?: string;
  } = {}
): Budget {
  const now = new Date().toISOString();
  
  return {
    id: generateId(),
    name,
    nameBn: options.nameBn,
    description: options.description,
    projectName,
    projectAddress: options.projectAddress,
    startDate: options.startDate,
    endDate: options.endDate,
    items: [],
    totalEstimated: 0,
    totalActual: 0,
    variance: 0,
    variancePercent: 0,
    status: 'draft',
    currency: options.currency || 'BDT',
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Add item to budget
 */
export function addBudgetItem(
  budget: Budget,
  item: Omit<BudgetItem, 'id' | 'actualAmount'>
): Budget {
  const newItem: BudgetItem = {
    id: generateId(),
    ...item,
    actualAmount: 0,
  };
  
  const updatedItems = [...budget.items, newItem];
  return recalculateBudget({ ...budget, items: updatedItems });
}

/**
 * Update budget item actual amount
 */
export function updateBudgetItemActual(
  budget: Budget,
  itemId: string,
  actualAmount: number
): Budget {
  const updatedItems = budget.items.map(item =>
    item.id === itemId ? { ...item, actualAmount } : item
  );
  
  return recalculateBudget({ ...budget, items: updatedItems });
}

/**
 * Remove item from budget
 */
export function removeBudgetItem(budget: Budget, itemId: string): Budget {
  const updatedItems = budget.items.filter(item => item.id !== itemId);
  return recalculateBudget({ ...budget, items: updatedItems });
}

/**
 * Recalculate budget totals
 */
export function recalculateBudget(budget: Budget): Budget {
  const totalEstimated = budget.items.reduce((sum, item) => sum + item.estimatedAmount, 0);
  const totalActual = budget.items.reduce((sum, item) => sum + item.actualAmount, 0);
  const variance = totalActual - totalEstimated;
  const variancePercent = totalEstimated > 0 ? (variance / totalEstimated) * 100 : 0;
  
  return {
    ...budget,
    totalEstimated,
    totalActual,
    variance,
    variancePercent,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Budget templates for common projects
 */
export interface BudgetTemplate {
  id: string;
  name: string;
  nameBn: string;
  description: string;
  descriptionBn: string;
  defaultItems: Omit<BudgetItem, 'id' | 'actualAmount'>[];
}

export const BUDGET_TEMPLATES: BudgetTemplate[] = [
  {
    id: 'residential-1200',
    name: 'Residential (1200 sqft)',
    nameBn: 'আবাসিক (১২০০ বর্গফুট)',
    description: 'Standard 3-bedroom residential building',
    descriptionBn: 'স্ট্যান্ডার্ড ৩ বেডরুম আবাসিক ভবন',
    defaultItems: [
      { categoryId: 'materials', subcategoryId: 'mat-cement', description: 'Cement (400 bags)', estimatedAmount: 208000 },
      { categoryId: 'materials', subcategoryId: 'mat-steel', description: 'Steel Rods (3000 kg)', estimatedAmount: 285000 },
      { categoryId: 'materials', subcategoryId: 'mat-bricks', description: 'Bricks (25000 pcs)', estimatedAmount: 300000 },
      { categoryId: 'materials', subcategoryId: 'mat-sand', description: 'Sand & Aggregates', estimatedAmount: 150000 },
      { categoryId: 'labor', subcategoryId: 'lab-mason', description: 'Masonry Work', estimatedAmount: 180000 },
      { categoryId: 'labor', subcategoryId: 'lab-helper', description: 'Helper Labor', estimatedAmount: 80000 },
      { categoryId: 'utilities', subcategoryId: 'utl-electricity', description: 'Electrical Work', estimatedAmount: 120000 },
      { categoryId: 'utilities', subcategoryId: 'utl-water', description: 'Plumbing Work', estimatedAmount: 100000 },
      { categoryId: 'materials', subcategoryId: 'mat-tiles', description: 'Tiles & Flooring', estimatedAmount: 150000 },
      { categoryId: 'materials', subcategoryId: 'mat-paint', description: 'Painting Work', estimatedAmount: 80000 },
    ],
  },
  {
    id: 'residential-2000',
    name: 'Residential (2000 sqft)',
    nameBn: 'আবাসিক (২০০০ বর্গফুট)',
    description: 'Large 4-bedroom residential building',
    descriptionBn: 'বড় ৪ বেডরুম আবাসিক ভবন',
    defaultItems: [
      { categoryId: 'materials', subcategoryId: 'mat-cement', description: 'Cement (700 bags)', estimatedAmount: 364000 },
      { categoryId: 'materials', subcategoryId: 'mat-steel', description: 'Steel Rods (5000 kg)', estimatedAmount: 475000 },
      { categoryId: 'materials', subcategoryId: 'mat-bricks', description: 'Bricks (40000 pcs)', estimatedAmount: 480000 },
      { categoryId: 'materials', subcategoryId: 'mat-sand', description: 'Sand & Aggregates', estimatedAmount: 250000 },
      { categoryId: 'labor', subcategoryId: 'lab-mason', description: 'Masonry Work', estimatedAmount: 300000 },
      { categoryId: 'labor', subcategoryId: 'lab-helper', description: 'Helper Labor', estimatedAmount: 150000 },
      { categoryId: 'utilities', subcategoryId: 'utl-electricity', description: 'Electrical Work', estimatedAmount: 200000 },
      { categoryId: 'utilities', subcategoryId: 'utl-water', description: 'Plumbing Work', estimatedAmount: 180000 },
      { categoryId: 'materials', subcategoryId: 'mat-tiles', description: 'Tiles & Flooring', estimatedAmount: 280000 },
      { categoryId: 'materials', subcategoryId: 'mat-paint', description: 'Painting Work', estimatedAmount: 150000 },
    ],
  },
  {
    id: 'commercial-3000',
    name: 'Commercial (3000 sqft)',
    nameBn: 'বাণিজ্যিক (৩০০০ বর্গফুট)',
    description: 'Commercial office space',
    descriptionBn: 'বাণিজ্যিক অফিস স্পেস',
    defaultItems: [
      { categoryId: 'materials', subcategoryId: 'mat-cement', description: 'Cement (1000 bags)', estimatedAmount: 520000 },
      { categoryId: 'materials', subcategoryId: 'mat-steel', description: 'Steel Rods (8000 kg)', estimatedAmount: 760000 },
      { categoryId: 'materials', subcategoryId: 'mat-bricks', description: 'Bricks (60000 pcs)', estimatedAmount: 720000 },
      { categoryId: 'materials', subcategoryId: 'mat-glass', description: 'Glass & Aluminum', estimatedAmount: 400000 },
      { categoryId: 'labor', subcategoryId: 'lab-mason', description: 'Masonry Work', estimatedAmount: 450000 },
      { categoryId: 'utilities', subcategoryId: 'utl-electricity', description: 'Electrical Work', estimatedAmount: 350000 },
      { categoryId: 'utilities', subcategoryId: 'utl-water', description: 'Plumbing Work', estimatedAmount: 250000 },
      { categoryId: 'materials', subcategoryId: 'mat-tiles', description: 'Flooring', estimatedAmount: 450000 },
      { categoryId: 'consulting', subcategoryId: 'prof-architect', description: 'Architect Fees', estimatedAmount: 200000 },
      { categoryId: 'permits', subcategoryId: 'perm-building', description: 'Permits & Fees', estimatedAmount: 150000 },
    ],
  },
  {
    id: 'renovation-standard',
    name: 'Standard Renovation',
    nameBn: 'স্ট্যান্ডার্ড পুনর্নির্মাণ',
    description: 'Basic renovation package',
    descriptionBn: 'বেসিক পুনর্নির্মাণ প্যাকেজ',
    defaultItems: [
      { categoryId: 'materials', subcategoryId: 'mat-tiles', description: 'Tile Replacement', estimatedAmount: 80000 },
      { categoryId: 'labor', subcategoryId: 'lab-painter', description: 'Painting Work', estimatedAmount: 50000 },
      { categoryId: 'utilities', subcategoryId: 'utl-electricity', description: 'Electrical Updates', estimatedAmount: 40000 },
      { categoryId: 'utilities', subcategoryId: 'utl-water', description: 'Plumbing Fixes', estimatedAmount: 30000 },
      { categoryId: 'materials', subcategoryId: 'mat-paint', description: 'Paint & Materials', estimatedAmount: 35000 },
    ],
  },
];

/**
 * Create budget from template
 */
export function createBudgetFromTemplate(
  templateId: string,
  projectName: string,
  options: {
    currency?: string;
    startDate?: string;
    endDate?: string;
  } = {}
): Budget | null {
  const template = BUDGET_TEMPLATES.find(t => t.id === templateId);
  if (!template) return null;
  
  let budget = createBudget(template.name, projectName, {
    nameBn: template.nameBn,
    description: template.description,
    currency: options.currency,
    startDate: options.startDate,
    endDate: options.endDate,
  });
  
  // Add template items
  for (const item of template.defaultItems) {
    budget = addBudgetItem(budget, item);
  }
  
  return budget;
}

/**
 * Get budget summary by category
 */
export function getBudgetByCategory(budget: Budget): {
  categoryId: string;
  categoryName: string;
  estimated: number;
  actual: number;
  variance: number;
}[] {
  const categoryMap = new Map<string, { estimated: number; actual: number }>();
  
  for (const item of budget.items) {
    const existing = categoryMap.get(item.categoryId) || { estimated: 0, actual: 0 };
    existing.estimated += item.estimatedAmount;
    existing.actual += item.actualAmount;
    categoryMap.set(item.categoryId, existing);
  }
  
  return Array.from(categoryMap.entries()).map(([categoryId, data]) => {
    const category = getCategory(categoryId);
    return {
      categoryId,
      categoryName: category?.name || categoryId,
      estimated: data.estimated,
      actual: data.actual,
      variance: data.actual - data.estimated,
    };
  });
}

/**
 * Format budget for display
 */
export function formatBudget(budget: Budget): {
  formattedTotalEstimated: string;
  formattedTotalActual: string;
  formattedVariance: string;
  formattedVariancePercent: string;
  status: string;
  statusBn: string;
} {
  const currency = budget.currency;
  const variancePositive = budget.variance >= 0;
  
  return {
    formattedTotalEstimated: formatCurrency(budget.totalEstimated, currency),
    formattedTotalActual: formatCurrency(budget.totalActual, currency),
    formattedVariance: formatCurrency(Math.abs(budget.variance), currency),
    formattedVariancePercent: `${Math.abs(budget.variancePercent).toFixed(1)}%`,
    status: variancePositive ? 'Over Budget' : 'Under Budget',
    statusBn: variancePositive ? 'বাজেট অতিক্রম' : 'বাজেটের মধ্যে',
  };
}

/**
 * Budget alert types
 */
export type BudgetAlertType = 'over-budget' | 'approaching-limit' | 'on-track';

export interface BudgetAlert {
  type: BudgetAlertType;
  message: string;
  messageBn: string;
  severity: 'error' | 'warning' | 'success';
}

/**
 * Check budget alerts
 */
export function checkBudgetAlerts(budget: Budget): BudgetAlert[] {
  const alerts: BudgetAlert[] = [];
  
  // Check overall budget
  if (budget.totalActual > budget.totalEstimated) {
    alerts.push({
      type: 'over-budget',
      message: 'Total expenses have exceeded the budget!',
      messageBn: 'মোট খরচ বাজেট অতিক্রম করেছে!',
      severity: 'error',
    });
  } else if (budget.totalActual > budget.totalEstimated * 0.9) {
    alerts.push({
      type: 'approaching-limit',
      message: 'Expenses are approaching the budget limit (90%)',
      messageBn: 'খরচ বাজেট সীমার কাছাকাছি (৯০%)',
      severity: 'warning',
    });
  } else {
    alerts.push({
      type: 'on-track',
      message: 'Budget is on track',
      messageBn: 'বাজেট ঠিক আছে',
      severity: 'success',
    });
  }
  
  // Check individual items
  for (const item of budget.items) {
    if (item.actualAmount > item.estimatedAmount * 1.2) {
      const category = getCategory(item.categoryId);
      alerts.push({
        type: 'over-budget',
        message: `${category?.name || item.categoryId}: Significantly over budget`,
        messageBn: `${category?.nameBn || item.categoryId}: উল্লেখযোগ্যভাবে বাজেট অতিক্রম`,
        severity: 'warning',
      });
    }
  }
  
  return alerts;
}

/**
 * Generate budget report
 */
export function generateBudgetReport(budget: Budget): {
  summary: string;
  categoryBreakdown: string;
  alerts: string;
} {
  const formatted = formatBudget(budget);
  const byCategory = getBudgetByCategory(budget);
  const alerts = checkBudgetAlerts(budget);
  
  const summary = `
Budget Report: ${budget.name}
Project: ${budget.projectName}

Total Estimated: ${formatted.formattedTotalEstimated}
Total Actual: ${formatted.formattedTotalActual}
Variance: ${formatted.formattedVariance} (${formatted.formattedVariancePercent})
Status: ${formatted.status}
  `.trim();
  
  const categoryBreakdown = byCategory
    .map(
      cat =>
        `${cat.categoryName}: ${formatCurrency(cat.estimated, budget.currency)} estimated, ` +
        `${formatCurrency(cat.actual, budget.currency)} actual`
    )
    .join('\n');
  
  const alertsText = alerts
    .map(alert => `[${alert.severity.toUpperCase()}] ${alert.message}`)
    .join('\n');
  
  return { summary, categoryBreakdown, alerts: alertsText };
}

/**
 * Export budget to CSV
 */
export function exportBudgetToCSV(budget: Budget): string {
  let csv = 'Budget Report\n';
  csv += `Name,${budget.name}\n`;
  csv += `Project,${budget.projectName}\n`;
  csv += `Status,${budget.status}\n\n`;
  
  csv += 'Category,Description,Estimated,Actual,Variance\n';
  for (const item of budget.items) {
    const category = getCategory(item.categoryId);
    const variance = item.actualAmount - item.estimatedAmount;
    csv += `${category?.name || item.categoryId},${item.description},${item.estimatedAmount},${item.actualAmount},${variance}\n`;
  }
  
  csv += '\nSummary\n';
  csv += `Total Estimated,${budget.totalEstimated}\n`;
  csv += `Total Actual,${budget.totalActual}\n`;
  csv += `Variance,${budget.variance}\n`;
  
  return csv;
}
