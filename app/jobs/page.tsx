"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StyledInput } from "@/components/ui/styled-input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Search, Plus, Eye, Edit, Trash2, Clock, CheckCircle, AlertCircle } from "lucide-react"

const jobCards = [
  {
    id: "JC001",
    title: "SIM Card Replacement",
    customer: "John Smith",
    phone: "+1234567890",
    priority: "High",
    status: "In Progress",
    assignedTo: "Agent 1",
    createdDate: "2025-01-15",
    dueDate: "2025-01-16",
    description: "Customer reports SIM card not working after recent update",
    statusColor: "bg-yellow-100 text-yellow-800",
    priorityColor: "bg-red-100 text-red-800",
  },
  {
    id: "JC002",
    title: "Network Coverage Issue",
    customer: "Sarah Johnson",
    phone: "+1234567891",
    priority: "Medium",
    status: "Completed",
    assignedTo: "Agent 2",
    createdDate: "2025-01-14",
    dueDate: "2025-01-15",
    description: "Customer experiencing poor network coverage in residential area",
    statusColor: "bg-green-100 text-green-800",
    priorityColor: "bg-yellow-100 text-yellow-800",
  },
  {
    id: "JC003",
    title: "Bill Payment Issue",
    customer: "Mike Wilson",
    phone: "+1234567892",
    priority: "Low",
    status: "Pending",
    assignedTo: "Agent 1",
    createdDate: "2025-01-15",
    dueDate: "2025-01-17",
    description: "Customer unable to process monthly bill payment through app",
    statusColor: "bg-gray-100 text-gray-800",
    priorityColor: "bg-blue-100 text-blue-800",
  },
]

export default function JobCardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [showCreateForm, setShowCreateForm] = useState(false)

  const filteredJobCards = jobCards.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesPriority = priorityFilter === "all" || job.priority.toLowerCase() === priorityFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in progress":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-gray-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Job Card Management</h1>
            <p className="text-gray-600">Track and manage customer service requests and technical issues</p>
          </div>
          <Button
            onClick={() => setShowCreateForm(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Job Card
          </Button>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <Label htmlFor="search">Search Job Cards</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <StyledInput
                    id="search"
                    placeholder="Search by ID, title, or customer..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="status">Filter by Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Filter by Priority</Label>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Priorities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button variant="outline" className="w-full bg-transparent">
                  Export Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Cards List */}
        <div className="grid gap-4">
          {filteredJobCards.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <Badge className={`${job.statusColor} border-0`}>
                        {getStatusIcon(job.status)}
                        <span className="ml-1">{job.status}</span>
                      </Badge>
                      <Badge className={`${job.priorityColor} border-0`}>{job.priority}</Badge>
                    </div>
                    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Job ID:</span> {job.id}
                      </div>
                      <div>
                        <span className="font-medium">Customer:</span> {job.customer}
                      </div>
                      <div>
                        <span className="font-medium">Phone:</span> {job.phone}
                      </div>
                      <div>
                        <span className="font-medium">Assigned To:</span> {job.assignedTo}
                      </div>
                      <div>
                        <span className="font-medium">Created:</span> {job.createdDate}
                      </div>
                      <div>
                        <span className="font-medium">Due Date:</span> {job.dueDate}
                      </div>
                    </div>
                    <p className="text-gray-700 mt-3">{job.description}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobCards.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <AlertCircle className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No job cards found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or create a new job card.</p>
            </CardContent>
          </Card>
        )}

        {/* Create Job Card Form Modal would go here */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Create New Job Card</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <StyledInput id="jobTitle" placeholder="Enter job title" />
                  </div>
                  <div>
                    <Label htmlFor="customerName">Customer Name</Label>
                    <StyledInput id="customerName" placeholder="Enter customer name" />
                  </div>
                  <div>
                    <Label htmlFor="customerPhone">Customer Phone</Label>
                    <StyledInput id="customerPhone" placeholder="Enter phone number" />
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="assignedTo">Assign To</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select agent" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="agent1">Agent 1</SelectItem>
                        <SelectItem value="agent2">Agent 2</SelectItem>
                        <SelectItem value="agent3">Agent 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dueDate">Due Date</Label>
                    <StyledInput id="dueDate" type="date" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the issue or request in detail..." rows={4} />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => setShowCreateForm(false)}
                  >
                    Create Job Card
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
