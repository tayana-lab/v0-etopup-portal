"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Zap, Droplets, Wifi, Home, Receipt } from "lucide-react"

const billTypes = [
  { value: "electricity", label: "Electricity", icon: Zap, color: "text-yellow-600" },
  { value: "water", label: "Water", icon: Droplets, color: "text-blue-600" },
  { value: "internet", label: "Internet", icon: Wifi, color: "text-purple-600" },
  { value: "rent", label: "Rent", icon: Home, color: "text-green-600" },
  { value: "other", label: "Other", icon: Receipt, color: "text-gray-600" },
]

const recentPayments = [
  {
    id: "BILL001",
    type: "Electricity",
    customer: "John Doe",
    amount: "SCR 125",
    status: "completed",
    time: "10 min ago",
  },
  { id: "BILL002", type: "Water", customer: "Jane Smith", amount: "SCR 85", status: "completed", time: "25 min ago" },
  {
    id: "BILL003",
    type: "Internet",
    customer: "Mike Johnson",
    amount: "SCR 95",
    status: "processing",
    time: "1 hour ago",
  },
]

export function BillPaymentService() {
  const [selectedBillType, setSelectedBillType] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [amount, setAmount] = useState("")

  const handlePayment = () => {
    console.log("Processing bill payment:", { selectedBillType, accountNumber, customerName, amount })
  }

  const selectedType = billTypes.find((type) => type.value === selectedBillType)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground text-balance">Bill Payment Services</h1>
        <p className="text-muted-foreground mt-2">Process utility and service bill payments for customers.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <CreditCard className="h-5 w-5 text-secondary" />
                Bill Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Bill Type Selection */}
              <div className="space-y-3">
                <Label>Bill Type</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {billTypes.map((type) => (
                    <Button
                      key={type.value}
                      variant={selectedBillType === type.value ? "default" : "outline"}
                      onClick={() => setSelectedBillType(type.value)}
                      className="h-16 flex-col gap-2"
                    >
                      <type.icon
                        className={`h-5 w-5 ${selectedBillType === type.value ? "text-primary-foreground" : type.color}`}
                      />
                      <span className="text-xs">{type.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Account Details */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="account-number">Account Number</Label>
                  <Input
                    id="account-number"
                    placeholder="Enter account number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer-name">Customer Name</Label>
                  <Input
                    id="customer-name"
                    placeholder="Enter customer name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <Select defaultValue="agent-balance">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agent-balance">Agent Balance</SelectItem>
                    <SelectItem value="cash">Cash Payment</SelectItem>
                    <SelectItem value="card">Card Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handlePayment}
                  className="flex-1"
                  disabled={!selectedBillType || !accountNumber || !customerName || !amount}
                >
                  Process Payment
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedBillType("")
                    setAccountNumber("")
                    setCustomerName("")
                    setAmount("")
                  }}
                >
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Recent Payments */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Recent Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentPayments.map((payment) => (
                  <div key={payment.id} className="p-3 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-card-foreground text-sm">{payment.type}</p>
                      <Badge variant={payment.status === "completed" ? "default" : "secondary"} className="text-xs">
                        {payment.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{payment.customer}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-card-foreground">{payment.amount}</span>
                      <span className="text-xs text-muted-foreground">{payment.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Stats */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Today's Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bills Processed</span>
                  <span className="font-medium text-card-foreground">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Amount</span>
                  <span className="font-medium text-card-foreground">SCR 1,530</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Commission</span>
                  <span className="font-medium text-chart-3">SCR 76.50</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
