"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Mode = "light" | "dark"

interface ThemeContextType {
  mode: Mode
  setMode: (mode: Mode) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>("light")

  useEffect(() => {
    const savedMode = localStorage.getItem("mode") as Mode

    if (savedMode && (savedMode === "light" || savedMode === "dark")) {
      setMode(savedMode)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement

    root.classList.remove("dark")
    root.classList.add("theme-blue")

    if (mode === "dark") {
      root.classList.add("dark")
    }

    localStorage.setItem("mode", mode)
  }, [mode])

  return <ThemeContext.Provider value={{ mode, setMode }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
