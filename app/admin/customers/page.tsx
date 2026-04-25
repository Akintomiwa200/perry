import { Metadata } from 'next';
import AdminCustomersTable from './AdminCustomersTable';

export const metadata: Metadata = { title: 'Customers — Admin' };

export default function AdminCustomersPage() {
  return <AdminCustomersTable />;
}