"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HeroCarousel } from "@/components/layout/hero-carousel"
import { useLanguage } from "@/lib/contexts/language-context"
import Link from "next/link"
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
  Plus,
  Activity,
  BarChart3,
  Zap,
  Wifi,
} from "lucide-react"

const kpiData = [
  {
    title: "Today's Sales",
    titleKey: "kpi.sales",
    value: "SCR 1026.50",
    change: "+12.5% from yesterday",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Transactions",
    titleKey: "kpi.transactions",
    value: "9",
    change: "+8.2% from yesterday",
    trend: "up",
    icon: CreditCard,
    color: "text-blue-600",
  },
  {
    title: "Active Customers",
    titleKey: "kpi.customers",
    value: "600",
    change: "+15.3% this month",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Success Rate",
    titleKey: "kpi.success",
    value: "99.2%",
    change: "+0.3% improvement",
    trend: "up",
    icon: TrendingUp,
    color: "text-green-600",
  },
]

const quickActions = [
  {
    name: "Mobile Top-up",
    nameKey: "actions.topup",
    description: "Recharge mobile accounts instantly",
    icon: Phone,
    href: "/topup",
    color: "bg-blue-500 hover:bg-blue-600",
    iconBg: "bg-blue-100 dark:bg-blue-950/30",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    name: "Package Purchase",
    nameKey: "actions.package",
    description: "Buy data and voice packages",
    icon: Package,
    href: "/packages",
    color: "bg-green-500 hover:bg-green-600",
    iconBg: "bg-green-100 dark:bg-green-950/30",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    name: "Bill Payment",
    nameKey: "actions.bill",
    description: "Pay utility and service bills",
    icon: CreditCard,
    href: "/bills",
    color: "bg-orange-500 hover:bg-orange-600",
    iconBg: "bg-orange-100 dark:bg-orange-950/30",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  {
    name: "Fund Request",
    nameKey: "actions.fund",
    description: "Request additional funds",
    icon: DollarSign,
    href: "/funds",
    color: "bg-purple-500 hover:bg-purple-600",
    iconBg: "bg-purple-100 dark:bg-purple-950/30",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    name: "SIM Sales",
    nameKey: "actions.sim",
    description: "Sell and activate SIM cards",
    icon: Smartphone,
    href: "/customers/sim-sales",
    color: "bg-blue-500 hover:bg-blue-600",
    iconBg: "bg-blue-100 dark:bg-blue-950/30",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    name: "Internet Services",
    nameKey: "actions.internet",
    description: "Manage internet subscriptions",
    icon: Wifi,
    href: "/packages",
    color: "bg-indigo-500 hover:bg-indigo-600",
    iconBg: "bg-indigo-100 dark:bg-indigo-950/30",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
]

const performanceMetrics = [
  {
    title: "System Uptime",
    titleKey: "metrics.uptime",
    value: "99.9%",
    subtitle: "Last 30 days",
    icon: Activity,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
  },
  {
    title: "Avg Response Time",
    titleKey: "metrics.response-time",
    value: "1.2s",
    subtitle: "API performance",
    icon: Zap,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    title: "Monthly Growth",
    titleKey: "metrics.growth",
    value: "+24%",
    subtitle: "Transaction volume",
    icon: BarChart3,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
  },
]

const recentTransactions = [
  {
    id: "TXN001",
    type: "Top Up",
    customer: "John Doe",
    amount: "SCR 100.00",
    date: "2025-01-20 14:30",
    status: "completed",
  },
  {
    id: "TXN002",
    type: "Package Purchase",
    customer: "Jane Smith",
    amount: "SCR 250.00",
    date: "2025-01-20 13:15",
    status: "completed",
  },
  {
    id: "TXN003",
    type: "Bill Pay",
    customer: "Mike Johnson",
    amount: "SCR 450.00",
    date: "2025-01-20 12:00",
    status: "completed",
  },
  {
    id: "TXN004",
    type: "Top Up",
    customer: "Sarah Williams",
    amount: "SCR 50.00",
    date: "2025-01-20 11:45",
    status: "completed",
  },
  {
    id: "TXN005",
    type: "Package Purchase",
    customer: "David Brown",
    amount: "SCR 300.00",
    date: "2025-01-20 10:30",
    status: "completed",
  },
]

export function DashboardOverview() {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <HeroCarousel />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className="bg-card border-border">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-muted-foreground">{t(kpi.titleKey)}</p>
                <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-foreground mb-1">{kpi.value}</div>
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
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {quickActions.map((action) => (
                  <Link key={action.name} href={action.href}>
                    <Card className="bg-card border-border hover:border-primary transition-all cursor-pointer group h-full">
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center gap-3">
                          <div className={`p-3 rounded-xl ${action.iconBg} group-hover:scale-110 transition-transform`}>
                            <action.icon className={`h-6 w-6 ${action.iconColor}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">{action.name}</h3>
                            <p className="text-xs text-muted-foreground">{action.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-foreground">{t("funds.title")}</CardTitle>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                {t("funds.new-request")}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
                  <div className="text-xl sm:text-2xl font-bold text-green-600">SCR 5240.00</div>
                  <div className="text-sm text-green-700 dark:text-green-400">{t("funds.available")}</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                  <div className="text-xl sm:text-2xl font-bold text-yellow-600">SCR 1150.00</div>
                  <div className="text-sm text-yellow-700 dark:text-yellow-400">{t("funds.pending")}</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600">SCR 10000.00</div>
                  <div className="text-sm text-blue-700 dark:text-blue-400">{t("funds.monthly-limit")}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-foreground">Recent Transactions</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/reports/total-transactions">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-foreground">{transaction.type}</p>
                        <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400">
                          {transaction.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{transaction.customer}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{transaction.amount}</p>
                      <p className="text-xs text-muted-foreground">{transaction.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                        <metric.icon className={`h-5 w-5 ${metric.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                        <p className="text-2xl font-bold text-foreground mt-1">{metric.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{metric.subtitle}</p>
                      </div>
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
