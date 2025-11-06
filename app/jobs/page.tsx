"use client"

import { useLanguage } from "@/lib/contexts/language-context"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StyledInput } from "@/components/ui/styled-input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Search, Eye, Edit, Trash2, Clock, CheckCircle, AlertCircle } from "lucide-react"

const jobCards = [
  {
    id: "JC001",
    title: "SIM Card Replacement",
    customer: "John Smith",
    phone: "+1234567890",
    priority: "High",
    status: "In Progress",
    assignedTo: "Agent 1",
    createdDate: "2025-01-18",
    dueDate: "2025-01-20",
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
    createdDate: "2025-01-17",
    dueDate: "2025-01-18",
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
    createdDate: "2025-01-18",
    dueDate: "2025-01-22",
    description: "Customer unable to process monthly bill payment through app",
    statusColor: "bg-gray-100 text-gray-800",
    priorityColor: "bg-blue-100 text-blue-800",
  },
]

export default function JobCardPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t("jobs.title")}</h1>
          <p className="text-gray-600">{t("jobs.subtitle")}</p>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <Label htmlFor="search">{t("common.search")}</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <StyledInput
                    id="search"
                    placeholder={t("jobs.search-placeholder")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="status">{t("jobs.filter-status")}</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("jobs.all-statuses")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("jobs.all-statuses")}</SelectItem>
                    <SelectItem value="pending">{t("jobs.pending")}</SelectItem>
                    <SelectItem value="in progress">{t("jobs.in-progress")}</SelectItem>
                    <SelectItem value="completed">{t("jobs.completed")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">{t("jobs.filter-priority")}</Label>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("jobs.all-priorities")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("jobs.all-priorities")}</SelectItem>
                    <SelectItem value="high">{t("jobs.high")}</SelectItem>
                    <SelectItem value="medium">{t("jobs.medium")}</SelectItem>
                    <SelectItem value="low">{t("jobs.low")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button variant="outline" className="w-full bg-transparent">
                  {t("jobs.export-report")}
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
                        <span className="font-medium">{t("jobs.job-id")}:</span> {job.id}
                      </div>
                      <div>
                        <span className="font-medium">{t("jobs.customer")}:</span> {job.customer}
                      </div>
                      <div>
                        <span className="font-medium">{t("jobs.phone")}:</span> {job.phone}
                      </div>
                      <div>
                        <span className="font-medium">{t("jobs.assigned-to")}:</span> {job.assignedTo}
                      </div>
                      <div>
                        <span className="font-medium">{t("jobs.created")}:</span> {job.createdDate}
                      </div>
                      <div>
                        <span className="font-medium">{t("jobs.due-date")}:</span> {job.dueDate}
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t("jobs.no-jobs")}</h3>
              <p className="text-gray-600">{t("jobs.adjust-search")}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
