import { Metadata } from 'next';
import AdminDashboard from './AdminDashboard';

export const metadata: Metadata = {
  title: 'Admin Dashboard — Perry Collectibles',
};

export default function Page() {
  return <AdminDashboard />;
}