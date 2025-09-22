export default function FeedbackLoading() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="h-8 bg-gray-200 rounded animate-pulse mb-6"></div>

          <div className="space-y-6">
            <div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-1/3"></div>
              <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="h-10 bg-blue-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
