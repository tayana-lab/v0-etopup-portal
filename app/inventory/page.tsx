"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Search, Plus, QrCode, Download, Upload, AlertTriangle, CheckCircle, Package } from "lucide-react"

const simInventory = [
  {
    id: "SIM001",
    iccid: "8923450000000000001",
    msisdn: "+1234567890",
    type: "Prepaid",
    status: "Active",
    plan: "Basic Plan",
    activationDate: "2025-01-10",
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
    activationDate: "2025-01-05",
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
            <h1 className="text-2xl font-bold text-gray-900">SIM Inventory Management</h1>
            <p className="text-gray-600">Track and manage SIM card inventory across all locations</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add SIM Cards
            </Button>
          </div>
        </div>

        {/* Inventory Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {inventoryStats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
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
            <div className="grid gap-4 md:grid-cols-5">
              <div>
                <Label htmlFor="search">Search SIM Cards</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by ID, ICCID, or MSISDN..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="deactivated">Deactivated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="prepaid">Prepaid</SelectItem>
                    <SelectItem value="postpaid">Postpaid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="store a">Store A</SelectItem>
                    <SelectItem value="store b">Store B</SelectItem>
                    <SelectItem value="warehouse">Warehouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button variant="outline" className="w-full bg-transparent">
                  <QrCode className="h-4 w-4 mr-2" />
                  Scan QR
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SIM Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>SIM Card Inventory ({filteredInventory.length} items)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">SIM ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">ICCID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">MSISDN</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Plan</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Location</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Activation Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
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
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                            View
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700">
                            Edit
                          </Button>
                        </div>
                      </td>
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">No SIM cards found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or add new SIM cards to inventory.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
