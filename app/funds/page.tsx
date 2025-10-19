"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DollarSign, Clock, CheckCircle, AlertCircle, CreditCard, Wallet, Calendar } from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

const mockRequests = [
  {
    id: "FR001",
    amount: 1000,
    walletType: "recharge",
    paymentMethod: "bank_transfer",
    status: "approved",
    requestDate: "2024-01-13T09:15:00",
    approvedDate: "2024-01-13T10:30:00",
    reason: "Monthly balance top-up",
  },
  {
    id: "FR002",
    amount: 500,
    walletType: "billpay",
    paymentMethod: "credit_card",
    status: "pending",
    requestDate: "2024-01-15T14:20:00",
    reason: "Bill payment preparation",
  },
  {
    id: "FR003",
    amount: 750,
    walletType: "recharge",
    paymentMethod: "mobile_money",
    status: "rejected",
    requestDate: "2024-01-10T11:45:00",
    rejectedDate: "2024-01-10T16:20:00",
    reason: "Emergency top-up needed",
    rejectionReason: "Insufficient documentation",
  },
]

const paymentMethods = [
  { id: "bank_transfer", name: "Bank Transfer", icon: CreditCard },
  { id: "credit_card", name: "Credit Card", icon: CreditCard },
  { id: "mobile_money", name: "Mobile Money", icon: Wallet },
]

export default function FundRequestPage() {
  const [activeTab, setActiveTab] = useState<"new" | "history">("new")
  const [amount, setAmount] = useState("")
  const [walletType, setWalletType] = useState<"recharge" | "billpay">("recharge")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setAmount("")
      setReason("")
      setPaymentMethod("")
      setActiveTab("history")
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Fund Request</h1>
          <p className="text-gray-600">Request balance top-ups for your wallets</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
          <Button variant={activeTab === "new" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("new")}>
            New Request
          </Button>
          <Button
            variant={activeTab === "history" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("history")}
          >
            Request History
          </Button>
        </div>

        {activeTab === "new" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                New Fund Request
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Request Amount</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">SR</div>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-12"
                      min="1"
                      max="10000"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="wallet">Wallet Type</Label>
                  <Select value={walletType} onValueChange={(value) => setWalletType(value as "recharge" | "billpay")}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recharge">Recharge Balance</SelectItem>
                      <SelectItem value="billpay">Bill-Pay Balance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Payment Method</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        paymentMethod === method.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <div className="flex items-center gap-3">
                        <method.icon className="h-5 w-5 text-gray-600" />
                        <span className="font-medium">{method.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="reason">Reason for Request</Label>
                <Textarea
                  id="reason"
                  placeholder="Please provide a reason for this fund request..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Request Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Amount:</span>
                    <span className="font-medium">SR {amount || "0.00"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Wallet:</span>
                    <span className="font-medium capitalize">{walletType} Balance</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Payment Method:</span>
                    <span className="font-medium">
                      {paymentMethod ? paymentMethods.find((m) => m.id === paymentMethod)?.name : "Not selected"}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!amount || !paymentMethod || !reason || isSubmitting}
                className="w-full"
                size="lg"
              >
                {isSubmitting ? "Submitting Request..." : "Submit Fund Request"}
              </Button>
            </CardContent>
          </Card>
        )}

        {activeTab === "history" && (
          <div className="space-y-4">
            {mockRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">Request #{request.id}</h3>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(request.status)}
                          <Badge className={getStatusColor(request.status)}>{request.status.toUpperCase()}</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{request.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">SR {request.amount}</p>
                      <p className="text-sm text-gray-500 capitalize">{request.walletType} Balance</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Payment Method</p>
                      <p className="font-medium">{paymentMethods.find((m) => m.id === request.paymentMethod)?.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Request Date</p>
                      <p className="font-medium flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(request.requestDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">
                        {request.status === "approved"
                          ? "Approved Date"
                          : request.status === "rejected"
                            ? "Rejected Date"
                            : "Status"}
                      </p>
                      <p className="font-medium">
                        {request.approvedDate && new Date(request.approvedDate).toLocaleDateString()}
                        {request.rejectedDate && new Date(request.rejectedDate).toLocaleDateString()}
                        {request.status === "pending" && "Under Review"}
                      </p>
                    </div>
                  </div>

                  {request.rejectionReason && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">
                        <strong>Rejection Reason:</strong> {request.rejectionReason}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Fund Request Guidelines</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Minimum request amount: SR 50</li>
            <li>• Maximum request amount: SR 10,000 per request</li>
            <li>• Processing time: 1-3 business days</li>
            <li>• Approved funds will be credited to your selected wallet</li>
            <li>• Provide clear reason for faster approval</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  )
}
