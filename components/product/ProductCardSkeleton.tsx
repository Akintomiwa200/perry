export default function ProductCardSkeleton() {
  return (
    <div className="rounded-[20px] overflow-hidden border border-[var(--color-border)] bg-white animate-pulse">

      {/* Image */}
      <div className="aspect-[4/5] skeleton" />

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <div className="h-3 w-3/4 skeleton" />
        <div className="h-3 w-1/2 skeleton" />
      </div>
    </div>
  );
}