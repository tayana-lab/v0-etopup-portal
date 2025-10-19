"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Search, Plus, Phone, Mail, MapPin, Smartphone, UserPlus, ArrowRight, Star, Clock } from "lucide-react"
import Link from "next/link"

const customers = [
  {
    id: "CUST001",
    name: "John Doe",
    phone: "+248 123 4567",
    email: "john.doe@email.com",
    address: "Victoria, Mahé",
    joinDate: "2024-01-15",
    status: "active",
    type: "premium",
    totalSpent: "SCR 2,450",
    lastTransaction: "2 hours ago",
    simNumbers: ["+248 123 4567"],
  },
  {
    id: "CUST002",
    name: "Jane Smith",
    phone: "+248 987 6543",
    email: "jane.smith@email.com",
    address: "Anse Royale, Mahé",
    joinDate: "2024-02-20",
    status: "active",
    type: "regular",
    totalSpent: "SCR 1,890",
    lastTransaction: "1 day ago",
    simNumbers: ["+248 987 6543", "+248 987 6544"],
  },
  {
    id: "CUST003",
    name: "Mike Johnson",
    phone: "+248 555 0123",
    email: "mike.johnson@email.com",
    address: "Beau Vallon, Mahé",
    joinDate: "2024-03-10",
    status: "inactive",
    type: "business",
    totalSpent: "SCR 3,200",
    lastTransaction: "1 week ago",
    simNumbers: ["+248 555 0123"],
  },
  {
    id: "CUST004",
    name: "Sarah Wilson",
    phone: "+248 777 8899",
    email: "sarah.wilson@email.com",
    address: "Praslin",
    joinDate: "2024-01-05",
    status: "active",
    type: "premium",
    totalSpent: "SCR 4,100",
    lastTransaction: "3 hours ago",
    simNumbers: ["+248 777 8899"],
  },
]

const quickActions = [
  {
    name: "SIM Sales",
    description: "Sell new SIM cards to customers",
    icon: Smartphone,
    href: "/customers/sim-sales",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    name: "Digital Onboarding",
    description: "Register new customers digitally",
    icon: UserPlus,
    href: "/customers/onboarding",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
]

const recentActivity = [
  {
    id: "ACT001",
    customer: "John Doe",
    action: "SIM Purchase",
    details: "New SIM card activated",
    time: "2 hours ago",
    status: "completed",
  },
  {
    id: "ACT002",
    customer: "Jane Smith",
    action: "Profile Update",
    details: "Address information updated",
    time: "5 hours ago",
    status: "completed",
  },
  {
    id: "ACT003",
    customer: "Mike Johnson",
    action: "Account Suspended",
    details: "Payment overdue",
    time: "1 day ago",
    status: "pending",
  },
]

export function CustomerManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-chart-3 text-white"
      case "inactive":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "premium":
        return <Star className="h-3 w-3" />
      case "business":
        return <Users className="h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground text-balance">Customer Management</h1>
          <p className="text-muted-foreground mt-2">Manage customer profiles, SIM sales, and digital onboarding.</p>
        </div>
        <Button asChild>
          <Link href="/customers/onboarding">
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Link>
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        {quickActions.map((action) => (
          <Card key={action.name} className="bg-card hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${action.bgColor}`}>
                    <action.icon className={`h-6 w-6 ${action.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">{action.name}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={action.href}>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Customer Management Tabs */}
      <Tabs defaultValue="customers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="customers">All Customers</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-6">
          {/* Search and Filters */}
          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search customers by name, phone, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">Filter</Button>
              </div>
            </CardContent>
          </Card>

          {/* Customer List */}
          <div className="grid gap-4">
            {filteredCustomers.map((customer) => (
              <Card key={customer.id} className="bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-secondary" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-card-foreground">{customer.name}</h3>
                          <Badge className={getStatusColor(customer.status)} variant="secondary">
                            {customer.status}
                          </Badge>
                          {getTypeIcon(customer.type) && (
                            <Badge variant="outline" className="text-xs">
                              {getTypeIcon(customer.type)}
                              {customer.type}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {customer.phone}
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {customer.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {customer.address}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-semibold text-card-foreground">{customer.totalSpent}</p>
                      <p className="text-sm text-muted-foreground">Total spent</p>
                      <p className="text-xs text-muted-foreground">Last: {customer.lastTransaction}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Recent Customer Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">{activity.customer}</p>
                        <p className="text-sm text-muted-foreground">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.details}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={activity.status === "completed" ? "default" : "secondary"} className="text-xs">
                        {activity.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-chart-1/10">
                    <Users className="h-4 w-4 text-chart-1" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Customers</p>
                    <p className="text-xl font-bold text-card-foreground">456</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-chart-2/10">
                    <UserPlus className="h-4 w-4 text-chart-2" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">New This Month</p>
                    <p className="text-xl font-bold text-card-foreground">28</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-chart-3/10">
                    <Star className="h-4 w-4 text-chart-3" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Premium Customers</p>
                    <p className="text-xl font-bold text-card-foreground">89</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-chart-4/10">
                    <Smartphone className="h-4 w-4 text-chart-4" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active SIMs</p>
                    <p className="text-xl font-bold text-card-foreground">523</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
