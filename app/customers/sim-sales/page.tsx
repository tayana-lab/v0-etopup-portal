import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { SimSalesService } from "@/components/features/customers/sim-sales-service"

export default function SimSalesPage() {
  return (
    <DashboardLayout>
      <SimSalesService />
    </DashboardLayout>
  )
}
