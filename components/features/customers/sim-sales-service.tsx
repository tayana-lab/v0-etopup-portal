"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Smartphone, CheckCircle, Clock, AlertCircle, MapPin, Globe, Plane } from "lucide-react"
import { useRouter } from "next/navigation"

const simTypes = [
  {
    value: "local",
    label: "Local SIM",
    price: "SCR 25",
    description: "For Seychelles residents",
    icon: MapPin,
    iconBg: "bg-[#006bb6]",
  },
  {
    value: "gop",
    label: "GOP SIM",
    price: "SCR 50",
    description: "Government official plan",
    icon: Globe,
    iconBg: "bg-[#006bb6]",
  },
  {
    value: "tourist",
    label: "Tourist SIM",
    price: "SCR 30",
    description: "For visitors to Seychelles",
    icon: Plane,
    iconBg: "bg-[#006bb6]",
  },
]

const recentSales = [
  {
    id: "SIM001",
    customer: "John Doe",
    simNumber: "+248 123 4567",
    type: "Local SIM",
    amount: "SCR 25",
    status: "activated",
    time: "10 min ago",
  },
  {
    id: "SIM002",
    customer: "Jane Smith",
    simNumber: "+248 987 6543",
    type: "GOP SIM",
    amount: "SCR 50",
    status: "pending",
    time: "25 min ago",
  },
  {
    id: "SIM003",
    customer: "Mike Johnson",
    simNumber: "+248 555 0123",
    type: "Tourist SIM",
    amount: "SCR 30",
    status: "activated",
    time: "1 hour ago",
  },
]

export function SimSalesService() {
  const [selectedSimType, setSelectedSimType] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [idNumber, setIdNumber] = useState("")
  const router = useRouter()

  const handleSimSale = () => {
    console.log("Processing SIM sale:", {
      selectedSimType,
      customerName,
      customerPhone,
      customerEmail,
      idNumber,
    })
  }

  const handleStartOnboarding = () => {
    router.push("/onboarding")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "activated":
        return <CheckCircle className="h-4 w-4 text-chart-3" />
      case "pending":
        return <Clock className="h-4 w-4 text-chart-2" />
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const selectedSim = simTypes.find((sim) => sim.value === selectedSimType)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground text-balance">SIM Sales Service</h1>
          <p className="text-muted-foreground mt-2">Sell and activate new SIM cards for customers.</p>
        </div>
        {/* Start Onboarding button */}
        <Button onClick={handleStartOnboarding} size="lg">
          Start Onboarding
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* SIM Sale Form */}
        <div className="lg:col-span-2">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Smartphone className="h-5 w-5 text-secondary" />
                New SIM Sale
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* SIM Type Selection */}
              <div className="space-y-3">
                <Label>SIM Type</Label>
                <div className="grid gap-3 md:grid-cols-3">
                  {simTypes.map((sim) => (
                    <div
                      key={sim.value}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedSimType === sim.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedSimType(sim.value)}
                    >
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className={`p-3 rounded-full ${sim.iconBg}`}>
                          <sim.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-card-foreground">{sim.label}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{sim.description}</p>
                          <span className="font-bold text-primary mt-2 block">{sim.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Information */}
              {selectedSimType && (
                <div className="space-y-4 p-4 rounded-lg bg-muted">
                  <h3 className="font-medium text-card-foreground">Customer Information</h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="customer-name">Full Name</Label>
                      <Input
                        id="customer-name"
                        placeholder="Enter customer name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customer-phone">Mobile Number</Label>
                      <Input
                        id="customer-phone"
                        placeholder="Enter Mobile Number"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customer-email">Email Address</Label>
                      <Input
                        id="customer-email"
                        type="email"
                        placeholder="customer@email.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="id-number">ID Number</Label>
                      <Input
                        id="id-number"
                        placeholder="Enter ID number"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <Select defaultValue="cash">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash Payment</SelectItem>
                        <SelectItem value="card">Card Payment</SelectItem>
                        <SelectItem value="agent-balance">Agent Balance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Summary */}
                  {selectedSim && (
                    <div className="p-3 rounded-lg bg-background border border-border">
                      <div className="flex justify-between items-center">
                        <span className="text-card-foreground">Total Amount:</span>
                        <span className="text-xl font-bold text-secondary">{selectedSim.price}</span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleSimSale}
                      className="flex-1"
                      disabled={!customerName || !customerPhone || !idNumber}
                    >
                      Process SIM Sale
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedSimType("")
                        setCustomerName("")
                        setCustomerPhone("")
                        setCustomerEmail("")
                        setIdNumber("")
                      }}
                    >
                      Clear
                    </Button>
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
              <CardTitle className="text-card-foreground">Recent SIM Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentSales.map((sale) => (
                  <div key={sale.id} className="p-3 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-card-foreground text-sm">{sale.customer}</p>
                      <Badge variant={sale.status === "activated" ? "default" : "secondary"} className="text-xs">
                        {getStatusIcon(sale.status)}
                        {sale.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{sale.simNumber}</p>
                    <p className="text-xs text-muted-foreground mb-2">{sale.type}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-card-foreground">{sale.amount}</span>
                      <span className="text-xs text-muted-foreground">{sale.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Inventory Status */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">SIM Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Local SIMs</span>
                  <span className="font-medium text-card-foreground">45</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GOP SIMs</span>
                  <span className="font-medium text-card-foreground">32</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tourist SIMs</span>
                  <span className="font-medium text-card-foreground">28</span>
                </div>
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
                  <span className="text-muted-foreground">SIMs Sold</span>
                  <span className="font-medium text-card-foreground">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Revenue</span>
                  <span className="font-medium text-card-foreground">SCR 450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Commission</span>
                  <span className="font-medium text-chart-3">SCR 45</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
