import Link from 'next/link';
import { CATEGORIES } from '@/lib/constants';

export const metadata = { title: 'Categories' };

export default function CategoriesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--color-text)' }}>Shop by Category</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="card flex flex-col items-center gap-3 py-10 text-center group"
          >
            <span className="text-5xl">{cat.icon}</span>
            <span className="text-base font-semibold" style={{ color: 'var(--color-text)' }}>{cat.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
