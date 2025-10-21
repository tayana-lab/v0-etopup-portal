"use client"

import { useTheme } from "@/lib/contexts/theme-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Sun, Moon, Check } from "lucide-react"

interface ThemeSwitcherProps {
  className?: string
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { mode, setMode, colorTheme, setColorTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          {mode === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">Mode</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setMode("light")} className="flex items-center gap-2">
          <Sun className="h-4 w-4" />
          Light
          {mode === "light" && <Check className="h-4 w-4 ml-auto" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setMode("dark")} className="flex items-center gap-2">
          <Moon className="h-4 w-4" />
          Dark
          {mode === "dark" && <Check className="h-4 w-4 ml-auto" />}
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">Color Theme</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setColorTheme("blue")} className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-[#006bb6]" />
          Blue
          {colorTheme === "blue" && <Check className="h-4 w-4 ml-auto" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setColorTheme("turquoise")} className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-[#5BCDDB]" />
          Turquoise
          {colorTheme === "turquoise" && <Check className="h-4 w-4 ml-auto" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setColorTheme("yellow")} className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-[#FFD100]" />
          Yellow
          {colorTheme === "yellow" && <Check className="h-4 w-4 ml-auto" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setColorTheme("teal")} className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-[#006A72]" />
          Teal
          {colorTheme === "teal" && <Check className="h-4 w-4 ml-auto" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setColorTheme("orange")} className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-[#F27D2F]" />
          Orange
          {colorTheme === "orange" && <Check className="h-4 w-4 ml-auto" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setColorTheme("gray")} className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-[#D9D9D6]" />
          Gray
          {colorTheme === "gray" && <Check className="h-4 w-4 ml-auto" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
