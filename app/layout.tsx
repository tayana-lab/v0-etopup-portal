import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/contexts/theme-context"
import { LanguageProvider } from "@/contexts/language-context"
import { AuthGuard } from "@/components/auth-guard"
import "./globals.css"

export const metadata: Metadata = {
  title: "Telecom Agent Portal",
  description: "Professional web portal for telecom agents - manage sales, customers, and analytics",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <LanguageProvider>
          <ThemeProvider>
            <AuthGuard>
              <Suspense fallback={null}>{children}</Suspense>
            </AuthGuard>
          </ThemeProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
