import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DashboardOverview } from "@/components/layout/dashboard-overview"

export default function HomePage() {
  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  )
}
