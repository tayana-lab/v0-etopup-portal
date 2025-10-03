"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { StyledInput } from "@/components/ui/styled-input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Loader2, Smartphone, Shield, Zap } from "lucide-react"
import { useAuthStore } from "@/stores/auth-store"
import Image from "next/image"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const { login, isLoading } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!username || !password) {
      setError("Please fill in all fields")
      return
    }

    const success = await login(username, password)
    if (success) {
      router.push("/dashboard")
    } else {
      setError("Invalid username or password")
    }
  }

  const features = [
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Access your portal from any device, anywhere",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Bank-level security for all your transactions",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process transactions in seconds, not minutes",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-muted/50 flex">
      {/* Right Side - Features */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary via-primary/90 to-primary/80 items-center justify-center p-8">
        <div className="max-w-lg space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-primary-foreground text-balance">
             Your Quick Top Up Solutions
            </h2>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              Manage sales, customers, and analytics with our powerful, secure platform designed specifically for
              telecom agents.
            </p>
          </div>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 h-12 w-12 bg-primary-foreground/10 rounded-xl flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-primary-foreground">{feature.title}</h3>
                  <p className="text-sm text-primary-foreground/80 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-primary-foreground/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-foreground">99.9%</div>
              <div className="text-xs text-primary-foreground/70">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-foreground">24/7</div>
              <div className="text-xs text-primary-foreground/70">Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-foreground">500+</div>
              <div className="text-xs text-primary-foreground/70">Dealers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Header */}
          <div className="text-center space-y-4">
            <div className="mx-auto h-14 w-70 flex items-center justify-center">
              <Image src="/cws-logo.svg" alt="CWS Logo" width={128} height={128} className="w-full h-full" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground text-balance">eTopUp</h1>
              <p className="text-muted-foreground">Your Quick Top Up Solutions</p>
            </div>
          </div>

          {/* Login Form */}
          <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl text-center text-card-foreground">Sign in to your account</CardTitle>
              <CardDescription className="text-center">Enter your credentials to access the portal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium text-foreground">
                    Username
                  </Label>
                  <StyledInput
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <StyledInput
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 hover:bg-muted"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-sm">{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full h-11 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>

              <div className="text-center pt-4">
                <p className="text-sm text-muted-foreground">Demo credentials: dealer / password123</p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 eTopUp Portal. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
