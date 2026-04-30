import { Metadata } from 'next';
import AdminCategoriesTable from './AdminCategoriesTable';

export const metadata: Metadata = { title: 'Categories — Admin' };

export default function AdminCategoriesPage() {
  return <AdminCategoriesTable />;
}
