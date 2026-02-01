/**
 * Bangladesh Tax & VAT Configuration
 * Author: sabujdotnet
 * Website: https://sabujdotnet.github.io
 * 
 * Tax rates and calculations for Bangladesh
 */

/**
 * VAT (Value Added Tax) Rates
 */
export const VAT_RATES = {
  STANDARD: 15,      // Standard VAT rate (15%)
  REDUCED: 5,        // Reduced rate for essential goods
  ZERO: 0,           // Zero-rated items
  EXEMPT: null,      // VAT exempt
};

/**
 * VAT Categories for Construction Materials
 */
export interface VATCategory {
  id: string;
  name: string;
  nameBn: string;
  rate: number | null;
  description: string;
}

export const VAT_CATEGORIES: VATCategory[] = [
  { id: 'standard', name: 'Standard Rate', nameBn: 'সাধারণ হার', rate: 15, description: 'Most goods and services' },
  { id: 'reduced', name: 'Reduced Rate', nameBn: 'হ্রাসকৃত হার', rate: 5, description: 'Essential goods' },
  { id: 'zero', name: 'Zero Rated', nameBn: 'শূন্য হার', rate: 0, description: 'Exports, medicines' },
  { id: 'exempt', name: 'VAT Exempt', nameBn: 'ভ্যাট মুক্ত', rate: null, description: 'Basic food, education' },
];

/**
 * Construction Material VAT Classifications
 */
export const MATERIAL_VAT_RATES: Record<string, number> = {
  // Standard 15% VAT
  cement: 15,
  steel: 15,
  tiles: 15,
  paint: 15,
  electrical: 15,
  plumbing: 15,
  glass: 15,
  aluminum: 15,
  
  // Reduced 5% VAT
  bricks: 5,
  sand: 5,
  
  // Zero VAT (raw materials)
  wood: 0,
};

/**
 * Income Tax Slabs for Individuals (Bangladesh FY 2024-25)
 */
export interface TaxSlab {
  min: number;
  max: number | null;
  rate: number;
  description: string;
}

export const INCOME_TAX_SLABS: TaxSlab[] = [
  { min: 0, max: 350000, rate: 0, description: 'Tax Free' },
  { min: 350001, max: 450000, rate: 5, description: 'Next 1,00,000' },
  { min: 450001, max: 750000, rate: 10, description: 'Next 3,00,000' },
  { min: 750001, max: 1150000, rate: 15, description: 'Next 4,00,000' },
  { min: 1150001, max: 1550000, rate: 20, description: 'Next 4,00,000' },
  { min: 1550001, max: null, rate: 25, description: 'Above 15,50,000' },
];

/**
 * Tax Rebate Rates for Investments
 */
export const INVESTMENT_REBATE = {
  rate: 15,          // 15% rebate on eligible investments
  maxLimit: 10000000, // Maximum investment limit: 1 Crore
  maxRebateAmount: 1000000, // Maximum rebate: 10 Lakhs
};

/**
 * Corporate Tax Rates
 */
export const CORPORATE_TAX_RATES = {
  PUBLIC_LIMITED: 25,      // Public limited companies
  PRIVATE_LIMITED: 27.5,   // Private limited companies
  BANK_INSURANCE: 40,      // Banks, insurance, financial institutions
  CIGARETTE: 45,           // Cigarette manufacturers
  MOBILE_OPERATOR: 45,     // Mobile phone operators
};

/**
 * Advance Income Tax (AIT) Rates for Imports
 */
export const AIT_RATES = {
  COMMERCIAL_IMPORT: 5,    // Commercial imports
  INDUSTRIAL_IMPORT: 3,    // Industrial raw materials
};

/**
 * Advance Tax (AT) on Utilities
 */
export const ADVANCE_TAX = {
  ELECTRICITY: {
    residential: 0,
    commercial: 2.5,       // 2.5% on commercial electricity
    industrial: 2.5,       // 2.5% on industrial electricity
  },
  GAS: {
    residential: 0,
    commercial: 2.5,
    industrial: 2.5,
  },
};

/**
 * Calculate VAT amount
 */
export function calculateVAT(amount: number, vatRate: number = VAT_RATES.STANDARD): number {
  return (amount * vatRate) / 100;
}

/**
 * Calculate price including VAT
 */
export function calculatePriceWithVAT(amount: number, vatRate: number = VAT_RATES.STANDARD): number {
  return amount + calculateVAT(amount, vatRate);
}

/**
 * Calculate price excluding VAT
 */
export function calculatePriceWithoutVAT(amountWithVAT: number, vatRate: number = VAT_RATES.STANDARD): number {
  return amountWithVAT / (1 + vatRate / 100);
}

/**
 * Calculate VAT from inclusive price
 */
export function extractVATFromInclusive(amountWithVAT: number, vatRate: number = VAT_RATES.STANDARD): { baseAmount: number; vatAmount: number } {
  const baseAmount = calculatePriceWithoutVAT(amountWithVAT, vatRate);
  const vatAmount = amountWithVAT - baseAmount;
  return { baseAmount, vatAmount };
}

/**
 * Calculate income tax based on slabs
 */
export function calculateIncomeTax(annualIncome: number): {
  taxBreakdown: { slab: TaxSlab; taxableAmount: number; tax: number }[];
  totalTax: number;
  effectiveRate: number;
} {
  let remainingIncome = annualIncome;
  let totalTax = 0;
  const taxBreakdown: { slab: TaxSlab; taxableAmount: number; tax: number }[] = [];
  
  for (const slab of INCOME_TAX_SLABS) {
    if (remainingIncome <= 0) break;
    
    const slabLimit = slab.max ? slab.max - slab.min : remainingIncome;
    const taxableAmount = Math.min(remainingIncome, slabLimit);
    const tax = (taxableAmount * slab.rate) / 100;
    
    if (taxableAmount > 0) {
      taxBreakdown.push({ slab, taxableAmount, tax });
      totalTax += tax;
    }
    
    remainingIncome -= taxableAmount;
  }
  
  const effectiveRate = annualIncome > 0 ? (totalTax / annualIncome) * 100 : 0;
  
  return { taxBreakdown, totalTax, effectiveRate };
}

/**
 * Calculate investment rebate
 */
export function calculateInvestmentRebate(investmentAmount: number): {
  eligibleAmount: number;
  rebateAmount: number;
} {
  const eligibleAmount = Math.min(investmentAmount, INVESTMENT_REBATE.maxLimit);
  const calculatedRebate = (eligibleAmount * INVESTMENT_REBATE.rate) / 100;
  const rebateAmount = Math.min(calculatedRebate, INVESTMENT_REBATE.maxRebateAmount);
  
  return { eligibleAmount, rebateAmount };
}

/**
 * Tax Invoice Interface
 */
export interface TaxInvoice {
  invoiceNumber: string;
  date: string;
  seller: {
    name: string;
    address: string;
    bin: string; // Business Identification Number
    phone?: string;
  };
  buyer: {
    name: string;
    address: string;
    bin?: string;
    phone?: string;
  };
  items: {
    description: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    totalPrice: number;
  }[];
  subtotal: number;
  vatAmount: number;
  vatRate: number;
  totalAmount: number;
  amountInWords: string;
}

/**
 * Generate tax invoice
 */
export function generateTaxInvoice(
  items: { description: string; quantity: number; unit: string; unitPrice: number }[],
  vatRate: number = VAT_RATES.STANDARD
): Omit<TaxInvoice, 'invoiceNumber' | 'date' | 'seller' | 'buyer' | 'amountInWords'> {
  let subtotal = 0;
  const invoiceItems = items.map(item => {
    const totalPrice = item.quantity * item.unitPrice;
    subtotal += totalPrice;
    return { ...item, totalPrice };
  });
  
  const vatAmount = calculateVAT(subtotal, vatRate);
  const totalAmount = subtotal + vatAmount;
  
  return {
    items: invoiceItems,
    subtotal,
    vatAmount,
    vatRate,
    totalAmount,
  };
}

/**
 * Convert number to Bengali words for invoice
 */
export function numberToBengaliWords(amount: number): string {
  const units = ['', 'এক', 'দুই', 'তিন', 'চার', 'পাঁচ', 'ছয়', 'সাত', 'আট', 'নয়'];
  const teens = ['দশ', 'এগারো', 'বারো', 'তেরো', 'চৌদ্দ', 'পনেরো', 'ষোল', 'সতেরো', 'আঠারো', 'উনিশ'];
  const tens = ['', '', 'বিশ', 'ত্রিশ', 'চল্লিশ', 'পঞ্চাশ', 'ষাট', 'সত্তর', 'আশি', 'নব্বই'];
  
  // Simplified version - for production, use a proper number-to-words library
  return `টাকা ${amount} মাত্র`;
}

/**
 * Tax calculation summary interface
 */
export interface TaxSummary {
  grossIncome: number;
  deductions: number;
  taxableIncome: number;
  taxBeforeRebate: number;
  investmentRebate: number;
  finalTax: number;
  monthlyTax: number;
}

/**
 * Calculate complete tax summary
 */
export function calculateTaxSummary(
  grossIncome: number,
  deductions: number = 0,
  investmentAmount: number = 0
): TaxSummary {
  const taxableIncome = Math.max(0, grossIncome - deductions);
  const { totalTax: taxBeforeRebate } = calculateIncomeTax(taxableIncome);
  const { rebateAmount: investmentRebate } = calculateInvestmentRebate(investmentAmount);
  const finalTax = Math.max(0, taxBeforeRebate - investmentRebate);
  const monthlyTax = finalTax / 12;
  
  return {
    grossIncome,
    deductions,
    taxableIncome,
    taxBeforeRebate,
    investmentRebate,
    finalTax,
    monthlyTax,
  };
}

/**
 * Tax year in Bangladesh (July - June)
 */
export function getCurrentTaxYear(): { start: string; end: string } {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-indexed
  
  // If before July, tax year is previous year to current year
  if (currentMonth < 6) {
    return {
      start: `${currentYear - 1}-07-01`,
      end: `${currentYear}-06-30`,
    };
  }
  
  return {
    start: `${currentYear}-07-01`,
    end: `${currentYear + 1}-06-30`,
  };
}

/**
 * NBR (National Board of Revenue) Information
 */
export const NBR_INFO = {
  website: 'https://www.nbr.gov.bd',
  vatHelpline: '16409',
  taxHelpline: '16408',
  email: 'info@nbr.gov.bd',
};
