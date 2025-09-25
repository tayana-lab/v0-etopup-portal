"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "fr"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation sections
    "nav.main": "Main Navigation",
    "nav.services": "Services",
    "nav.user-management": "User Management",
    "nav.additional": "Additional",

    // Navigation items
    "nav.dashboard": "Dashboard",
    "nav.topup": "TopUp",
    "nav.wallet": "My Wallet",
    "nav.reports": "Reports",
    "nav.contact": "Contact Us",
    "nav.sim-sales": "SIM Sales",
    "nav.packages": "Packages",
    "nav.bills": "Bill Payment",
    "nav.onboarding": "Onboarding",
    "nav.jobs": "Job Cards",
    "nav.inventory": "Inventory",
    "nav.profile": "Profile",
    "nav.notifications": "Notifications",
    "nav.support": "Support",
    "nav.funds": "Fund Request",
    "nav.feedback": "Feedback",
    "nav.about": "About",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.subtitle": "Welcome back, manage your services and track performance",
    "dashboard.support.title": "24/7 Customer Support",
    "dashboard.support.description": "Our dedicated support team is here to help you with all your queries and issues.",
    "dashboard.support.button": "Contact Support",

    // KPIs
    "kpi.sales": "Today's Sales",
    "kpi.transactions": "Transactions",
    "kpi.customers": "Active Customers",
    "kpi.success": "Success Rate",

    // Services
    "services.title": "Quick Services",
    "services.mobile-topup": "Mobile Top-up",
    "services.data-packages": "Data Packages",
    "services.bill-payment": "Bill Payment",
    "services.fund-request": "Fund Request",
    "services.sim-sales": "SIM Sales",
    "services.job-cards": "Job Cards",

    // Transactions
    "transactions.title": "Recent Transactions",
    "transactions.view-all": "View All",
    "transactions.pending": "Pending",
    "transactions.completed": "Completed",

    // Fund Request
    "funds.title": "Fund Request Center",
    "funds.new-request": "New Request",
    "funds.available": "Available Funds",
    "funds.pending": "Pending Requests",
    "funds.monthly-limit": "Monthly Limit",

    // Support
    "support.title": "Support & Notifications",
    "support.sim-not-working": "SIM card not working",
    "support.payment-error": "Unable to process payment",
    "support.help-docs": "Help Documentation",
    "support.contact-support": "Contact Support",
    "support.feedback": "Provide Feedback",
    "support.customer": "Customer",
    "support.high": "High",

    // Theme
    "theme.blue": "Blue",
    "theme.purple": "Purple",

    // Language
    "language.english": "English",
    "language.french": "Français",

    // Carousel
    "carousel.roaming-data": "Roaming Data Booster",
    "carousel.5g-unlimited": "5G Unlimited Plans",
    "carousel.special-offer": "Special Offers",
    "carousel.esim": "eSIM Solutions",
  },
  fr: {
    // Navigation sections
    "nav.main": "Navigation Principale",
    "nav.services": "Services",
    "nav.user-management": "Gestion Utilisateur",
    "nav.additional": "Supplémentaire",

    // Navigation items
    "nav.dashboard": "Tableau de bord",
    "nav.topup": "Recharge",
    "nav.wallet": "Mon Portefeuille",
    "nav.reports": "Rapports",
    "nav.contact": "Nous Contacter",
    "nav.sim-sales": "Vente SIM",
    "nav.packages": "Forfaits",
    "nav.bills": "Paiement Factures",
    "nav.onboarding": "Intégration",
    "nav.jobs": "Cartes de Travail",
    "nav.inventory": "Inventaire",
    "nav.profile": "Profil",
    "nav.notifications": "Notifications",
    "nav.support": "Support",
    "nav.funds": "Demande de Fonds",
    "nav.feedback": "Commentaires",
    "nav.about": "À Propos",

    // Dashboard
    "dashboard.title": "Tableau de bord",
    "dashboard.subtitle": "Bon retour, gérez vos services et suivez les performances",
    "dashboard.support.title": "Support Client 24/7",
    "dashboard.support.description":
      "Notre équipe de support dédiée est là pour vous aider avec toutes vos questions et problèmes.",
    "dashboard.support.button": "Contacter le Support",

    // KPIs
    "kpi.sales": "Ventes d'Aujourd'hui",
    "kpi.transactions": "Transactions",
    "kpi.customers": "Clients Actifs",
    "kpi.success": "Taux de Réussite",

    // Services
    "services.title": "Services Rapides",
    "services.mobile-topup": "Recharge Mobile",
    "services.data-packages": "Forfaits Data",
    "services.bill-payment": "Paiement Factures",
    "services.fund-request": "Demande de Fonds",
    "services.sim-sales": "Vente SIM",
    "services.job-cards": "Cartes de Travail",

    // Transactions
    "transactions.title": "Transactions Récentes",
    "transactions.view-all": "Voir Tout",
    "transactions.pending": "En Attente",
    "transactions.completed": "Terminé",

    // Fund Request
    "funds.title": "Centre de Demande de Fonds",
    "funds.new-request": "Nouvelle Demande",
    "funds.available": "Fonds Disponibles",
    "funds.pending": "Demandes en Attente",
    "funds.monthly-limit": "Limite Mensuelle",

    // Support
    "support.title": "Support & Notifications",
    "support.sim-not-working": "Carte SIM ne fonctionne pas",
    "support.payment-error": "Impossible de traiter le paiement",
    "support.help-docs": "Documentation d'Aide",
    "support.contact-support": "Contacter le Support",
    "support.feedback": "Donner un Avis",
    "support.customer": "Client",
    "support.high": "Élevé",

    // Theme
    "theme.blue": "Bleu",
    "theme.purple": "Violet",

    // Language
    "language.english": "English",
    "language.french": "Français",

    // Carousel
    "carousel.roaming-data": "Booster de Données Roaming",
    "carousel.5g-unlimited": "Forfaits 5G Illimités",
    "carousel.special-offer": "Offres Spéciales",
    "carousel.esim": "Solutions eSIM",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "fr")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
