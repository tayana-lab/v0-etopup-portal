export default function DashboardLoading() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-48 bg-muted animate-pulse rounded"></div>
        <div className="h-4 w-64 bg-muted animate-pulse rounded"></div>
      </div>

      {/* Stats cards skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-lg border bg-card p-6 space-y-3">
            <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
            <div className="h-8 w-32 bg-muted animate-pulse rounded"></div>
            <div className="h-3 w-20 bg-muted animate-pulse rounded"></div>
          </div>
        ))}
      </div>

      {/* Content skeleton */}
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-lg border bg-card p-6 space-y-4">
            <div className="h-6 w-40 bg-muted animate-pulse rounded"></div>
            <div className="space-y-2">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-16 bg-muted animate-pulse rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
