/**
 * Construction Expense Categories
 * Author: sabujdotnet
 * Website: https://sabujdotnet.github.io
 * 
 * Comprehensive expense categories for construction accounting
 */

export interface ExpenseCategory {
  id: string;
  name: string;
  nameBn: string;
  icon: string;
  color: string;
  description: string;
  subcategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  nameBn: string;
  description?: string;
}

/**
 * Main Expense Categories for Construction
 */
export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  {
    id: 'materials',
    name: 'Materials',
    nameBn: 'নির্মাণ সামগ্রী',
    icon: 'package',
    color: '#006A4E',
    description: 'Construction materials and supplies',
    subcategories: [
      { id: 'mat-cement', name: 'Cement', nameBn: 'সিমেন্ট' },
      { id: 'mat-steel', name: 'Steel & Rods', nameBn: 'স্টিল ও রড' },
      { id: 'mat-bricks', name: 'Bricks & Blocks', nameBn: 'ইট ও ব্লক' },
      { id: 'mat-sand', name: 'Sand & Aggregates', nameBn: 'বালি ও পাথর' },
      { id: 'mat-wood', name: 'Wood & Timber', nameBn: 'কাঠ ও টিম্বার' },
      { id: 'mat-tiles', name: 'Tiles & Flooring', nameBn: 'টাইলস ও ফ্লোরিং' },
      { id: 'mat-paint', name: 'Paint & Chemicals', nameBn: 'পেইন্ট ও রসায়ন' },
      { id: 'mat-electrical', name: 'Electrical Items', nameBn: 'ইলেকট্রিক্যাল সামগ্রী' },
      { id: 'mat-plumbing', name: 'Plumbing Items', nameBn: 'প্লাম্বিং সামগ্রী' },
      { id: 'mat-glass', name: 'Glass & Aluminum', nameBn: 'কাঁচ ও অ্যালুমিনিয়াম' },
      { id: 'mat-hardware', name: 'Hardware', nameBn: 'হার্ডওয়্যার' },
      { id: 'mat-other', name: 'Other Materials', nameBn: 'অন্যান্য সামগ্রী' },
    ],
  },
  {
    id: 'labor',
    name: 'Labor',
    nameBn: 'শ্রমিক',
    icon: 'users',
    color: '#F42A41',
    description: 'Worker wages and labor costs',
    subcategories: [
      { id: 'lab-mason', name: 'Masonry', nameBn: 'রাজমিস্ত্রি' },
      { id: 'lab-carpenter', name: 'Carpentry', nameBn: 'কাঠমিস্ত্রি' },
      { id: 'lab-electrician', name: 'Electrical', nameBn: 'ইলেকট্রিশিয়ান' },
      { id: 'lab-plumber', name: 'Plumbing', nameBn: 'প্লাম্বার' },
      { id: 'lab-painter', name: 'Painting', nameBn: 'পেইন্টার' },
      { id: 'lab-steel', name: 'Steel Work', nameBn: 'স্টিল কাজ' },
      { id: 'lab-helper', name: 'Helpers', nameBn: 'সহকারী শ্রমিক' },
      { id: 'lab-supervisor', name: 'Supervisor', nameBn: 'সুপারভাইজার' },
      { id: 'lab-overtime', name: 'Overtime', nameBn: 'অতিরিক্ত সময়' },
      { id: 'lab-other', name: 'Other Labor', nameBn: 'অন্যান্য শ্রমিক' },
    ],
  },
  {
    id: 'equipment',
    name: 'Equipment',
    nameBn: 'যন্ত্রপাতি',
    icon: 'truck',
    color: '#2196F3',
    description: 'Equipment rental and purchase',
    subcategories: [
      { id: 'eqp-rental', name: 'Equipment Rental', nameBn: 'যন্ত্রপাতি ভাড়া' },
      { id: 'eqp-purchase', name: 'Equipment Purchase', nameBn: 'যন্ত্রপাতি ক্রয়' },
      { id: 'eqp-maintenance', name: 'Maintenance', nameBn: 'রক্ষণাবেক্ষণ' },
      { id: 'eqp-fuel', name: 'Fuel', nameBn: 'জ্বালানি' },
      { id: 'eqp-transport', name: 'Transportation', nameBn: 'পরিবহন' },
      { id: 'eqp-other', name: 'Other Equipment', nameBn: 'অন্যান্য যন্ত্রপাতি' },
    ],
  },
  {
    id: 'utilities',
    name: 'Utilities',
    nameBn: 'উপযোগিতা',
    icon: 'zap',
    color: '#FF9800',
    description: 'Electricity, water, and other utilities',
    subcategories: [
      { id: 'utl-electricity', name: 'Electricity', nameBn: 'বিদ্যুৎ' },
      { id: 'utl-water', name: 'Water', nameBn: 'পানি' },
      { id: 'utl-gas', name: 'Gas', nameBn: 'গ্যাস' },
      { id: 'utl-generator', name: 'Generator Fuel', nameBn: 'জেনারেটর জ্বালানি' },
      { id: 'utl-internet', name: 'Internet/Phone', nameBn: 'ইন্টারনেট/ফোন' },
      { id: 'utl-other', name: 'Other Utilities', nameBn: 'অন্যান্য উপযোগিতা' },
    ],
  },
  {
    id: 'permits',
    name: 'Permits & Fees',
    nameBn: 'অনুমতি ও ফি',
    icon: 'file-text',
    color: '#9C27B0',
    description: 'Government permits and legal fees',
    subcategories: [
      { id: 'perm-building', name: 'Building Permit', nameBn: 'বিল্ডিং পারমিট' },
      { id: 'perm-environment', name: 'Environment Clearance', nameBn: 'পরিবেশ অনুমতি' },
      { id: 'perm-fire', name: 'Fire Safety', nameBn: 'ফায়ার সেফটি' },
      { id: 'perm-rajuk', name: 'RAJUK/Development', nameBn: 'রাজউক/উন্নয়ন' },
      { id: 'perm-legal', name: 'Legal Fees', nameBn: 'আইনি ফি' },
      { id: 'perm-survey', name: 'Survey Fees', nameBn: 'জরিপ ফি' },
      { id: 'perm-other', name: 'Other Permits', nameBn: 'অন্যান্য অনুমতি' },
    ],
  },
  {
    id: 'consulting',
    name: 'Professional Services',
    nameBn: 'পেশাদার সেবা',
    icon: 'briefcase',
    color: '#00BCD4',
    description: 'Architect, engineer, and consultant fees',
    subcategories: [
      { id: 'prof-architect', name: 'Architect', nameBn: 'স্থপতি' },
      { id: 'prof-engineer', name: 'Structural Engineer', nameBn: 'স্ট্রাকচারাল ইঞ্জিনিয়ার' },
      { id: 'prof-interior', name: 'Interior Designer', nameBn: 'ইন্টেরিয়ার ডিজাইনার' },
      { id: 'prof-consultant', name: 'Consultant', nameBn: 'পরামর্শক' },
      { id: 'prof-project', name: 'Project Manager', nameBn: 'প্রজেক্ট ম্যানেজার' },
      { id: 'prof-accountant', name: 'Accountant', nameBn: 'হিসাবরক্ষক' },
      { id: 'prof-other', name: 'Other Services', nameBn: 'অন্যান্য সেবা' },
    ],
  },
  {
    id: 'land',
    name: 'Land & Site',
    nameBn: 'জমি ও স্থান',
    icon: 'map-pin',
    color: '#795548',
    description: 'Land related expenses',
    subcategories: [
      { id: 'land-purchase', name: 'Land Purchase', nameBn: 'জমি ক্রয়' },
      { id: 'land-lease', name: 'Land Lease', nameBn: 'জমি লিজ' },
      { id: 'land-clearing', name: 'Site Clearing', nameBn: 'স্থান পরিষ্কার' },
      { id: 'land-leveling', name: 'Site Leveling', nameBn: 'স্থান সমতলকরণ' },
      { id: 'land-fencing', name: 'Site Fencing', nameBn: 'স্থান বেষ্টনী' },
      { id: 'land-security', name: 'Site Security', nameBn: 'স্থান নিরাপত্তা' },
      { id: 'land-other', name: 'Other Land Expenses', nameBn: 'অন্যান্য জমি ব্যয়' },
    ],
  },
  {
    id: 'office',
    name: 'Office Expenses',
    nameBn: 'দফতর ব্যয়',
    icon: 'home',
    color: '#607D8B',
    description: 'Office and administrative expenses',
    subcategories: [
      { id: 'off-rent', name: 'Office Rent', nameBn: 'দফতর ভাড়া' },
      { id: 'off-stationery', name: 'Stationery', nameBn: 'স্টেশনারি' },
      { id: 'off-printing', name: 'Printing', nameBn: 'প্রিন্টিং' },
      { id: 'off-software', name: 'Software', nameBn: 'সফটওয়্যার' },
      { id: 'off-insurance', name: 'Insurance', nameBn: 'বীমা' },
      { id: 'off-salary', name: 'Staff Salary', nameBn: 'কর্মচারী বেতন' },
      { id: 'off-other', name: 'Other Office', nameBn: 'অন্যান্য দফতর ব্যয়' },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    nameBn: 'বিপণন',
    icon: 'speaker',
    color: '#E91E63',
    description: 'Marketing and advertising expenses',
    subcategories: [
      { id: 'mkt-advertising', name: 'Advertising', nameBn: 'বিজ্ঞাপন' },
      { id: 'mkt-brochure', name: 'Brochures/Signs', nameBn: 'ব্রোশিয়ার/সাইনবোর্ড' },
      { id: 'mkt-website', name: 'Website', nameBn: 'ওয়েবসাইট' },
      { id: 'mkt-events', name: 'Events/Exhibitions', nameBn: 'অনুষ্ঠান/প্রদর্শনী' },
      { id: 'mkt-commission', name: 'Sales Commission', nameBn: 'বিক্রয় কমিশন' },
      { id: 'mkt-other', name: 'Other Marketing', nameBn: 'অন্যান্য বিপণন' },
    ],
  },
  {
    id: 'taxes',
    name: 'Taxes & VAT',
    nameBn: 'কর ও ভ্যাট',
    icon: 'percent',
    color: '#4CAF50',
    description: 'Tax payments and VAT',
    subcategories: [
      { id: 'tax-vat', name: 'VAT', nameBn: 'ভ্যাট' },
      { id: 'tax-income', name: 'Income Tax', nameBn: 'আয়কর' },
      { id: 'tax-advance', name: 'Advance Tax', nameBn: 'অগ্রিম কর' },
      { id: 'tax-ait', name: 'AIT', nameBn: 'এআইটি' },
      { id: 'tax-registration', name: 'Trade License', nameBn: 'ট্রেড লাইসেন্স' },
      { id: 'tax-other', name: 'Other Taxes', nameBn: 'অন্যান্য কর' },
    ],
  },
  {
    id: 'miscellaneous',
    name: 'Miscellaneous',
    nameBn: 'বিবিধ',
    icon: 'more-horizontal',
    color: '#9E9E9E',
    description: 'Other expenses',
    subcategories: [
      { id: 'misc-gifts', name: 'Gifts/Entertainment', nameBn: 'উপহার/বিনোদন' },
      { id: 'misc-donation', name: 'Donations', nameBn: 'দান' },
      { id: 'misc-penalty', name: 'Penalties', nameBn: 'জরিমানা' },
      { id: 'misc-bank', name: 'Bank Charges', nameBn: 'ব্যাংক চার্জ' },
      { id: 'misc-other', name: 'Other Expenses', nameBn: 'অন্যান্য ব্যয়' },
    ],
  },
];

/**
 * Income Categories
 */
export const INCOME_CATEGORIES: ExpenseCategory[] = [
  {
    id: 'project-income',
    name: 'Project Income',
    nameBn: 'প্রকল্প আয়',
    icon: 'home',
    color: '#006A4E',
    description: 'Income from construction projects',
    subcategories: [
      { id: 'inc-residential', name: 'Residential', nameBn: 'আবাসিক' },
      { id: 'inc-commercial', name: 'Commercial', nameBn: 'বাণিজ্যিক' },
      { id: 'inc-industrial', name: 'Industrial', nameBn: 'শিল্প' },
      { id: 'inc-renovation', name: 'Renovation', nameBn: 'পুনর্নির্মাণ' },
      { id: 'inc-maintenance', name: 'Maintenance', nameBn: 'রক্ষণাবেক্ষণ' },
    ],
  },
  {
    id: 'service-income',
    name: 'Service Income',
    nameBn: 'সেবা আয়',
    icon: 'tool',
    color: '#2196F3',
    description: 'Income from services',
    subcategories: [
      { id: 'inc-consulting', name: 'Consulting', nameBn: 'পরামর্শ' },
      { id: 'inc-design', name: 'Design Services', nameBn: 'ডিজাইন সেবা' },
      { id: 'inc-supervision', name: 'Supervision', nameBn: 'তদারকি' },
      { id: 'inc-rental', name: 'Equipment Rental', nameBn: 'যন্ত্রপাতি ভাড়া' },
    ],
  },
  {
    id: 'other-income',
    name: 'Other Income',
    nameBn: 'অন্যান্য আয়',
    icon: 'plus-circle',
    color: '#FF9800',
    description: 'Other sources of income',
    subcategories: [
      { id: 'inc-interest', name: 'Interest Income', nameBn: 'সুদ আয়' },
      { id: 'inc-dividend', name: 'Dividend', nameBn: 'লভ্যাংশ' },
      { id: 'inc-sale', name: 'Asset Sale', nameBn: 'সম্পদ বিক্রয়' },
      { id: 'inc-refund', name: 'Refunds', nameBn: 'ফেরত' },
      { id: 'inc-other', name: 'Miscellaneous', nameBn: 'বিবিধ' },
    ],
  },
];

/**
 * Get category by ID
 */
export function getCategory(id: string): ExpenseCategory | undefined {
  return [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES].find(cat => cat.id === id);
}

/**
 * Get subcategory by ID
 */
export function getSubcategory(categoryId: string, subcategoryId: string): SubCategory | undefined {
  const category = getCategory(categoryId);
  return category?.subcategories.find(sub => sub.id === subcategoryId);
}

/**
 * Get all categories as flat list
 */
export function getAllCategories(): { id: string; name: string; nameBn: string; type: 'expense' | 'income' }[] {
  const expenseCats = EXPENSE_CATEGORIES.map(cat => ({
    id: cat.id,
    name: cat.name,
    nameBn: cat.nameBn,
    type: 'expense' as const,
  }));
  
  const incomeCats = INCOME_CATEGORIES.map(cat => ({
    id: cat.id,
    name: cat.name,
    nameBn: cat.nameBn,
    type: 'income' as const,
  }));
  
  return [...expenseCats, ...incomeCats];
}

/**
 * Category colors for charts
 */
export const CATEGORY_COLORS: Record<string, string> = {
  materials: '#006A4E',
  labor: '#F42A41',
  equipment: '#2196F3',
  utilities: '#FF9800',
  permits: '#9C27B0',
  consulting: '#00BCD4',
  land: '#795548',
  office: '#607D8B',
  marketing: '#E91E63',
  taxes: '#4CAF50',
  miscellaneous: '#9E9E9E',
  'project-income': '#006A4E',
  'service-income': '#2196F3',
  'other-income': '#FF9800',
};

/**
 * Quick expense presets for common items
 */
export interface QuickExpense {
  categoryId: string;
  subcategoryId: string;
  description: string;
  descriptionBn: string;
  defaultAmount?: number;
}

export const QUICK_EXPENSES: QuickExpense[] = [
  { categoryId: 'materials', subcategoryId: 'mat-cement', description: 'Cement Purchase', descriptionBn: 'সিমেন্ট ক্রয়', defaultAmount: 5200 },
  { categoryId: 'materials', subcategoryId: 'mat-steel', description: 'Steel Rods', descriptionBn: 'স্টিল রড', defaultAmount: 9500 },
  { categoryId: 'materials', subcategoryId: 'mat-bricks', description: 'Bricks', descriptionBn: 'ইট', defaultAmount: 1200 },
  { categoryId: 'labor', subcategoryId: 'lab-mason', description: 'Mason Wages', descriptionBn: 'রাজমিস্ত্রির মজুরি', defaultAmount: 1200 },
  { categoryId: 'labor', subcategoryId: 'lab-helper', description: 'Helper Wages', descriptionBn: 'সহকারীর মজুরি', defaultAmount: 700 },
  { categoryId: 'utilities', subcategoryId: 'utl-electricity', description: 'Electricity Bill', descriptionBn: 'বিদ্যুৎ বিল', defaultAmount: 5000 },
  { categoryId: 'utilities', subcategoryId: 'utl-water', description: 'Water Bill', descriptionBn: 'পানির বিল', defaultAmount: 1500 },
  { categoryId: 'equipment', subcategoryId: 'eqp-rental', description: 'Equipment Rental', descriptionBn: 'যন্ত্রপাতি ভাড়া', defaultAmount: 5000 },
  { categoryId: 'equipment', subcategoryId: 'eqp-transport', description: 'Transportation', descriptionBn: 'পরিবহন', defaultAmount: 3000 },
  { categoryId: 'taxes', subcategoryId: 'tax-vat', description: 'VAT Payment', descriptionBn: 'ভ্যাট পরিশোধ', defaultAmount: 15000 },
];
