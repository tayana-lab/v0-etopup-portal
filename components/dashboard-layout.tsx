"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  Wallet,
  Package,
  UserPlus,
  Wrench,
  Archive,
  DollarSign,
  MessageSquare,
  Info,
  LogOut,
  User,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"
import { useAuthStore } from "@/stores/auth-store"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useLanguage()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">eT</span>
            </div>
            <span className="text-lg font-semibold text-foreground">eTopup</span>
          </div>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-6">
          <div className="mb-6">
            <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {t("nav.main")}
            </h3>
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
                          ? "bg-primary/10 text-primary border-r-2 border-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {t(item.nameKey)}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {t("nav.services")}
            </h3>
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
                          ? "bg-primary/10 text-primary border-r-2 border-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {t(item.nameKey)}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {t("nav.user-management")}
            </h3>
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
                          ? "bg-primary/10 text-primary border-r-2 border-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {t(item.nameKey)}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {t("nav.additional")}
            </h3>
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
                          ? "bg-primary/10 text-primary border-r-2 border-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {t(item.nameKey)}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>

        <div className="flex-shrink-0 p-4 border-t border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground text-xs font-medium">
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("") || "JD"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user?.name || "John Doe"}</p>
              <p className="text-xs text-muted-foreground">{user?.role || "Agent"}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex-shrink-0">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-4 w-4" />
          </Button>

          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-xl font-semibold text-foreground truncate">{t("dashboard.title")}</h1>
            <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">{t("dashboard.subtitle")}</p>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full"></span>
            </Button>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}

const tabNavigation = [
  { name: "Dashboard", nameKey: "nav.dashboard", href: "/", icon: Home },
  { name: "TopUp", nameKey: "nav.topup", href: "/topup", icon: Phone },
  { name: "My Wallet", nameKey: "nav.wallet", href: "/wallet", icon: Wallet },
  { name: "Reports", nameKey: "nav.reports", href: "/reports", icon: BarChart3 },
  { name: "Contact Us", nameKey: "nav.contact", href: "/contact", icon: HelpCircle },
]

const coreServices = [
  { name: "SIM Sales", nameKey: "nav.sim-sales", href: "/sim-sales", icon: Smartphone },
  { name: "Packages", nameKey: "nav.packages", href: "/packages", icon: Package },
  { name: "Bill Payment", nameKey: "nav.bills", href: "/bills", icon: FileText },
  { name: "Onboarding", nameKey: "nav.onboarding", href: "/onboarding", icon: UserPlus },
  { name: "Job Cards", nameKey: "nav.jobs", href: "/jobs", icon: Wrench },
  { name: "Inventory", nameKey: "nav.inventory", href: "/inventory", icon: Archive },
]

const userManagement = [
  { name: "Profile", nameKey: "nav.profile", href: "/profile", icon: Settings },
  { name: "Notifications", nameKey: "nav.notifications", href: "/notifications", icon: Bell },
  { name: "Support", nameKey: "nav.support", href: "/support", icon: HelpCircle },
]

const additionalServices = [
  { name: "Fund Request", nameKey: "nav.funds", href: "/funds", icon: DollarSign },
  { name: "Feedback", nameKey: "nav.feedback", href: "/feedback", icon: MessageSquare },
  { name: "About", nameKey: "nav.about", href: "/about", icon: Info },
]
