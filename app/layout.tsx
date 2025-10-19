import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/lib/contexts/theme-context"
import { LanguageProvider } from "@/lib/contexts/language-context"
import { AuthProvider } from "@/lib/stores/auth-store"
import { AuthGuard } from "@/components/shared/auth-guard"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

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
      <body className={`font-sans ${inter.variable}`}>
        <LanguageProvider>
          <ThemeProvider>
            <AuthProvider>
              <AuthGuard>
                <Suspense fallback={null}>{children}</Suspense>
              </AuthGuard>
            </AuthProvider>
          </ThemeProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
