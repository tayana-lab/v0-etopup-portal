"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { StyledInput } from "@/components/ui/styled-input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ConfirmationModal } from "@/components/ui/confirmation-modal"
import { SuccessModal } from "@/components/ui/success-modal"
import { FileText, AlertTriangle, Calendar, DollarSign, User, MapPin } from "lucide-react"

const mockBills = {
  broadband: [
    {
      id: 1,
      accountNumber: "FB001234",
      customerName: "John Doe",
      serviceAddress: "Victoria, Mahe",
      planType: "Fiber Pro",
      amount: 450,
      dueDate: "2024-01-15",
      status: "overdue",
      dataUsage: "85%",
      planDetails: "100 Mbps Unlimited",
    },
    {
      id: 2,
      accountNumber: "AD005678",
      customerName: "Jane Smith",
      serviceAddress: "Anse Royale, Mahe",
      planType: "ADSL Standard",
      amount: 250,
      dueDate: "2024-01-20",
      status: "due",
      dataUsage: "45%",
      planDetails: "20 Mbps 500GB",
    },
  ],
  mobile: [
    {
      id: 3,
      accountNumber: "MB987654",
      customerName: "Mike Johnson",
      serviceAddress: "Praslin",
      planType: "Business Mobile",
      amount: 180,
      dueDate: "2024-01-18",
      status: "current",
      dataUsage: "60%",
      planDetails: "Unlimited calls + 15GB",
    },
  ],
}

export default function BillPayPage() {
  const [accountNumber, setAccountNumber] = useState("")
  const [selectedBill, setSelectedBill] = useState<any>(null)
  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentType, setPaymentType] = useState<"full" | "custom">("full")
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transactionId, setTransactionId] = useState("")
  const [hasSearched, setHasSearched] = useState(false)

  const detectServiceType = (accountNum: string) => {
    if (accountNum.startsWith("FB") || accountNum.startsWith("AD")) {
      return "broadband"
    } else if (accountNum.startsWith("MB")) {
      return "mobile"
    }
    return null
  }

  const handleAccountLookup = async () => {
    setIsLoading(true)
    setHasSearched(true)
    setTimeout(() => {
      const bills = [...mockBills.broadband, ...mockBills.mobile]
      const foundBill = bills.find((bill) => bill.accountNumber === accountNumber)
      setSelectedBill(foundBill || null)
      setPaymentAmount(foundBill ? foundBill.amount.toString() : "")
      setIsLoading(false)
    }, 1000)
  }

  const handlePaymentClick = () => {
    if (!selectedBill || !paymentAmount || Number.parseFloat(paymentAmount) <= 0) return
    setShowConfirmation(true)
  }

  const handleConfirmPayment = async () => {
    setIsProcessing(true)

    setTimeout(() => {
      const txId = `BILL${Date.now()}`
      setTransactionId(txId)
      setIsProcessing(false)
      setShowConfirmation(false)
      setShowSuccess(true)
      console.log("[v0] Bill payment successful:", txId)
    }, 2000)
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    setSelectedBill(null)
    setAccountNumber("")
    setPaymentAmount("")
    setHasSearched(false)
  }

  const getConfirmationData = () => {
    if (!selectedBill) return null

    return {
      customerName: selectedBill.customerName,
      accountNumber: selectedBill.accountNumber,
      serviceAddress: selectedBill.serviceAddress,
      planType: selectedBill.planType,
      dueDate: selectedBill.dueDate,
      status: selectedBill.status,
      amount: Number.parseFloat(paymentAmount),
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200"
      case "due":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "current":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getUrgencyIcon = (status: string) => {
    if (status === "overdue") return <AlertTriangle className="h-4 w-4 text-red-500" />
    if (status === "due") return <Calendar className="h-4 w-4 text-yellow-500" />
    return null
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Bill Payment</h1>
          <p className="text-gray-600">Pay utility bills for broadband and mobile services</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Account Lookup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="account">Account Number</Label>
                <StyledInput
                  id="account"
                  placeholder="FB001234, AD005678, or MB987654"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  maxLength={8}
                />
                {accountNumber && detectServiceType(accountNumber) && (
                  <p className="text-sm text-blue-600 mt-1">
                    Detected: {detectServiceType(accountNumber) === "broadband" ? "Broadband" : "Mobile"} Service
                  </p>
                )}
              </div>
              <Button onClick={handleAccountLookup} disabled={!accountNumber || isLoading} className="mt-6">
                {isLoading ? "Looking up..." : "Lookup Bill"}
              </Button>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Sample Account Numbers for Testing:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                <button
                  onClick={() => setAccountNumber("FB001234")}
                  className="flex items-center justify-between p-3 bg-white rounded border hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <span className="font-mono font-semibold">FB001234</span>
                  <span className="text-xs text-gray-500">Fiber Pro - SR 450</span>
                </button>
                <button
                  onClick={() => setAccountNumber("AD005678")}
                  className="flex items-center justify-between p-3 bg-white rounded border hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <span className="font-mono font-semibold">AD005678</span>
                  <span className="text-xs text-gray-500">ADSL - SR 250</span>
                </button>
                <button
                  onClick={() => setAccountNumber("MB987654")}
                  className="flex items-center justify-between p-3 bg-white rounded border hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <span className="font-mono font-semibold">MB987654</span>
                  <span className="text-xs text-gray-500">Mobile - SR 180</span>
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                <strong>Click on any account number above to auto-fill and test the bill lookup feature</strong>
              </p>
            </div>
          </CardContent>
        </Card>

        {selectedBill && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Bill Details
                </span>
                <div className="flex items-center gap-2">
                  {getUrgencyIcon(selectedBill.status)}
                  <Badge className={getStatusColor(selectedBill.status)}>{selectedBill.status.toUpperCase()}</Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Customer Name</p>
                  <p className="font-medium">{selectedBill.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account Number</p>
                  <p className="font-medium">{selectedBill.accountNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Service Address</p>
                  <p className="font-medium flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {selectedBill.serviceAddress}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Plan Type</p>
                  <p className="font-medium">{selectedBill.planType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Plan Details</p>
                  <p className="font-medium">{selectedBill.planDetails}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Data Usage</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: selectedBill.dataUsage }}></div>
                    </div>
                    <span className="text-sm font-medium">{selectedBill.dataUsage}</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Amount Due:</span>
                  <span className="text-2xl font-bold text-blue-600">SR {selectedBill.amount}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  Due Date: {new Date(selectedBill.dueDate).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {selectedBill && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Payment Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Button
                  variant={paymentType === "full" ? "default" : "outline"}
                  onClick={() => {
                    setPaymentType("full")
                    setPaymentAmount(selectedBill.amount.toString())
                  }}
                >
                  Full Bill Payment (SR {selectedBill.amount})
                </Button>
                <Button
                  variant={paymentType === "custom" ? "default" : "outline"}
                  onClick={() => {
                    setPaymentType("custom")
                    setPaymentAmount("")
                  }}
                >
                  Custom Amount
                </Button>
              </div>

              <div>
                <Label htmlFor="amount">Payment Amount</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">SR</div>
                  <StyledInput
                    id="amount"
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className="pl-12"
                    min="1"
                    max={selectedBill.amount}
                    disabled={paymentType === "full"}
                  />
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                disabled={!paymentAmount || Number.parseFloat(paymentAmount) <= 0}
                onClick={handlePaymentClick}
              >
                Proceed to Payment
              </Button>
            </CardContent>
          </Card>
        )}

        {!selectedBill && hasSearched && !isLoading && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-yellow-800">
                <AlertTriangle className="h-4 w-4" />
                <p>No bill found for account number: {accountNumber}</p>
              </div>
              <p className="text-sm text-yellow-700 mt-1">Please check the account number and try again.</p>
            </CardContent>
          </Card>
        )}

        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Supported Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-medium mb-1">Broadband Services:</p>
              <ul className="space-y-1">
                <li>• Fiber Pro (High-speed fiber)</li>
                <li>• ADSL Standard (Traditional broadband)</li>
                <li>• Fiber Ultra (Premium fiber)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-1">Mobile Services:</p>
              <ul className="space-y-1">
                <li>• Postpaid plans</li>
                <li>• Business accounts</li>
                <li>• Corporate mobile services</li>
              </ul>
            </div>
          </div>
        </div>

        <ConfirmationModal
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleConfirmPayment}
          type="bill"
          data={getConfirmationData()}
          isLoading={isProcessing}
        />

        <SuccessModal
          isOpen={showSuccess}
          onClose={handleSuccessClose}
          type="bill"
          data={getConfirmationData()}
          transactionId={transactionId}
        />
      </div>
    </DashboardLayout>
  )
}
