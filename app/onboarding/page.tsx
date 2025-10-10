"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { StyledInput } from "@/components/ui/styled-input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, User, Package, Smartphone, CheckCircle, ArrowLeft, ArrowRight, QrCode, Search } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

interface CustomerData {
  type: "local" | "gop" | "tourist"
  idDocument?: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  district?: string
  subDistrict?: string
  nationality?: string
  selectedPackage?: any
  selectedSim?: string
  signature?: string
}

const steps = [
  { id: 1, name: "ID Scanning", icon: FileText, description: "Document scanning with camera" },
  { id: 2, name: "Customer Details", icon: User, description: "Auto-filled form with validation" },
  { id: 3, name: "Package Selection", icon: Package, description: "Service plan selection" },
  { id: 4, name: "SIM Selection", icon: Smartphone, description: "Available SIM card selection" },
  { id: 5, name: "Confirmation", icon: CheckCircle, description: "Digital signature and final review" },
]

const packages = [
  { id: 1, name: "Starter Pack", price: 50, data: "2GB", validity: "30 days", type: "Prepaid" },
  { id: 2, name: "Premium Pack", price: 100, data: "5GB", validity: "30 days", type: "Prepaid" },
  { id: 3, name: "Business Pack", price: 200, data: "15GB", validity: "30 days", type: "Postpaid" },
  { id: 4, name: "Tourist Pack", price: 75, data: "3GB", validity: "14 days", type: "Prepaid" },
]

const districts = [
  "Anse aux Pins",
  "Anse Boileau",
  "Anse Etoile",
  "Anse Louis",
  "Anse Royale",
  "Baie Lazare",
  "Baie Sainte Anne",
  "Beau Vallon",
  "Bel Air",
  "Bel Ombre",
  "Cascade",
  "Glacis",
  "Grand Anse Mahe",
  "Grand Anse Praslin",
  "La Digue",
  "La Riviere Anglaise",
  "Les Mamelles",
  "Mont Buxton",
  "Mont Fleuri",
  "Plaisance",
  "Pointe La Rue",
  "Port Glaud",
  "Roche Caiman",
  "Saint Louis",
  "Takamaka",
]

const nationalities = [
  "British",
  "French",
  "German",
  "Italian",
  "South African",
  "Indian",
  "Chinese",
  "American",
  "Australian",
  "Canadian",
  "Other",
]

export default function DigitalOnboardPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [customerData, setCustomerData] = useState<CustomerData>({
    type: "local",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    district: "",
    subDistrict: "",
    nationality: "",
  })
  const [simSearch, setSimSearch] = useState("")
  const [availableSims] = useState([
    { id: "SIM001", number: "2484567890", status: "available" },
    { id: "SIM002", number: "2484567891", status: "available" },
    { id: "SIM003", number: "2484567892", status: "available" },
    { id: "SIM004", number: "2484567893", status: "available" },
    { id: "SIM005", number: "2484567894", status: "available" },
  ])

  const progress = (currentStep / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const filteredSims = availableSims.filter(
    (sim) => sim.number.includes(simSearch) || sim.id.toLowerCase().includes(simSearch.toLowerCase()),
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                ID Document Scanning
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
                {customerData.idDocument ? (
                  <img
                    src={customerData.idDocument || "/placeholder.svg"}
                    alt="ID Document"
                    className="mx-auto max-w-md rounded-lg"
                  />
                ) : (
                  <div className="border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg p-8">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500 dark:text-gray-400 mb-4">Scan customer ID document</p>
                    <Button>
                      <FileText className="h-4 w-4 mr-2" />
                      Scan Document
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <StyledInput
                    id="firstName"
                    value={customerData.firstName}
                    onChange={(e) => setCustomerData((prev) => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <StyledInput
                    id="lastName"
                    value={customerData.lastName}
                    onChange={(e) => setCustomerData((prev) => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <StyledInput
                  id="email"
                  type="email"
                  value={customerData.email}
                  onChange={(e) => setCustomerData((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <StyledInput
                  id="phone"
                  value={customerData.phone}
                  onChange={(e) => setCustomerData((prev) => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <StyledInput
                  id="address"
                  value={customerData.address}
                  onChange={(e) => setCustomerData((prev) => ({ ...prev, address: e.target.value }))}
                />
              </div>

              {(customerData.type === "local" || customerData.type === "gop") && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="district">District</Label>
                    <Select
                      value={customerData.district}
                      onValueChange={(value) => setCustomerData((prev) => ({ ...prev, district: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="subDistrict">Sub-District</Label>
                    <StyledInput
                      id="subDistrict"
                      value={customerData.subDistrict}
                      onChange={(e) => setCustomerData((prev) => ({ ...prev, subDistrict: e.target.value }))}
                    />
                  </div>
                </div>
              )}

              {customerData.type === "tourist" && (
                <div>
                  <Label htmlFor="nationality">Nationality</Label>
                  <Select
                    value={customerData.nationality}
                    onValueChange={(value) => setCustomerData((prev) => ({ ...prev, nationality: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      {nationalities.map((nationality) => (
                        <SelectItem key={nationality} value={nationality}>
                          {nationality}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Package Selection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      customerData.selectedPackage?.id === pkg.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                    onClick={() => setCustomerData((prev) => ({ ...prev, selectedPackage: pkg }))}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{pkg.name}</h3>
                      <Badge variant={pkg.type === "Prepaid" ? "default" : "secondary"}>{pkg.type}</Badge>
                    </div>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">SR {pkg.price}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{pkg.data} data</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{pkg.validity}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                SIM Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <StyledInput
                    placeholder="Search SIM by number or ID"
                    value={simSearch}
                    onChange={(e) => setSimSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <QrCode className="h-4 w-4 mr-2" />
                  Scan QR
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
                {filteredSims.map((sim) => (
                  <div
                    key={sim.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      customerData.selectedSim === sim.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                    onClick={() => setCustomerData((prev) => ({ ...prev, selectedSim: sim.id }))}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{sim.number}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">ID: {sim.id}</p>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Available
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Confirmation & Digital Signature
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Customer Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Name</p>
                    <p className="font-medium">
                      {customerData.firstName} {customerData.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium">{customerData.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="font-medium">{customerData.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Package</p>
                    <p className="font-medium">{customerData.selectedPackage?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">SIM Number</p>
                    <p className="font-medium">
                      {availableSims.find((s) => s.id === customerData.selectedSim)?.number}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Customer Type</p>
                    <p className="font-medium capitalize">{customerData.type}</p>
                  </div>
                </div>
              </div>

              <div>
                <Label>Digital Signature</Label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">Customer signature area</p>
                  <Button variant="outline">Capture Signature</Button>
                </div>
              </div>

              <Button className="w-full" size="lg">
                Complete Onboarding
              </Button>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Digital Onboarding</h1>
          <p className="text-muted-foreground">Complete customer onboarding process for SIM sales</p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="mb-4" />

          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index + 1 < currentStep
                      ? "bg-green-500 text-white"
                      : index + 1 === currentStep
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {index + 1 < currentStep ? <CheckCircle className="h-4 w-4" /> : <step.icon className="h-4 w-4" />}
                </div>
                <span className="text-xs text-muted-foreground mt-1 text-center max-w-20">{step.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="mb-6">{renderStepContent()}</div>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button onClick={handleNext} disabled={currentStep === steps.length}>
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
