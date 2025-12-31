export function SkeletonBlock({ className }: { className?: string }) {
  return <div className={`shimmer rounded-md bg-neutral-800/60 ${className ?? ""}`} />;
}
