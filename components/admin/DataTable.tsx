'use client';

import { ReactNode } from 'react';

interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
}

export default function DataTable<T>({ columns, data, keyExtractor }: DataTableProps<T>) {
  return (
    <div
      className="overflow-x-auto rounded-xl"
      style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
    >
      <table className="w-full text-left border-collapse">
        <thead>
          <tr style={{ background: 'var(--color-surface)' }}>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-text-muted)', width: col.width }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={keyExtractor(row)}
              className="transition-colors"
              style={{
                background: 'var(--color-surface-raised)',
                borderBottom:
                  idx < data.length - 1 ? '1px solid var(--color-border)' : undefined,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-surface)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-surface-raised)';
              }}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-4 py-3.5 text-sm"
                  style={{ color: 'var(--color-text)' }}
                >
                  {col.render ? col.render(row) : (row as Record<string, ReactNode>)[col.key]}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-12 text-center text-sm"
                style={{ color: 'var(--color-text-muted)' }}
              >
                No data available yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

