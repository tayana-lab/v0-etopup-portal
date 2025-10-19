"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Download, DollarSign, Users, CreditCard, ArrowUpRight, ArrowDownRight } from "lucide-react"

// Sample data for charts
const salesData = [
  { month: "Jan", sales: 12500, transactions: 180, commission: 625 },
  { month: "Feb", sales: 15200, transactions: 220, commission: 760 },
  { month: "Mar", sales: 18300, transactions: 280, commission: 915 },
  { month: "Apr", sales: 16800, transactions: 245, commission: 840 },
  { month: "May", sales: 21400, transactions: 320, commission: 1070 },
  { month: "Jun", sales: 19600, transactions: 290, commission: 980 },
]

const serviceBreakdown = [
  { name: "Top-up", value: 45, color: "#6366f1" },
  { name: "Packages", value: 30, color: "#fbbf24" },
  { name: "Bill Payment", value: 15, color: "#4ade80" },
  { name: "SIM Sales", value: 10, color: "#f472b6" },
]

const dailyActivity = [
  { day: "Mon", topups: 12, packages: 8, bills: 5 },
  { day: "Tue", topups: 15, packages: 10, bills: 7 },
  { day: "Wed", topups: 18, packages: 12, bills: 6 },
  { day: "Thu", topups: 14, packages: 9, bills: 8 },
  { day: "Fri", topups: 20, packages: 15, bills: 10 },
  { day: "Sat", topups: 25, packages: 18, bills: 12 },
  { day: "Sun", topups: 16, packages: 11, bills: 7 },
]

const topCustomers = [
  { name: "John Doe", transactions: 45, amount: "SCR 2,250", type: "Regular" },
  { name: "Jane Smith", transactions: 38, amount: "SCR 1,900", type: "Premium" },
  { name: "Mike Johnson", transactions: 32, amount: "SCR 1,600", type: "Regular" },
  { name: "Sarah Wilson", transactions: 28, amount: "SCR 1,400", type: "Business" },
  { name: "David Brown", transactions: 25, amount: "SCR 1,250", type: "Regular" },
]

const kpiMetrics = [
  {
    title: "Total Revenue",
    value: "SCR 89,420",
    change: "+15.3%",
    trend: "up",
    icon: DollarSign,
    color: "text-chart-1",
  },
  {
    title: "Total Transactions",
    value: "1,847",
    change: "+12.8%",
    trend: "up",
    icon: CreditCard,
    color: "text-chart-2",
  },
  {
    title: "Active Customers",
    value: "456",
    change: "+8.5%",
    trend: "up",
    icon: Users,
    color: "text-chart-3",
  },
  {
    title: "Commission Earned",
    value: "SCR 4,471",
    change: "+18.2%",
    trend: "up",
    icon: TrendingUp,
    color: "text-chart-4",
  },
]

export function ReportsAnalytics() {
  const [timeRange, setTimeRange] = useState("6months")
  const [reportType, setReportType] = useState("overview")

  const handleExportReport = () => {
    console.log("Exporting report:", { timeRange, reportType })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground text-balance">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-2">Comprehensive business intelligence and performance insights.</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExportReport} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiMetrics.map((metric) => (
          <Card key={metric.title} className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">{metric.title}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{metric.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {metric.trend === "up" ? (
                  <ArrowUpRight className="mr-1 h-3 w-3 text-chart-3" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3 text-destructive" />
                )}
                <span className={metric.trend === "up" ? "text-chart-3" : "text-destructive"}>{metric.change}</span>
                <span className="ml-1">from last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Sales Trend Chart */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Sales Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Service Distribution */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Service Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={serviceBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {serviceBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Daily Activity */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Daily Activity (This Week)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="topups" fill="#6366f1" />
                  <Bar dataKey="packages" fill="#fbbf24" />
                  <Bar dataKey="bills" fill="#4ade80" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Monthly Sales Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#6366f1" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Sales Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Best Month</span>
                    <span className="font-medium text-card-foreground">May</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Monthly</span>
                    <span className="font-medium text-card-foreground">SCR 17,300</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Growth Rate</span>
                    <span className="font-medium text-chart-3">+15.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Commission</span>
                    <span className="font-medium text-card-foreground">SCR 5,190</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Top Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCustomers.map((customer, index) => (
                  <div
                    key={customer.name}
                    className="flex items-center justify-between p-3 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-secondary">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.transactions} transactions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-card-foreground">{customer.amount}</p>
                      <Badge variant="outline" className="text-xs">
                        {customer.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Service Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviceBreakdown.map((service) => (
                    <div key={service.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-card-foreground">{service.name}</span>
                        <span className="font-medium text-card-foreground">{service.value}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${service.value}%`,
                            backgroundColor: service.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Service Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between p-3 rounded-lg bg-muted">
                    <span className="text-card-foreground">Top-up Services</span>
                    <span className="font-bold text-card-foreground">SCR 40,239</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-lg bg-muted">
                    <span className="text-card-foreground">Package Sales</span>
                    <span className="font-bold text-card-foreground">SCR 26,826</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-lg bg-muted">
                    <span className="text-card-foreground">Bill Payments</span>
                    <span className="font-bold text-card-foreground">SCR 13,413</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-lg bg-muted">
                    <span className="text-card-foreground">SIM Sales</span>
                    <span className="font-bold text-card-foreground">SCR 8,942</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
