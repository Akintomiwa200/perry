'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductList from '@/components/product/ProductList'
import { mockProducts } from '@/lib/db'

const categories = [
  { id: 'all', name: 'All Products', icon: '✨' },
  { id: 'accessories', name: 'Accessories', icon: '💍' },
  { id: 'footwear', name: 'Footwear', icon: '👠' },
  { id: 'wigs-hair', name: 'Wigs & Hair', icon: '💆‍♀️' },
  { id: 'beauty', name: 'Beauty', icon: '💄' },
  { id: 'handbags', name: 'Handbags', icon: '👜' },
]

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const filtered = mockProducts.filter(p =>
    activeCategory === 'all' ||
    p.category.toLowerCase().replace(/[\s&]+/g, '-') === activeCategory
  )

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return a.price - b.price
      case 'price-desc': return b.price - a.price
      case 'rating': return b.rating - a.rating
      default: return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
    }
  })

  return (
    <>
      <Navbar />
      <main style={{ padding: '8rem 1.5rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
        <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--deep)' }}>
            Shop
          </h1>
          <p style={{ color: 'var(--mid)', marginTop: '0.5rem' }}>Browse our curated collection</p>
        </section>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  background: activeCategory === cat.id ? 'var(--deep)' : 'transparent',
                  color: activeCategory === cat.id ? 'var(--cream)' : 'var(--deep)',
                  border: '1px solid var(--blush)',
                  borderColor: activeCategory === cat.id ? 'var(--deep)' : 'var(--blush)',
                  padding: '0.6rem 1.2rem',
                  fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '0.5rem',
                }}
              >
                <span>{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>

          <select 
            value={sortBy} 
            onChange={e => setSortBy(e.target.value)}
            style={{ padding: '0.6rem 1rem', border: '1px solid var(--blush)', background: 'var(--cream)', fontFamily: "'Jost', sans-serif" }}
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--mid)', marginBottom: '2rem' }}>
          Showing {sorted.length} products
        </div>

         <ProductList products={sorted} gridCols={3} />
      </main>
      <Footer />
    </>
  )
}




./app/admin/orders/AdminOrdersTable.tsx:63:3
Return statement is not allowed here
   61 |   );
   62 | }
>  63 |   return (
      |   ^^^^^^^
>  64 |     <div className="flex flex-col gap-6">
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
>  65 |       {/* Header */}
      | ^^^^^^^^^^^^^^^^^^^^
>  66 |       <div>
      | ^^^^^^^^^^^
>  67 |         <h1
      | ^^^^^^^^^^^
>  68 |           className="text-2xl font-bold mb-1"
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
>  69 |           style={{ color: 'var(--deep)', fontFamily: "'Cormorant Garamond', serif" }}
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
>  70 |         >
      | ^^^^^^^^^
>  71 |           Orders
      | ^^^^^^^^^^^^^^^^
>  72 |         </h1>
      | ^^^^^^^^^^^^^
>  73 |         <p className="text-sm" style={{ color: 'var(--mid)' }}>
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
>  74 |           Track and manage customer orders
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
>  75 |         </p>
      | ^^^^^^^^^^^^
>  76 |       </div>
      | ^^^^^^^^^^^^
>  77 |
      | ^
>  78 |       {/* Stats */}
      | ^^^^^^^^^^^^^^^^^^^
>  79 |       <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
>  80 |         {[
      | ^^^^^^^^^^
>  81 |           { label: 'Pending', value: '12', color: 'var(--color-text-muted)' },
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
>  82 |           { label: 'Processing', value: '8', color: 'var(--color-warning)' },
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
>  83 |           { label: 'Shipped', value: '24', color: '#2563EB' },
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
>  84 |           { label: 'Delivered', value: '186', color: 'var(--color-success)' },
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
>  85 |         ].map((s) => (
      | ^^^^^^^^^^^^^^^^^^^^^^
>  86 |           <div
      | ^^^^^^^^^^^^^^
>  87 |             key={s.label}
      | ^^^^^^^^^^^^^^^^^^^^^^^^^
>  88 |             className="flex flex-col gap-1 p-4 rounded-xl"
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
>  89 |             style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
>  90 |           >
      | ^^^^^^^^^^^
>  91 |             <span className="text-xs uppercase tracking-wider font-medium" style={{ color: 'var(--color-text-muted...
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
>  92 |               {s.label}
      | ^^^^^^^^^^^^^^^^^^^^^^^
>  93 |             </span>
      | ^^^^^^^^^^^^^^^^^^^
>  94 |             <span className="text-xl font-bold" style={{ color: s.color, fontFamily: 'var(--font-primary)' }}>
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
>  95 |               {s.value}
      | ^^^^^^^^^^^^^^^^^^^^^^^
>  96 |             </span>
      | ^^^^^^^^^^^^^^^^^^^
>  97 |           </div>
      | ^^^^^^^^^^^^^^^^
>  98 |         ))}
      | ^^^^^^^^^^^
>  99 |       </div>
      | ^^^^^^^^^^^^
> 100 |
      | ^
> 101 |       {/* Filters */}
      | ^^^^^^^^^^^^^^^^^^^^^
> 102 |       <div className="flex flex-col sm:flex-row gap-3">
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 103 |         <div
      | ^^^^^^^^^^^^
> 104 |           className="flex items-center gap-2 px-3 h-10 rounded-lg flex-1 max-w-sm"
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 105 |           style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 106 |         >
      | ^^^^^^^^^
> 107 |           <Search size={14} style={{ color: 'var(--color-text-muted)' }} />
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 108 |           <input
      | ^^^^^^^^^^^^^^^^
> 109 |             type="text"
      | ^^^^^^^^^^^^^^^^^^^^^^^
> 110 |             placeholder="Search orders..."
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 111 |             className="bg-transparent text-sm outline-none w-full"
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 112 |             style={{ color: 'var(--color-text)', fontFamily: 'var(--font-primary)' }}
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 113 |           />
      | ^^^^^^^^^^^^
> 114 |         </div>
      | ^^^^^^^^^^^^^^
> 115 |         <select
      | ^^^^^^^^^^^^^^^
> 116 |           className="h-10 px-3 text-sm rounded-lg outline-none"
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 117 |           style={{
      | ^^^^^^^^^^^^^^^^^^
> 118 |             background: 'var(--color-surface-raised)',
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 119 |             border: '1px solid var(--color-border)',
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 120 |             color: 'var(--color-text)',
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 121 |             fontFamily: 'var(--font-primary)',
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 122 |           }}
      | ^^^^^^^^^^^^
> 123 |         >
      | ^^^^^^^^^
> 124 |           <option>All Status</option>
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 125 |           <option>Pending</option>
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 126 |           <option>Processing</option>
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 127 |           <option>Shipped</option>
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 128 |           <option>Delivered</option>
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 129 |           <option>Cancelled</option>
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 130 |         </select>
      | ^^^^^^^^^^^^^^^^^
> 131 |         <button
      | ^^^^^^^^^^^^^^^
> 132 |           className="flex items-center gap-2 h-10 px-4 rounded-lg text-sm font-medium transition-colors"
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 133 |           style={{ background: 'var(--color-secondary)', color: 'var(--color-text)' }}
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 134 |         >
      | ^^^^^^^^^
> 135 |           <Filter size={14} />
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 136 |           Filter
      | ^^^^^^^^^^^^^^^^
> 137 |         </button>
      | ^^^^^^^^^^^^^^^^^
> 138 |       </div>
      | ^^^^^^^^^^^^
> 139 |
      | ^
> 140 |        {/* Table */}
      | ^^^^^^^^^^^^^^^^^^^^
> 141 |        <div
      | ^^^^^^^^^^^
> 142 |          className="overflow-x-auto rounded-xl"
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 143 |          style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 144 |        >
      | ^^^^^^^^
> 145 |          <table className="w-full text-left border-collapse">
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 146 |            <thead>
      | ^^^^^^^^^^^^^^^^^^
> 147 |              <tr style={{ background: 'var(--color-surface)' }}>
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 148 |                {['Order ID', 'Customer', 'Date', 'Items', 'Total', 'Status'].map((h) => (
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 149 |                  <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: ...
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 150 |                    {h}
      | ^^^^^^^^^^^^^^^^^^^^^^
> 151 |                  </th>
      | ^^^^^^^^^^^^^^^^^^^^^^
> 152 |                ))}
      | ^^^^^^^^^^^^^^^^^^
> 153 |              </tr>
      | ^^^^^^^^^^^^^^^^^^
> 154 |            </thead>
      | ^^^^^^^^^^^^^^^^^^^
> 155 |            <tbody>
      | ^^^^^^^^^^^^^^^^^^
> 156 |              {ORDERS.map((order, idx) => (
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 157 |                <OrderRow key={order.id} order={order} idx={idx} total={ORDERS.length} />
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 158 |              ))}
      | ^^^^^^^^^^^^^^^^
> 159 |            </tbody>
      | ^^^^^^^^^^^^^^^^^^^
> 160 |          </table>
      | ^^^^^^^^^^^^^^^^^
> 161 |        </div>
      | ^^^^^^^^^^^^^
> 162 |     </div>
      | ^^^^^^^^^^
> 163 |   );
      | ^^^^
  164 | }

Parsing ecmascript source code failed

Import trace:
  Server Component:
    ./app/admin/orders/AdminOrdersTable.tsx
    ./app/admin/orders/page.tsx


./app/admin/customers/AdminCustomersTable.tsx:87:7
the name `CUSTOMERS` is defined multiple times
  85 | }
  86 |
> 87 | const CUSTOMERS: CustomerRow[] = [
     |       ^^^^^^^^^
  88 |   { id: 'CUS-001', name: 'Amara Okafor', email: 'amara.okafor@email.com', phone: '+234 801 234 5678', orders: 8, sp...
  89 |   { id: 'CUS-002', name: 'Chioma Nwosu', email: 'chioma.n@email.com', phone: '+234 802 345 6789', orders: 5, spent:...
  90 |   { id: 'CUS-003', name: 'Bolanle Ade', email: 'bolanle.ade@email.com', phone: '+234 803 456 7890', orders: 12, spe...

Ecmascript file had an error

Import trace:
  Server Component:
    ./app/admin/customers/AdminCustomersTable.tsx
    ./app/admin/customers/page.tsx


    at <unknown> (./app/admin/orders/AdminOrdersTable.tsx:63:3)
    at <unknown> (./app/admin/customers/AdminCustomersTable.tsx:87:7)
