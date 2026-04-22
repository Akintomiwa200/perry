'use client';
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export default function Modal({ open, onClose, title, children, maxWidth = '560px' }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className="absolute inset-0"
        style={{ background: 'var(--color-overlay)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="relative w-full animate-fade-in"
        style={{
          maxWidth,
          background: 'var(--color-surface-raised)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {title && (
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: '1px solid var(--color-border)' }}
          >
            <h2 id="modal-title" className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>
              {title}
            </h2>
            <button onClick={onClose} className="btn btn-ghost btn-icon" aria-label="Close modal">
              <X size={18} />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
