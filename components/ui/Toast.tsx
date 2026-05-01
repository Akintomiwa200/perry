'use client';

import { useEffect } from 'react';
import { useToastStore } from '@/lib/toast-store';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const iconMap = {
  success: <CheckCircle size={16} className="text-green-500 shrink-0" />,
  error: <XCircle size={16} className="text-red-500 shrink-0" />,
  info: <Info size={16} className="text-blue-500 shrink-0" />,
};

const bgMap = {
  success: 'bg-green-50 border-green-200',
  error: 'bg-red-50 border-red-200',
  info: 'bg-blue-50 border-blue-200',
};

export default function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 w-80">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border shadow-lg text-sm ${bgMap[t.type]}`}
          style={{ animation: 'slideIn 0.2s ease-out' }}
        >
          {iconMap[t.type]}
          <span className="flex-1 text-gray-800">{t.message}</span>
          <button onClick={() => removeToast(t.id)} className="opacity-40 hover:opacity-80 transition">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
