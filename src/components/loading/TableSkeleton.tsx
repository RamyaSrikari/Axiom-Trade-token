export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="divide-y divide-neutral-900/70">
      {Array.from({ length: rows }).map((_, idx) => (
        <div key={idx} className="grid grid-cols-12 items-center gap-2 py-3 text-sm text-neutral-400">
          <div className="col-span-3 shimmer h-5 rounded" />
          <div className="shimmer h-5 rounded" />
          <div className="shimmer h-5 rounded" />
          <div className="shimmer h-5 rounded" />
          <div className="shimmer h-5 rounded" />
          <div className="col-span-2 shimmer h-5 rounded" />
          <div className="col-span-2 shimmer h-5 rounded" />
          <div className="col-span-2 shimmer h-5 rounded" />
        </div>
      ))}
    </div>
  );
}
