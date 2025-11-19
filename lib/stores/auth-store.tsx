"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  hasHydrated: boolean
  login: (mobileNumber: string, password: string) => Promise<boolean>
  logout: () => void
  setUser: (user: User) => void
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasHydrated, setHasHydrated] = useState(false)

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("auth-storage")
    if (stored) {
      try {
        const { user: storedUser, isAuthenticated: storedAuth } = JSON.parse(stored)
        if (storedUser && storedAuth) {
          setUser(storedUser)
          setIsAuthenticated(storedAuth)
        }
      } catch (e) {
        console.error("Failed to parse auth storage", e)
      }
    }
    setHasHydrated(true)
  }, [])

  // Persist to localStorage whenever auth state changes
  useEffect(() => {
    if (hasHydrated) {
      localStorage.setItem(
        "auth-storage",
        JSON.stringify({
          user,
          isAuthenticated,
        }),
      )
    }
  }, [user, isAuthenticated, hasHydrated])

  const login = async (mobileNumber: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      id: "1",
      name: "John Doe",
      email: "dealer@etopup.sc",
      role: "Senior Agent",
    }

    console.log("[v0] Auth store: Setting user and authenticated state")
    setUser(newUser)
    setIsAuthenticated(true)
    setIsLoading(false)
    
    console.log("[v0] Auth store: Login successful")
    return true
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("auth-storage")
  }

  const handleSetUser = (newUser: User) => {
    setUser(newUser)
    setIsAuthenticated(true)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        hasHydrated,
        login,
        logout,
        setUser: handleSetUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthStore() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthStore must be used within an AuthProvider")
  }
  return context
}
