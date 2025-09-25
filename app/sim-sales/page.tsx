"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, MapPin, Plane, Heart, ArrowRight } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import Link from "next/link"

const customerTypes = [
  {
    id: "local",
    name: "Local",
    description: "Seychelles citizens with full service access",
    icon: Users,
    color: "bg-blue-500",
    features: ["Full service access", "District/sub-district required", "Local ID verification"],
    route: "/digital-onboard?type=local",
  },
  {
    id: "gop",
    name: "GOP Holder",
    description: "Work permit holders with valid employment",
    icon: MapPin,
    color: "bg-green-500",
    features: ["Work permit verification", "District/sub-district required", "Employment authorization"],
    route: "/digital-onboard?type=gop",
  },
  {
    id: "tourist",
    name: "Tourist",
    description: "Visitors with temporary connectivity needs",
    icon: Plane,
    color: "bg-purple-500",
    features: ["Nationality selection", "Temporary service", "Tourist packages available"],
    route: "/digital-onboard?type=tourist",
  },
]

export default function SimSalePage() {
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (typeId: string) => {
    setFavorites((prev) =>
      prev.includes(typeId) ? prev.filter((id) => id !== typeId) : [...prev, typeId]
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SIM Sale</h1>
          <p className="text-gray-600">Select customer type to begin SIM onboarding process</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {customerTypes.map((type) => (
            <Card
              key={type.id}
              className="relative flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center`}
                  >
                    <type.icon className="h-6 w-6 text-white" />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(type.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.includes(type.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </Button>
                </div>
                <CardTitle className="text-xl">{type.name}</CardTitle>
                <p className="text-gray-600 text-sm">{type.description}</p>
              </CardHeader>

            <CardContent className="flex flex-col flex-grow space-y-4">
  {/* Features area with fixed height */}
  <div className="space-y-2 min-h-[96px]">
    {type.features.map((feature, index) => (
      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
        {feature}
      </div>
    ))}
  </div>

  {/* Button */}
  <div className="pt-2 mt-auto">
    <Link href={type.route}>
      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors">
        Start Onboarding
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </Link>
  </div>
</CardContent>


              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full"></div>
            </Card>
          ))}
        </div>

        {favorites.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Favorites</h2>
            <div className="flex gap-2 flex-wrap">
              {favorites.map((fav) => {
                const type = customerTypes.find((t) => t.id === fav)
                return type ? (
                  <Badge key={fav} variant="secondary" className="flex items-center gap-1">
                    <type.icon className="h-3 w-3" />
                    {type.name}
                  </Badge>
                ) : null
              })}
            </div>
          </div>
        )}

        <div className="mt-12 bg-primary/5 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">Quick Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium mb-1">Local Customers:</p>
              <p>Require valid Seychelles ID and district information</p>
            </div>
            <div>
              <p className="font-medium mb-1">GOP Holders:</p>
              <p>Need work permit verification and employment details</p>
            </div>
            <div>
              <p className="font-medium mb-1">Tourists:</p>
              <p>Passport required with nationality selection</p>
            </div>
            <div>
              <p className="font-medium mb-1">Documentation:</p>
              <p>All customers need photo capture and ID scanning</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
