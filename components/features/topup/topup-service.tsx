"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Search, Clock, CheckCircle } from "lucide-react"

const topupAmounts = [
  { value: "10", label: "SCR 10" },
  { value: "25", label: "SCR 25" },
  { value: "50", label: "SCR 50" },
  { value: "100", label: "SCR 100" },
  { value: "200", label: "SCR 200" },
  { value: "500", label: "SCR 500" },
]

const recentTopups = [
  { id: "TOP001", phone: "+248 123 4567", amount: "SCR 50", status: "completed", time: "5 min ago" },
  { id: "TOP002", phone: "+248 987 6543", amount: "SCR 25", status: "completed", time: "12 min ago" },
  { id: "TOP003", phone: "+248 555 0123", amount: "SCR 100", status: "processing", time: "18 min ago" },
]

export function TopUpService() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedAmount, setSelectedAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")

  const handleTopUp = () => {
    // Handle top-up logic here
    console.log("Processing top-up:", { phoneNumber, amount: selectedAmount || customAmount })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground text-balance">Top-up Services</h1>
        <p className="text-muted-foreground mt-2">Recharge mobile credit for customers quickly and securely.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Top-up Form */}
        <div className="lg:col-span-2">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Phone className="h-5 w-5 text-secondary" />
                Mobile Top-up
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Phone Number Input */}
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <div className="flex gap-2">
                  <Input
                    id="phone"
                    placeholder="Enter Mobile Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Amount Selection */}
              <div className="space-y-3">
                <Label>Select Amount</Label>
                <div className="grid grid-cols-3 gap-2">
                  {topupAmounts.map((amount) => (
                    <Button
                      key={amount.value}
                      variant={selectedAmount === amount.value ? "default" : "outline"}
                      onClick={() => {
                        setSelectedAmount(amount.value)
                        setCustomAmount("")
                      }}
                      className="h-12"
                    >
                      {amount.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div className="space-y-2">
                <Label htmlFor="custom-amount">Custom Amount</Label>
                <Input
                  id="custom-amount"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setSelectedAmount("")
                  }}
                  type="number"
                />
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
                  onClick={handleTopUp}
                  className="flex-1"
                  disabled={!phoneNumber || (!selectedAmount && !customAmount)}
                >
                  Process Top-up
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setPhoneNumber("")
                    setSelectedAmount("")
                    setCustomAmount("")
                  }}
                >
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Top-ups */}
        <div>
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Recent Top-ups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTopups.map((topup) => (
                  <div key={topup.id} className="p-3 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-card-foreground">{topup.phone}</p>
                      <Badge variant={topup.status === "completed" ? "default" : "secondary"} className="text-xs">
                        {topup.status === "completed" ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {topup.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{topup.amount}</span>
                      <span className="text-muted-foreground">{topup.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-card mt-4">
            <CardHeader>
              <CardTitle className="text-card-foreground">Today's Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Top-ups</span>
                  <span className="font-medium text-card-foreground">45</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Amount</span>
                  <span className="font-medium text-card-foreground">SCR 2,250</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Commission</span>
                  <span className="font-medium text-chart-3">SCR 112.50</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
