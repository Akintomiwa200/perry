import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  className?: string;
}

export default function ErrorAlert({ message, className = '' }: ErrorAlertProps) {
  return (
    <div 
      className={`p-4 rounded-xl mb-6 text-sm border-l-4 flex items-start gap-3 ${className}`}
      style={{ 
        backgroundColor: 'rgb(254 226 226 / 0.8)', 
        borderLeftColor: 'var(--color-danger)', 
        color: 'var(--color-danger)' 
      }} 
      role="alert"
    >
      <AlertCircle size={18} style={{ marginTop: '0.125rem', flexShrink: 0 }} />
      <p>{message}</p>
    </div>
  );
}
