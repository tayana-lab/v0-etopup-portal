"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { StyledInput } from "@/components/ui/styled-input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Loader2, Smartphone, Shield, Zap, ArrowLeft } from 'lucide-react'
import { useAuthStore } from "@/lib/stores/auth-store"
import Image from "next/image"

type AuthMode = "login" | "register"
type AuthStep = "mobile" | "otp" | "password"

export default function LoginPage() {
  const [authMode, setAuthMode] = useState<AuthMode>("login")
  const [authStep, setAuthStep] = useState<AuthStep>("mobile")
  const [mobileNumber, setMobileNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuthStore()
  const router = useRouter()

  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!mobileNumber || mobileNumber.length !== 7) {
      setError("Please enter a valid 7-digit mobile number")
      return
    }

    setIsLoading(true)
    // Simulate OTP sending
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setAuthStep("otp")
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setAuthStep("password")
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    console.log("[v0] Auth mode:", authMode)
    console.log("[v0] Mobile number:", mobileNumber)
    console.log("[v0] Password entered:", password ? "Yes" : "No")

    if (authMode === "register") {
      if (!password || password.length < 6) {
        setError("Password must be at least 6 characters")
        return
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match")
        return
      }

      setIsLoading(true)
      // Simulate registration
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      console.log("[v0] Registration complete, calling login...")
      const success = await login(mobileNumber, password)
      console.log("[v0] Login result:", success)
      
      if (success) {
        console.log("[v0] Waiting for auth state to persist...")
        // Wait a bit for localStorage to persist
        await new Promise((resolve) => setTimeout(resolve, 100))
        console.log("[v0] Navigating to dashboard")
        router.push("/dashboard")
      } else {
        setError("Registration failed. Please try again.")
      }
      setIsLoading(false)
    } else {
      if (!password) {
        setError("Please enter your password")
        return
      }

      setIsLoading(true)
      console.log("[v0] Attempting login...")
      
      const success = await login(mobileNumber, password)
      console.log("[v0] Login result:", success)
      
      if (success) {
        console.log("[v0] Waiting for auth state to persist...")
        // Wait a bit for localStorage to persist
        await new Promise((resolve) => setTimeout(resolve, 100))
        console.log("[v0] Navigating to dashboard")
        router.push("/dashboard")
      } else {
        setError("Invalid credentials. Please try again.")
      }
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    setError("")
    if (authStep === "otp") {
      setAuthStep("mobile")
      setOtp("")
    } else if (authStep === "password") {
      setAuthStep("otp")
      setPassword("")
      setConfirmPassword("")
    }
  }

  const resetForm = () => {
    setAuthStep("mobile")
    setMobileNumber("")
    setOtp("")
    setPassword("")
    setConfirmPassword("")
    setError("")
  }

  const toggleAuthMode = () => {
    setAuthMode(authMode === "login" ? "register" : "login")
    resetForm()
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
            <h2 className="text-3xl font-bold text-primary-foreground text-balance">Your Quick Top Up Solutions</h2>
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
        </div>
      </div>

      {/* Left Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Header */}
          <div className="text-center space-y-4">
            <div className="mx-auto h-14 w-70 flex items-center justify-center">
              <Image src="/cws-logo.svg" alt="CWS Logo" width={128} height={128} className="w-full h-full" />
            </div>
          </div>

          {/* Auth Form */}
          <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-bold text-center text-card-foreground">
                {authMode === "login" ? "Sign In" : "Register"}
              </CardTitle>
              <CardDescription className="text-center text-muted-foreground">
                {authMode === "login" ? "Welcome back to eTopUp" : "Create your eTopUp account"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-12">
              {/* Step 1: Mobile Number */}
              {authStep === "mobile" && (
                <form onSubmit={handleMobileSubmit} className="space-y-12">
                  <div className="space-y-2">
                    <Label htmlFor="mobileNumber" className="text-sm font-medium text-foreground">
                      Mobile Number
                    </Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 border border-r-0 border-input bg-muted rounded-l-md text-sm text-muted-foreground">
                        +248
                      </span>
                      <StyledInput
                        id="mobileNumber"
                        type="tel"
                        placeholder="Enter Mobile Number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                        disabled={isLoading}
                        maxLength={7}
                        className="rounded-l-none"
                      />
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
                        Sending OTP...
                      </>
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </form>
              )}

              {/* Step 2: OTP Verification */}
              {authStep === "otp" && (
                <form onSubmit={handleOtpSubmit} className="space-y-6">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleBack}
                    className="mb-2 px-0 hover:bg-transparent"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>

                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-sm font-medium text-foreground">
                      Enter OTP
                    </Label>
                    <StyledInput
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      disabled={isLoading}
                      maxLength={6}
                    />
                    <p className="text-xs text-muted-foreground">
                      OTP sent to +248 {mobileNumber}
                    </p>
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
                        Verifying...
                      </>
                    ) : (
                      "Verify OTP"
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="link"
                    className="w-full text-sm"
                    disabled={isLoading}
                  >
                    Resend OTP
                  </Button>
                </form>
              )}

              {/* Step 3: Password */}
              {authStep === "password" && (
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleBack}
                    className="mb-2 px-0 hover:bg-transparent"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-foreground">
                      {authMode === "register" ? "Set Password" : "Enter Password"}
                    </Label>
                    <div className="relative">
                      <StyledInput
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={authMode === "register" ? "Create a password" : "Enter your password"}
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

                  {authMode === "register" && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <StyledInput
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pr-10"
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 hover:bg-muted"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          disabled={isLoading}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  )}

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
                        {authMode === "register" ? "Creating Account..." : "Signing in..."}
                      </>
                    ) : authMode === "register" ? (
                      "Create Account"
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              )}

              {/* Toggle between Login and Register */}
              {authStep === "mobile" && (
                <div className="text-center pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    {authMode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto font-semibold text-primary"
                      onClick={toggleAuthMode}
                    >
                      {authMode === "login" ? "Register" : "Sign In"}
                    </Button>
                  </p>
                </div>
              )}
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
