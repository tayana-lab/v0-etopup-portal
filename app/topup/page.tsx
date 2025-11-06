"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StyledInput } from "@/components/ui/styled-input"
import { Label } from "@/components/ui/label"
import { QrCode, Phone } from "lucide-react"
import { ConfirmationModal } from "@/components/ui/confirmation-modal"
import { SuccessModal } from "@/components/ui/success-modal"
import { useLanguage } from "@/lib/contexts/language-context"

const quickAmounts = [50, 100, 200, 500, 1000, 2000]

export default function TopUpPage() {
  const { t } = useLanguage()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transactionId, setTransactionId] = useState("")

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setSelectedAmount(null)
  }

  const getCurrentAmount = () => {
    return selectedAmount || Number.parseFloat(customAmount) || 0
  }

  const isValidForm = () => {
    const amount = getCurrentAmount()
    return phoneNumber.length === 7 && amount > 0 && amount <= 5000
  }

  const handleTopupClick = () => {
    if (!isValidForm()) return
    setShowConfirmation(true)
  }

  const handleConfirmTopup = async () => {
    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      const txId = `TOP${Date.now()}`
      setTransactionId(txId)
      setIsProcessing(false)
      setShowConfirmation(false)
      setShowSuccess(true)
      console.log("[v0]  Recharge successful:", txId)
    }, 2000)
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    // Reset form
    setPhoneNumber("")
    setSelectedAmount(null)
    setCustomAmount("")
  }

  const getConfirmationData = () => {
    return {
      phoneNumber,
      amount: getCurrentAmount(),
    }
  }

  const handleQRScan = () => {
    // Simulate QR code scanning
    console.log("[v0] QR code scanning initiated")
    // For demo purposes, set a sample number
    setPhoneNumber("4567890")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t("topup.title")}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t("topup.subtitle")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                {t("topup.mobile-number")}
              </CardTitle>
              <CardDescription>{t("topup.enter-mobile")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">{t("topup.mobile-number")}</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    +248
                  </span>
                  <StyledInput
                    id="mobile"
                    placeholder={t("topup.enter-number")}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="rounded-l-none"
                    maxLength={7}
                  />
                </div>
                {phoneNumber && phoneNumber.length !== 7 && (
                  <p className="text-sm text-red-600">{t("topup.phone-digits")}</p>
                )}
              </div>
              <Button variant="outline" className="w-full bg-transparent" onClick={handleQRScan}>
                <QrCode className="h-4 w-4 mr-2" />
                {t("topup.scan-qr")}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("topup.recharge-amount")}</CardTitle>
              <CardDescription>{t("topup.select-amount")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {quickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? "default" : "outline"}
                    className="h-12 bg-transparent"
                    onClick={() => handleAmountSelect(amount)}
                  >
                    SCR {amount}
                  </Button>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom">{t("topup.custom-amount")}</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">SCR</div>
                  <StyledInput
                    id="custom"
                    type="number"
                    placeholder={t("topup.enter-amount")}
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="pl-16"
                    min="1"
                    max="5000"
                  />
                </div>
                {customAmount && (Number.parseFloat(customAmount) > 5000 || Number.parseFloat(customAmount) < 1) && (
                  <p className="text-sm text-red-600">{t("topup.amount-range")}</p>
                )}
              </div>

              {getCurrentAmount() > 0 && (
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">{t("topup.recharge-amount")}:</span>
                    <span className="text-xl font-bold text-purple-600">SCR {getCurrentAmount()}</span>
                  </div>
                  {phoneNumber && (
                    <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                      <span>{t("topup.mobile-number")}:</span>
                      <span>+248 {phoneNumber}</span>
                    </div>
                  )}
                </div>
              )}

              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={!isValidForm()}
                onClick={handleTopupClick}
              >
                {t("topup.proceed-payment")}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 bg-blue-50 dark:bg-purple-900/20 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{t("topup.info-title")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <p className="font-medium mb-1">{t("topup.quick-amounts")}</p>
              <ul className="space-y-1">
                <li>• {t("topup.basic-recharge")}</li>
                <li>• {t("topup.regular-usage")}</li>
                <li>• {t("topup.heavy-usage")}</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-1">{t("topup.features")}</p>
              <ul className="space-y-1">
                <li>• {t("topup.instant-credit")}</li>
                <li>• {t("topup.qr-scanning")}</li>
                <li>• {t("topup.custom-support")}</li>
              </ul>
            </div>
          </div>
        </div>

        <ConfirmationModal
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleConfirmTopup}
          type="topup"
          data={getConfirmationData()}
          isLoading={isProcessing}
        />

        <SuccessModal
          isOpen={showSuccess}
          onClose={handleSuccessClose}
          type="topup"
          data={getConfirmationData()}
          transactionId={transactionId}
        />
      </div>
    </DashboardLayout>
  )
}
