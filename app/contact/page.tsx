import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MessageCircle, MapPin, Clock, Globe } from "lucide-react"

export default function ContactUsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Contact Us</h1>
          <p className="text-muted-foreground">Get in touch with our support team</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-600" />
                Phone Support
              </CardTitle>
              <CardDescription>Call us for immediate assistance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-2xl font-bold text-blue-600">+248 428 4000</div>
              <p className="text-sm text-muted-foreground">Available 24/7 for urgent support</p>
              <Button className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-green-600" />
                Email Support
              </CardTitle>
              <CardDescription>Send us your questions via email</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-lg font-medium">info@cwseychelles.com</div>
              <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
              <Button variant="outline" className="w-full bg-transparent">
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-green-500" />
                WhatsApp
              </CardTitle>
              <CardDescription>Chat with us on WhatsApp</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-lg font-medium">+248 428 4000</div>
              <p className="text-sm text-muted-foreground">Quick responses during business hours</p>
              <Button
                variant="outline"
                className="w-full bg-green-50 hover:bg-green-100 dark:bg-green-950/20 dark:hover:bg-green-950/30"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Open WhatsApp
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-red-600" />
                Office Location
              </CardTitle>
              <CardDescription>Visit our main office</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">Cable & Wireless Seychelles</p>
                <p className="text-sm text-muted-foreground">Victoria, Mahé, Seychelles</p>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                <MapPin className="h-4 w-4 mr-2" />
                View on Map
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Business Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">Customer Service</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                  <p>Saturday: 8:00 AM - 1:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Emergency Support</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Available 24/7</p>
                  <p>For urgent technical issues</p>
                  <p>Network outages and emergencies</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Additional Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Button variant="outline" className="h-16 flex-col bg-transparent">
                <Globe className="h-5 w-5 mb-1" />
                Website
              </Button>
              <Button variant="outline" className="h-16 flex-col bg-transparent">
                <MessageCircle className="h-5 w-5 mb-1" />
                Live Chat
              </Button>
              <Button variant="outline" className="h-16 flex-col bg-transparent">
                <Phone className="h-5 w-5 mb-1" />
                Callback Request
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
