/**
 * Multi-Currency Support for J&S Accounting BD
 * Author: sabujdotnet
 * Website: https://sabujdotnet.github.io
 */

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  nameBn: string; // Bengali name
  locale: string;
  flag: string;
  decimalPlaces: number;
}

/**
 * Supported Currencies
 */
export const CURRENCIES: Record<string, Currency> = {
  BDT: {
    code: 'BDT',
    symbol: '৳',
    name: 'Bangladeshi Taka',
    nameBn: 'বাংলাদেশী টাকা',
    locale: 'bn-BD',
    flag: '🇧🇩',
    decimalPlaces: 0,
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    nameBn: 'ভারতীয় রুপি',
    locale: 'en-IN',
    flag: '🇮🇳',
    decimalPlaces: 0,
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    nameBn: 'মার্কিন ডলার',
    locale: 'en-US',
    flag: '🇺🇸',
    decimalPlaces: 2,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    nameBn: 'ইউরো',
    locale: 'en-EU',
    flag: '🇪🇺',
    decimalPlaces: 2,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    nameBn: 'ব্রিটিশ পাউন্ড',
    locale: 'en-GB',
    flag: '🇬🇧',
    decimalPlaces: 2,
  },
  PKR: {
    code: 'PKR',
    symbol: '₨',
    name: 'Pakistani Rupee',
    nameBn: 'পাকিস্তানি রুপি',
    locale: 'en-PK',
    flag: '🇵🇰',
    decimalPlaces: 0,
  },
  LKR: {
    code: 'LKR',
    symbol: 'රු',
    name: 'Sri Lankan Rupee',
    nameBn: 'শ্রীলঙ্কান রুপি',
    locale: 'en-LK',
    flag: '🇱🇰',
    decimalPlaces: 2,
  },
  NPR: {
    code: 'NPR',
    symbol: 'रू',
    name: 'Nepalese Rupee',
    nameBn: 'নেপালি রুপি',
    locale: 'en-NP',
    flag: '🇳🇵',
    decimalPlaces: 2,
  },
  MYR: {
    code: 'MYR',
    symbol: 'RM',
    name: 'Malaysian Ringgit',
    nameBn: 'মালয়েশিয়ান রিংগিট',
    locale: 'en-MY',
    flag: '🇲🇾',
    decimalPlaces: 2,
  },
  SGD: {
    code: 'SGD',
    symbol: 'S$',
    name: 'Singapore Dollar',
    nameBn: 'সিঙ্গাপুর ডলার',
    locale: 'en-SG',
    flag: '🇸🇬',
    decimalPlaces: 2,
  },
};

/**
 * Default Currency (Bangladeshi Taka)
 */
export const DEFAULT_CURRENCY_CODE = 'BDT';

/**
 * Get currency by code
 */
export function getCurrency(code: string): Currency {
  return CURRENCIES[code] || CURRENCIES[DEFAULT_CURRENCY_CODE];
}

/**
 * Get all available currencies as array
 */
export function getAllCurrencies(): Currency[] {
  return Object.values(CURRENCIES);
}

/**
 * Format amount with specified currency
 */
export function formatCurrency(amount: number, currencyCode: string = DEFAULT_CURRENCY_CODE): string {
  const currency = getCurrency(currencyCode);
  return new Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: currency.decimalPlaces,
    maximumFractionDigits: currency.decimalPlaces,
  }).format(amount);
}

/**
 * Format amount with currency symbol only (no code)
 */
export function formatCurrencySymbol(amount: number, currencyCode: string = DEFAULT_CURRENCY_CODE): string {
  const currency = getCurrency(currencyCode);
  const formatted = new Intl.NumberFormat(currency.locale, {
    minimumFractionDigits: currency.decimalPlaces,
    maximumFractionDigits: currency.decimalPlaces,
  }).format(amount);
  return `${currency.symbol} ${formatted}`;
}

/**
 * Convert amount between currencies (using exchange rates)
 * Note: In production, fetch real-time rates from an API
 */
export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  lastUpdated: string;
}

// Sample exchange rates (Base: BDT)
export const EXCHANGE_RATES: Record<string, number> = {
  BDT: 1,
  INR: 0.75,      // 1 BDT = 0.75 INR
  USD: 0.0083,    // 1 BDT = 0.0083 USD
  EUR: 0.0076,    // 1 BDT = 0.0076 EUR
  GBP: 0.0065,    // 1 BDT = 0.0065 GBP
  PKR: 2.35,      // 1 BDT = 2.35 PKR
  LKR: 2.75,      // 1 BDT = 2.75 LKR
  NPR: 1.20,      // 1 BDT = 1.20 NPR
  MYR: 0.039,     // 1 BDT = 0.039 MYR
  SGD: 0.011,     // 1 BDT = 0.011 SGD
};

/**
 * Convert amount from one currency to another
 */
export function convertCurrency(
  amount: number,
  fromCode: string,
  toCode: string
): number {
  if (fromCode === toCode) return amount;
  
  const fromRate = EXCHANGE_RATES[fromCode] || 1;
  const toRate = EXCHANGE_RATES[toCode] || 1;
  
  // Convert to BDT first, then to target currency
  const amountInBDT = amount / fromRate;
  const convertedAmount = amountInBDT * toRate;
  
  const targetCurrency = getCurrency(toCode);
  return Number(convertedAmount.toFixed(targetCurrency.decimalPlaces));
}

/**
 * Currency settings storage key
 */
export const CURRENCY_SETTINGS_KEY = '@sabujdotnet_currency_settings';

/**
 * Currency settings interface
 */
export interface CurrencySettings {
  defaultCurrency: string;
  displayCurrency: string;
  showBothCurrencies: boolean;
  secondaryCurrency: string;
}

/**
 * Default currency settings
 */
export const DEFAULT_CURRENCY_SETTINGS: CurrencySettings = {
  defaultCurrency: DEFAULT_CURRENCY_CODE,
  displayCurrency: DEFAULT_CURRENCY_CODE,
  showBothCurrencies: false,
  secondaryCurrency: 'USD',
};
