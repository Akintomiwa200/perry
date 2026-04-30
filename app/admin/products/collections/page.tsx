import { Metadata } from 'next';
import AdminCollectionsTable from './AdminCollectionsTable';

export const metadata: Metadata = { title: 'Collections — Admin' };

export default function AdminCollectionsPage() {
  return <AdminCollectionsTable />;
}
