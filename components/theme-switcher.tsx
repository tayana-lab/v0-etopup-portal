"use client"

import { useTheme } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"
import { Palette } from "lucide-react"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "blue" ? "purple" : "blue")
  }

  return (
    <Button variant="outline" size="sm" onClick={toggleTheme} className="flex items-center gap-2 bg-transparent">
      <Palette className="h-4 w-4" />
      {theme === "blue" ? "Switch to Purple" : "Switch to Blue"}
    </Button>
  )
}
