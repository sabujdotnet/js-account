/**
 * Invoice Generator Module
 * Author: sabujdotnet
 * Website: https://sabujdotnet.github.io
 * 
 * Generate professional invoices for construction projects
 */

import { generateId, formatCurrency } from './storage';
import { calculateVAT, VAT_RATES } from '@/constants/tax';
import { getCurrency } from '@/constants/currency';

/**
 * Invoice item interface
 */
export interface InvoiceItem {
  id: string;
  description: string;
  descriptionBn?: string;
  quantity: number;
  unit: string;
  unitBn?: string;
  unitPrice: number;
  totalPrice: number;
}

/**
 * Invoice interface
 */
export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate?: string;
  
  // Seller Information
  seller: {
    name: string;
    address: string;
    phone?: string;
    email?: string;
    bin?: string; // Business Identification Number
    logo?: string;
  };
  
  // Buyer Information
  buyer: {
    name: string;
    address: string;
    phone?: string;
    email?: string;
    bin?: string;
  };
  
  // Project Information
  project?: {
    name: string;
    address?: string;
    description?: string;
  };
  
  // Items
  items: InvoiceItem[];
  
  // Totals
  subtotal: number;
  discountAmount: number;
  discountPercent: number;
  vatAmount: number;
  vatRate: number;
  totalAmount: number;
  amountPaid: number;
  balanceDue: number;
  
  // Currency
  currency: string;
  
  // Status
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  
  // Notes
  notes?: string;
  terms?: string;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}

/**
 * Create a new invoice
 */
export function createInvoice(
  seller: Invoice['seller'],
  buyer: Invoice['buyer'],
  items: Omit<InvoiceItem, 'id' | 'totalPrice'>[],
  options: {
    project?: Invoice['project'];
    currency?: string;
    vatRate?: number;
    discountPercent?: number;
    notes?: string;
    terms?: string;
    dueDate?: string;
  } = {}
): Invoice {
  const currency = options.currency || 'BDT';
  const vatRate = options.vatRate ?? VAT_RATES.STANDARD;
  const discountPercent = options.discountPercent ?? 0;
  
  // Calculate item totals
  const invoiceItems: InvoiceItem[] = items.map(item => ({
    id: generateId(),
    ...item,
    totalPrice: item.quantity * item.unitPrice,
  }));
  
  // Calculate totals
  const subtotal = invoiceItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const amountAfterDiscount = subtotal - discountAmount;
  const vatAmount = calculateVAT(amountAfterDiscount, vatRate);
  const totalAmount = amountAfterDiscount + vatAmount;
  
  const now = new Date().toISOString();
  const invoiceNumber = generateInvoiceNumber();
  
  return {
    id: generateId(),
    invoiceNumber,
    date: now.split('T')[0],
    dueDate: options.dueDate,
    seller,
    buyer,
    project: options.project,
    items: invoiceItems,
    subtotal,
    discountAmount,
    discountPercent,
    vatAmount,
    vatRate,
    totalAmount,
    amountPaid: 0,
    balanceDue: totalAmount,
    currency,
    status: 'draft',
    notes: options.notes,
    terms: options.terms || getDefaultTerms(),
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Generate invoice number
 */
export function generateInvoiceNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `INV-${year}${month}-${random}`;
}

/**
 * Get default terms and conditions
 */
export function getDefaultTerms(): string {
  return `Payment Terms: Net 30 days from invoice date.
Late payments subject to 2% monthly service charge.
All prices are in Bangladeshi Taka (BDT) and include VAT where applicable.`;
}

/**
 * Get default terms in Bengali
 */
export function getDefaultTermsBn(): string {
  return `পেমেন্ট শর্তাবলী: চালান তারিখ থেকে ৩০ দিনের মধ্যে পরিশোধ করতে হবে।
বিলম্বিত পেমেন্টের জন্য প্রতি মাসে ২% সার্ভিস চার্জ প্রযোজ্য।
সমস্ত মূল্য বাংলাদেশী টাকায় (৳) এবং প্রযোজ্য ভ্যাট সহ।`;
}

/**
 * Update invoice status
 */
export function updateInvoiceStatus(
  invoice: Invoice,
  status: Invoice['status'],
  amountPaid?: number
): Invoice {
  const updatedInvoice = { ...invoice, status, updatedAt: new Date().toISOString() };
  
  if (amountPaid !== undefined) {
    updatedInvoice.amountPaid = amountPaid;
    updatedInvoice.balanceDue = Math.max(0, invoice.totalAmount - amountPaid);
    
    if (updatedInvoice.balanceDue === 0) {
      updatedInvoice.status = 'paid';
    } else if (updatedInvoice.balanceDue < invoice.totalAmount) {
      updatedInvoice.status = 'sent'; // Partially paid
    }
  }
  
  return updatedInvoice;
}

/**
 * Add item to invoice
 */
export function addInvoiceItem(
  invoice: Invoice,
  item: Omit<InvoiceItem, 'id' | 'totalPrice'>
): Invoice {
  const newItem: InvoiceItem = {
    id: generateId(),
    ...item,
    totalPrice: item.quantity * item.unitPrice,
  };
  
  const updatedItems = [...invoice.items, newItem];
  return recalculateInvoice({ ...invoice, items: updatedItems });
}

/**
 * Remove item from invoice
 */
export function removeInvoiceItem(invoice: Invoice, itemId: string): Invoice {
  const updatedItems = invoice.items.filter(item => item.id !== itemId);
  return recalculateInvoice({ ...invoice, items: updatedItems });
}

/**
 * Recalculate invoice totals
 */
export function recalculateInvoice(invoice: Invoice): Invoice {
  const subtotal = invoice.items.reduce((sum, item) => sum + item.totalPrice, 0);
  const discountAmount = (subtotal * invoice.discountPercent) / 100;
  const amountAfterDiscount = subtotal - discountAmount;
  const vatAmount = calculateVAT(amountAfterDiscount, invoice.vatRate);
  const totalAmount = amountAfterDiscount + vatAmount;
  const balanceDue = totalAmount - invoice.amountPaid;
  
  return {
    ...invoice,
    subtotal,
    discountAmount,
    vatAmount,
    totalAmount,
    balanceDue,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Format invoice for display
 */
export function formatInvoice(invoice: Invoice): {
  formattedSubtotal: string;
  formattedDiscount: string;
  formattedVAT: string;
  formattedTotal: string;
  formattedBalance: string;
  formattedAmountPaid: string;
} {
  const currency = invoice.currency;
  return {
    formattedSubtotal: formatCurrency(invoice.subtotal, currency),
    formattedDiscount: formatCurrency(invoice.discountAmount, currency),
    formattedVAT: formatCurrency(invoice.vatAmount, currency),
    formattedTotal: formatCurrency(invoice.totalAmount, currency),
    formattedBalance: formatCurrency(invoice.balanceDue, currency),
    formattedAmountPaid: formatCurrency(invoice.amountPaid, currency),
  };
}

/**
 * Generate invoice summary statistics
 */
export function generateInvoiceSummary(invoices: Invoice[]): {
  totalInvoiced: number;
  totalPaid: number;
  totalOutstanding: number;
  totalOverdue: number;
  invoiceCount: number;
  paidCount: number;
  overdueCount: number;
} {
  const now = new Date();
  
  return invoices.reduce(
    (summary, invoice) => {
      summary.totalInvoiced += invoice.totalAmount;
      summary.totalPaid += invoice.amountPaid;
      summary.totalOutstanding += invoice.balanceDue;
      summary.invoiceCount++;
      
      if (invoice.status === 'paid') {
        summary.paidCount++;
      }
      
      if (
        invoice.dueDate &&
        new Date(invoice.dueDate) < now &&
        invoice.balanceDue > 0
      ) {
        summary.totalOverdue += invoice.balanceDue;
        summary.overdueCount++;
      }
      
      return summary;
    },
    {
      totalInvoiced: 0,
      totalPaid: 0,
      totalOutstanding: 0,
      totalOverdue: 0,
      invoiceCount: 0,
      paidCount: 0,
      overdueCount: 0,
    }
  );
}

/**
 * Invoice templates
 */
export interface InvoiceTemplate {
  id: string;
  name: string;
  nameBn: string;
  description: string;
  items: Omit<InvoiceItem, 'id' | 'totalPrice'>[];
  defaultVatRate: number;
  notes?: string;
}

export const INVOICE_TEMPLATES: InvoiceTemplate[] = [
  {
    id: 'construction-full',
    name: 'Full Construction',
    nameBn: 'সম্পূর্ণ নির্মাণ',
    description: 'Complete construction project invoice',
    defaultVatRate: VAT_RATES.STANDARD,
    items: [
      { description: 'Cement (100 bags)', quantity: 100, unit: 'bags', unitPrice: 520 },
      { description: 'Steel Rods (1000 kg)', quantity: 1000, unit: 'kg', unitPrice: 95 },
      { description: 'Bricks (5000 pcs)', quantity: 5000, unit: 'pcs', unitPrice: 12 },
      { description: 'Masonry Labor', quantity: 1, unit: 'job', unitPrice: 50000 },
    ],
  },
  {
    id: 'renovation',
    name: 'Renovation',
    nameBn: 'পুনর্নির্মাণ',
    description: 'Renovation project invoice',
    defaultVatRate: VAT_RATES.STANDARD,
    items: [
      { description: 'Tile Work', quantity: 500, unit: 'sqft', unitPrice: 85 },
      { description: 'Painting Work', quantity: 1000, unit: 'sqft', unitPrice: 18 },
      { description: 'Electrical Work', quantity: 1, unit: 'job', unitPrice: 15000 },
      { description: 'Plumbing Work', quantity: 1, unit: 'job', unitPrice: 12000 },
    ],
  },
  {
    id: 'consulting',
    name: 'Consulting Services',
    nameBn: 'পরামর্শ সেবা',
    description: 'Professional consulting services',
    defaultVatRate: VAT_RATES.STANDARD,
    items: [
      { description: 'Architectural Design', quantity: 1, unit: 'project', unitPrice: 50000 },
      { description: 'Structural Engineering', quantity: 1, unit: 'project', unitPrice: 40000 },
      { description: 'Site Supervision (per month)', quantity: 3, unit: 'months', unitPrice: 30000 },
    ],
  },
  {
    id: 'labor-only',
    name: 'Labor Only',
    nameBn: 'শুধু শ্রমিক',
    description: 'Labor charges only',
    defaultVatRate: 0, // Labor is often VAT exempt
    items: [
      { description: 'Master Mason', quantity: 30, unit: 'days', unitPrice: 1200 },
      { description: 'Helper', quantity: 30, unit: 'days', unitPrice: 700 },
      { description: 'Carpenter', quantity: 15, unit: 'days', unitPrice: 1100 },
    ],
  },
];

/**
 * Create invoice from template
 */
export function createInvoiceFromTemplate(
  templateId: string,
  seller: Invoice['seller'],
  buyer: Invoice['buyer'],
  options: {
    project?: Invoice['project'];
    currency?: string;
    dueDate?: string;
  } = {}
): Invoice | null {
  const template = INVOICE_TEMPLATES.find(t => t.id === templateId);
  if (!template) return null;
  
  return createInvoice(seller, buyer, template.items, {
    ...options,
    vatRate: template.defaultVatRate,
    notes: template.notes,
  });
}

/**
 * Export invoice to CSV
 */
export function exportInvoiceToCSV(invoice: Invoice): string {
  const currency = getCurrency(invoice.currency);
  let csv = 'Invoice Details\n';
  csv += `Invoice Number,${invoice.invoiceNumber}\n`;
  csv += `Date,${invoice.date}\n`;
  csv += `Due Date,${invoice.dueDate || 'N/A'}\n`;
  csv += `Status,${invoice.status}\n\n`;
  
  csv += 'Seller Information\n';
  csv += `Name,${invoice.seller.name}\n`;
  csv += `Address,${invoice.seller.address}\n`;
  csv += `Phone,${invoice.seller.phone || 'N/A'}\n`;
  csv += `BIN,${invoice.seller.bin || 'N/A'}\n\n`;
  
  csv += 'Buyer Information\n';
  csv += `Name,${invoice.buyer.name}\n`;
  csv += `Address,${invoice.buyer.address}\n`;
  csv += `Phone,${invoice.buyer.phone || 'N/A'}\n\n`;
  
  csv += 'Items\n';
  csv += 'Description,Quantity,Unit,Unit Price,Total\n';
  invoice.items.forEach(item => {
    csv += `"${item.description}",${item.quantity},${item.unit},${currency.symbol}${item.unitPrice},${currency.symbol}${item.totalPrice}\n`;
  });
  
  csv += '\nSummary\n';
  csv += `Subtotal,${currency.symbol}${invoice.subtotal}\n`;
  csv += `Discount (${invoice.discountPercent}%),${currency.symbol}${invoice.discountAmount}\n`;
  csv += `VAT (${invoice.vatRate}%),${currency.symbol}${invoice.vatAmount}\n`;
  csv += `Total,${currency.symbol}${invoice.totalAmount}\n`;
  csv += `Amount Paid,${currency.symbol}${invoice.amountPaid}\n`;
  csv += `Balance Due,${currency.symbol}${invoice.balanceDue}\n`;
  
  return csv;
}
