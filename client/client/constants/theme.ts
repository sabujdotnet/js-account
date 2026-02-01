/**
 * Theme constants for J&S Accounting BD
 * Brand: sabujdotnet.github.io
 * Currency: Bangladeshi Taka (BDT)
 */

export const Colors = {
  light: {
    primary: '#006A4E',     // Bangladesh flag green
    secondary: '#F42A41',   // Bangladesh flag red
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#1A1A1A',
    textSecondary: '#666666',
    border: '#E0E0E0',
    success: '#4CAF50',
    danger: '#F42A41',
    warning: '#FF9800',
    info: '#2196F3',
    income: '#006A4E',
    expense: '#F42A41',
  },
  dark: {
    primary: '#008F6B',
    secondary: '#FF5252',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    border: '#333333',
    success: '#4CAF50',
    danger: '#FF5252',
    warning: '#FFB74D',
    info: '#64B5F6',
    income: '#4CAF50',
    expense: '#FF5252',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  round: 9999,
};

export const FontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
  display: 32,
};

/**
 * Bangladesh Currency Configuration
 */
export const Currency = {
  code: 'BDT' as const,
  symbol: '৳' as const,
  name: 'Bangladeshi Taka',
  locale: 'bn-BD' as const,
};

/**
 * App Branding
 */
export const Branding = {
  name: 'J&S Accounting BD',
  shortName: 'JS Accounting',
  author: 'sabujdotnet',
  website: 'https://sabujdotnet.github.io',
  github: 'https://github.com/sabujdotnet/js-account',
};
