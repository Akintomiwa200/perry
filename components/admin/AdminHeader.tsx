'use client';

import { usePathname } from 'next/navigation';
import { Search, Bell } from 'lucide-react';

const breadcrumbMap: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/orders': 'Orders',
  '/admin/customers': 'Customers',
  '/admin/settings': 'Settings',
};

export default function AdminHeader() {
  const pathname = usePathname();
  const title = breadcrumbMap[pathname] || 'Dashboard';

  return (
    <header
      className="flex items-center justify-between h-16 px-6 lg:px-10"
      style={{
        background: 'var(--cream)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      {/* TITLE */}
      <h1
        className="text-lg font-semibold"
        style={{ color: 'var(--deep)' }}
      >
        {title}
      </h1>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        {/* SEARCH */}
        <div className="hidden md:flex items-center bg-white border rounded-full px-4 h-10">
          <Search size={14} className="opacity-50" />
          <input
            placeholder="Search something..."
            className="ml-2 text-sm outline-none bg-transparent w-40"
          />
        </div>

        {/* NOTIFICATION */}
        <button className="relative">
          <Bell size={18} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* PROFILE */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-300" />
          <span className="hidden md:block text-sm">Admin</span>
        </div>
      </div>
    </header>
  );
}