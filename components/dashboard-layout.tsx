"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Settings,
  HelpCircle,
  Menu,
  X,
  Home,
  Phone,
  Smartphone,
  FileText,
  Bell,
  Plus,
  Wallet,
  Package,
  UserPlus,
  Wrench,
  Archive,
  DollarSign,
  MessageSquare,
  Info,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const tabNavigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "TopUp", href: "/topup", icon: Phone },
  { name: "My Wallet", href: "/wallet", icon: Wallet },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Contact Us", href: "/contact", icon: HelpCircle },
]

const coreServices = [
  { name: "SIM Sales", href: "/sim-sales", icon: Smartphone },
  { name: "Packages", href: "/packages", icon: Package },
  { name: "Bill Payment", href: "/bills", icon: FileText },
  { name: "Onboarding", href: "/onboarding", icon: UserPlus },
  { name: "Job Cards", href: "/jobs", icon: Wrench },
  { name: "Inventory", href: "/inventory", icon: Archive },
]

const userManagement = [
  { name: "Profile", href: "/profile", icon: Settings },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Support", href: "/support", icon: HelpCircle },
]

const additionalServices = [
  { name: "Fund Request", href: "/funds", icon: DollarSign },
  { name: "Feedback", href: "/feedback", icon: MessageSquare },
  { name: "About", href: "/about", icon: Info },
]
// </CHANGE>

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">eT</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">eTopup</span>
          </div>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-6">
          <div className="mb-6">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Main Navigation</h3>
            <ul className="space-y-1">
              {tabNavigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Services</h3>
            <ul className="space-y-1">
              {coreServices.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">User Management</h3>
            <ul className="space-y-1">
              {userManagement.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Additional</h3>
            <ul className="space-y-1">
              {additionalServices.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>
        {/* </CHANGE> */}

        <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-medium">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
              <p className="text-xs text-gray-500">Agent</p>
            </div>
            <Button variant="ghost" size="sm" className="flex-shrink-0">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* </CHANGE> */}
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-6">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-4 w-4" />
          </Button>

          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, manage your services and track performance</p>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Transaction
            </Button>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
