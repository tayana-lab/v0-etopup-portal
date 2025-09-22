"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  DollarSign,
  CreditCard,
  Users,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Phone,
  Smartphone,
  FileText,
  AlertTriangle,
  HelpCircle,
  MessageSquare,
  Star,
  Plus,
} from "lucide-react"

const kpiData = [
  {
    title: "Today's Sales",
    value: "$1026.50",
    change: "+12.5% from yesterday",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Transactions",
    value: "9",
    change: "+8.2% from yesterday",
    trend: "up",
    icon: CreditCard,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Active Customers",
    value: "16",
    change: "+15.3% this month",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Success Rate",
    value: "69.2%",
    change: "+0.3% improvement",
    trend: "up",
    icon: TrendingUp,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
]

const quickServices = [
  { name: "Mobile Top-up", icon: Phone, href: "/topup", color: "bg-blue-50 text-blue-600" },
  { name: "Data Packages", icon: Package, href: "/packages", color: "bg-green-50 text-green-600" },
  { name: "Bill Payment", icon: CreditCard, href: "/bills", color: "bg-orange-50 text-orange-600" },
  { name: "Fund Request", icon: DollarSign, href: "/funds", color: "bg-purple-50 text-purple-600" },
  { name: "SIM Sales", icon: Smartphone, href: "/sim-sales", color: "bg-blue-50 text-blue-600" },
  { name: "Job Cards", icon: FileText, href: "/jobs", color: "bg-indigo-50 text-indigo-600" },
]

const recentTransactions = [
  {
    id: "TXN001",
    type: "Marketing campaign fund request",
    amount: "$250.00",
    date: "19/09/2025",
    status: "Pending",
    icon: Package,
    statusColor: "bg-yellow-100 text-yellow-800",
  },
  {
    id: "TXN002",
    type: "Emergency fund request for inventory",
    amount: "$500.00",
    date: "19/09/2025",
    status: "Completed",
    icon: Package,
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: "TXN003",
    type: "3GB Monthly package for +1234567896",
    amount: "$25.00",
    date: "19/09/2025",
    status: "Pending",
    icon: Package,
    statusColor: "bg-yellow-100 text-yellow-800",
  },
]

const supportNotifications = [
  {
    type: "alert",
    title: "SIM card not working",
    subtitle: "Customer #5131",
    priority: "High",
    icon: AlertTriangle,
    color: "text-yellow-600",
  },
  {
    type: "alert",
    title: "Unable to process payment",
    subtitle: "Customer #7163",
    priority: "High",
    icon: AlertTriangle,
    color: "text-yellow-600",
  },
  {
    type: "help",
    title: "Help Documentation",
    icon: HelpCircle,
    color: "text-blue-600",
  },
  {
    type: "support",
    title: "Contact Support",
    icon: MessageSquare,
    color: "text-blue-600",
  },
  {
    type: "feedback",
    title: "Provide Feedback",
    icon: Star,
    color: "text-blue-600",
  },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">24/7 Customer Support</h2>
              <p className="text-blue-100 mb-4">
                Our dedicated support team is here to help you with all your queries and issues.
              </p>
              <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                Contact Support
              </Button>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className="bg-white border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                  <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</div>
              <div className="flex items-center text-xs">
                {kpi.trend === "up" ? (
                  <ArrowUpRight className="mr-1 h-3 w-3 text-green-600" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3 text-red-600" />
                )}
                <span className={kpi.trend === "up" ? "text-green-600" : "text-red-600"}>{kpi.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Quick Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {quickServices.map((service) => (
                  <Button
                    key={service.name}
                    variant="outline"
                    className="h-20 flex-col gap-2 bg-white hover:bg-gray-50 border border-gray-200"
                    asChild
                  >
                    <a href={service.href}>
                      <div className={`p-2 rounded-lg ${service.color}`}>
                        <service.icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{service.name}</span>
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-gray-900">Recent Transactions</CardTitle>
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
                        <transaction.icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{transaction.type}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{transaction.amount}</p>
                      <Badge className={`text-xs ${transaction.statusColor} border-0`}>{transaction.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-gray-900">Fund Request Center</CardTitle>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 rounded-lg bg-green-50">
                  <div className="text-2xl font-bold text-green-600">$5240.00</div>
                  <div className="text-sm text-green-700">Available Funds</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-yellow-50">
                  <div className="text-2xl font-bold text-yellow-600">$1150.00</div>
                  <div className="text-sm text-yellow-700">Pending Requests</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-blue-50">
                  <div className="text-2xl font-bold text-blue-600">$10000.00</div>
                  <div className="text-sm text-blue-700">Monthly Limit</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Support & Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportNotifications.map((notification, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className={`p-1 rounded ${notification.type === "alert" ? "bg-yellow-100" : "bg-blue-100"}`}>
                      <notification.icon className={`h-4 w-4 ${notification.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                      {notification.subtitle && <p className="text-xs text-gray-500">{notification.subtitle}</p>}
                      {notification.priority && (
                        <Badge className="mt-1 text-xs bg-yellow-100 text-yellow-800 border-0">
                          {notification.priority}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
