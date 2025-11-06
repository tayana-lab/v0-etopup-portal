"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Wallet,
  Eye,
  EyeOff,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
  Calendar,
  CreditCard,
  Smartphone,
} from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useLanguage } from "@/lib/contexts/language-context"

const mockTransactions = [
  {
    id: 1,
    type: "topup",
    description: "Mobile TopUp - +248 4567890",
    amount: -100,
    balance: "recharge",
    date: "2025-01-06T10:30:00",
    status: "completed",
  },
  {
    id: 2,
    type: "bill_payment",
    description: "Broadband Bill - FB001234",
    amount: -450,
    balance: "billpay",
    date: "2025-01-05T15:45:00",
    status: "completed",
  },
  {
    id: 3,
    type: "fund_request",
    description: "Fund Request Approved",
    amount: 1000,
    balance: "recharge",
    date: "2025-01-04T09:15:00",
    status: "completed",
  },
  {
    id: 4,
    type: "package_purchase",
    description: "Super Value Pack",
    amount: -150,
    balance: "recharge",
    date: "2025-01-03T14:20:00",
    status: "completed",
  },
  {
    id: 5,
    type: "sms_purchase",
    description: "SMS Bundle - 500 SMS",
    amount: -25,
    balance: "recharge",
    date: "2025-01-02T11:10:00",
    status: "completed",
  },
]

export default function MyWalletPage() {
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const rechargeBalance = 2450.75
  const billPayBalance = 1200.5

  const { t } = useLanguage()

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "topup":
        return <Smartphone className="h-4 w-4 text-blue-500" />
      case "bill_payment":
        return <CreditCard className="h-4 w-4 text-purple-500" />
      case "fund_request":
        return <Plus className="h-4 w-4 text-green-500" />
      case "package_purchase":
        return <ArrowUpRight className="h-4 w-4 text-orange-500" />
      case "sms_purchase":
        return <ArrowDownLeft className="h-4 w-4 text-pink-500" />
      default:
        return <Wallet className="h-4 w-4 text-gray-500" />
    }
  }

  const isWithinDateRange = (transactionDate: string, filter: string) => {
    if (filter === "all") return true

    const txDate = new Date(transactionDate)
    const now = new Date()

    // Reset time to start of day for accurate comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const txDay = new Date(txDate.getFullYear(), txDate.getMonth(), txDate.getDate())

    if (filter === "today") {
      return txDay.getTime() === today.getTime()
    }

    if (filter === "week") {
      const weekAgo = new Date(today)
      weekAgo.setDate(weekAgo.getDate() - 7)
      return txDay >= weekAgo
    }

    if (filter === "month") {
      const monthAgo = new Date(today)
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      return txDay >= monthAgo
    }

    return true
  }

  const filteredTransactions = mockTransactions.filter((transaction) => {
    // Filter by transaction type
    const typeMatch =
      selectedFilter === "all" ||
      (selectedFilter === "recharge" && transaction.balance === "recharge") ||
      (selectedFilter === "billpay" && transaction.balance === "billpay")

    // Filter by date range
    const dateMatch = isWithinDateRange(transaction.date, dateFilter)

    return typeMatch && dateMatch
  })

  const formatCurrency = (amount: number) => {
    return balanceVisible ? `SCR ${Math.abs(amount).toFixed(2)}` : "SCR ****"
  }

  const formatBalance = (balance: number) => {
    return balanceVisible ? `SCR ${balance.toFixed(2)}` : "SCR ****"
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">{t("wallet.title")}</h1>
              <p className="text-muted-foreground">{t("wallet.description")}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setBalanceVisible(!balanceVisible)}>
              {balanceVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Wallet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-[#006bb6] to-[#0056a3] text-white">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  {t("wallet.recharge-balance")}
                </span>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {t("wallet.prepaid")}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-blue-100 text-sm">{t("wallet.available-balance")}</p>
                  <p className="text-3xl font-bold">{formatBalance(rechargeBalance)}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-white/20 hover:bg-white/30 border-white/30">
                    <Plus className="h-4 w-4 mr-1" />
                    {t("wallet.add-funds")}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    {t("wallet.transfer")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#5BCDDB] to-[#3AAFBF] text-white">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  {t("wallet.billpay-balance")}
                </span>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {t("wallet.postpaid")}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-cyan-100 text-sm">{t("wallet.available-balance")}</p>
                  <p className="text-3xl font-bold">{formatBalance(billPayBalance)}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-white/20 hover:bg-white/30 border-white/30">
                    <Plus className="h-4 w-4 mr-1" />
                    {t("wallet.add-funds")}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    {t("wallet.transfer")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t("wallet.quick-actions")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Plus className="h-6 w-6" />
                <span className="text-sm">{t("wallet.fund-request")}</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <ArrowUpRight className="h-6 w-6" />
                <span className="text-sm">{t("wallet.transfer-funds")}</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Smartphone className="h-6 w-6" />
                <span className="text-sm">{t("wallet.mobile-topup")}</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <CreditCard className="h-6 w-6" />
                <span className="text-sm">{t("wallet.pay-bills")}</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                {t("wallet.transaction-history")}
              </CardTitle>
              <div className="flex gap-2">
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("wallet.all-transactions")}</SelectItem>
                    <SelectItem value="recharge">{t("wallet.recharge-balance")}</SelectItem>
                    <SelectItem value="billpay">{t("wallet.billpay-balance")}</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("common.allTime")}</SelectItem>
                    <SelectItem value="today">{t("common.today")}</SelectItem>
                    <SelectItem value="week">{t("common.thisWeek")}</SelectItem>
                    <SelectItem value="month">{t("common.thisMonth")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getTransactionIcon(transaction.type)}
                    <div>
                      <p className="font-medium text-foreground">{transaction.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(transaction.date).toLocaleDateString()}
                        <Badge
                          variant="outline"
                          className={
                            transaction.balance === "recharge"
                              ? "border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-400"
                              : "border-purple-200 text-purple-700 dark:border-purple-800 dark:text-purple-400"
                          }
                        >
                          {transaction.balance === "recharge" ? t("wallet.recharge") : t("wallet.billpay")}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${transaction.amount > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {transaction.amount > 0 ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </p>
                    <Badge
                      variant="outline"
                      className="text-green-600 border-green-200 dark:text-green-400 dark:border-green-800"
                    >
                      {t("common.completed")}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Balance Summary */}
        <div className="mt-6 bg-accent/30 rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-4">{t("wallet.balance-summary")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatBalance(rechargeBalance)}</p>
              <p className="text-sm text-muted-foreground">{t("wallet.recharge-balance")}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{formatBalance(billPayBalance)}</p>
              <p className="text-sm text-muted-foreground">{t("wallet.billpay-balance")}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatBalance(rechargeBalance + billPayBalance)}
              </p>
              <p className="text-sm text-muted-foreground">{t("wallet.total-balance")}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
