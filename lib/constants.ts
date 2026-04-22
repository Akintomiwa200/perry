export const APP_NAME = 'Perry Collectibles';
export const APP_DESCRIPTION = 'Your premier destination for rare and unique collectibles.';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const CATEGORIES = [
  { id: 'action-figures', name: 'Action Figures', slug: 'action-figures', icon: '🦸' },
  { id: 'comics', name: 'Comics', slug: 'comics', icon: '📚' },
  { id: 'vintage-toys', name: 'Vintage Toys', slug: 'vintage-toys', icon: '🧸' },
  { id: 'trading-cards', name: 'Trading Cards', slug: 'trading-cards', icon: '🃏' },
  { id: 'statues', name: 'Statues & Busts', slug: 'statues', icon: '🗿' },
  { id: 'memorabilia', name: 'Memorabilia', slug: 'memorabilia', icon: '🏆' },
  { id: 'art-prints', name: 'Art Prints', slug: 'art-prints', icon: '🖼️' },
  { id: 'diecast', name: 'Diecast Models', slug: 'diecast', icon: '🚗' },
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
