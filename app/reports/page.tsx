"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Smartphone,
  Phone,
  Wallet,
  CalendarIcon,
  Download,
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/contexts/language-context"

const reportCards = [
  {
    title: "Total Sale",
    value: "SCR 45,230", // Changed SR to SCR
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
    value: "SCR 2,156", // Changed SR to SCR
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
    value: "SCR 18,450", // Changed SR to SCR
    change: "+9.7%",
    icon: Phone,
    href: "/airtime-purchase",
    color: "text-indigo-600",
  },
  {
    title: "Balance",
    value: "SCR 12,890", // Changed SR to SCR
    change: "+3.2%",
    icon: Wallet,
    href: "/balance",
    color: "text-teal-600",
  },
]

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("today")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [showDatePicker, setShowDatePicker] = useState(false)
  const { t } = useLanguage()

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value)
    if (value === "custom") {
      setShowDatePicker(true)
    }
  }

  const handleExportData = () => {
    const csvContent = [
      ["Report", "Value", "Change"],
      ...reportCards.map((report) => [report.title, report.value, report.change]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `reports-${format(new Date(), "yyyy-MM-dd")}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t("nav.reports")}</h1>
            <p className="text-muted-foreground">{t("reports.description")}</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">{t("common.today")}</SelectItem>
                <SelectItem value="week">{t("common.thisWeek")}</SelectItem>
                <SelectItem value="month">{t("common.thisMonth")}</SelectItem>
                <SelectItem value="custom">{t("reports.customRange")}</SelectItem>
              </SelectContent>
            </Select>

            {timeRange === "custom" && (
              <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-[280px] justify-start text-left font-normal")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>{t("reports.pickDateRange")}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={(range) => {
                      setDateRange(range || { from: undefined, to: undefined })
                      if (range?.from && range?.to) {
                        setShowDatePicker(false)
                      }
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            )}

            <Button variant="outline" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              {t("reports.exportData")}
            </Button>
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
            <CardTitle>{t("reports.quickActions")}</CardTitle>
            <CardDescription>{t("reports.quickActionsDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <BarChart3 className="h-6 w-6 mb-2" />
                {t("reports.salesReport")}
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <Users className="h-6 w-6 mb-2" />
                {t("reports.customerReport")}
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <Smartphone className="h-6 w-6 mb-2" />
                {t("reports.inventoryReport")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
