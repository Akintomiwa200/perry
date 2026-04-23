export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] animate-pulse">

      {/* Image */}
      <div className="aspect-[3/4] w-full bg-gray-200" />

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col gap-3">

        {/* Title */}
        <div className="h-3 w-3/4 bg-gray-200 rounded" />
        <div className="h-3 w-1/2 bg-gray-200 rounded" />

        {/* Rating */}
        <div className="h-3 w-1/3 bg-gray-200 rounded" />

        {/* Price */}
        <div className="h-4 w-1/2 bg-gray-300 rounded" />

        {/* Button */}
        <div className="h-8 w-full bg-gray-300 rounded-md mt-2" />
      </div>
    </div>
  );
}