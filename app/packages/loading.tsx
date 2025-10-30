export default function PackagesLoading() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-48 bg-muted animate-pulse rounded"></div>
        <div className="h-4 w-64 bg-muted animate-pulse rounded"></div>
      </div>

      {/* Mobile number card skeleton */}
      <div className="rounded-lg border bg-card p-6 space-y-4">
        <div className="h-6 w-40 bg-muted animate-pulse rounded"></div>
        <div className="h-10 bg-muted animate-pulse rounded"></div>
      </div>

      {/* Tabs skeleton */}
      <div className="h-10 bg-muted animate-pulse rounded"></div>

      {/* Package cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border bg-card p-6 space-y-4">
            <div className="flex justify-between">
              <div className="space-y-2">
                <div className="h-6 w-32 bg-muted animate-pulse rounded"></div>
                <div className="h-4 w-20 bg-muted animate-pulse rounded"></div>
              </div>
              <div className="h-8 w-24 bg-muted animate-pulse rounded"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
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
