"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Package, Smartphone, Wifi } from "lucide-react"

const packages = [
  {
    id: "PKG001",
    name: "Daily Data",
    description: "1GB data valid for 24 hours",
    price: "SCR 15",
    validity: "1 Day",
    type: "data",
    popular: false,
  },
  {
    id: "PKG002",
    name: "Weekly Combo",
    description: "5GB data + 100 minutes",
    price: "SCR 45",
    validity: "7 Days",
    type: "combo",
    popular: true,
  },
  {
    id: "PKG003",
    name: "Monthly Unlimited",
    description: "Unlimited data + calls",
    price: "SCR 120",
    validity: "30 Days",
    type: "unlimited",
    popular: false,
  },
  {
    id: "PKG004",
    name: "Voice Pack",
    description: "500 minutes local calls",
    price: "SCR 25",
    validity: "7 Days",
    type: "voice",
    popular: false,
  },
  {
    id: "PKG005",
    name: "Social Media",
    description: "Unlimited social apps",
    price: "SCR 20",
    validity: "7 Days",
    type: "social",
    popular: false,
  },
  {
    id: "PKG006",
    name: "Business Plan",
    description: "10GB + unlimited calls",
    price: "SCR 85",
    validity: "30 Days",
    type: "business",
    popular: true,
  },
]

const recentSales = [
  { id: "SALE001", customer: "John Doe", package: "Weekly Combo", amount: "SCR 45", time: "3 min ago" },
  { id: "SALE002", customer: "Jane Smith", package: "Monthly Unlimited", amount: "SCR 120", time: "8 min ago" },
  { id: "SALE003", customer: "Mike Johnson", package: "Daily Data", amount: "SCR 15", time: "15 min ago" },
]

export function PackageService() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [customerPhone, setCustomerPhone] = useState("")

  const handlePurchase = () => {
    if (selectedPackage && customerPhone) {
      console.log("Processing package purchase:", { selectedPackage, customerPhone })
    }
  }

  const getPackageIcon = (type: string) => {
    switch (type) {
      case "data":
        return Wifi
      case "voice":
        return Smartphone
      default:
        return Package
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground text-balance">Package Services</h1>
        <p className="text-muted-foreground mt-2">Sell data, voice, and combo packages to customers.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Package Selection */}
        <div className="lg:col-span-3">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Available Packages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {packages.map((pkg) => {
                  const IconComponent = getPackageIcon(pkg.type)
                  return (
                    <div
                      key={pkg.id}
                      className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedPackage === pkg.id
                          ? "border-secondary bg-secondary/5"
                          : "border-border hover:border-secondary/50"
                      }`}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      {pkg.popular && (
                        <Badge className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground">
                          Popular
                        </Badge>
                      )}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-secondary/10">
                          <IconComponent className="h-4 w-4 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-card-foreground">{pkg.name}</h3>
                          <p className="text-sm text-muted-foreground">{pkg.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-card-foreground">{pkg.price}</span>
                        <span className="text-sm text-muted-foreground">{pkg.validity}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Customer Details */}
              {selectedPackage && (
                <div className="mt-6 p-4 rounded-lg bg-muted">
                  <h3 className="font-medium text-card-foreground mb-3">Customer Details</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="customer-phone">Customer Phone Number</Label>
                      <Input
                        id="customer-phone"
                        placeholder="+248 123 4567"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={handlePurchase} disabled={!customerPhone} className="flex-1">
                        Process Purchase
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedPackage(null)
                          setCustomerPhone("")
                        }}
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Recent Sales */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentSales.map((sale) => (
                  <div key={sale.id} className="p-3 rounded-lg border border-border">
                    <p className="font-medium text-card-foreground text-sm">{sale.customer}</p>
                    <p className="text-xs text-muted-foreground">{sale.package}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-medium text-card-foreground">{sale.amount}</span>
                      <span className="text-xs text-muted-foreground">{sale.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Stats */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Today's Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Packages Sold</span>
                  <span className="font-medium text-card-foreground">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Revenue</span>
                  <span className="font-medium text-card-foreground">SCR 2,760</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Commission</span>
                  <span className="font-medium text-chart-3">SCR 138</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
