export default function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center h-40 text-sm text-gray-400">
      {label}
    </div>
  );
}