"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

const fundRequests = [
  {
    id: "FR001",
    amount: "SCR 5,000",
    type: "Balance Top-up",
    status: "pending",
    date: "2024-01-15",
    reason: "Low agent balance for daily operations",
  },
  {
    id: "FR002",
    amount: "SCR 2,500",
    type: "Emergency Fund",
    status: "approved",
    date: "2024-01-14",
    reason: "Urgent customer requests",
  },
  {
    id: "FR003",
    amount: "SCR 1,000",
    type: "Balance Top-up",
    status: "rejected",
    date: "2024-01-13",
    reason: "Insufficient documentation",
  },
]

export function FundRequestService() {
  const [requestAmount, setRequestAmount] = useState("")
  const [requestType, setRequestType] = useState("")
  const [reason, setReason] = useState("")

  const handleSubmitRequest = () => {
    console.log("Submitting fund request:", { requestAmount, requestType, reason })
    // Reset form
    setRequestAmount("")
    setRequestType("")
    setReason("")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-chart-3" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-destructive" />
      case "pending":
        return <Clock className="h-4 w-4 text-chart-2" />
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "default"
      case "rejected":
        return "destructive"
      case "pending":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground text-balance">Fund Request Management</h1>
        <p className="text-muted-foreground mt-2">Request additional funds and manage your agent balance.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Fund Request Form */}
        <div className="lg:col-span-2">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <DollarSign className="h-5 w-5 text-secondary" />
                New Fund Request
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Balance Display */}
              <div className="p-4 rounded-lg bg-muted">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Current Agent Balance</span>
                  <span className="text-2xl font-bold text-card-foreground">SCR 12,450</span>
                </div>
              </div>

              {/* Request Details */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="request-amount">Request Amount</Label>
                  <Input
                    id="request-amount"
                    placeholder="Enter amount needed"
                    value={requestAmount}
                    onChange={(e) => setRequestAmount(e.target.value)}
                    type="number"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Request Type</Label>
                  <Select value={requestType} onValueChange={setRequestType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select request type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="balance-topup">Balance Top-up</SelectItem>
                      <SelectItem value="emergency-fund">Emergency Fund</SelectItem>
                      <SelectItem value="advance-payment">Advance Payment</SelectItem>
                      <SelectItem value="commission-advance">Commission Advance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Request</Label>
                  <Textarea
                    id="reason"
                    placeholder="Explain why you need these funds..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSubmitRequest}
                  className="flex-1"
                  disabled={!requestAmount || !requestType || !reason}
                >
                  Submit Request
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setRequestAmount("")
                    setRequestType("")
                    setReason("")
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
          {/* Quick Stats */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Fund Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available Balance</span>
                  <span className="font-medium text-card-foreground">SCR 12,450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pending Requests</span>
                  <span className="font-medium text-chart-2">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">This Month</span>
                  <span className="font-medium text-card-foreground">SCR 7,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Credit Limit</span>
                  <span className="font-medium text-chart-3">SCR 25,000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Request History */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Request History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fundRequests.map((request) => (
              <div key={request.id} className="p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(request.status)}
                    <div>
                      <p className="font-medium text-card-foreground">{request.type}</p>
                      <p className="text-sm text-muted-foreground">Request ID: {request.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-card-foreground">{request.amount}</p>
                    <Badge variant={getStatusVariant(request.status)} className="text-xs">
                      {request.status}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{request.reason}</p>
                <p className="text-xs text-muted-foreground">Submitted: {request.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
