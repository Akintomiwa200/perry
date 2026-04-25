import { Metadata } from 'next';
import AdminProductsTable from './AdminProductsTable';

export const metadata: Metadata = { title: 'Products — Admin' };

export default function AdminProductsPage() {
  return <AdminProductsTable />;
}