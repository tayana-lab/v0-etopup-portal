"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Mode = "light" | "dark"
type ColorTheme = "blue" | "turquoise" | "yellow" | "teal" | "orange" | "gray"

interface ThemeContextType {
  mode: Mode
  setMode: (mode: Mode) => void
  colorTheme: ColorTheme
  setColorTheme: (theme: ColorTheme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>("light")
  const [colorTheme, setColorTheme] = useState<ColorTheme>("blue")

  useEffect(() => {
    const savedMode = localStorage.getItem("mode") as Mode
    const savedColorTheme = localStorage.getItem("colorTheme") as ColorTheme

    if (savedMode && (savedMode === "light" || savedMode === "dark")) {
      setMode(savedMode)
    }

    if (savedColorTheme && ["blue", "turquoise", "yellow", "teal", "orange", "gray"].includes(savedColorTheme)) {
      setColorTheme(savedColorTheme)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement

    root.classList.remove(
      "dark",
      "theme-blue",
      "theme-turquoise",
      "theme-yellow",
      "theme-teal",
      "theme-orange",
      "theme-gray",
    )
    root.classList.add(`theme-${colorTheme}`)

    if (mode === "dark") {
      root.classList.add("dark")
    }

    localStorage.setItem("mode", mode)
    localStorage.setItem("colorTheme", colorTheme)
  }, [mode, colorTheme])

  return <ThemeContext.Provider value={{ mode, setMode, colorTheme, setColorTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
