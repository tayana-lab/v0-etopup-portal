"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircle, FileText, Search, Clock, CheckCircle, AlertCircle, Book, Video, Download } from "lucide-react"

const supportTickets = [
  {
    id: "TICK001",
    subject: "SIM activation issue",
    category: "Technical",
    priority: "high",
    status: "open",
    created: "2024-01-15",
    lastUpdate: "2 hours ago",
    description: "Customer unable to activate new SIM card",
  },
  {
    id: "TICK002",
    subject: "Payment processing error",
    category: "Billing",
    priority: "medium",
    status: "in-progress",
    created: "2024-01-14",
    lastUpdate: "1 day ago",
    description: "Top-up payment failed but amount was deducted",
  },
  {
    id: "TICK003",
    subject: "Package not activated",
    category: "Service",
    priority: "low",
    status: "resolved",
    created: "2024-01-13",
    lastUpdate: "2 days ago",
    description: "Data package purchased but not reflecting in account",
  },
]

const faqItems = [
  {
    question: "How do I activate a new SIM card?",
    answer:
      "To activate a new SIM card, insert it into the customer's device and dial *100# to follow the activation process.",
    category: "SIM Management",
  },
  {
    question: "What should I do if a top-up fails?",
    answer:
      "Check the customer's phone number, verify payment method, and retry. If it still fails, create a support ticket.",
    category: "Payments",
  },
  {
    question: "How can I check my commission balance?",
    answer:
      "Your commission balance is displayed on the dashboard. You can also view detailed commission reports in the Reports section.",
    category: "Agent Account",
  },
  {
    question: "What documents are required for customer onboarding?",
    answer:
      "Valid ID card (front and back), proof of address, and completed registration form are required for new customer registration.",
    category: "Customer Management",
  },
]

const resources = [
  {
    title: "Agent Training Manual",
    description: "Complete guide for telecom agents",
    type: "PDF",
    icon: FileText,
  },
  {
    title: "Product Catalog",
    description: "Latest packages and pricing",
    type: "PDF",
    icon: Book,
  },
  {
    title: "System Tutorial Videos",
    description: "Step-by-step video guides",
    type: "Video",
    icon: Video,
  },
]

export function SupportCenter() {
  const [searchTerm, setSearchTerm] = useState("")
  const [newTicket, setNewTicket] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
  })

  const filteredFAQ = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmitTicket = () => {
    console.log("Submitting support ticket:", newTicket)
    setNewTicket({ subject: "", category: "", priority: "", description: "" })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-chart-3" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-chart-2" />
      case "open":
        return <AlertCircle className="h-4 w-4 text-chart-1" />
      default:
        return <HelpCircle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground"
      case "medium":
        return "bg-chart-2 text-white"
      case "low":
        return "bg-chart-3 text-white"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground text-balance">Support Center</h1>
        <p className="text-muted-foreground mt-2">Get help, access resources, and manage support tickets.</p>
      </div>

      {/* Support Tabs */}
      <Tabs defaultValue="tickets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Create New Ticket */}
            <div className="lg:col-span-2">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Create Support Ticket</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Brief description of the issue"
                        value={newTicket.subject}
                        onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select
                        value={newTicket.category}
                        onValueChange={(value) => setNewTicket({ ...newTicket, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="billing">Billing</SelectItem>
                          <SelectItem value="service">Service</SelectItem>
                          <SelectItem value="account">Account</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select
                      value={newTicket.priority}
                      onValueChange={(value) => setNewTicket({ ...newTicket, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide detailed information about the issue..."
                      value={newTicket.description}
                      onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <Button
                    onClick={handleSubmitTicket}
                    disabled={!newTicket.subject || !newTicket.category || !newTicket.description}
                  >
                    Submit Ticket
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Ticket Stats */}
            <div>
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Ticket Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Open Tickets</span>
                      <span className="font-medium text-card-foreground">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">In Progress</span>
                      <span className="font-medium text-card-foreground">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Resolved</span>
                      <span className="font-medium text-card-foreground">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg Response</span>
                      <span className="font-medium text-card-foreground">2.5 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Existing Tickets */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Your Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportTickets.map((ticket) => (
                  <div key={ticket.id} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(ticket.status)}
                        <div>
                          <h3 className="font-medium text-card-foreground">{ticket.subject}</h3>
                          <p className="text-sm text-muted-foreground">Ticket #{ticket.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                        <Badge variant="outline">{ticket.category}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{ticket.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Created: {ticket.created}</span>
                      <span>Last update: {ticket.lastUpdate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          {/* FAQ Search */}
          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search frequently asked questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQ.map((faq, index) => (
              <Card key={index} className="bg-card">
                <CardHeader>
                  <CardTitle className="text-lg text-card-foreground">{faq.question}</CardTitle>
                  <Badge variant="outline" className="w-fit">
                    {faq.category}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <Card key={resource.title} className="bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-secondary/10">
                      <resource.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{resource.type}</Badge>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
