# Bangladesh Currency Integration Guide

## Overview

This document provides a quick reference for the Bangladeshi Taka (BDT) currency integration in J&S Accounting BD.

## Currency Symbol & Format

| Format | Example |
|--------|---------|
| Symbol | ৳ |
| Code | BDT |
| Formatted | ৳ ১,৫০০ |

## Implementation Details

### 1. formatCurrency Function

Located in: `client/client/lib/storage.ts`

```typescript
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('bn-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
```

**Usage:**
```typescript
formatCurrency(1500);     // "৳ ১,৫০০"
formatCurrency(50000);    // "৳ ৫০,০০০"
formatCurrency(1250.50);  // "৳ ১,২৫১" (rounded)
```

### 2. Currency Constants

Located in: `client/client/constants/theme.ts`

```typescript
export const Currency = {
  code: 'BDT' as const,
  symbol: '৳' as const,
  name: 'Bangladeshi Taka',
  locale: 'bn-BD' as const,
};
```

### 3. Type Definitions

Located in: `client/client/types/index.ts`

```typescript
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
```

## Date Formatting (Bangladesh Locale)

```typescript
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('bn-BD', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
```

**Example Output:**
- English input: "2024-01-15"
- Bengali output: "১৫ জানু, ২০২৪"

## Branding Constants

```typescript
export const Branding = {
  name: 'J&S Accounting BD',
  shortName: 'JS Accounting',
  author: 'sabujdotnet',
  website: 'https://sabujdotnet.github.io',
  github: 'https://github.com/sabujdotnet/js-account',
};
```

## Theme Colors (Bangladesh Flag Inspired)

| Color | Hex Code | Usage |
|-------|----------|-------|
| Bangladesh Green | `#006A4E` | Primary color, income |
| Bangladesh Red | `#F42A41` | Secondary color, expenses, danger |

## Storage Keys

All data is stored with the `@sabujdotnet_` prefix:

| Key | Purpose |
|-----|---------|
| `@sabujdotnet_transactions` | Financial transactions |
| `@sabujdotnet_labor_payments` | Worker salary payments |
| `@sabujdotnet_workers` | Worker information |
| `@sabujdotnet_plugins` | Plugin settings |
| `@sabujdotnet_settings` | App settings |

## Files Modified

1. ✅ `client/client/lib/storage.ts` - Currency & date formatting
2. ✅ `client/client/constants/theme.ts` - Theme & currency constants
3. ✅ `client/client/types/index.ts` - Type definitions
4. ✅ `app.json` - App configuration & branding

## Quick Reference Table

| Feature | Before (INR) | After (BDT) |
|---------|--------------|-------------|
| Currency | ₹ (Rupee) | ৳ (Taka) |
| Locale | en-IN | bn-BD |
| Format | ₹ 1,500 | ৳ ১,৫০০ |
| Storage | @buildledger_* | @sabujdotnet_* |
| Author | BuildLedger Team | sabujdotnet |
