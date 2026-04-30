import { Metadata } from 'next';
import AdminTagsTable from './AdminTagsTable';

export const metadata: Metadata = { title: 'Tags — Admin' };

export default function AdminTagsPage() {
  return <AdminTagsTable />;
}
