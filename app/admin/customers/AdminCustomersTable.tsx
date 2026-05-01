'use client';

import { useState } from 'react';
import { Search, Users, Mail, Phone } from 'lucide-react';
import { useAdminCustomers } from '@/hooks/useAdmin';
import { formatNaira } from '@/lib/utils';

function CustomerRow({ customer, idx, total }: { customer: any; idx: number; total: number }) {
  const name = (customer.name ?? `${customer.firstName ?? ''} ${customer.lastName ?? ''}`.trim()) || 'Customer';
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
  const joined = customer.created_at ? new Date(customer.created_at).toLocaleDateString() : '-';
  const orders = Number(customer.ordersCount ?? customer.order_count ?? 0);
  const spent = Number(customer.totalSpent ?? customer.total_spent ?? 0);
  return (
    <tr
      key={customer.id}
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
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
            style={{ background: 'var(--color-secondary)', color: 'var(--color-primary)' }}
          >
            {initials || 'CU'}
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{name}</p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>#{customer.id}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3.5 text-sm" style={{ color: 'var(--color-text)' }}>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <Mail size={12} style={{ color: 'var(--color-text-muted)' }} />
            <span className="text-sm" style={{ color: 'var(--color-text)' }}>{customer.email}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone size={12} style={{ color: 'var(--color-text-muted)' }} />
            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{customer.phone ?? '-'}</span>
          </div>
        </div>
      </td>
      <td className="px-4 py-3.5 text-sm" style={{ color: 'var(--color-text)' }}>
        <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{orders}</span>
      </td>
      <td className="px-4 py-3.5 text-sm" style={{ color: 'var(--color-text)' }}>
        <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{formatNaira(spent)}</span>
      </td>
      <td className="px-4 py-3.5 text-sm" style={{ color: 'var(--color-text)' }}>{joined}</td>
    </tr>
  );
}


export default function AdminCustomersTable() {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const { customers, total, isLoading, error } = useAdminCustomers({
    search: search || undefined,
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-bold mb-1"
            style={{ color: 'var(--deep)', fontFamily: "'Cormorant Garamond', serif" }}
          >
            Customers
          </h1>
          <p className="text-sm" style={{ color: 'var(--mid)' }}>
            Manage your customer base and view purchase history
          </p>
        </div>
        <div
          className="flex items-center gap-3 px-4 py-2 rounded-xl self-start sm:self-auto"
          style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}
        >
          <Users size={18} style={{ color: 'var(--terracotta)' }} />
          <div>
            <p className="text-xs uppercase tracking-wider font-medium" style={{ color: 'var(--color-text-muted)' }}>
              Total
            </p>
            <p className="text-lg font-bold" style={{ color: 'var(--deep)', fontFamily: 'var(--font-primary)' }}>
              {total}
            </p>
          </div>
        </div>
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
            placeholder="Search customers..."
            className="bg-transparent text-sm outline-none w-full"
            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-primary)' }}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setSearch(searchInput.trim());
            }}
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
          <option>All Time</option>
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
        <button
          className="h-10 px-3 text-sm rounded-lg"
          style={{
            background: 'var(--color-secondary)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border)',
          }}
          onClick={() => setSearch(searchInput.trim())}
        >
          Search
        </button>
      </div>

       {/* Table */}
       <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
         <table className="w-full text-left border-collapse">
           <thead>
             <tr style={{ background: 'var(--color-surface)' }}>
               {['Customer', 'Contact', 'Orders', 'Total Spent', 'Joined'].map((h) => (
                 <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                   {h}
                 </th>
               ))}
             </tr>
           </thead>
           <tbody>
             {isLoading && (
               <tr>
                 <td colSpan={5} className="px-4 py-12 text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
                   Loading customers…
                 </td>
               </tr>
             )}
             {!isLoading && error && (
               <tr>
                 <td colSpan={5} className="px-4 py-12 text-center text-sm" style={{ color: 'var(--color-danger)' }}>
                   {error}
                 </td>
               </tr>
             )}
             {!isLoading && !error && customers.map((customer: any, idx: number) => (
               <CustomerRow key={customer.id} customer={customer} idx={idx} total={customers.length} />
             ))}
             {!isLoading && !error && customers.length === 0 && (
               <tr>
                 <td colSpan={5} className="px-4 py-12 text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
                   No data available yet.
                 </td>
               </tr>
             )}
           </tbody>
         </table>
       </div>
    </div>
  );
}
