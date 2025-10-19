import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Globe, Award, TrendingUp, Shield } from "lucide-react"

export default function AboutPage() {
  const stats = [
    {
      label: "Years in Business",
      value: "10+",
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      label: "Active Customers",
      value: "50K+",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      label: "Transactions Daily",
      value: "100K+",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
    },
    {
      label: "Success Rate",
      value: "99.9%",
      icon: Award,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
    },
  ]

  const values = [
    {
      title: "Reliability",
      description: "24/7 uptime with instant processing for all your telecom needs",
      icon: Shield,
    },
    {
      title: "Global Reach",
      description: "Supporting multiple carriers and payment methods across regions",
      icon: Globe,
    },
    {
      title: "Customer First",
      description: "Dedicated support team ready to assist you anytime",
      icon: Users,
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">About eTopup Portal</h1>
          <p className="text-muted-foreground">Your trusted partner for telecom services and digital transactions</p>
        </div>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-900">
          <CardContent className="p-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                We empower businesses and individuals with seamless telecom services, from mobile top-ups to bill
                payments and SIM sales. Our platform is designed to make digital transactions fast, secure, and
                accessible to everyone.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Our Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              {values.map((value) => (
                <div key={value.title} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                      <value.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-foreground">{value.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">What We Offer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Badge className="bg-blue-100 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border-0">
                  Mobile Services
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Instant mobile top-ups, data packages, and SIM card sales for all major carriers
                </p>
              </div>
              <div className="space-y-2">
                <Badge className="bg-cyan-100 dark:bg-cyan-950/20 text-cyan-700 dark:text-cyan-400 border-0">
                  Bill Payments
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Quick and secure bill payment processing with instant confirmation
                </p>
              </div>
              <div className="space-y-2">
                <Badge className="bg-green-100 dark:bg-green-950/20 text-green-700 dark:text-green-400 border-0">
                  Fund Management
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Flexible fund request system with real-time balance tracking
                </p>
              </div>
              <div className="space-y-2">
                <Badge className="bg-orange-100 dark:bg-orange-950/20 text-orange-700 dark:text-orange-400 border-0">
                  Customer Support
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Dedicated support team available 24/7 to assist with any issues
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
