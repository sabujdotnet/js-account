/**
 * Bangladesh Construction Price List
 * Author: sabujdotnet
 * Website: https://sabujdotnet.github.io
 * 
 * Common construction material and labor rates in Bangladesh
 * Prices are in Bangladeshi Taka (BDT) per unit
 * Note: Prices are estimates and may vary by location and market conditions
 */

export interface PriceItem {
  id: string;
  name: string;
  nameBn: string;
  unit: string;
  unitBn: string;
  price: number;
  category: string;
  description?: string;
}

export interface PriceCategory {
  id: string;
  name: string;
  nameBn: string;
  icon: string;
  items: PriceItem[];
}

/**
 * Construction Material Prices
 */
export const MATERIAL_PRICES: PriceCategory[] = [
  {
    id: 'cement',
    name: 'Cement',
    nameBn: 'সিমেন্ট',
    icon: 'package',
    items: [
      { id: 'cement-1', name: 'Ordinary Portland Cement (OPC)', nameBn: 'অর্ডিনারি পোর্টল্যান্ড সিমেন্ট', unit: 'bag', unitBn: 'ব্যাগ', price: 520, category: 'cement', description: '50 kg bag' },
      { id: 'cement-2', name: 'Portland Composite Cement (PCC)', nameBn: 'পোর্টল্যান্ড কম্পোজিট সিমেন্ট', unit: 'bag', unitBn: 'ব্যাগ', price: 480, category: 'cement', description: '50 kg bag' },
      { id: 'cement-3', name: 'White Cement', nameBn: 'সাদা সিমেন্ট', unit: 'bag', unitBn: 'ব্যাগ', price: 1200, category: 'cement', description: '25 kg bag' },
    ],
  },
  {
    id: 'steel',
    name: 'Steel & Rod',
    nameBn: 'স্টিল ও রড',
    icon: 'activity',
    items: [
      { id: 'steel-1', name: '60 Grade MS Rod (10mm)', nameBn: '৬০ গ্রেড এমএস রড (১০মিমি)', unit: 'kg', unitBn: 'কেজি', price: 95, category: 'steel' },
      { id: 'steel-2', name: '60 Grade MS Rod (12mm)', nameBn: '৬০ গ্রেড এমএস রড (১২মিমি)', unit: 'kg', unitBn: 'কেজি', price: 95, category: 'steel' },
      { id: 'steel-3', name: '60 Grade MS Rod (16mm)', nameBn: '৬০ গ্রেড এমএস রড (১৬মিমি)', unit: 'kg', unitBn: 'কেজি', price: 95, category: 'steel' },
      { id: 'steel-4', name: '60 Grade MS Rod (20mm)', nameBn: '৬০ গ্রেড এমএস রড (২০মিমি)', unit: 'kg', unitBn: 'কেজি', price: 95, category: 'steel' },
      { id: 'steel-5', name: '40 Grade MS Rod', nameBn: '৪০ গ্রেড এমএস রড', unit: 'kg', unitBn: 'কেজি', price: 88, category: 'steel' },
      { id: 'steel-6', name: 'Structural Steel', nameBn: 'স্ট্রাকচারাল স্টিল', unit: 'kg', unitBn: 'কেজি', price: 110, category: 'steel' },
    ],
  },
  {
    id: 'bricks',
    name: 'Bricks & Blocks',
    nameBn: 'ইট ও ব্লক',
    icon: 'grid',
    items: [
      { id: 'brick-1', name: 'First Class Bricks (Pakki)', nameBn: 'পাকা ইট (প্রথম শ্রেণী)', unit: 'piece', unitBn: 'পিস', price: 12, category: 'bricks' },
      { id: 'brick-2', name: 'Second Class Bricks', nameBn: 'দ্বিতীয় শ্রেণীর ইট', unit: 'piece', unitBn: 'পিস', price: 9, category: 'bricks' },
      { id: 'brick-3', name: 'Concrete Blocks', nameBn: 'কংক্রিট ব্লক', unit: 'piece', unitBn: 'পিস', price: 45, category: 'bricks' },
      { id: 'brick-4', name: 'Hollow Blocks', nameBn: 'হোলো ব্লক', unit: 'piece', unitBn: 'পিস', price: 55, category: 'bricks' },
      { id: 'brick-5', name: 'Ceramic Bricks', nameBn: 'সিরামিক ইট', unit: 'piece', unitBn: 'পিস', price: 18, category: 'bricks' },
    ],
  },
  {
    id: 'sand',
    name: 'Sand & Aggregates',
    nameBn: 'বালি ও পাথর',
    icon: 'layers',
    items: [
      { id: 'sand-1', name: 'Mawa Sand (River)', nameBn: 'মাওয়া বালি (নদী)', unit: 'cft', unitBn: 'ঘনফুট', price: 45, category: 'sand' },
      { id: 'sand-2', name: 'Sylhet Sand', nameBn: 'সিলেটের বালি', unit: 'cft', unitBn: 'ঘনফুট', price: 55, category: 'sand' },
      { id: 'sand-3', name: 'Stone Chips (1/2")', nameBn: 'পাথরের চিপস (১/২")', unit: 'cft', unitBn: 'ঘনফুট', price: 85, category: 'sand' },
      { id: 'sand-4', name: 'Stone Chips (3/4")', nameBn: 'পাথরের চিপস (৩/৪")', unit: 'cft', unitBn: 'ঘনফুট', price: 90, category: 'sand' },
      { id: 'sand-5', name: 'Stone Dust', nameBn: 'পাথরের গুঁড়া', unit: 'cft', unitBn: 'ঘনফুট', price: 40, category: 'sand' },
      { id: 'sand-6', name: 'Brick Chips', nameBn: 'ইটের চিপস', unit: 'cft', unitBn: 'ঘনফুট', price: 35, category: 'sand' },
    ],
  },
  {
    id: 'wood',
    name: 'Wood & Timber',
    nameBn: 'কাঠ ও টিম্বার',
    icon: 'box',
    items: [
      { id: 'wood-1', name: 'Teak Wood (Segun)', nameBn: 'সেগুন কাঠ', unit: 'cft', unitBn: 'ঘনফুট', price: 2500, category: 'wood' },
      { id: 'wood-2', name: 'Chittagong Wood', nameBn: 'চট্টগ্রামের কাঠ', unit: 'cft', unitBn: 'ঘনফুট', price: 1800, category: 'wood' },
      { id: 'wood-3', name: 'Garjan Wood', nameBn: 'গর্জন কাঠ', unit: 'cft', unitBn: 'ঘনফুট', price: 2200, category: 'wood' },
      { id: 'wood-4', name: 'Plywood (18mm)', nameBn: 'প্লাইউড (১৮মিমি)', unit: 'sqft', unitBn: 'বর্গফুট', price: 120, category: 'wood' },
      { id: 'wood-5', name: 'MDF Board', nameBn: 'এমডিএফ বোর্ড', unit: 'sqft', unitBn: 'বর্গফুট', price: 80, category: 'wood' },
    ],
  },
  {
    id: 'tiles',
    name: 'Tiles & Flooring',
    nameBn: 'টাইলস ও ফ্লোরিং',
    icon: 'layout',
    items: [
      { id: 'tile-1', name: 'Ceramic Wall Tiles', nameBn: 'সিরামিক ওয়াল টাইলস', unit: 'sqft', unitBn: 'বর্গফুট', price: 35, category: 'tiles' },
      { id: 'tile-2', name: 'Ceramic Floor Tiles', nameBn: 'সিরামিক ফ্লোর টাইলস', unit: 'sqft', unitBn: 'বর্গফুট', price: 45, category: 'tiles' },
      { id: 'tile-3', name: 'Porcelain Tiles', nameBn: 'পরসেলিন টাইলস', unit: 'sqft', unitBn: 'বর্গফুট', price: 85, category: 'tiles' },
      { id: 'tile-4', name: 'Vitrified Tiles', nameBn: 'ভিট্রিফাইড টাইলস', unit: 'sqft', unitBn: 'বর্গফুট', price: 120, category: 'tiles' },
      { id: 'tile-5', name: 'Marble Tiles', nameBn: 'মার্বেল টাইলস', unit: 'sqft', unitBn: 'বর্গফুট', price: 250, category: 'tiles' },
      { id: 'tile-6', name: 'Granite Tiles', nameBn: 'গ্রানাইট টাইলস', unit: 'sqft', unitBn: 'বর্গফুট', price: 350, category: 'tiles' },
    ],
  },
  {
    id: 'paint',
    name: 'Paint & Chemicals',
    nameBn: 'পেইন্ট ও রসায়ন',
    icon: 'droplet',
    items: [
      { id: 'paint-1', name: 'Plastic Paint (per liter)', nameBn: 'প্লাস্টিক পেইন্ট (প্রতি লিটার)', unit: 'liter', unitBn: 'লিটার', price: 280, category: 'paint' },
      { id: 'paint-2', name: 'Enamel Paint', nameBn: 'ইনামেল পেইন্ট', unit: 'liter', unitBn: 'লিটার', price: 450, category: 'paint' },
      { id: 'paint-3', name: 'Distemper', nameBn: 'ডিস্টেম্পার', unit: 'kg', unitBn: 'কেজি', price: 150, category: 'paint' },
      { id: 'paint-4', name: 'Primer', nameBn: 'প্রাইমার', unit: 'liter', unitBn: 'লিটার', price: 320, category: 'paint' },
      { id: 'paint-5', name: 'Wall Putty', nameBn: 'ওয়াল পুটি', unit: 'kg', unitBn: 'কেজি', price: 45, category: 'paint' },
      { id: 'paint-6', name: 'Waterproofing Chemical', nameBn: 'ওয়াটারপ্রুফিং কেমিক্যাল', unit: 'liter', unitBn: 'লিটার', price: 380, category: 'paint' },
    ],
  },
  {
    id: 'electrical',
    name: 'Electrical Items',
    nameBn: 'ইলেকট্রিক্যাল সামগ্রী',
    icon: 'zap',
    items: [
      { id: 'elec-1', name: '2.5mm Wire (BRB)', nameBn: '২.৫মিমি তার (বিআরবি)', unit: 'meter', unitBn: 'মিটার', price: 35, category: 'electrical' },
      { id: 'elec-2', name: '4mm Wire (BRB)', nameBn: '৪মিমি তার (বিআরবি)', unit: 'meter', unitBn: 'মিটার', price: 55, category: 'electrical' },
      { id: 'elec-3', name: '6mm Wire (BRB)', nameBn: '৬মিমি তার (বিআরবি)', unit: 'meter', unitBn: 'মিটার', price: 85, category: 'electrical' },
      { id: 'elec-4', name: 'Switch Board (5-pin)', nameBn: 'সুইচ বোর্ড (৫-পিন)', unit: 'piece', unitBn: 'পিস', price: 120, category: 'electrical' },
      { id: 'elec-5', name: 'LED Bulb (12W)', nameBn: 'এলইডি বাল্ব (১২ওয়াট)', unit: 'piece', unitBn: 'পিস', price: 180, category: 'electrical' },
      { id: 'elec-6', name: 'Ceiling Fan', nameBn: 'সিলিং ফ্যান', unit: 'piece', unitBn: 'পিস', price: 2500, category: 'electrical' },
      { id: 'elec-7', name: 'Circuit Breaker (32A)', nameBn: 'সার্কিট ব্রেকার (৩২এ)', unit: 'piece', unitBn: 'পিস', price: 450, category: 'electrical' },
    ],
  },
  {
    id: 'plumbing',
    name: 'Plumbing Items',
    nameBn: 'প্লাম্বিং সামগ্রী',
    icon: 'anchor',
    items: [
      { id: 'plumb-1', name: 'uPVC Pipe (1")', nameBn: 'ইউপিভিসি পাইপ (১")', unit: 'meter', unitBn: 'মিটার', price: 85, category: 'plumbing' },
      { id: 'plumb-2', name: 'uPVC Pipe (2")', nameBn: 'ইউপিভিসি পাইপ (২")', unit: 'meter', unitBn: 'মিটার', price: 150, category: 'plumbing' },
      { id: 'plumb-3', name: 'GI Pipe (1")', nameBn: 'জিআই পাইপ (১")', unit: 'meter', unitBn: 'মিটার', price: 450, category: 'plumbing' },
      { id: 'plumb-4', name: 'Water Tap', nameBn: 'ওয়াটার ট্যাপ', unit: 'piece', unitBn: 'পিস', price: 350, category: 'plumbing' },
      { id: 'plumb-5', name: 'Wash Basin', nameBn: 'ওয়াশ বেসিন', unit: 'piece', unitBn: 'পিস', price: 2500, category: 'plumbing' },
      { id: 'plumb-6', name: 'Commode', nameBn: 'কমোড', unit: 'piece', unitBn: 'পিস', price: 5500, category: 'plumbing' },
      { id: 'plumb-7', name: 'Water Tank (1000L)', nameBn: 'ওয়াটার ট্যাংক (১০০০লি)', unit: 'piece', unitBn: 'পিস', price: 8500, category: 'plumbing' },
    ],
  },
  {
    id: 'glass',
    name: 'Glass & Aluminum',
    nameBn: 'কাঁচ ও অ্যালুমিনিয়াম',
    icon: 'square',
    items: [
      { id: 'glass-1', name: 'Clear Glass (5mm)', nameBn: 'স্বচ্ছ কাঁচ (৫মিমি)', unit: 'sqft', unitBn: 'বর্গফুট', price: 85, category: 'glass' },
      { id: 'glass-2', name: 'Tinted Glass (5mm)', nameBn: 'টিনটেড কাঁচ (৫মিমি)', unit: 'sqft', unitBn: 'বর্গফুট', price: 120, category: 'glass' },
      { id: 'glass-3', name: 'Reflective Glass', nameBn: 'রিফ্লেক্টিভ কাঁচ', unit: 'sqft', unitBn: 'বর্গফুট', price: 250, category: 'glass' },
      { id: 'glass-4', name: 'Aluminum Section', nameBn: 'অ্যালুমিনিয়াম সেকশন', unit: 'kg', unitBn: 'কেজি', price: 320, category: 'glass' },
      { id: 'glass-5', name: 'Aluminum Window Frame', nameBn: 'অ্যালুমিনিয়াম উইন্ডো ফ্রেম', unit: 'sqft', unitBn: 'বর্গফুট', price: 450, category: 'glass' },
    ],
  },
];

/**
 * Labor Rates for Construction Work
 */
export const LABOR_RATES: PriceCategory[] = [
  {
    id: 'masonry',
    name: 'Masonry Work',
    nameBn: 'রাজমিস্ত্রির কাজ',
    icon: 'hard-hat',
    items: [
      { id: 'mason-1', name: 'Master Mason (Rajmistri)', nameBn: 'মাস্টার রাজমিস্ত্রি', unit: 'day', unitBn: 'দিন', price: 1200, category: 'masonry' },
      { id: 'mason-2', name: 'Helper (Noukar)', nameBn: 'সহকারী (নৌকর)', unit: 'day', unitBn: 'দিন', price: 700, category: 'masonry' },
      { id: 'mason-3', name: 'Brick Work (per sqft)', nameBn: 'ইটের কাজ (প্রতি বর্গফুট)', unit: 'sqft', unitBn: 'বর্গফুট', price: 45, category: 'masonry' },
      { id: 'mason-4', name: 'Plaster Work (per sqft)', nameBn: 'প্লাস্টার কাজ (প্রতি বর্গফুট)', unit: 'sqft', unitBn: 'বর্গফুট', price: 35, category: 'masonry' },
      { id: 'mason-5', name: 'Tile Fitting (per sqft)', nameBn: 'টাইলস বসানো (প্রতি বর্গফুট)', unit: 'sqft', unitBn: 'বর্গফুট', price: 40, category: 'masonry' },
    ],
  },
  {
    id: 'carpentry',
    name: 'Carpentry Work',
    nameBn: 'কাঠমিস্ত্রির কাজ',
    icon: 'tool',
    items: [
      { id: 'carp-1', name: 'Master Carpenter', nameBn: 'মাস্টার কাঠমিস্ত্রি', unit: 'day', unitBn: 'দিন', price: 1100, category: 'carpentry' },
      { id: 'carp-2', name: 'Helper', nameBn: 'সহকারী', unit: 'day', unitBn: 'দিন', price: 650, category: 'carpentry' },
      { id: 'carp-3', name: 'Door Frame (per cft)', nameBn: 'দরজার ফ্রেম (প্রতি ঘনফুট)', unit: 'cft', unitBn: 'ঘনফুট', price: 350, category: 'carpentry' },
      { id: 'carp-4', name: 'Window Frame (per cft)', nameBn: 'জানালার ফ্রেম (প্রতি ঘনফুট)', unit: 'cft', unitBn: 'ঘনফুট', price: 320, category: 'carpentry' },
      { id: 'carp-5', name: 'False Ceiling (per sqft)', nameBn: 'ফলস সিলিং (প্রতি বর্গফুট)', unit: 'sqft', unitBn: 'বর্গফুট', price: 85, category: 'carpentry' },
    ],
  },
  {
    id: 'electrical-labor',
    name: 'Electrical Work',
    nameBn: 'ইলেকট্রিক্যাল কাজ',
    icon: 'zap',
    items: [
      { id: 'elec-lab-1', name: 'Electrician (Master)', nameBn: 'ইলেকট্রিশিয়ান (মাস্টার)', unit: 'day', unitBn: 'দিন', price: 1000, category: 'electrical-labor' },
      { id: 'elec-lab-2', name: 'Electrician (Helper)', nameBn: 'ইলেকট্রিশিয়ান (সহকারী)', unit: 'day', unitBn: 'দিন', price: 600, category: 'electrical-labor' },
      { id: 'elec-lab-3', name: 'Wiring (per point)', nameBn: 'ওয়্যারিং (প্রতি পয়েন্ট)', unit: 'point', unitBn: 'পয়েন্ট', price: 350, category: 'electrical-labor' },
      { id: 'elec-lab-4', name: 'Fan Installation', nameBn: 'ফ্যান ইনস্টলেশন', unit: 'piece', unitBn: 'পিস', price: 250, category: 'electrical-labor' },
      { id: 'elec-lab-5', name: 'Light Fitting', nameBn: 'লাইট ফিটিং', unit: 'piece', unitBn: 'পিস', price: 150, category: 'electrical-labor' },
    ],
  },
  {
    id: 'plumbing-labor',
    name: 'Plumbing Work',
    nameBn: 'প্লাম্বিং কাজ',
    icon: 'anchor',
    items: [
      { id: 'plumb-lab-1', name: 'Plumber (Master)', nameBn: 'প্লাম্বার (মাস্টার)', unit: 'day', unitBn: 'দিন', price: 1100, category: 'plumbing-labor' },
      { id: 'plumb-lab-2', name: 'Plumber (Helper)', nameBn: 'প্লাম্বার (সহকারী)', unit: 'day', unitBn: 'দিন', price: 650, category: 'plumbing-labor' },
      { id: 'plumb-lab-3', name: 'Water Line (per point)', nameBn: 'ওয়াটার লাইন (প্রতি পয়েন্ট)', unit: 'point', unitBn: 'পয়েন্ট', price: 450, category: 'plumbing-labor' },
      { id: 'plumb-lab-4', name: 'Sanitary Installation', nameBn: 'স্যানিটারি ইনস্টলেশন', unit: 'piece', unitBn: 'পিস', price: 800, category: 'plumbing-labor' },
      { id: 'plumb-lab-5', name: 'Overhead Tank Setup', nameBn: 'ওভারহেড ট্যাংক সেটআপ', unit: 'piece', unitBn: 'পিস', price: 2500, category: 'plumbing-labor' },
    ],
  },
  {
    id: 'painting',
    name: 'Painting Work',
    nameBn: 'রং করার কাজ',
    icon: 'droplet',
    items: [
      { id: 'paint-lab-1', name: 'Painter (Master)', nameBn: 'পেইন্টার (মাস্টার)', unit: 'day', unitBn: 'দিন', price: 900, category: 'painting' },
      { id: 'paint-lab-2', name: 'Painter (Helper)', nameBn: 'পেইন্টার (সহকারী)', unit: 'day', unitBn: 'দিন', price: 550, category: 'painting' },
      { id: 'paint-lab-3', name: 'Wall Painting (per sqft)', nameBn: 'দেওয়াল রং (প্রতি বর্গফুট)', unit: 'sqft', unitBn: 'বর্গফুট', price: 18, category: 'painting' },
      { id: 'paint-lab-4', name: 'Wood Polishing (per sqft)', nameBn: 'কাঠ পালিশ (প্রতি বর্গফুট)', unit: 'sqft', unitBn: 'বর্গফুট', price: 45, category: 'painting' },
      { id: 'paint-lab-5', name: 'Putty Work (per sqft)', nameBn: 'পুটি কাজ (প্রতি বর্গফুট)', unit: 'sqft', unitBn: 'বর্গফুট', price: 12, category: 'painting' },
    ],
  },
  {
    id: 'steel-work',
    name: 'Steel Work',
    nameBn: 'স্টিলের কাজ',
    icon: 'activity',
    items: [
      { id: 'steel-lab-1', name: 'Steel Fitter (Rod Mistri)', nameBn: 'স্টিল ফিটার (রড মিস্ত্রি)', unit: 'day', unitBn: 'দিন', price: 1000, category: 'steel-work' },
      { id: 'steel-lab-2', name: 'Steel Binding (per kg)', nameBn: 'স্টিল বাঁধাই (প্রতি কেজি)', unit: 'kg', unitBn: 'কেজি', price: 8, category: 'steel-work' },
      { id: 'steel-lab-3', name: 'Shuttering (per sqft)', nameBn: 'শাটারিং (প্রতি বর্গফুট)', unit: 'sqft', unitBn: 'বর্গফুট', price: 35, category: 'steel-work' },
    ],
  },
];

/**
 * Get all price categories
 */
export function getAllPriceCategories(): PriceCategory[] {
  return [...MATERIAL_PRICES, ...LABOR_RATES];
}

/**
 * Get price category by ID
 */
export function getPriceCategory(id: string): PriceCategory | undefined {
  return getAllPriceCategories().find(cat => cat.id === id);
}

/**
 * Get price item by ID
 */
export function getPriceItem(itemId: string): PriceItem | undefined {
  for (const category of getAllPriceCategories()) {
    const item = category.items.find(i => i.id === itemId);
    if (item) return item;
  }
  return undefined;
}

/**
 * Search price items by name
 */
export function searchPriceItems(query: string): PriceItem[] {
  const results: PriceItem[] = [];
  const lowerQuery = query.toLowerCase();
  
  for (const category of getAllPriceCategories()) {
    for (const item of category.items) {
      if (
        item.name.toLowerCase().includes(lowerQuery) ||
        item.nameBn.includes(query) ||
        item.category.toLowerCase().includes(lowerQuery)
      ) {
        results.push(item);
      }
    }
  }
  
  return results;
}

/**
 * Calculate total cost for materials
 */
export function calculateMaterialCost(
  items: { itemId: string; quantity: number }[]
): { subtotal: number; vat: number; total: number; details: { item: PriceItem; quantity: number; cost: number }[] } {
  let subtotal = 0;
  const details: { item: PriceItem; quantity: number; cost: number }[] = [];
  
  for (const { itemId, quantity } of items) {
    const item = getPriceItem(itemId);
    if (item) {
      const cost = item.price * quantity;
      subtotal += cost;
      details.push({ item, quantity, cost });
    }
  }
  
  const vat = subtotal * 0.15; // 15% VAT in Bangladesh
  const total = subtotal + vat;
  
  return { subtotal, vat, total, details };
}

/**
 * Price list last updated date
 */
export const PRICE_LIST_UPDATED = '2025-02-01';

/**
 * Price list disclaimer
 */
export const PRICE_LIST_DISCLAIMER = 
  'এই মূল্যতালিকা শুধুমাত্র একটি অনুমানিক নির্দেশিকা। প্রকৃত মূল্য অবস্থান, বাজার পরিস্থিতি এবং সরবরাহকারীর উপর নির্ভর করে পরিবর্তিত হতে পারে।';
