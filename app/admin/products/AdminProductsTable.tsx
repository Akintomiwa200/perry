'use client';

import { Package, Plus, Search } from 'lucide-react';
import StatusBadge from '@/components/admin/StatusBadge';

interface ProductRow {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'draft' | 'out_of_stock';
}

const PRODUCTS: ProductRow[] = [
  { id: 'PRD-001', name: 'Silk Press Lace Wig — 24"', category: 'Wigs & Hair', price: 85000, stock: 12, status: 'active' },
  { id: 'PRD-002', name: 'Designer Clutch Bag', category: 'Handbags', price: 45000, stock: 5, status: 'active' },
  { id: 'PRD-003', name: 'Matte Velvet Lipstick Set', category: 'Beauty', price: 12500, stock: 0, status: 'out_of_stock' },
  { id: 'PRD-004', name: 'Gold-Plated Hoop Earrings', category: 'Accessories', price: 18000, stock: 24, status: 'active' },
  { id: 'PRD-005', name: 'Stiletto Heels — Nude', category: 'Footwear', price: 62000, stock: 3, status: 'active' },
  { id: 'PRD-006', name: 'Charlotte Tilbury Dupe Palette', category: 'Beauty', price: 22000, stock: 0, status: 'draft' },
];

const statusMap: Record<string, 'success' | 'warning' | 'neutral'> = {
  active: 'success',
  draft: 'neutral',
  out_of_stock: 'warning',
};

function ProductRow({ product, idx, total }: { product: ProductRow; idx: number; total: number }) {
  return (
    <tr
      key={product.id}
      className="transition-colors"
      style={{
        background: 'var(--color-surface-raised)',
        borderBottom: idx < total - 1 ? '1px solid var(--color-border)' : undefined,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--color-surface)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--color-surface-raised)';
      }}
    >
      <td className="px-4 py-3.5 text-sm" style={{ color: 'var(--color-text)' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'var(--color-secondary)' }}
          >
            <Package size={16} style={{ color: 'var(--color-primary)' }} />
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{product.name}</p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{product.id}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3.5 text-sm" style={{ color: 'var(--color-text)' }}>{product.category}</td>
      <td className="px-4 py-3.5 text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
        ₦{product.price.toLocaleString()}
      </td>
      <td className="px-4 py-3.5 text-sm" style={{ color: product.stock === 0 ? 'var(--color-danger)' : product.stock <= 5 ? 'var(--color-warning)' : 'var(--color-success)' }}>
        {product.stock === 0 ? 'Out of stock' : product.stock}
      </td>
      <td className="px-4 py-3.5">
        <StatusBadge label={product.status.replace('_', ' ')} variant={statusMap[product.status] || 'neutral'} />
      </td>
    </tr>
  );
}

export default function AdminProductsTable() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-bold mb-1"
            style={{ color: 'var(--deep)', fontFamily: "'Cormorant Garamond', serif" }}
          >
            Products
          </h1>
          <p className="text-sm" style={{ color: 'var(--mid)' }}>
            Manage your store catalog and inventory
          </p>
        </div>
        <button
          className="btn btn-primary flex items-center gap-2 self-start sm:self-auto"
          style={{ background: 'var(--deep)', color: 'var(--cream)' }}
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div
          className="flex items-center gap-2 px-3 h-10 rounded-lg flex-1 max-w-sm"
          style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}
        >
          <Search size={14} style={{ color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent text-sm outline-none w-full"
            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-primary)' }}
          />
        </div>
        <select
          className="h-10 px-3 text-sm rounded-lg outline-none"
          style={{
            background: 'var(--color-surface-raised)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text)',
            fontFamily: 'var(--font-primary)',
          }}
        >
          <option>All Categories</option>
          <option>Accessories</option>
          <option>Footwear</option>
          <option>Wigs & Hair</option>
          <option>Beauty</option>
          <option>Handbags</option>
        </select>
        <select
          className="h-10 px-3 text-sm rounded-lg outline-none"
          style={{
            background: 'var(--color-surface-raised)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text)',
            fontFamily: 'var(--font-primary)',
          }}
        >
          <option>All Status</option>
          <option>Active</option>
          <option>Draft</option>
          <option>Out of Stock</option>
        </select>
      </div>

       {/* Table */}
       <div
         className="overflow-x-auto rounded-xl"
         style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
       >
         <table className="w-full text-left border-collapse">
           <thead>
             <tr style={{ background: 'var(--color-surface)' }}>
               {['Product', 'Category', 'Price', 'Stock', 'Status'].map((h) => (
                 <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                   {h}
                 </th>
               ))}
             </tr>
           </thead>
           <tbody>
             {PRODUCTS.map((product, idx) => (
               <ProductRow key={product.id} product={product} idx={idx} total={PRODUCTS.length} />
             ))}
           </tbody>
         </table>
       </div>
    </div>
  );
}