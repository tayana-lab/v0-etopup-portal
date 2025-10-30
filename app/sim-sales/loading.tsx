export default function SimSalesLoading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-32 bg-muted animate-pulse rounded"></div>
        <div className="h-4 w-64 bg-muted animate-pulse rounded"></div>
      </div>

      {/* Customer type cards skeleton */}
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border bg-card p-6 space-y-4">
            <div className="h-12 w-12 bg-muted animate-pulse rounded-full"></div>
            <div className="h-6 w-32 bg-muted animate-pulse rounded"></div>
            <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
            <div className="h-10 bg-muted animate-pulse rounded"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
