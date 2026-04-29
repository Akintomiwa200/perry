export const APP_NAME = 'Perry';
export const APP_DESCRIPTION = 'Your premier destination for fashion, beauty, and accessories.';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const CATEGORIES = [
  { id: 'accessories', name: 'Accessories', slug: 'accessories', icon: '💍' },
  { id: 'footwear', name: 'Footwear', slug: 'footwear', icon: '👠' },
  { id: 'wigs-hair', name: 'Wigs & Hair', slug: 'wigs-hair', icon: '💆‍♀️' },
  { id: 'beauty', name: 'Beauty', slug: 'beauty', icon: '💄' },
  { id: 'handbags', name: 'Handbags', slug: 'handbags', icon: '👜' },
  { id: 'clothing', name: 'Clothing', slug: 'clothing', icon: '👗' },
];

export const SHIPPING_OPTIONS = [
  { id: 'standard', name: 'Standard Shipping', description: '5–7 business days', price: 5.99, estimatedDays: '5–7 days' },
  { id: 'express', name: 'Express Shipping', description: '2–3 business days', price: 12.99, estimatedDays: '2–3 days' },
  { id: 'overnight', name: 'Overnight Shipping', description: 'Next business day', price: 24.99, estimatedDays: '1 day' },
];

export const TAX_RATE = 0.08;
export const FREE_SHIPPING_THRESHOLD = 75;

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];
