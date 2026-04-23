export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] animate-pulse">

      {/* Image */}
      <div className="aspect-[3/4] w-full bg-[var(--color-secondary)]" />

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col gap-3">

        {/* Title */}
        <div className="h-3 w-3/4 bg-[var(--color-secondary)] rounded" />
        <div className="h-3 w-1/2 bg-[var(--color-secondary)] rounded" />

        {/* Rating */}
        <div className="h-3 w-1/3 bg-[var(--color-secondary)] rounded" />

        {/* Price */}
        <div className="h-4 w-1/2 bg-[var(--color-secondary)] rounded" />

        {/* Button */}
        <div className="h-8 w-full bg-[var(--color-secondary)] rounded-md mt-2" />
      </div>
    </div>
  );
}