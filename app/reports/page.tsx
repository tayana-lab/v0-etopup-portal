import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, DollarSign, Users, Smartphone, Phone, Wallet } from "lucide-react"
import Link from "next/link"

const reportCards = [
  {
    title: "Total Sale",
    value: "SR 45,230", // Changed SCR to SR
    change: "+12.5%",
    icon: DollarSign,
    href: "/total-sale",
    color: "text-green-600",
  },
  {
    title: "Total Transactions",
    value: "1,247",
    change: "+8.2%",
    icon: BarChart3,
    href: "/total-transactions",
    color: "text-blue-600",
  },
  {
    title: "Earnings",
    value: "SR 2,156", // Changed SCR to SR
    change: "+15.3%",
    icon: TrendingUp,
    href: "/earnings",
    color: "text-purple-600",
  },
  {
    title: "SIM Stock",
    value: "156 units",
    change: "-5 units",
    icon: Smartphone,
    href: "/sim-stock",
    color: "text-orange-600",
  },
  {
    title: "Airtime Purchase",
    value: "SR 18,450", // Changed SCR to SR
    change: "+9.7%",
    icon: Phone,
    href: "/airtime-purchase",
    color: "text-indigo-600",
  },
  {
    title: "Balance",
    value: "SR 12,890", // Changed SCR to SR
    change: "+3.2%",
    icon: Wallet,
    href: "/balance",
    color: "text-teal-600",
  },
]

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600">Business analytics and performance tracking</p>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="today">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Export Data</Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reportCards.map((report) => (
            <Link key={report.title} href={report.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{report.title}</CardTitle>
                  <report.icon className={`h-4 w-4 ${report.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{report.value}</div>
                  <p
                    className={`text-xs ${report.change.startsWith("+") ? "text-green-600" : report.change.startsWith("-") && report.title === "SIM Stock" ? "text-orange-600" : "text-green-600"}`}
                  >
                    {report.change} from last period
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Report Actions</CardTitle>
            <CardDescription>Generate detailed reports for specific metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <BarChart3 className="h-6 w-6 mb-2" />
                Sales Report
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <Users className="h-6 w-6 mb-2" />
                Customer Report
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <Smartphone className="h-6 w-6 mb-2" />
                Inventory Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
