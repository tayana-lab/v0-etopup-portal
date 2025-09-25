import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StyledInput } from "@/components/ui/styled-input"
import { Label } from "@/components/ui/label"
import { QrCode, Phone } from "lucide-react"

export default function TopUpPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">TopUp</h1>
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
                  <StyledInput id="mobile" placeholder="2345678" className="rounded-l-none" maxLength={7} />
                </div>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                <QrCode className="h-4 w-4 mr-2" />
                Scan QR Code
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recharge Amount</CardTitle>
              <CardDescription>Select or enter amount in SCR</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {[50, 100, 200, 500, 1000, 2000].map((amount) => (
                  <Button key={amount} variant="outline" className="h-12 bg-transparent">
                    SCR {amount}
                  </Button>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom">Custom Amount</Label>
                <StyledInput id="custom" placeholder="Enter amount" />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Proceed to Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
