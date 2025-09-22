"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, Eye, EyeOff, Plus, ArrowUpDown } from "lucide-react"
import { useState } from "react"

export default function MyWalletPage() {
  const [showBalance, setShowBalance] = useState(true)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Wallet</h1>
            <p className="text-gray-600">Account balance management and transaction history</p>
          </div>
          <Button onClick={() => setShowBalance(!showBalance)} variant="outline">
            {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-blue-600" />
                Recharge Balance
              </CardTitle>
              <CardDescription>For prepaid services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{showBalance ? "SCR 1,250.00" : "••••••"}</div>
              <Button className="mt-4 w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Funds
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-green-600" />
                Bill-Pay Balance
              </CardTitle>
              <CardDescription>For postpaid services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{showBalance ? "SCR 850.00" : "••••••"}</div>
              <Button className="mt-4 w-full bg-transparent" variant="outline">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Transfer Funds
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest wallet activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "TopUp", amount: "-SCR 100.00", date: "Today, 2:30 PM", status: "completed" },
                { type: "Fund Request", amount: "+SCR 500.00", date: "Yesterday, 4:15 PM", status: "completed" },
                { type: "Bill Payment", amount: "-SCR 250.00", date: "2 days ago", status: "completed" },
                { type: "Package Purchase", amount: "-SCR 75.00", date: "3 days ago", status: "pending" },
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{transaction.type}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-medium ${transaction.amount.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                    >
                      {transaction.amount}
                    </p>
                    <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                      {transaction.status}
                    </Badge>
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
