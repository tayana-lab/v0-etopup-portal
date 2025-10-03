"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HeroCarousel } from "@/components/hero-carousel"
import { useLanguage } from "@/contexts/language-context"
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
  FileText,
  Plus,
  Activity,
  BarChart3,
  Zap,
} from "lucide-react"

const kpiData = [
  {
    title: "Today's Sales",
    titleKey: "kpi.sales",
    value: "SR 1026.50",
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
    value: "16",
    change: "+15.3% this month",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Success Rate",
    titleKey: "kpi.success",
    value: "69.2%",
    change: "+0.3% improvement",
    trend: "up",
    icon: TrendingUp,
    color: "text-green-600",
  },
]

const quickServices = [
  {
    name: "Mobile Top-up",
    nameKey: "services.mobile-topup",
    icon: Phone,
    href: "/topup",
    color: "bg-blue-50 dark:bg-blue-950/20 text-blue-600",
  },
  {
    name: "Data Packages",
    nameKey: "services.data-packages",
    icon: Package,
    href: "/packages",
    color: "bg-green-50 dark:bg-green-950/20 text-green-600",
  },
  {
    name: "Bill Payment",
    nameKey: "services.bill-payment",
    icon: CreditCard,
    href: "/bills",
    color: "bg-orange-50 dark:bg-orange-950/20 text-orange-600",
  },
  {
    name: "Fund Request",
    nameKey: "services.fund-request",
    icon: DollarSign,
    href: "/funds",
    color: "bg-purple-50 dark:bg-purple-950/20 text-purple-600",
  },
  {
    name: "SIM Sales",
    nameKey: "services.sim-sales",
    icon: Smartphone,
    href: "/sim-sales",
    color: "bg-blue-50 dark:bg-blue-950/20 text-blue-600",
  },
  {
    name: "Job Cards",
    nameKey: "services.job-cards",
    icon: FileText,
    href: "/jobs",
    color: "bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600",
  },
]

const recentTransactions = [
  {
    id: "TXN001",
    type: "Marketing campaign fund request",
    amount: "SR 250.00",
    date: "19/09/2025",
    status: "Pending",
    icon: Package,
    statusColor: "bg-yellow-100 dark:bg-yellow-950/20 text-yellow-800 dark:text-yellow-400",
  },
  {
    id: "TXN002",
    type: "Emergency fund request for inventory",
    amount: "SR 500.00",
    date: "19/09/2025",
    status: "Completed",
    icon: Package,
    statusColor: "bg-green-100 dark:bg-green-950/20 text-green-800 dark:text-green-400",
  },
  {
    id: "TXN003",
    type: "3GB Monthly package for +1234567896",
    amount: "SR 25.00",
    date: "19/09/2025",
    status: "Pending",
    icon: Package,
    statusColor: "bg-yellow-100 dark:bg-yellow-950/20 text-yellow-800 dark:text-yellow-400",
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
              <CardTitle className="text-foreground">{t("services.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3">
                {quickServices.map((service) => (
                  <Button
                    key={service.name}
                    variant="outline"
                    className="h-16 sm:h-20 flex-col gap-2 bg-card hover:bg-accent border-border text-foreground hover:text-accent-foreground"
                    asChild
                  >
                    <Link href={service.href}>
                      <div className={`p-2 rounded-lg ${service.color}`}>
                        <service.icon className="h-4 sm:h-5 w-4 sm:w-5" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium">{t(service.nameKey)}</span>
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-foreground">{t("transactions.title")}</CardTitle>
              <Button variant="ghost" className="text-primary hover:text-primary/80">
                {t("transactions.view-all")}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border bg-card"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <transaction.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground text-sm truncate">{transaction.type}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">{transaction.amount}</p>
                      <Badge className={`text-xs ${transaction.statusColor} border-0`}>
                        {t(`transactions.${transaction.status.toLowerCase()}`)}
                      </Badge>
                    </div>
                  </div>
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
                  <div className="text-xl sm:text-2xl font-bold text-green-600">SR 5240.00</div>
                  <div className="text-sm text-green-700 dark:text-green-400">{t("funds.available")}</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                  <div className="text-xl sm:text-2xl font-bold text-yellow-600">SR 1150.00</div>
                  <div className="text-sm text-yellow-700 dark:text-yellow-400">{t("funds.pending")}</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600">SR 10000.00</div>
                  <div className="text-sm text-blue-700 dark:text-blue-400">{t("funds.monthly-limit")}</div>
                </div>
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
