import AsyncStorage from '@react-native-async-storage/async-storage';
import { Transaction, LaborPayment, Worker, Plugin, MaterialEstimate } from '@/types';

const KEYS = {
  TRANSACTIONS: '@buildledger_transactions',
  LABOR_PAYMENTS: '@buildledger_labor_payments',
  WORKERS: '@buildledger_workers',
  PLUGINS: '@buildledger_plugins',
  SETTINGS: '@buildledger_settings',
  MATERIAL_ESTIMATES: '@buildledger_material_estimates',
};

export async function getTransactions(): Promise<Transaction[]> {
  try {
    const data = await AsyncStorage.getItem(KEYS.TRANSACTIONS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting transactions:', error);
    return [];
  }
}

export async function saveTransaction(transaction: Transaction): Promise<void> {
  try {
    const transactions = await getTransactions();
    const index = transactions.findIndex(t => t.id === transaction.id);
    if (index >= 0) {
      transactions[index] = transaction;
    } else {
      transactions.unshift(transaction);
    }
    await AsyncStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(transactions));
  } catch (error) {
    console.error('Error saving transaction:', error);
    throw error;
  }
}

export async function deleteTransaction(id: string): Promise<void> {
  try {
    const transactions = await getTransactions();
    const filtered = transactions.filter(t => t.id !== id);
    await AsyncStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
}

export async function getLaborPayments(): Promise<LaborPayment[]> {
  try {
    const data = await AsyncStorage.getItem(KEYS.LABOR_PAYMENTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting labor payments:', error);
    return [];
  }
}

export async function saveLaborPayment(payment: LaborPayment): Promise<void> {
  try {
    const payments = await getLaborPayments();
    const index = payments.findIndex(p => p.id === payment.id);
    if (index >= 0) {
      payments[index] = payment;
    } else {
      payments.unshift(payment);
    }
    await AsyncStorage.setItem(KEYS.LABOR_PAYMENTS, JSON.stringify(payments));
    
    if (payment.isPaid) {
      const totalHours = payment.regularHours + payment.overtimeHours;
      const transaction: Transaction = {
        id: `labor_${payment.id}`,
        type: 'expense',
        amount: payment.totalAmount,
        category: 'labor',
        description: `Salary: ${payment.workerName} (${payment.daysWorked}d, ${totalHours}hrs)`,
        date: payment.weekStart,
        createdAt: new Date().toISOString(),
      };
      await saveTransaction(transaction);
    }
  } catch (error) {
    console.error('Error saving labor payment:', error);
    throw error;
  }
}

export async function deleteLaborPayment(id: string): Promise<void> {
  try {
    const payments = await getLaborPayments();
    const filtered = payments.filter(p => p.id !== id);
    await AsyncStorage.setItem(KEYS.LABOR_PAYMENTS, JSON.stringify(filtered));
    await deleteTransaction(`labor_${id}`);
  } catch (error) {
    console.error('Error deleting labor payment:', error);
    throw error;
  }
}

export async function getWorkers(): Promise<Worker[]> {
  try {
    const data = await AsyncStorage.getItem(KEYS.WORKERS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting workers:', error);
    return [];
  }
}

export async function saveWorker(worker: Worker): Promise<void> {
  try {
    const workers = await getWorkers();
    const index = workers.findIndex(w => w.id === worker.id);
    if (index >= 0) {
      workers[index] = worker;
    } else {
      workers.push(worker);
    }
    await AsyncStorage.setItem(KEYS.WORKERS, JSON.stringify(workers));
  } catch (error) {
    console.error('Error saving worker:', error);
    throw error;
  }
}

export async function deleteWorker(id: string): Promise<void> {
  try {
    const workers = await getWorkers();
    const filtered = workers.filter(w => w.id !== id);
    await AsyncStorage.setItem(KEYS.WORKERS, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting worker:', error);
    throw error;
  }
}

export async function getPlugins(): Promise<Plugin[]> {
  try {
    const data = await AsyncStorage.getItem(KEYS.PLUGINS);
    if (data) {
      return JSON.parse(data);
    }
    return getDefaultPlugins();
  } catch (error) {
    console.error('Error getting plugins:', error);
    return getDefaultPlugins();
  }
}

export async function savePlugin(plugin: Plugin): Promise<void> {
  try {
    const plugins = await getPlugins();
    const index = plugins.findIndex(p => p.id === plugin.id);
    if (index >= 0) {
      plugins[index] = plugin;
    } else {
      plugins.push(plugin);
    }
    await AsyncStorage.setItem(KEYS.PLUGINS, JSON.stringify(plugins));
  } catch (error) {
    console.error('Error saving plugin:', error);
    throw error;
  }
}

export async function getMaterialEstimates(): Promise<MaterialEstimate[]> {
  try {
    const data = await AsyncStorage.getItem(KEYS.MATERIAL_ESTIMATES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting material estimates:', error);
    return [];
  }
}

export async function saveMaterialEstimate(estimate: MaterialEstimate): Promise<void> {
  try {
    const estimates = await getMaterialEstimates();
    const index = estimates.findIndex(e => e.id === estimate.id);
    if (index >= 0) {
      estimates[index] = estimate;
    } else {
      estimates.unshift(estimate);
    }
    await AsyncStorage.setItem(KEYS.MATERIAL_ESTIMATES, JSON.stringify(estimates));
  } catch (error) {
    console.error('Error saving material estimate:', error);
    throw error;
  }
}

export async function deleteMaterialEstimate(id: string): Promise<void> {
  try {
    const estimates = await getMaterialEstimates();
    const filtered = estimates.filter(e => e.id !== id);
    await AsyncStorage.setItem(KEYS.MATERIAL_ESTIMATES, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting material estimate:', error);
    throw error;
  }
}

export function calculateMaterials(areaSqFt: number, floors: number = 1): {
  cement: number;
  sand: number;
  bricks: number;
  steel: number;
  aggregate: number;
} {
  const totalArea = areaSqFt * floors;
  return {
    cement: Math.ceil(totalArea * 0.4),
    sand: Math.ceil(totalArea * 0.816),
    bricks: Math.ceil(totalArea * 8),
    steel: Math.ceil(totalArea * 4),
    aggregate: Math.ceil(totalArea * 0.608),
  };
}

function getDefaultPlugins(): Plugin[] {
  return [
    {
      id: 'invoice-generator',
      name: 'Invoice Generator',
      description: 'Create and send professional invoices to clients',
      version: '1.0.0',
      icon: 'file-text',
      isInstalled: false,
      isEnabled: false,
      author: 'BuildLedger Team',
    },
    {
      id: 'project-tracker',
      name: 'Project Tracker',
      description: 'Track expenses and income by construction project',
      version: '1.0.0',
      icon: 'folder',
      isInstalled: false,
      isEnabled: false,
      author: 'BuildLedger Team',
    },
    {
      id: 'tax-calculator',
      name: 'Tax Calculator',
      description: 'Estimate taxes and generate tax reports',
      version: '1.0.0',
      icon: 'percent',
      isInstalled: false,
      isEnabled: false,
      author: 'BuildLedger Team',
    },
    {
      id: 'receipt-scanner',
      name: 'Receipt Scanner',
      description: 'Scan receipts and auto-create expense entries',
      version: '1.0.0',
      icon: 'camera',
      isInstalled: false,
      isEnabled: false,
      author: 'BuildLedger Team',
    },
    {
      id: 'budget-planner',
      name: 'Budget Planner',
      description: 'Set budgets and get alerts when exceeding limits',
      version: '1.0.0',
      icon: 'pie-chart',
      isInstalled: false,
      isEnabled: false,
      author: 'BuildLedger Team',
    },
    {
      id: 'export-reports',
      name: 'Export Reports',
      description: 'Export financial data to PDF or Excel',
      version: '1.0.0',
      icon: 'download',
      isInstalled: false,
      isEnabled: false,
      author: 'BuildLedger Team',
    },
  ];
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function getWeekStart(date: Date = new Date()): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().split('T')[0];
}

export function getWeekEnd(weekStart: string): string {
  const d = new Date(weekStart);
  d.setDate(d.getDate() + 6);
  return d.toISOString().split('T')[0];
}

export function formatCurrency(amount: number): string {
  return '\u09F3' + new Intl.NumberFormat('en-BD', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatWeekRange(weekStart: string): string {
  const start = new Date(weekStart);
  const end = new Date(weekStart);
  end.setDate(end.getDate() + 6);
  
  const startStr = start.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  const endStr = end.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  
  return `${startStr} - ${endStr}`;
}
