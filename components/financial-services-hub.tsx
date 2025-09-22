"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Package, CreditCard, DollarSign, TrendingUp, ArrowRight, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

const services = [
  {
    name: "Top-up Services",
    description: "Mobile credit recharge for customers",
    icon: Phone,
    href: "/financial/topup",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
    stats: { today: "45 transactions", amount: "SCR 2,250" },
  },
  {
    name: "Package Purchase",
    description: "Data and voice packages",
    icon: Package,
    href: "/financial/packages",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    stats: { today: "23 packages", amount: "SCR 2,760" },
  },
  {
    name: "Bill Payment",
    description: "Utility and service bill payments",
    icon: CreditCard,
    href: "/financial/bills",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    stats: { today: "18 bills", amount: "SCR 1,530" },
  },
  {
    name: "Fund Request",
    description: "Agent balance and fund management",
    icon: DollarSign,
    href: "/financial/funds",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    stats: { pending: "2 requests", amount: "SCR 5,000" },
  },
]

const recentActivity = [
  {
    id: "ACT001",
    type: "Top-up",
    customer: "John Doe",
    amount: "SCR 50",
    status: "completed",
    time: "2 minutes ago",
  },
  {
    id: "ACT002",
    type: "Package",
    customer: "Jane Smith",
    amount: "SCR 120",
    status: "completed",
    time: "5 minutes ago",
  },
  {
    id: "ACT003",
    type: "Bill Payment",
    customer: "Mike Johnson",
    amount: "SCR 85",
    status: "processing",
    time: "8 minutes ago",
  },
  {
    id: "ACT004",
    type: "Fund Request",
    customer: "Agent Balance",
    amount: "SCR 2,500",
    status: "pending",
    time: "15 minutes ago",
  },
]

export function FinancialServicesHub() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground text-balance">Financial Services</h1>
        <p className="text-muted-foreground mt-2">Manage transactions, payments, and financial operations.</p>
      </div>

      {/* Service Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.name} className="bg-card hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${service.bgColor}`}>
                    <service.icon className={`h-5 w-5 ${service.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-card-foreground">{service.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={service.href}>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-muted-foreground">{service.stats.today || service.stats.pending}</p>
                  <p className="font-medium text-card-foreground">{service.stats.amount}</p>
                </div>
                <Button asChild>
                  <Link href={service.href}>Access Service</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chart-1/10">
                <TrendingUp className="h-4 w-4 text-chart-1" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today's Revenue</p>
                <p className="text-xl font-bold text-card-foreground">SCR 6,540</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chart-2/10">
                <CreditCard className="h-4 w-4 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
                <p className="text-xl font-bold text-card-foreground">86</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chart-3/10">
                <DollarSign className="h-4 w-4 text-chart-3" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <p className="text-xl font-bold text-card-foreground">SCR 12,450</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                    {activity.status === "completed" ? (
                      <CheckCircle className="h-4 w-4 text-chart-3" />
                    ) : (
                      <Clock className="h-4 w-4 text-chart-2" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">{activity.type}</p>
                    <p className="text-sm text-muted-foreground">{activity.customer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-card-foreground">{activity.amount}</p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        activity.status === "completed"
                          ? "default"
                          : activity.status === "processing"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {activity.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
