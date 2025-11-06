"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Download, CreditCard, TrendingUp, Users, Activity } from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import Link from "next/link"
import { format } from "date-fns"
import { useLanguage } from "@/lib/contexts/language-context"

const transactionData = [
  { period: "Jan 2024", count: 180, success: 175, failed: 5, successRate: 97.2 },
  { period: "Feb 2024", count: 220, success: 215, failed: 5, successRate: 97.7 },
  { period: "Mar 2024", count: 280, success: 272, failed: 8, successRate: 97.1 },
  { period: "Apr 2024", count: 245, success: 238, failed: 7, successRate: 97.1 },
  { period: "May 2024", count: 320, success: 312, failed: 8, successRate: 97.5 },
  { period: "Jun 2024", count: 290, success: 283, failed: 7, successRate: 97.6 },
]

const transactionTypes = [
  { type: "Mobile Prepaid Recharge", count: 685, percentage: 45, avgAmount: 125 },
  { type: "Package Purchase", count: 456, percentage: 30, avgAmount: 185 },
  { type: "Bill Payment", count: 228, percentage: 15, avgAmount: 320 },
  { type: "SIM Sale", count: 152, percentage: 10, avgAmount: 75 },
]

export default function TotalTransactionsPage() {
  const [timeRange, setTimeRange] = useState("6months")
  const [transactionType, setTransactionType] = useState("all")
  const { t } = useLanguage()

  const totalTransactions = transactionData.reduce((sum, data) => sum + data.count, 0)
  const totalSuccess = transactionData.reduce((sum, data) => sum + data.success, 0)
  const overallSuccessRate = ((totalSuccess / totalTransactions) * 100).toFixed(1)

  const filteredData = transactionData.filter((data) => {
    if (transactionType === "all") return true
    // Filter logic can be extended based on transaction type
    return true
  })

  const handleExportReport = () => {
    const csvContent = [
      ["Period", "Total", "Success", "Failed", "Success Rate"],
      ...transactionData.map((data) => [data.period, data.count, data.success, data.failed, `${data.successRate}%`]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `total-transactions-report-${format(new Date(), "yyyy-MM-dd")}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/reports">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("transactions.view-all")}
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground mb-1">Total Transactions Report</h1>
              <p className="text-muted-foreground">Transaction volume analysis and success rates</p>
            </div>
            <Button variant="outline" onClick={handleExportReport}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          <div className="flex gap-4">
            <Select value={transactionType} onValueChange={setTransactionType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="topup">Mobile Recharge</SelectItem>
                <SelectItem value="package">Package Purchase</SelectItem>
                <SelectItem value="bill">Bill Payment</SelectItem>
                <SelectItem value="sim">SIM Sale</SelectItem>
              </SelectContent>
            </Select>

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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-500" />
                <span className="text-2xl font-bold">{totalTransactions.toLocaleString()}</span>
              </div>
              <Badge variant="default" className="mt-2 bg-green-100 text-green-800">
                +12.8% vs last period
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="text-2xl font-bold">{overallSuccessRate}%</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Overall success rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Daily Average</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-500" />
                <span className="text-2xl font-bold">{Math.round(totalTransactions / 180)}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Transactions per day</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Active Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-500" />
                <span className="text-2xl font-bold">456</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Unique customers</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Monthly Transaction Analysis</CardTitle>
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
              {filteredData.map((data, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-lg">{data.period}</h3>
                    <Badge variant="outline" className="text-green-600">
                      {data.successRate}% Success Rate
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{data.count}</p>
                      <p className="text-sm text-gray-600">Total</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{data.success}</p>
                      <p className="text-sm text-gray-600">Successful</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-600">{data.failed}</p>
                      <p className="text-sm text-gray-600">Failed</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${data.successRate}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction Types Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {transactionTypes.map((type, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{type.type}</h3>
                      <p className="text-sm text-gray-600">Average: SR {type.avgAmount}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">{type.count} transactions</p>
                      <p className="text-sm text-gray-500">{type.percentage}% of total</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${type.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
