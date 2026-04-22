'use client';
import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

const US_STATES = [
  { value: '', label: 'Select state...' },
  { value: 'CA', label: 'California' },
  { value: 'NY', label: 'New York' },
  { value: 'TX', label: 'Texas' },
  { value: 'FL', label: 'Florida' },
  { value: 'WA', label: 'Washington' },
  { value: 'OR', label: 'Oregon' },
  { value: 'IL', label: 'Illinois' },
  { value: 'CO', label: 'Colorado' },
];

interface CheckoutFormProps {
  onSubmit: (data: Record<string, string>) => void;
}

export default function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    street: '', city: '', state: '', zip: '', country: 'US',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.firstName) errs.firstName = 'First name is required';
    if (!form.lastName) errs.lastName = 'Last name is required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'A valid email is required';
    if (!form.street) errs.street = 'Street address is required';
    if (!form.city) errs.city = 'City is required';
    if (!form.state) errs.state = 'State is required';
    if (!form.zip || !/^\d{5}(-\d{4})?$/.test(form.zip)) errs.zip = 'Valid ZIP code required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onSubmit(form);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
        <Input label="First Name" value={form.firstName} onChange={set('firstName')} error={errors.firstName} placeholder="Jane" />
        <Input label="Last Name" value={form.lastName} onChange={set('lastName')} error={errors.lastName} placeholder="Doe" />
      </div>
      <Input label="Email Address" type="email" value={form.email} onChange={set('email')} error={errors.email} placeholder="jane@example.com" />
      <Input label="Phone (optional)" type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 (555) 000-0000" />
      <Input label="Street Address" value={form.street} onChange={set('street')} error={errors.street} placeholder="123 Main St, Apt 4B" />
      <div className="grid grid-cols-2 gap-4">
        <Input label="City" value={form.city} onChange={set('city')} error={errors.city} placeholder="San Francisco" />
        <Select label="State" value={form.state} onChange={set('state') as any} error={errors.state} options={US_STATES} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="ZIP Code" value={form.zip} onChange={set('zip')} error={errors.zip} placeholder="94102" />
        <Input label="Country" value="United States" disabled />
      </div>
      <button onClick={handleSubmit} className="btn btn-primary btn-lg w-full">
        Continue to Payment →
      </button>
    </div>
  );
}
