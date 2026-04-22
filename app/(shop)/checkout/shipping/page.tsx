import { redirect } from 'next/navigation';
// Redirect to unified checkout page which handles steps internally
export default function ShippingPage() {
  redirect('/checkout');
}
