"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import {
  Bell,
  Settings,
  Trash2,
  Award as MarkAsRead,
  AlertTriangle,
  CheckCircle,
  Info,
  DollarSign,
  Users,
  Package,
} from "lucide-react"

const notifications = [
  {
    id: "1",
    type: "alert",
    title: "Low SIM Card Inventory",
    message: "SIM card stock is running low at Store A. Only 15 units remaining.",
    timestamp: "2 minutes ago",
    read: false,
    priority: "high",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    id: "2",
    type: "transaction",
    title: "Fund Request Approved",
    message: "Your fund request of SR 500 has been approved and credited to your account.",
    timestamp: "15 minutes ago",
    read: false,
    priority: "medium",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: "3",
    type: "customer",
    title: "New Customer Registration",
    message: "Customer John Smith has completed digital onboarding successfully.",
    timestamp: "1 hour ago",
    read: true,
    priority: "low",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: "4",
    type: "system",
    title: "System Maintenance Scheduled",
    message: "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM.",
    timestamp: "2 hours ago",
    read: true,
    priority: "medium",
    icon: Info,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: "5",
    type: "transaction",
    title: "Package Purchase Completed",
    message: "Customer purchased 5GB data package for +1234567890.",
    timestamp: "3 hours ago",
    read: true,
    priority: "low",
    icon: Package,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
]

const notificationSettings = [
  { id: "email", label: "Email Notifications", description: "Receive notifications via email", enabled: true },
  { id: "push", label: "Push Notifications", description: "Receive browser push notifications", enabled: true },
  { id: "sms", label: "SMS Notifications", description: "Receive critical alerts via SMS", enabled: false },
  { id: "alerts", label: "System Alerts", description: "Low inventory, system issues", enabled: true },
  { id: "transactions", label: "Transaction Updates", description: "Fund requests, payments, sales", enabled: true },
  { id: "customers", label: "Customer Activities", description: "New registrations, support requests", enabled: false },
  { id: "reports", label: "Daily Reports", description: "Daily summary and performance reports", enabled: true },
]

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("notifications")
  const [settings, setSettings] = useState(notificationSettings)
  const [notificationList, setNotificationList] = useState(notifications)

  const unreadCount = notificationList.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotificationList((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotificationList((prev) => prev.filter((n) => n.id !== id))
  }

  const toggleSetting = (id: string) => {
    setSettings((prev) => prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600">Manage your notifications and preferences</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {unreadCount} unread
            </Badge>
            <Button variant="outline" onClick={markAllAsRead}>
              <MarkAsRead className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("notifications")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "notifications"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Bell className="h-4 w-4 inline mr-2" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "settings"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Settings className="h-4 w-4 inline mr-2" />
              Settings
            </button>
          </nav>
        </div>

        {activeTab === "notifications" && (
          <div className="space-y-4">
            {notificationList.map((notification) => (
              <Card key={notification.id} className={`${!notification.read ? "ring-2 ring-blue-100" : ""}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${notification.bgColor} flex-shrink-0`}>
                      <notification.icon className={`h-5 w-5 ${notification.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3
                            className={`text-lg font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}
                          >
                            {notification.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getPriorityColor(notification.priority)}>{notification.priority}</Badge>
                            <span className="text-xs text-gray-500">{notification.timestamp}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className={`${!notification.read ? "text-gray-900" : "text-gray-600"}`}>
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {notificationList.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Bell className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                  <p className="text-gray-600">You're all caught up! New notifications will appear here.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {settings.map((setting) => (
                  <div
                    key={setting.id}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex-1">
                      <Label htmlFor={setting.id} className="text-base font-medium text-gray-900">
                        {setting.label}
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                    </div>
                    <Switch
                      id={setting.id}
                      checked={setting.enabled}
                      onCheckedChange={() => toggleSetting(setting.id)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="quietStart">Quiet Hours Start</Label>
                    <input
                      id="quietStart"
                      type="time"
                      defaultValue="22:00"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quietEnd">Quiet Hours End</Label>
                    <input
                      id="quietEnd"
                      type="time"
                      defaultValue="08:00"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <Label htmlFor="weekendNotifications" className="text-base font-medium text-gray-900">
                      Weekend Notifications
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">Receive notifications during weekends</p>
                  </div>
                  <Switch id="weekendNotifications" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save Preferences</Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
