import { DashboardLayout } from "@/components/dashboard-layout"
import { SimSalesService } from "@/components/sim-sales-service"

export default function SimSalesPage() {
  return (
    <DashboardLayout>
      <SimSalesService />
    </DashboardLayout>
  )
}
