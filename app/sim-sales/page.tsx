"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MapPin, Plane, ArrowRight } from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import Link from "next/link"
import { useLanguage } from "@/lib/contexts/language-context"

export default function SimSalePage() {
  const { t } = useLanguage()

  const customerTypes = [
    {
      id: "local",
      name: "Local",
      nameKey: "sim.local",
      description: "Seychelles citizens with full service access",
      descKey: "sim.local-desc",
      icon: Users,
      color: "bg-[#006bb6]",
      features: ["sim.full-service", "sim.district-required", "sim.local-id"],
      route: "/onboarding?type=local",
    },
    {
      id: "gop",
      name: "GOP Holder",
      nameKey: "sim.gop",
      description: "Work permit holders with valid employment",
      descKey: "sim.gop-desc",
      icon: MapPin,
      color: "bg-[#5BCDDB]",
      features: ["sim.work-permit", "sim.district-required", "sim.employment-auth"],
      route: "/onboarding?type=gop",
    },
    {
      id: "tourist",
      name: "Tourist",
      nameKey: "sim.tourist",
      description: "Visitors with temporary connectivity needs",
      descKey: "sim.tourist-desc",
      icon: Plane,
      color: "bg-[#F27D2F]",
      features: ["sim.nationality", "sim.temporary-service", "sim.tourist-packages"],
      route: "/onboarding?type=tourist",
    },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{t("sim.title")}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t("sim.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {customerTypes.map((type) => (
            <Card
              key={type.id}
              className="relative flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center`}>
                    <type.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <CardTitle className="text-xl">{t(type.nameKey)}</CardTitle>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{t(type.descKey)}</p>
              </CardHeader>

              <CardContent className="flex flex-col flex-grow space-y-4">
                <div className="space-y-2 min-h-[96px]">
                  {type.features.map((featureKey, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {t(featureKey)}
                    </div>
                  ))}
                </div>

                <div className="pt-2 mt-auto">
                  <Link href={type.route}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors">
                      {t("sim.start-onboarding")}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>

              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full"></div>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-primary/5 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">{t("sim.quick-tips")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium mb-1">{t("sim.local-tip")}</p>
              <p>{t("sim.local-tip-desc")}</p>
            </div>
            <div>
              <p className="font-medium mb-1">{t("sim.gop-tip")}</p>
              <p>{t("sim.gop-tip-desc")}</p>
            </div>
            <div>
              <p className="font-medium mb-1">{t("sim.tourist-tip")}</p>
              <p>{t("sim.tourist-tip-desc")}</p>
            </div>
            <div>
              <p className="font-medium mb-1">{t("sim.documentation-tip")}</p>
              <p>{t("sim.documentation-tip-desc")}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
