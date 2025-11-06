"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { StyledInput } from "@/components/ui/styled-input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Smartphone, Wifi, Phone, MessageSquare, Star, Clock } from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ConfirmationModal } from "@/components/ui/confirmation-modal"
import { SuccessModal } from "@/components/ui/success-modal"
import { useLanguage } from "@/lib/contexts/language-context"

const packages = {
  popular: [
    {
      id: 1,
      name: "Super Value Pack",
      price: 150,
      validity: "30 days",
      data: "10GB",
      voice: "500 mins",
      sms: "Unlimited",
      features: ["High-speed 4G", "Social media bonus", "Weekend double data"],
      numberType: "Prepaid",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Family Pack",
      price: 300,
      validity: "30 days",
      data: "25GB",
      voice: "1000 mins",
      sms: "Unlimited",
      features: ["Shared data", "Family calling", "International minutes"],
      numberType: "Postpaid",
      rating: 4.9,
    },
  ],
  data: [
    {
      id: 3,
      name: "Data Booster",
      price: 75,
      validity: "7 days",
      data: "5GB",
      voice: "0 mins",
      sms: "0",
      features: ["High-speed only", "No throttling", "Rollover data"],
      numberType: "Prepaid",
      rating: 4.5,
    },
    {
      id: 4,
      name: "Unlimited Data",
      price: 500,
      validity: "30 days",
      data: "Unlimited",
      voice: "200 mins",
      sms: "100",
      features: ["Truly unlimited", "5G ready", "Hotspot included"],
      numberType: "Postpaid",
      rating: 4.7,
    },
  ],
  voice: [
    {
      id: 5,
      name: "Talk More",
      price: 100,
      validity: "30 days",
      data: "2GB",
      voice: "2000 mins",
      sms: "500",
      features: ["Local calls", "International rates", "Call waiting"],
      numberType: "Prepaid",
      rating: 4.3,
    },
  ],
  combo: [
    {
      id: 6,
      name: "Everything Pack",
      price: 250,
      validity: "30 days",
      data: "15GB",
      voice: "800 mins",
      sms: "Unlimited",
      features: ["Best value", "All services", "Premium support"],
      numberType: "Prepaid",
      rating: 4.6,
    },
  ],
}

export default function PurchasePackagesPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [numberType, setNumberType] = useState<"Prepaid" | "Postpaid" | null>(null)
  const [selectedPackage, setSelectedPackage] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("popular")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transactionId, setTransactionId] = useState("")

  const { t } = useLanguage()

  const detectNumberType = (number: string) => {
    // Simulate number type detection
    const cleanNumber = number.replace(/^\+248/, "").replace(/\s/g, "")
    if (cleanNumber.length === 7) {
      // Simple logic: numbers starting with 2 are postpaid, others prepaid
      setNumberType(cleanNumber.startsWith("2") ? "Postpaid" : "Prepaid")
    }
  }

  const handlePhoneChange = (value: string) => {
    if (value.length <= 7) {
      setPhoneNumber(value)
      detectNumberType(value)
    }
  }

  const filteredPackages = numberType
    ? packages[activeTab as keyof typeof packages].filter((pkg) => pkg.numberType === numberType)
    : packages[activeTab as keyof typeof packages]

  const handlePurchaseClick = () => {
    if (!selectedPackage || !phoneNumber || !numberType) return
    setShowConfirmation(true)
  }

  const handleConfirmPurchase = async () => {
    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      const txId = `PKG${Date.now()}`
      setTransactionId(txId)
      setIsProcessing(false)
      setShowConfirmation(false)
      setShowSuccess(true)
      console.log("[v0] Package purchased successfully:", txId)
    }, 2000)
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    // Reset form
    setSelectedPackage(null)
    setPhoneNumber("")
    setNumberType(null)
  }

  const getConfirmationData = () => {
    if (!selectedPackage) return null

    return {
      packageName: selectedPackage.name,
      phoneNumber,
      numberType,
      data: selectedPackage.data,
      voice: selectedPackage.voice,
      sms: selectedPackage.sms,
      validity: selectedPackage.validity,
      price: selectedPackage.price,
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t("packages.title")}</h1>
          <p className="text-gray-600">{t("packages.subtitle")}</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              {t("packages.mobile-number")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">{t("packages.mobile-number")}</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    +248
                  </span>
                  <StyledInput
                    id="phone"
                    placeholder={t("packages.enter-number")}
                    value={phoneNumber}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className="rounded-l-none"
                    maxLength={7}
                  />
                </div>
                {numberType && (
                  <div className="mt-2">
                    <Badge variant={numberType === "Prepaid" ? "default" : "secondary"}>
                      {t(`packages.${numberType.toLowerCase()}`)}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {phoneNumber && numberType ? (
          <>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="popular" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  {t("packages.popular")}
                </TabsTrigger>
                <TabsTrigger value="data" className="flex items-center gap-2">
                  <Wifi className="h-4 w-4" />
                  {t("packages.data")}
                </TabsTrigger>
                <TabsTrigger value="voice" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {t("packages.voice")}
                </TabsTrigger>
                <TabsTrigger value="combo" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  {t("packages.combo")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPackages.map((pkg) => (
                    <Card
                      key={pkg.id}
                      className={`relative cursor-pointer transition-all hover:shadow-lg ${
                        selectedPackage?.id === pkg.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                      }`}
                      onClick={() => setSelectedPackage(pkg)}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{pkg.name}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant={pkg.numberType === "Prepaid" ? "default" : "secondary"}>
                                {t(`packages.${pkg.numberType.toLowerCase()}`)}
                              </Badge>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs text-gray-600">{pkg.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-blue-600">SCR {pkg.price}</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {pkg.validity}
                            </p>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <Wifi className="h-4 w-4 mx-auto text-blue-500 mb-1" />
                            <p className="text-sm font-medium">{pkg.data}</p>
                            <p className="text-xs text-gray-500">{t("packages.data")}</p>
                          </div>
                          <div>
                            <Phone className="h-4 w-4 mx-auto text-green-500 mb-1" />
                            <p className="text-sm font-medium">{pkg.voice}</p>
                            <p className="text-xs text-gray-500">{t("packages.voice")}</p>
                          </div>
                          <div>
                            <MessageSquare className="h-4 w-4 mx-auto text-purple-500 mb-1" />
                            <p className="text-sm font-medium">{pkg.sms}</p>
                            <p className="text-xs text-gray-500">{t("packages.sms")}</p>
                          </div>
                        </div>

                        <div className="space-y-1">
                          {pkg.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                              <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {selectedPackage && (
              <Card className="mt-6 border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    {t("packages.selected-package")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{selectedPackage.name}</p>
                      <p className="text-sm text-gray-600">
                        {selectedPackage.data} • {selectedPackage.voice} • {selectedPackage.sms} SMS
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-blue-600">SCR {selectedPackage.price}</p>
                      <Button className="mt-2" onClick={handlePurchaseClick} disabled={!phoneNumber || !numberType}>
                        {t("packages.purchase")}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          phoneNumber &&
          !numberType && (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">{t("packages.enter-valid")}</p>
            </div>
          )
        )}

        <ConfirmationModal
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleConfirmPurchase}
          type="package"
          data={getConfirmationData()}
          isLoading={isProcessing}
        />

        <SuccessModal
          isOpen={showSuccess}
          onClose={handleSuccessClose}
          type="package"
          data={getConfirmationData()}
          transactionId={transactionId}
        />
      </div>
    </DashboardLayout>
  )
}
