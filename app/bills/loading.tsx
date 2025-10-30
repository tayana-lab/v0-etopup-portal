export default function BillsLoading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-32 bg-muted animate-pulse rounded"></div>
        <div className="h-4 w-64 bg-muted animate-pulse rounded"></div>
      </div>

      {/* Account card skeleton */}
      <div className="rounded-lg border bg-card p-6 space-y-4">
        <div className="h-6 w-40 bg-muted animate-pulse rounded"></div>
        <div className="h-10 bg-muted animate-pulse rounded"></div>
        <div className="h-12 bg-muted animate-pulse rounded"></div>
      </div>

      {/* Bill details skeleton */}
      <div className="rounded-lg border bg-card p-6 space-y-4">
        <div className="h-6 w-32 bg-muted animate-pulse rounded"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex justify-between">
              <div className="h-4 w-32 bg-muted animate-pulse rounded"></div>
              <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
