"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, Globe } from "lucide-react"
import { useLanguage } from "@/lib/contexts/language-context"

export default function ContactUsPage() {
  const { t } = useLanguage()

  const handleViewOnMap = () => {
    // Cable & Wireless Seychelles location coordinates
    const location = "Cable+&+Wireless+Seychelles,+Victoria,+Mahé,+Seychelles"
    window.open(`https://www.google.com/maps/search/?api=1&query=${location}`, "_blank")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("nav.contact")}</h1>
          <p className="text-muted-foreground">{t("contact.description")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-600" />
                {t("contact.phoneSupport")}
              </CardTitle>
              <CardDescription>{t("contact.phoneSupportDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 p-4 rounded-lg border bg-card">
                  <div className="text-sm font-medium text-muted-foreground">
                    {t("contact.supportLineNorthCentral")}
                  </div>
                  <div className="text-2xl font-bold text-blue-600">2598080</div>
                  <Button className="w-full" onClick={() => window.open("tel:2598080")}>
                    <Phone className="h-4 w-4 mr-2" />
                    {t("contact.callNow")}
                  </Button>
                </div>

                <div className="space-y-2 p-4 rounded-lg border bg-card">
                  <div className="text-sm font-medium text-muted-foreground">
                    {t("contact.supportLineSouthCentral")}
                  </div>
                  <div className="text-2xl font-bold text-blue-600">2596969</div>
                  <Button className="w-full" onClick={() => window.open("tel:2596969")}>
                    <Phone className="h-4 w-4 mr-2" />
                    {t("contact.callNow")}
                  </Button>
                </div>

                <div className="space-y-2 p-4 rounded-lg border bg-card">
                  <div className="text-sm font-medium text-muted-foreground">
                    {t("contact.supportLinePraslinLaDigue")}
                  </div>
                  <div className="text-2xl font-bold text-blue-600">2529993</div>
                  <Button className="w-full" onClick={() => window.open("tel:2529993")}>
                    <Phone className="h-4 w-4 mr-2" />
                    {t("contact.callNow")}
                  </Button>
                </div>

                <div className="space-y-2 p-4 rounded-lg border bg-card">
                  <div className="text-sm font-medium text-muted-foreground">
                    {t("contact.supportLineSingleDealers")}
                  </div>
                  <div className="text-2xl font-bold text-blue-600">2595553</div>
                  <Button className="w-full" onClick={() => window.open("tel:2595553")}>
                    <Phone className="h-4 w-4 mr-2" />
                    {t("contact.callNow")}
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">{t("contact.available247")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-green-600" />
                {t("contact.emailSupport")}
              </CardTitle>
              <CardDescription>{t("contact.emailSupportDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-lg font-medium">commercialteam@cwseychelles.com</div>
              <p className="text-sm text-muted-foreground">{t("contact.responseTime")}</p>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => window.open("mailto:commercialteam@cwseychelles.com")}
              >
                <Mail className="h-4 w-4 mr-2" />
                {t("contact.sendEmail")}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-red-600" />
                {t("contact.officeLocation")}
              </CardTitle>
              <CardDescription>{t("contact.officeLocationDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">Cable & Wireless Seychelles</p>
                <p className="text-sm text-muted-foreground">Victoria, Mahé, Seychelles</p>
              </div>
              <Button variant="outline" className="w-full bg-transparent" onClick={handleViewOnMap}>
                <MapPin className="h-4 w-4 mr-2" />
                {t("contact.viewOnMap")}
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {t("contact.businessHours")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">{t("contact.customerService")}</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>{t("contact.mondayFriday")}</p>
                  <p>{t("contact.saturday")}</p>
                  <p>{t("contact.sunday")}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">{t("contact.emergencySupport")}</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>{t("contact.available247")}</p>
                  <p>{t("contact.urgentIssues")}</p>
                  <p>{t("contact.networkOutages")}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              {t("contact.additionalResources")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Button
                variant="outline"
                className="h-16 flex-col bg-transparent"
                onClick={() => window.open("https://www.cwseychelles.com/", "_blank")}
              >
                <Globe className="h-5 w-5 mb-1" />
                {t("contact.website")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
