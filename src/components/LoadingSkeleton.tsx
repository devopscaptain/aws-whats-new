export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-3 animate-pulse"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          <div className="flex items-center gap-2">
            <div className="h-5 w-10 rounded-full bg-surface-2" />
            <div className="h-5 w-16 rounded-full bg-surface-2" />
          </div>
          <div className="space-y-1.5">
            <div className="h-4 rounded bg-surface-2 w-full" />
            <div className="h-4 rounded bg-surface-2 w-4/5" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="h-3 rounded bg-surface-2 w-full" />
            <div className="h-3 rounded bg-surface-2 w-full" />
            <div className="h-3 rounded bg-surface-2 w-2/3" />
          </div>
          <div className="flex gap-1.5">
            <div className="h-5 w-12 rounded-full bg-surface-2" />
            <div className="h-5 w-16 rounded-full bg-surface-2" />
          </div>
        </div>
      ))}
    </div>
  )
}
