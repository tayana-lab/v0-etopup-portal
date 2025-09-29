"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { UserPlus, Upload, CheckCircle, User, Phone, MapPin, FileText } from "lucide-react"

const onboardingSteps = [
  { id: 1, title: "Personal Information", icon: User },
  { id: 2, title: "Contact Details", icon: Phone },
  { id: 3, title: "Address Information", icon: MapPin },
  { id: 4, title: "Document Upload", icon: FileText },
  { id: 5, title: "Service Selection", icon: CheckCircle },
]

export function DigitalOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    idNumber: "",
    nationality: "",

    // Contact Details
    phone: "",
    email: "",
    alternatePhone: "",

    // Address Information
    address: "",
    district: "",
    country: "Seychelles",
    postalCode: "",

    // Service Selection
    serviceType: "",
    simType: "",
    initialPackage: "",

    // Terms
    termsAccepted: false,
    marketingConsent: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < onboardingSteps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Submitting onboarding data:", formData)
  }

  const isStepComplete = (stepId: number) => {
    switch (stepId) {
      case 1:
        return formData.firstName && formData.lastName && formData.dateOfBirth && formData.idNumber
      case 2:
        return formData.phone && formData.email
      case 3:
        return formData.address && formData.district
      case 4:
        return true // Document upload step
      case 5:
        return formData.serviceType && formData.simType && formData.termsAccepted
      default:
        return false
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground text-balance">Digital Customer Onboarding</h1>
        <p className="text-muted-foreground mt-2">Register new customers with our streamlined digital process.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Progress Sidebar */}
        <div>
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Onboarding Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {onboardingSteps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      currentStep === step.id
                        ? "bg-secondary text-secondary-foreground"
                        : isStepComplete(step.id)
                          ? "bg-chart-3/10 text-chart-3"
                          : "text-muted-foreground hover:bg-muted"
                    }`}
                    onClick={() => setCurrentStep(step.id)}
                  >
                    <div className="flex-shrink-0">
                      {isStepComplete(step.id) ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <step.icon className="h-5 w-5" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{step.title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Form */}
        <div className="lg:col-span-3">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <UserPlus className="h-5 w-5 text-secondary" />
                Step {currentStep}: {onboardingSteps[currentStep - 1].title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="Enter first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="idNumber">ID Number *</Label>
                      <Input
                        id="idNumber"
                        value={formData.idNumber}
                        onChange={(e) => handleInputChange("idNumber", e.target.value)}
                        placeholder="Enter ID number"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Nationality</Label>
                    <Select
                      value={formData.nationality}
                      onValueChange={(value) => handleInputChange("nationality", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="seychellois">Seychellois</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Details */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Mobile Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter Mobile Number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alternatePhone">Alternate Phone</Label>
                      <Input
                        id="alternatePhone"
                        value={formData.alternatePhone}
                        onChange={(e) => handleInputChange("alternatePhone", e.target.value)}
                        placeholder="+248 987 6543"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="customer@email.com"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Address Information */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Enter full address"
                      rows={3}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>District *</Label>
                      <Select value={formData.district} onValueChange={(value) => handleInputChange("district", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="victoria">Victoria</SelectItem>
                          <SelectItem value="anse-royale">Anse Royale</SelectItem>
                          <SelectItem value="beau-vallon">Beau Vallon</SelectItem>
                          <SelectItem value="praslin">Praslin</SelectItem>
                          <SelectItem value="la-digue">La Digue</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange("postalCode", e.target.value)}
                        placeholder="Enter postal code"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Document Upload */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="text-center p-8 border-2 border-dashed border-border rounded-lg">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-card-foreground mb-2">Upload Identity Documents</h3>
                    <p className="text-muted-foreground mb-4">Upload clear photos of ID card (front and back)</p>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 5: Service Selection */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Service Type *</Label>
                    <Select
                      value={formData.serviceType}
                      onValueChange={(value) => handleInputChange("serviceType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="prepaid">Prepaid</SelectItem>
                        <SelectItem value="postpaid">Postpaid</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>SIM Type *</Label>
                    <Select value={formData.simType} onValueChange={(value) => handleInputChange("simType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select SIM type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard SIM</SelectItem>
                        <SelectItem value="micro">Micro SIM</SelectItem>
                        <SelectItem value="nano">Nano SIM</SelectItem>
                        <SelectItem value="esim">eSIM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Initial Package</Label>
                    <Select
                      value={formData.initialPackage}
                      onValueChange={(value) => handleInputChange("initialPackage", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select initial package (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="starter">Starter Pack - SCR 25</SelectItem>
                        <SelectItem value="standard">Standard Pack - SCR 50</SelectItem>
                        <SelectItem value="premium">Premium Pack - SCR 100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) => handleInputChange("termsAccepted", checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I accept the terms and conditions *
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="marketing"
                        checked={formData.marketingConsent}
                        onCheckedChange={(checked) => handleInputChange("marketingConsent", checked as boolean)}
                      />
                      <Label htmlFor="marketing" className="text-sm">
                        I consent to receive marketing communications
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                  Previous
                </Button>

                {currentStep === onboardingSteps.length ? (
                  <Button onClick={handleSubmit} disabled={!isStepComplete(currentStep)}>
                    Complete Onboarding
                  </Button>
                ) : (
                  <Button onClick={handleNext} disabled={!isStepComplete(currentStep)}>
                    Next
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
