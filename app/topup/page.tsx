"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StyledInput } from "@/components/ui/styled-input"
import { Label } from "@/components/ui/label"
import { QrCode, Phone } from "lucide-react"
import { ConfirmationModal } from "@/components/ui/confirmation-modal"
import { SuccessModal } from "@/components/ui/success-modal"

const quickAmounts = [50, 100, 200, 500, 1000, 2000]

export default function TopUpPage() {
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
      console.log("[v0] Prepaid Recharge successful:", txId)
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
          <h1 className="text-2xl font-bold text-gray-900">Prepaid Recharge</h1>
          <p className="text-gray-600">Mobile account recharge functionality</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Mobile Number
              </CardTitle>
              <CardDescription>Enter the mobile number to recharge</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    +248
                  </span>
                  <StyledInput
                    id="mobile"
                    placeholder="Enter Mobile Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="rounded-l-none"
                    maxLength={7}
                  />
                </div>
                {phoneNumber && phoneNumber.length !== 7 && (
                  <p className="text-sm text-red-600">Phone number must be 7 digits</p>
                )}
              </div>
              <Button variant="outline" className="w-full bg-transparent" onClick={handleQRScan}>
                <QrCode className="h-4 w-4 mr-2" />
                Scan QR Code
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recharge Amount</CardTitle>
              <CardDescription>Select or enter amount in SR</CardDescription>
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
                    SR {amount}
                  </Button>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom">Custom Amount</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">SR</div>
                  <StyledInput
                    id="custom"
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="pl-12"
                    min="1"
                    max="5000"
                  />
                </div>
                {customAmount && (Number.parseFloat(customAmount) > 5000 || Number.parseFloat(customAmount) < 1) && (
                  <p className="text-sm text-red-600">Amount must be between SR 1 and SR 5000</p>
                )}
              </div>

              {getCurrentAmount() > 0 && (
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Recharge Amount:</span>
                    <span className="text-xl font-bold text-purple-600">SR {getCurrentAmount()}</span>
                  </div>
                  {phoneNumber && (
                    <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                      <span>Mobile Number:</span>
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
                Proceed to Payment
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 bg-purple-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Prepaid Recharge Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-medium mb-1">Quick Amounts:</p>
              <ul className="space-y-1">
                <li>• SR 50 - Basic recharge</li>
                <li>• SR 100-500 - Regular usage</li>
                <li>• SR 1000+ - Heavy usage</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-1">Features:</p>
              <ul className="space-y-1">
                <li>• Instant credit transfer</li>
                <li>• QR code scanning</li>
                <li>• Custom amount support</li>
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
