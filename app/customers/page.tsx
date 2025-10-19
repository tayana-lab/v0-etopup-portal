import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { CustomerManagement } from "@/components/features/customers/customer-management"

export default function CustomersPage() {
  return (
    <DashboardLayout>
      <CustomerManagement />
    </DashboardLayout>
  )
}
