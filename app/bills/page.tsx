"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { StyledInput } from "@/components/ui/styled-input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ConfirmationModal } from "@/components/ui/confirmation-modal"
import { SuccessModal } from "@/components/ui/success-modal"
import { FileText, AlertTriangle, Calendar, DollarSign } from "lucide-react"
import { useLanguage } from "@/lib/contexts/language-context"

const mockBills = {
  broadband: [
    {
      id: 1,
      accountNumber: "FB001234",
      customerName: "John Doe",
      serviceAddress: "Victoria, Mahe",
      planType: "Fiber Pro",
      amount: 450,
      dueDate: "2025-01-15",
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
      dueDate: "2025-01-18",
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
      dueDate: "2025-01-16",
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
  const { t } = useLanguage()

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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{t("bills.title")}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t("bills.description")}</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t("bills.account-lookup")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="account">{t("bills.account-number")}</Label>
                <StyledInput
                  id="account"
                  placeholder={t("bills.enter-account")}
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  maxLength={8}
                />
                {accountNumber && detectServiceType(accountNumber) && (
                  <p className="text-sm text-blue-600 mt-1">
                    {t("bills.detected")}:{" "}
                    {detectServiceType(accountNumber) === "broadband" ? t("bills.broadband") : t("bills.mobile")}{" "}
                    {t("bills.service")}
                  </p>
                )}
              </div>
              <Button onClick={handleAccountLookup} disabled={!accountNumber || isLoading} className="mt-6">
                {isLoading ? t("bills.looking-up") : t("bills.lookup-bill")}
              </Button>
            </div>

            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">{t("bills.sample-accounts")}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                <button
                  onClick={() => setAccountNumber("FB001234")}
                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded border hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer"
                >
                  <span className="font-mono font-semibold">FB001234</span>
                  <span className="text-xs text-gray-500">Fiber Pro - SCR 450</span>
                </button>
                <button
                  onClick={() => setAccountNumber("AD005678")}
                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded border hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer"
                >
                  <span className="font-mono font-semibold">AD005678</span>
                  <span className="text-xs text-gray-500">ADSL - SCR 250</span>
                </button>
                <button
                  onClick={() => setAccountNumber("MB987654")}
                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded border hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer"
                >
                  <span className="font-mono font-semibold">MB987654</span>
                  <span className="text-xs text-gray-500">Mobile - SCR 180</span>
                </button>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                <strong>{t("bills.click-autofill")}</strong>
              </p>
            </div>
          </CardContent>
        </Card>

        {selectedBill && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                {t("bills.payment-options")}
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
                  {t("bills.full-payment")} (SCR {selectedBill.amount})
                </Button>
                <Button
                  variant={paymentType === "custom" ? "default" : "outline"}
                  onClick={() => {
                    setPaymentType("custom")
                    setPaymentAmount("")
                  }}
                >
                  {t("bills.custom-amount")}
                </Button>
              </div>

              <div>
                <Label htmlFor="amount">{t("bills.payment-amount")}</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">SCR</div>
                  <StyledInput
                    id="amount"
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className="pl-16"
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
                {t("bills.proceed-payment")}
              </Button>
            </CardContent>
          </Card>
        )}

        {!selectedBill && hasSearched && !isLoading && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-yellow-800">
                <AlertTriangle className="h-4 w-4" />
                <p>
                  {t("bills.no-bill-found")}: {accountNumber}
                </p>
              </div>
              <p className="text-sm text-yellow-700 mt-1">{t("bills.check-number")}</p>
            </CardContent>
          </Card>
        )}

        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">{t("bills.supported-services")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-medium mb-1">{t("bills.broadband-services")}:</p>
              <ul className="space-y-1">
                <li>• Fiber Pro (High-speed fiber)</li>
                <li>• ADSL Standard (Traditional broadband)</li>
                <li>• Fiber Ultra (Premium fiber)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-1">{t("bills.mobile-services")}:</p>
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
