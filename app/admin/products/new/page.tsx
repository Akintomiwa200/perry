'use client';
import { useState } from 'react';
import { Metadata } from 'next';
import { Plus, Upload, X } from 'lucide-react';

export const metadata: Metadata = { title: 'Add Product — Perry Admin' };

export default function NewProductPage() {
  const [images, setImages] = useState<string[]>([]);
  
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1
          className="text-2xl font-bold mb-1"
          style={{ color: 'var(--deep)', fontFamily: "'Cormorant Garamond', serif" }}
        >
          Add New Product
        </h1>
        <p className="text-sm" style={{ color: 'var(--mid)' }}>
          Create a new product listing
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="card" style={{ background: 'var(--color-surface)', padding: '24px' }}>
            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--deep)' }}>Basic Information</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--mid)' }}>Product Name</label>
                <input type="text" className="w-full px-4 py-2 rounded-lg text-sm" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', color: 'var(--deep)' }} placeholder="Enter product name" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--mid)' }}>Description</label>
                <textarea rows={4} className="w-full px-4 py-2 rounded-lg text-sm" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', color: 'var(--deep)' }} placeholder="Enter product description" />
              </div>
              <div className="grid grid-cols-2 gap-4">
