import { Metadata } from 'next';
import AdminOrdersTable from './AdminOrdersTable';

export const metadata: Metadata = { title: 'Orders — Admin' };

export default function AdminOrdersPage() {
  return <AdminOrdersTable />;
}