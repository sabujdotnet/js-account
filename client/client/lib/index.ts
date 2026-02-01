/**
 * Library Exports
 * Author: sabujdotnet
 * Website: https://sabujdotnet.github.io
 */

// Re-export from storage
export {
  getTransactions,
  saveTransaction,
  deleteTransaction,
  getLaborPayments,
  saveLaborPayment,
  deleteLaborPayment,
  getWorkers,
  saveWorker,
  deleteWorker,
  getPlugins,
  savePlugin,
  generateId,
  getWeekStart,
  getWeekEnd,
  formatCurrency,
  formatDate,
  formatWeekRange,
} from './storage';

// Export invoice functions
export {
  createInvoice,
  createInvoiceFromTemplate,
  updateInvoiceStatus,
  addInvoiceItem,
  removeInvoiceItem,
  recalculateInvoice,
  formatInvoice,
  generateInvoiceSummary,
  generateInvoiceNumber,
  getDefaultTerms,
  getDefaultTermsBn,
  exportInvoiceToCSV,
  INVOICE_TEMPLATES,
} from './invoice';

// Export backup functions
export {
  createBackup,
  restoreBackup,
  validateBackup,
  exportBackupToJSON,
  importBackupFromJSON,
  generateBackupFilename,
  getBackupSummary,
  clearAllData,
  getStorageStats,
  formatBytes,
  exportTransactionsToCSV,
  exportLaborPaymentsToCSV,
  exportWorkersToCSV,
  exportAllToCSV,
  exportTransactionsToExcel,
  exportFinancialSummaryToExcel,
  exportCompleteReportToExcel,
  downloadAsFile,
} from './backup';

// Export budget functions
export {
  createBudget,
  createBudgetFromTemplate,
  addBudgetItem,
  updateBudgetItemActual,
  removeBudgetItem,
  recalculateBudget,
  getBudgetByCategory,
  formatBudget,
  checkBudgetAlerts,
  generateBudgetReport,
  exportBudgetToCSV,
  BUDGET_TEMPLATES,
} from './budget';

// Export types
export type { Invoice, InvoiceItem } from './invoice';
export type { BackupData } from './backup';
export type { Budget, BudgetItem, BudgetAlert } from './budget';
