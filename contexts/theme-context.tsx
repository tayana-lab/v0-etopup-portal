"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "blue" | "purple"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("blue")

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem("theme") as Theme
    if (savedTheme && (savedTheme === "blue" || savedTheme === "purple")) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    // Apply theme to document and save to localStorage
    const root = document.documentElement
    root.classList.remove("theme-blue", "theme-purple")
    root.classList.add(`theme-${theme}`)
    localStorage.setItem("theme", theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
