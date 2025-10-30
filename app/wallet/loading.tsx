export default function WalletLoading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-32 bg-muted animate-pulse rounded"></div>
        <div className="h-4 w-64 bg-muted animate-pulse rounded"></div>
      </div>

      {/* Balance cards skeleton */}
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-lg border bg-card p-6 space-y-4">
            <div className="h-6 w-40 bg-muted animate-pulse rounded"></div>
            <div className="h-12 w-48 bg-muted animate-pulse rounded"></div>
            <div className="h-10 bg-muted animate-pulse rounded"></div>
          </div>
        ))}
      </div>

      {/* Transaction history skeleton */}
      <div className="rounded-lg border bg-card p-6 space-y-4">
        <div className="h-6 w-48 bg-muted animate-pulse rounded"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-muted animate-pulse rounded"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
