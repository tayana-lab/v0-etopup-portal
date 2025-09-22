"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Download, TrendingUp, DollarSign, Calendar, BarChart3 } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import Link from "next/link"

const salesData = [
  { period: "Jan 2024", revenue: 12500, growth: 15.3, transactions: 180 },
  { period: "Feb 2024", revenue: 15200, growth: 21.6, transactions: 220 },
  { period: "Mar 2024", revenue: 18300, growth: 20.4, transactions: 280 },
  { period: "Apr 2024", revenue: 16800, growth: -8.2, transactions: 245 },
  { period: "May 2024", revenue: 21400, growth: 27.4, transactions: 320 },
  { period: "Jun 2024", revenue: 19600, growth: -8.4, transactions: 290 },
]

const topServices = [
  { service: "Mobile TopUp", revenue: 45230, percentage: 45, growth: 18.5 },
  { service: "Package Sales", revenue: 28150, percentage: 28, growth: 12.3 },
  { service: "Bill Payments", revenue: 15680, percentage: 16, growth: 8.7 },
  { service: "SIM Sales", revenue: 11040, percentage: 11, growth: 22.1 },
]

export default function TotalSalePage() {
  const [timeRange, setTimeRange] = useState("6months")

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/reports">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Reports
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Total Sale Report</h1>
              <p className="text-gray-600">Revenue tracking with growth indicators</p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-500" />
                <span className="text-2xl font-bold">SCR 103,530</span>
              </div>
              <Badge variant="default" className="mt-2 bg-green-100 text-green-800">
                +15.3% vs last period
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Average Monthly</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-500" />
                <span className="text-2xl font-bold">SCR 17,255</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">6-month average</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Best Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="text-2xl font-bold">May 2024</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">SCR 21,400</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Growth Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="text-2xl font-bold">+15.3%</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Year over year</p>
            </CardContent>
          </Card>
        </div>

        {/* Time Range Selector */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Sales Performance</CardTitle>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesData.map((data, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{data.period}</p>
                      <p className="text-sm text-gray-600">{data.transactions} transactions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">SCR {data.revenue.toLocaleString()}</p>
                    <Badge variant={data.growth > 0 ? "default" : "destructive"} className="text-xs">
                      {data.growth > 0 ? "+" : ""}
                      {data.growth}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Service Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Service</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topServices.map((service, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{service.service}</span>
                    <div className="text-right">
                      <span className="font-bold">SCR {service.revenue.toLocaleString()}</span>
                      <Badge variant="outline" className="ml-2 text-green-600">
                        +{service.growth}%
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${service.percentage}%` }}></div>
                  </div>
                  <p className="text-sm text-gray-500">{service.percentage}% of total revenue</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
