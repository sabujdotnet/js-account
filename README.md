# J&S Accounting BD

An upgraded accounting app for Bangladesh construction businesses with comprehensive features including multi-currency support, Bangladesh price lists, tax calculations, invoice generation, and budget planning.

![Bangladesh](https://img.shields.io/badge/Bangladesh-%F0%9F%87%A7%F0%9F%87%A9-green)
![Currency](https://img.shields.io/badge/Currency-BDT%20(%E0%A7%B3)-blue)
![License](https://img.shields.io/badge/License-GPL--3.0-orange)

## Branding

- **App Name**: J&S Accounting BD
- **Author**: sabujdotnet
- **Website**: https://sabujdotnet.github.io
- **Repository**: https://github.com/sabujdotnet/js-account

## Currency Configuration

This upgraded version uses **Bangladeshi Taka (BDT)** as the default currency with multi-currency support.

### Supported Currencies

| Code | Symbol | Name |
|------|--------|------|
| BDT | ৳ | Bangladeshi Taka (Default) |
| INR | ₹ | Indian Rupee |
| USD | $ | US Dollar |
| EUR | € | Euro |
| GBP | £ | British Pound |
| PKR | ₨ | Pakistani Rupee |
| LKR | රු | Sri Lankan Rupee |
| NPR | रु | Nepalese Rupee |
| MYR | RM | Malaysian Ringgit |
| SGD | S$ | Singapore Dollar |

## New Features

### 1. Multi-Currency Support
- Switch between 10 currencies
- Real-time exchange rate conversion
- Display in multiple currencies simultaneously

### 2. Bangladesh Construction Price List
- Material prices for cement, steel, bricks, sand, tiles, paint, etc.
- Labor rates for masons, carpenters, electricians, plumbers
- Updated prices for 2025
- Search and filter functionality

### 3. Bangladesh Tax & VAT System
- VAT calculation (15%, 5%, 0%)
- Income tax slab calculation
- Investment rebate calculation
- NBR-compliant tax invoice generation

### 4. Expense Categories
- 11 expense categories with Bengali names
- 3 income categories
- 50+ subcategories for detailed tracking
- Color-coded categories

### 5. Invoice Generator
- Professional invoice templates
- VAT and discount support
- Multi-currency invoices
- Status tracking (draft, sent, paid, overdue)
- CSV export

### 6. Backup & Restore
- Full data backup to JSON
- Import/Export functionality
- Storage usage statistics
- Data validation

### 7. Data Export (CSV & Excel)
- Export transactions, labor payments, workers
- Excel-compatible HTML tables
- Complete financial reports

### 8. Budget Planning
- Project budget creation
- Budget templates (Residential, Commercial, Renovation)
- Actual vs estimated tracking
- Variance alerts
- Category breakdown

## Installation

1. **Download the upgraded files**
   ```bash
   git clone https://github.com/sabujdotnet/js-account.git
   cd js-account
   ```

2. **Replace the following files** with the upgraded versions:
   - `client/client/lib/storage.ts`
   - `client/client/lib/invoice.ts` (new)
   - `client/client/lib/backup.ts` (new)
   - `client/client/lib/budget.ts` (new)
   - `client/client/lib/index.ts` (new)
   - `client/client/constants/currency.ts` (new)
   - `client/client/constants/pricelist.ts` (new)
   - `client/client/constants/tax.ts` (new)
   - `client/client/constants/categories.ts` (new)
   - `client/client/constants/theme.ts`
   - `client/client/types/index.ts`
   - `app.json`

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Run the app**
   ```bash
   npx expo start
   ```

## Quick Start

### Format Currency
```typescript
import { formatCurrency } from '@/lib/storage';

formatCurrency(1500);           // "৳ ১,৫০০" (default BDT)
formatCurrency(1500, 'USD');    // "$1,500.00"
```

### Calculate VAT
```typescript
import { calculateVAT } from '@/constants/tax';

calculateVAT(1000, 15);  // 150 (15% VAT)
```

### Create Invoice
```typescript
import { createInvoice } from '@/lib/invoice';

const invoice = createInvoice(
  { name: 'Your Company', address: 'Dhaka' },
  { name: 'Client Name', address: 'Chittagong' },
  [
    { description: 'Cement', quantity: 100, unit: 'bags', unitPrice: 520 },
  ],
  { vatRate: 15 }
);
```

### Create Budget
```typescript
import { createBudgetFromTemplate } from '@/lib/budget';

const budget = createBudgetFromTemplate(
  'residential-1200',
  'My Dream Home'
);
```

### Backup Data
```typescript
import { createBackup, exportBackupToJSON } from '@/lib/backup';

const backup = await createBackup();
const json = exportBackupToJSON(backup);
```

## File Structure

```
js-account-upgraded/
├── app.json                          # App configuration
├── README.md                         # This file
├── FEATURES.md                       # Detailed feature documentation
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

## Theme Colors

| Color | Hex Code | Usage |
|-------|----------|-------|
| Bangladesh Green | `#006A4E` | Primary, Income |
| Bangladesh Red | `#F42A41` | Secondary, Expenses |

## Bangladesh Construction Price List

### Material Prices (Sample)

| Item | Unit | Price (BDT) |
|------|------|-------------|
| Ordinary Portland Cement | 50kg bag | 520 |
| 60 Grade MS Rod (10mm) | kg | 95 |
| First Class Bricks | piece | 12 |
| Mawa Sand | cft | 45 |
| Ceramic Floor Tiles | sqft | 45 |

### Labor Rates (Sample)

| Worker | Daily Rate (BDT) |
|--------|-----------------|
| Master Mason | 1,200 |
| Helper | 700 |
| Electrician | 1,000 |
| Plumber | 1,100 |

See `FEATURES.md` for complete price list.

## Tax Information

### VAT Rates
- Standard: 15%
- Reduced: 5%
- Zero: 0%

### Income Tax Slabs (FY 2024-25)

| Income Range (BDT) | Rate |
|-------------------|------|
| 0 - 3,50,000 | 0% |
| 3,50,001 - 4,50,000 | 5% |
| 4,50,001 - 7,50,000 | 10% |
| 7,50,001 - 11,50,000 | 15% |
| 11,50,001 - 15,50,000 | 20% |
| Above 15,50,000 | 25% |

## Documentation

- [FEATURES.md](FEATURES.md) - Detailed feature documentation
- [BANGLADESH_CURRENCY_GUIDE.md](BANGLADESH_CURRENCY_GUIDE.md) - Currency integration guide

## Changes from Original

### Currency
- Changed from INR (₹) to BDT (৳)
- Added multi-currency support
- Updated locale to bn-BD

### Branding
- App name: J&S Accounting BD
- Author: sabujdotnet
- Storage keys: @sabujdotnet_*
- Theme colors: Bangladesh flag colors

### New Features
- 10 currencies supported
- 200+ price list items
- Complete tax system
- Invoice generator
- Budget planner
- Backup/restore
- CSV/Excel export

## License

GPL-3.0 License

## Author

**sabujdotnet**
- Website: https://sabujdotnet.github.io
- GitHub: https://github.com/sabujdotnet

---

<p align="center">
  Made with ❤️ for Bangladesh
</p>
