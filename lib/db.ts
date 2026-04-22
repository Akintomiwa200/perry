// Mock database layer — replace with your actual DB (Prisma, Supabase, etc.)
import { Product } from '@/types/product.types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Marvel Legends Iron Man Mark III',
    slug: 'marvel-legends-iron-man-mark-iii',
    description: 'Premium 6-inch scale Iron Man Mark III action figure with over 30 points of articulation and interchangeable hands.',
    price: 34.99,
    compareAtPrice: 44.99,
    images: ['/images/products/iron-man.jpg'],
    category: 'action-figures',
    tags: ['marvel', 'iron-man', 'hasbro'],
    stock: 15,
    sku: 'ML-IM-003',
    rating: 4.8,
    reviewCount: 124,
    featured: true,
    isNew: false,
    isSale: true,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Batman #1 CGC 9.8 Reprint',
    slug: 'batman-1-cgc-98-reprint',
    description: 'High-quality reprint of the iconic Batman #1 comic book, professionally graded and slabbed.',
    price: 89.99,
    images: ['/images/products/batman-comic.jpg'],
    category: 'comics',
    tags: ['dc', 'batman', 'cgc'],
    stock: 5,
    sku: 'CM-BAT-001',
    rating: 4.9,
    reviewCount: 67,
    featured: true,
    isNew: true,
    isSale: false,
    createdAt: '2024-02-10T00:00:00Z',
    updatedAt: '2024-02-10T00:00:00Z',
  },
  {
    id: '3',
    name: 'Pokémon Charizard Base Set Holo',
    slug: 'pokemon-charizard-base-set-holo',
    description: 'Near Mint condition Charizard Holo from the original Pokémon Base Set. PSA 8 graded.',
    price: 299.99,
    compareAtPrice: 350.00,
    images: ['/images/products/charizard.jpg'],
    category: 'trading-cards',
    tags: ['pokemon', 'charizard', 'psa'],
    stock: 2,
    sku: 'TC-POK-004',
    rating: 5.0,
    reviewCount: 43,
    featured: true,
    isNew: false,
    isSale: true,
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
  },
];

export async function getProducts() {
  return mockProducts;
}

export async function getProductBySlug(slug: string) {
  return mockProducts.find((p) => p.slug === slug) || null;
}
