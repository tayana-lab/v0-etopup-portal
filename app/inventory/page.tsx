"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Search, AlertTriangle, CheckCircle, Package } from "lucide-react"
import { useLanguage } from "@/lib/contexts/language-context"

const simInventory = [
  {
    id: "SIM001",
    iccid: "8923450000000000001",
    msisdn: "+1234567890",
    type: "Prepaid",
    status: "Active",
    plan: "Basic Plan",
    activationDate: "2025-01-15",
    expiryDate: "2025-12-31",
    location: "Store A",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: "SIM002",
    iccid: "8923450000000000002",
    msisdn: "+1234567891",
    type: "Postpaid",
    status: "Available",
    plan: "Premium Plan",
    activationDate: "-",
    expiryDate: "-",
    location: "Store A",
    statusColor: "bg-blue-100 text-blue-800",
  },
  {
    id: "SIM003",
    iccid: "8923450000000000003",
    msisdn: "+1234567892",
    type: "Prepaid",
    status: "Suspended",
    plan: "Standard Plan",
    activationDate: "2025-01-10",
    expiryDate: "2025-06-30",
    location: "Store B",
    statusColor: "bg-red-100 text-red-800",
  },
  {
    id: "SIM004",
    iccid: "8923450000000000004",
    msisdn: "+1234567893",
    type: "Prepaid",
    status: "Available",
    plan: "-",
    activationDate: "-",
    expiryDate: "-",
    location: "Store A",
    statusColor: "bg-blue-100 text-blue-800",
  },
]

const inventoryStats = [
  { title: "Total SIM Cards", value: "1,250", icon: Package, color: "text-blue-600", bgColor: "bg-blue-50" },
  { title: "Available", value: "850", icon: CheckCircle, color: "text-green-600", bgColor: "bg-green-50" },
  { title: "Active", value: "320", icon: CheckCircle, color: "text-blue-600", bgColor: "bg-blue-50" },
  { title: "Low Stock Alert", value: "15", icon: AlertTriangle, color: "text-red-600", bgColor: "bg-red-50" },
]

export default function SimInventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  const { t } = useLanguage()

  const filteredInventory = simInventory.filter((sim) => {
    const matchesSearch =
      sim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sim.iccid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sim.msisdn.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || sim.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesType = typeFilter === "all" || sim.type.toLowerCase() === typeFilter.toLowerCase()
    const matchesLocation = locationFilter === "all" || sim.location.toLowerCase() === locationFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesType && matchesLocation
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t("inventory.title")}</h1>
            <p className="text-gray-600">{t("inventory.subtitle")}</p>
          </div>
        </div>

        {/* Inventory Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {inventoryStats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-600">
                    {t(stat.title.toLowerCase().replace(/\s+/g, "-"))}
                  </p>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <Label htmlFor="search">{t("inventory.search")}</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder={t("inventory.search-placeholder")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="status">{t("inventory.filter-status")}</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("inventory.all-status")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("inventory.all-status")}</SelectItem>
                    <SelectItem value="available">{t("inventory.available")}</SelectItem>
                    <SelectItem value="active">{t("inventory.active")}</SelectItem>
                    <SelectItem value="suspended">{t("inventory.suspended")}</SelectItem>
                    <SelectItem value="deactivated">{t("inventory.deactivated")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="type">{t("inventory.filter-type")}</Label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("inventory.all-types")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("inventory.all-types")}</SelectItem>
                    <SelectItem value="prepaid">{t("inventory.prepaid")}</SelectItem>
                    <SelectItem value="postpaid">{t("inventory.postpaid")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location">{t("inventory.filter-location")}</Label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("inventory.all-locations")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("inventory.all-locations")}</SelectItem>
                    <SelectItem value="store a">Store A</SelectItem>
                    <SelectItem value="store b">Store B</SelectItem>
                    <SelectItem value="warehouse">Warehouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SIM Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              {t("inventory.title")} ({filteredInventory.length} {t("inventory.items")})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">{t("inventory.sim-id")}</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">{t("inventory.iccid")}</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">{t("inventory.msisdn")}</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">{t("inventory.type")}</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">{t("inventory.status")}</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">{t("inventory.plan")}</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">{t("inventory.location")}</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">{t("inventory.activation-date")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map((sim) => (
                    <tr key={sim.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{sim.id}</td>
                      <td className="py-3 px-4 text-gray-600 font-mono text-sm">{sim.iccid}</td>
                      <td className="py-3 px-4 text-gray-600">{sim.msisdn}</td>
                      <td className="py-3 px-4 text-gray-600">{sim.type}</td>
                      <td className="py-3 px-4">
                        <Badge className={`${sim.statusColor} border-0`}>{sim.status}</Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{sim.plan}</td>
                      <td className="py-3 px-4 text-gray-600">{sim.location}</td>
                      <td className="py-3 px-4 text-gray-600">{sim.activationDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {filteredInventory.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Package className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t("inventory.no-sims")}</h3>
              <p className="text-gray-600">{t("inventory.adjust-search")}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
