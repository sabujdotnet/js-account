/**
 * Backup & Restore Module
 * Author: sabujdotnet
 * Website: https://sabujdotnet.github.io
 * 
 * Backup and restore app data with export/import functionality
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Transaction, LaborPayment, Worker, Plugin } from '@/types';
import { Invoice } from './invoice';
import { CurrencySettings, DEFAULT_CURRENCY_SETTINGS } from '@/constants/currency';

/**
 * Backup data interface
 */
export interface BackupData {
  version: string;
  createdAt: string;
  appName: string;
  appVersion: string;
  
  // User data
  transactions: Transaction[];
  laborPayments: LaborPayment[];
  workers: Worker[];
  plugins: Plugin[];
  invoices: Invoice[];
  
  // Settings
  currencySettings: CurrencySettings;
  
  // Metadata
  deviceInfo?: {
    platform?: string;
    version?: string;
    manufacturer?: string;
    model?: string;
  };
}

/**
 * Backup keys (must match storage.ts)
 */
const KEYS = {
  TRANSACTIONS: '@sabujdotnet_transactions',
  LABOR_PAYMENTS: '@sabujdotnet_labor_payments',
  WORKERS: '@sabujdotnet_workers',
  PLUGINS: '@sabujdotnet_plugins',
  INVOICES: '@sabujdotnet_invoices',
  CURRENCY_SETTINGS: '@sabujdotnet_currency_settings',
};

const APP_VERSION = '1.0.0';
const BACKUP_VERSION = '1.0';

/**
 * Create full backup of all app data
 */
export async function createBackup(): Promise<BackupData> {
  try {
    // Fetch all data from storage
    const [
      transactions,
      laborPayments,
      workers,
      plugins,
      invoices,
      currencySettings,
    ] = await Promise.all([
      AsyncStorage.getItem(KEYS.TRANSACTIONS),
      AsyncStorage.getItem(KEYS.LABOR_PAYMENTS),
      AsyncStorage.getItem(KEYS.WORKERS),
      AsyncStorage.getItem(KEYS.PLUGINS),
      AsyncStorage.getItem(KEYS.INVOICES),
      AsyncStorage.getItem(KEYS.CURRENCY_SETTINGS),
    ]);
    
    const backup: BackupData = {
      version: BACKUP_VERSION,
      createdAt: new Date().toISOString(),
      appName: 'J&S Accounting BD',
      appVersion: APP_VERSION,
      
      transactions: transactions ? JSON.parse(transactions) : [],
      laborPayments: laborPayments ? JSON.parse(laborPayments) : [],
      workers: workers ? JSON.parse(workers) : [],
      plugins: plugins ? JSON.parse(plugins) : [],
      invoices: invoices ? JSON.parse(invoices) : [],
      
      currencySettings: currencySettings 
        ? JSON.parse(currencySettings) 
        : DEFAULT_CURRENCY_SETTINGS,
    };
    
    return backup;
  } catch (error) {
    console.error('Error creating backup:', error);
    throw new Error('Failed to create backup');
  }
}

/**
 * Restore data from backup
 */
export async function restoreBackup(backup: BackupData): Promise<void> {
  try {
    // Validate backup
    if (!validateBackup(backup)) {
      throw new Error('Invalid backup file');
    }
    
    // Store all data
    await Promise.all([
      AsyncStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(backup.transactions)),
      AsyncStorage.setItem(KEYS.LABOR_PAYMENTS, JSON.stringify(backup.laborPayments)),
      AsyncStorage.setItem(KEYS.WORKERS, JSON.stringify(backup.workers)),
      AsyncStorage.setItem(KEYS.PLUGINS, JSON.stringify(backup.plugins)),
      AsyncStorage.setItem(KEYS.INVOICES, JSON.stringify(backup.invoices || [])),
      AsyncStorage.setItem(KEYS.CURRENCY_SETTINGS, JSON.stringify(backup.currencySettings)),
    ]);
  } catch (error) {
    console.error('Error restoring backup:', error);
    throw new Error('Failed to restore backup');
  }
}

/**
 * Validate backup data structure
 */
export function validateBackup(backup: any): backup is BackupData {
  if (!backup || typeof backup !== 'object') return false;
  
  // Check required fields
  const requiredFields = [
    'version',
    'createdAt',
    'appName',
    'transactions',
    'laborPayments',
    'workers',
    'plugins',
  ];
  
  for (const field of requiredFields) {
    if (!(field in backup)) return false;
  }
  
  // Validate arrays
  if (!Array.isArray(backup.transactions)) return false;
  if (!Array.isArray(backup.laborPayments)) return false;
  if (!Array.isArray(backup.workers)) return false;
  if (!Array.isArray(backup.plugins)) return false;
  
  return true;
}

/**
 * Export backup to JSON string
 */
export function exportBackupToJSON(backup: BackupData): string {
  return JSON.stringify(backup, null, 2);
}

/**
 * Import backup from JSON string
 */
export function importBackupFromJSON(jsonString: string): BackupData | null {
  try {
    const backup = JSON.parse(jsonString);
    if (validateBackup(backup)) {
      return backup;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Generate backup filename
 */
export function generateBackupFilename(): string {
  const date = new Date();
  const timestamp = date.toISOString().split('T')[0];
  return `js-accounting-bd-backup-${timestamp}.json`;
}

/**
 * Get backup summary
 */
export function getBackupSummary(backup: BackupData): {
  totalTransactions: number;
  totalLaborPayments: number;
  totalWorkers: number;
  totalInvoices: number;
  createdDate: string;
  appVersion: string;
} {
  return {
    totalTransactions: backup.transactions.length,
    totalLaborPayments: backup.laborPayments.length,
    totalWorkers: backup.workers.length,
    totalInvoices: backup.invoices?.length || 0,
    createdDate: new Date(backup.createdAt).toLocaleDateString('bn-BD'),
    appVersion: backup.appVersion,
  };
}

/**
 * Clear all app data
 */
export async function clearAllData(): Promise<void> {
  try {
    const keys = Object.values(KEYS);
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.error('Error clearing data:', error);
    throw new Error('Failed to clear data');
  }
}

/**
 * Get storage usage statistics
 */
export async function getStorageStats(): Promise<{
  totalSize: number;
  itemCount: number;
  items: { key: string; size: number }[];
}> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    
    let totalSize = 0;
    const itemSizes: { key: string; size: number }[] = [];
    
    items.forEach(([key, value]) => {
      if (value) {
        const size = new Blob([value]).size;
        totalSize += size;
        itemSizes.push({ key, size });
      }
    });
    
    return {
      totalSize,
      itemCount: keys.length,
      items: itemSizes.sort((a, b) => b.size - a.size),
    };
  } catch (error) {
    console.error('Error getting storage stats:', error);
    return { totalSize: 0, itemCount: 0, items: [] };
  }
}

/**
 * Format bytes to human readable
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// ==================== CSV Export Functions ====================

/**
 * Export transactions to CSV
 */
export function exportTransactionsToCSV(transactions: Transaction[]): string {
  let csv = 'Date,Type,Category,Description,Amount\n';
  
  transactions.forEach(t => {
    const date = new Date(t.date).toLocaleDateString('en-GB');
    const escapedDescription = `"${t.description.replace(/"/g, '""')}"`;
    csv += `${date},${t.type},${t.category},${escapedDescription},${t.amount}\n`;
  });
  
  return csv;
}

/**
 * Export labor payments to CSV
 */
export function exportLaborPaymentsToCSV(payments: LaborPayment[]): string {
  let csv = 'Week Start,Worker Name,Hours,Rate,Total,Paid\n';
  
  payments.forEach(p => {
    const weekStart = new Date(p.weekStart).toLocaleDateString('en-GB');
    csv += `${weekStart},${p.workerName},${p.hoursWorked},${p.hourlyRate},${p.totalAmount},${p.isPaid ? 'Yes' : 'No'}\n`;
  });
  
  return csv;
}

/**
 * Export workers to CSV
 */
export function exportWorkersToCSV(workers: Worker[]): string {
  let csv = 'Name,Hourly Rate,Created Date\n';
  
  workers.forEach(w => {
    const createdAt = new Date(w.createdAt).toLocaleDateString('en-GB');
    csv += `${w.name},${w.hourlyRate},${createdAt}\n`;
  });
  
  return csv;
}

/**
 * Export all data to CSV format
 */
export function exportAllToCSV(backup: BackupData): {
  transactions: string;
  laborPayments: string;
  workers: string;
  invoices: string;
} {
  return {
    transactions: exportTransactionsToCSV(backup.transactions),
    laborPayments: exportLaborPaymentsToCSV(backup.laborPayments),
    workers: exportWorkersToCSV(backup.workers),
    invoices: exportInvoicesToCSV(backup.invoices || []),
  };
}

/**
 * Export invoices to CSV
 */
function exportInvoicesToCSV(invoices: Invoice[]): string {
  let csv = 'Invoice Number,Date,Due Date,Buyer,Total,Amount Paid,Balance,Status\n';
  
  invoices.forEach(inv => {
    const date = new Date(inv.date).toLocaleDateString('en-GB');
    const dueDate = inv.dueDate ? new Date(inv.dueDate).toLocaleDateString('en-GB') : '';
    csv += `${inv.invoiceNumber},${date},${dueDate},${inv.buyer.name},${inv.totalAmount},${inv.amountPaid},${inv.balanceDue},${inv.status}\n`;
  });
  
  return csv;
}

// ==================== Excel Export Functions ====================

/**
 * Create Excel-compatible HTML table
 */
export function createExcelTable(
  title: string,
  headers: string[],
  rows: (string | number)[][]
): string {
  let html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" 
          xmlns:x="urn:schemas-microsoft-com:office:excel" 
          xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta charset="UTF-8">
      <style>
        table { border-collapse: collapse; }
        th, td { border: 1px solid #000; padding: 5px; }
        th { background-color: #006A4E; color: white; }
      </style>
    </head>
    <body>
      <h2>${title}</h2>
      <table>
        <thead>
          <tr>
            ${headers.map(h => `<th>${h}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    </body>
    </html>
  `;
  
  return html;
}

/**
 * Export transactions to Excel HTML format
 */
export function exportTransactionsToExcel(transactions: Transaction[]): string {
  const headers = ['Date', 'Type', 'Category', 'Description', 'Amount (BDT)'];
  const rows = transactions.map(t => [
    new Date(t.date).toLocaleDateString('en-GB'),
    t.type,
    t.category,
    t.description,
    t.amount,
  ]);
  
  return createExcelTable('Transactions', headers, rows);
}

/**
 * Export financial summary to Excel
 */
export function exportFinancialSummaryToExcel(
  transactions: Transaction[],
  period: string
): string {
  // Calculate summary
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const profit = income - expenses;
  
  const headers = ['Description', 'Amount (BDT)'];
  const rows = [
    ['Total Income', income],
    ['Total Expenses', expenses],
    ['Net Profit/Loss', profit],
  ];
  
  return createExcelTable(`Financial Summary - ${period}`, headers, rows);
}

/**
 * Export complete report to Excel with multiple sheets
 */
export function exportCompleteReportToExcel(backup: BackupData): string {
  const transactionsSheet = exportTransactionsToExcel(backup.transactions);
  
  // For a real Excel file with multiple sheets, you'd need a library like xlsx
  // This creates a simple combined HTML table
  
  let combinedHtml = `
    <html>
    <head>
      <meta charset="UTF-8">
      <title>J&S Accounting BD - Complete Report</title>
      <style>
        body { font-family: Arial, sans-serif; }
        h1 { color: #006A4E; }
        h2 { color: #F42A41; margin-top: 30px; }
        table { border-collapse: collapse; margin: 20px 0; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #006A4E; color: white; }
        tr:nth-child(even) { background-color: #f2f2f2; }
        .summary { background-color: #e8f5e9; padding: 15px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <h1>J&S Accounting BD - Complete Report</h1>
      <p>Generated: ${new Date().toLocaleString('bn-BD')}</p>
      <p>App Version: ${backup.appVersion}</p>
      
      <div class="summary">
        <h2>Summary</h2>
        <p>Total Transactions: ${backup.transactions.length}</p>
        <p>Total Labor Payments: ${backup.laborPayments.length}</p>
        <p>Total Workers: ${backup.workers.length}</p>
        <p>Total Invoices: ${backup.invoices?.length || 0}</p>
      </div>
      
      <h2>Transactions</h2>
      ${transactionsSheet.match(/<table>[\s\S]*?<\/table>/)?.[0] || ''}
      
      <h2>Workers</h2>
      <table>
        <tr><th>Name</th><th>Hourly Rate (BDT)</th></tr>
        ${backup.workers.map(w => `<tr><td>${w.name}</td><td>${w.hourlyRate}</td></tr>`).join('')}
      </table>
    </body>
    </html>
  `;
  
  return combinedHtml;
}

/**
 * Download data as file
 */
export function downloadAsFile(
  content: string,
  filename: string,
  mimeType: string = 'text/plain'
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
