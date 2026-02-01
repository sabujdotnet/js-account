# Upgrade Instructions

## How to Apply These Changes to Your App

### Step 1: Backup Your Current Data
Before making any changes, backup your existing data:
1. Go to Settings in your app
2. Export/Backup your data
3. Save the backup file safely

### Step 2: Replace Files

Copy these new/modified files to your project:

#### New Files (Create these)
```
client/client/constants/currency.ts
client/client/constants/pricelist.ts
client/client/constants/tax.ts
client/client/constants/categories.ts
client/client/lib/invoice.ts
client/client/lib/backup.ts
client/client/lib/budget.ts
client/client/lib/index.ts
```

#### Modified Files (Replace these)
```
client/client/constants/theme.ts
client/client/lib/storage.ts
client/client/types/index.ts
app.json
```

### Step 3: Update Imports

If you have any files that import from storage.ts, update them to use the new index.ts:

**Old import:**
```typescript
import { formatCurrency, getTransactions } from '@/lib/storage';
```

**New import:**
```typescript
import { formatCurrency, getTransactions } from '@/lib';
```

### Step 4: Clear Storage (Optional but Recommended)

Since storage keys have changed from `@buildledger_*` to `@sabujdotnet_*`, you may want to:
1. Export your old data first
2. Clear app storage
3. Import data back (it will use new keys)

### Step 5: Test

1. Run the app: `npx expo start`
2. Test currency formatting (should show ৳)
3. Test price list feature
4. Test invoice generation
5. Test backup/restore

### Step 6: Update Screens (Optional)

To use the new features, update your screens:

#### Add Currency Selector
```typescript
import { getAllCurrencies, formatCurrency } from '@/constants/currency';

// Display currency options
const currencies = getAllCurrencies();
```

#### Show Price List
```typescript
import { MATERIAL_PRICES, LABOR_RATES } from '@/constants/pricelist';

// Display material prices
const cementPrices = MATERIAL_PRICES.find(p => p.id === 'cement');
```

#### Generate Invoice
```typescript
import { createInvoice } from '@/lib/invoice';

const invoice = createInvoice(seller, buyer, items);
```

#### Create Budget
```typescript
import { createBudgetFromTemplate } from '@/lib/budget';

const budget = createBudgetFromTemplate('residential-1200', 'Project Name');
```

### Step 7: Build and Deploy

```bash
# For Android
npx expo build:android

# For iOS
npx expo build:ios

# For Web
npx expo build:web
```

## Troubleshooting

### Issue: Currency still shows ₹ instead of ৳
**Solution:** Clear app data and restart

### Issue: Storage keys not found
**Solution:** Data from old keys won't auto-migrate. Export old data, clear storage, import back.

### Issue: Import errors
**Solution:** Make sure all new files are created and paths are correct

## Support

- Website: https://sabujdotnet.github.io
- GitHub: https://github.com/sabujdotnet/js-account

---

**Note:** This is a major upgrade with new features. Test thoroughly before deploying to production.
