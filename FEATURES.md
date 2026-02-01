# J&S Accounting BD - New Features

## Overview

This upgraded version of J&S Accounting includes comprehensive features specifically designed for construction businesses in Bangladesh.

---

## 1. Multi-Currency Support

### Supported Currencies

| Code | Symbol | Name | Locale |
|------|--------|------|--------|
| BDT | ৳ | Bangladeshi Taka | bn-BD |
| INR | ₹ | Indian Rupee | en-IN |
| USD | $ | US Dollar | en-US |
| EUR | € | Euro | en-EU |
| GBP | £ | British Pound | en-GB |
| PKR | ₨ | Pakistani Rupee | en-PK |
| LKR | රු | Sri Lankan Rupee | en-LK |
| NPR | रु | Nepalese Rupee | en-NP |
| MYR | RM | Malaysian Ringgit | en-MY |
| SGD | S$ | Singapore Dollar | en-SG |

### Features
- ✅ Currency switching
- ✅ Exchange rate conversion
- ✅ Display in multiple currencies
- ✅ Currency symbols and formatting

### Usage
```typescript
import { formatCurrency, convertCurrency, getCurrency } from '@/constants/currency';

// Format amount
formatCurrency(1500, 'BDT'); // "৳ ১,৫০০"
formatCurrency(1500, 'USD'); // "$1,500.00"

// Convert currencies
convertCurrency(1000, 'BDT', 'USD'); // 8.30

// Get currency info
getCurrency('BDT'); // { code: 'BDT', symbol: '৳', ... }
```

---

## 2. Bangladesh Construction Price List

### Material Categories

| Category | Items |
|----------|-------|
| Cement | OPC, PCC, White Cement |
| Steel & Rod | 60 Grade, 40 Grade MS Rods |
| Bricks & Blocks | First Class, Second Class, Concrete Blocks |
| Sand & Aggregates | Mawa Sand, Sylhet Sand, Stone Chips |
| Wood & Timber | Teak, Chittagong Wood, Plywood |
| Tiles & Flooring | Ceramic, Porcelain, Marble, Granite |
| Paint & Chemicals | Plastic Paint, Enamel, Waterproofing |
| Electrical Items | Wires, Switches, LED Bulbs, Fans |
| Plumbing Items | Pipes, Taps, Wash Basin, Commode |
| Glass & Aluminum | Clear Glass, Aluminum Sections |

### Labor Rates

| Category | Daily Rate (BDT) |
|----------|-----------------|
| Master Mason | 1,200 |
| Helper | 700 |
| Master Carpenter | 1,100 |
| Electrician | 1,000 |
| Plumber | 1,100 |
| Painter | 900 |
| Steel Fitter | 1,000 |

### Usage
```typescript
import { 
  MATERIAL_PRICES, 
  LABOR_RATES, 
  getPriceItem, 
  calculateMaterialCost,
  searchPriceItems 
} from '@/constants/pricelist';

// Get price item
const cement = getPriceItem('cement-1');
// { name: 'Ordinary Portland Cement', price: 520, unit: 'bag' }

// Calculate cost
const cost = calculateMaterialCost([
  { itemId: 'cement-1', quantity: 100 },
  { itemId: 'steel-1', quantity: 1000 },
]);
// { subtotal: 147000, vat: 22050, total: 169050, details: [...] }

// Search items
const results = searchPriceItems('tiles');
```

---

## 3. Bangladesh Tax & VAT System

### VAT Rates

| Type | Rate | Description |
|------|------|-------------|
| Standard | 15% | Most goods and services |
| Reduced | 5% | Essential goods |
| Zero | 0% | Exports, medicines |
| Exempt | - | Basic food, education |

### Income Tax Slabs (FY 2024-25)

| Income Range (BDT) | Tax Rate |
|-------------------|----------|
| 0 - 3,50,000 | 0% |
| 3,50,001 - 4,50,000 | 5% |
| 4,50,001 - 7,50,000 | 10% |
| 7,50,001 - 11,50,000 | 15% |
| 11,50,001 - 15,50,000 | 20% |
| Above 15,50,000 | 25% |

### Features
- ✅ VAT calculation
- ✅ Income tax calculation
- ✅ Investment rebate calculation
- ✅ Tax invoice generation
- ✅ NBR compliance

### Usage
```typescript
import { 
  calculateVAT, 
  calculateIncomeTax,
  calculateInvestmentRebate,
  generateTaxInvoice,
  VAT_RATES 
} from '@/constants/tax';

// Calculate VAT
const vat = calculateVAT(1000, 15); // 150

// Calculate income tax
const tax = calculateIncomeTax(600000);
// { taxBreakdown: [...], totalTax: 27500, effectiveRate: 4.58 }

// Investment rebate
const rebate = calculateInvestmentRebate(200000);
// { eligibleAmount: 200000, rebateAmount: 30000 }
```

---

## 4. Expense Categories

### Main Categories (11 Expense + 3 Income)

| ID | Name (English) | Name (Bengali) |
|----|----------------|----------------|
| materials | Materials | নির্মাণ সামগ্রী |
| labor | Labor | শ্রমিক |
| equipment | Equipment | যন্ত্রপাতি |
| utilities | Utilities | উপযোগিতা |
| permits | Permits & Fees | অনুমতি ও ফি |
| consulting | Professional Services | পেশাদার সেবা |
| land | Land & Site | জমি ও স্থান |
| office | Office Expenses | দফতর ব্যয় |
| marketing | Marketing | বিপণন |
| taxes | Taxes & VAT | কর ও ভ্যাট |
| miscellaneous | Miscellaneous | বিবিধ |
| project-income | Project Income | প্রকল্প আয় |
| service-income | Service Income | সেবা আয় |
| other-income | Other Income | অন্যান্য আয় |

### Subcategories
Each main category has 5-12 subcategories for detailed tracking.

### Usage
```typescript
import { 
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  QUICK_EXPENSES,
  getCategory,
  getAllCategories 
} from '@/constants/categories';

// Get category
const category = getCategory('materials');

// Get all categories
const allCategories = getAllCategories();
```

---

## 5. Invoice Generator

### Features
- ✅ Professional invoice creation
- ✅ Multiple templates
- ✅ VAT calculation
- ✅ Discount support
- ✅ Multi-currency
- ✅ Status tracking
- ✅ CSV export

### Invoice Templates

| Template | Description |
|----------|-------------|
| construction-full | Complete construction project |
| renovation | Renovation work |
| consulting | Professional services |
| labor-only | Labor charges only |

### Usage
```typescript
import { 
  createInvoice,
  createInvoiceFromTemplate,
  updateInvoiceStatus,
  exportInvoiceToCSV,
  INVOICE_TEMPLATES 
} from '@/lib/invoice';

// Create invoice
const invoice = createInvoice(
  { name: 'Your Company', address: 'Dhaka', bin: '123456789' },
  { name: 'Client Name', address: 'Chittagong' },
  [
    { description: 'Cement', quantity: 100, unit: 'bags', unitPrice: 520 },
  ],
  { vatRate: 15, discountPercent: 5 }
);

// From template
const invoice2 = createInvoiceFromTemplate(
  'construction-full',
  seller,
  buyer,
  { currency: 'BDT' }
);
```

---

## 6. Backup & Restore

### Features
- ✅ Full data backup
- ✅ JSON export/import
- ✅ Storage statistics
- ✅ Data validation
- ✅ Automatic filename generation

### Usage
```typescript
import { 
  createBackup,
  restoreBackup,
  exportBackupToJSON,
  importBackupFromJSON,
  getBackupSummary,
  generateBackupFilename 
} from '@/lib/backup';

// Create backup
const backup = await createBackup();

// Export to JSON
const json = exportBackupToJSON(backup);

// Restore
await restoreBackup(backup);
```

---

## 7. Data Export (CSV & Excel)

### Export Formats

| Format | Description |
|--------|-------------|
| CSV | Simple comma-separated values |
| Excel HTML | Excel-compatible HTML tables |
| JSON | Complete backup format |

### Export Options

- Transactions
- Labor Payments
- Workers
- Invoices
- Complete Report

### Usage
```typescript
import { 
  exportTransactionsToCSV,
  exportTransactionsToExcel,
  exportCompleteReportToExcel,
  downloadAsFile 
} from '@/lib/backup';

// Export to CSV
const csv = exportTransactionsToCSV(transactions);
downloadAsFile(csv, 'transactions.csv', 'text/csv');

// Export to Excel
const excel = exportTransactionsToExcel(transactions);
downloadAsFile(excel, 'transactions.xls', 'application/vnd.ms-excel');
```

---

## 8. Budget Planning

### Features
- ✅ Create project budgets
- ✅ Track actual vs estimated
- ✅ Budget templates
- ✅ Category breakdown
- ✅ Variance alerts
- ✅ CSV export

### Budget Templates

| Template | Size | Est. Cost (BDT) |
|----------|------|-----------------|
| Residential (1200 sqft) | 1200 sqft | ~15,00,000 |
| Residential (2000 sqft) | 2000 sqft | ~28,00,000 |
| Commercial (3000 sqft) | 3000 sqft | ~42,00,000 |
| Standard Renovation | - | ~2,95,000 |

### Usage
```typescript
import { 
  createBudget,
  createBudgetFromTemplate,
  addBudgetItem,
  checkBudgetAlerts,
  exportBudgetToCSV,
  BUDGET_TEMPLATES 
} from '@/lib/budget';

// Create budget
let budget = createBudget('My Project', 'Client Name');

// Add items
budget = addBudgetItem(budget, {
  categoryId: 'materials',
  subcategoryId: 'mat-cement',
  description: 'Cement (100 bags)',
  estimatedAmount: 52000,
});

// Check alerts
const alerts = checkBudgetAlerts(budget);
```

---

## File Structure

```
js-account-upgraded/
├── app.json                          # App configuration
├── README.md                         # Main documentation
├── FEATURES.md                       # This file
├── BANGLADESH_CURRENCY_GUIDE.md      # Currency guide
├── client/
│   └── client/
│       ├── constants/
│       │   ├── currency.ts           # Multi-currency support
│       │   ├── pricelist.ts          # Bangladesh price list
│       │   ├── tax.ts                # Tax & VAT calculations
│       │   ├── categories.ts         # Expense categories
│       │   └── theme.ts              # Theme & branding
│       ├── lib/
│       │   ├── storage.ts            # Core storage functions
│       │   ├── invoice.ts            # Invoice generator
│       │   ├── backup.ts             # Backup & restore
│       │   ├── budget.ts             # Budget planning
│       │   └── index.ts              # Library exports
│       └── types/
│           └── index.ts              # Type definitions
```

---

## Quick Reference

### Currency
```typescript
formatCurrency(amount, 'BDT')      // ৳ ১,৫০০
convertCurrency(1000, 'BDT', 'USD') // 8.30
```

### Tax
```typescript
calculateVAT(1000, 15)             // 150
calculateIncomeTax(600000)         // { totalTax: 27500 }
```

### Invoice
```typescript
createInvoice(seller, buyer, items, options)
createInvoiceFromTemplate('construction-full', seller, buyer)
```

### Budget
```typescript
createBudgetFromTemplate('residential-1200', 'Project Name')
checkBudgetAlerts(budget)
```

### Backup
```typescript
await createBackup()
await restoreBackup(backupData)
```

---

**Author**: sabujdotnet  
**Website**: https://sabujdotnet.github.io  
**License**: GPL-3.0
