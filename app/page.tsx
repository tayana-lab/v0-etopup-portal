import { ThemeSwitcher } from "@/components/theme-switcher"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Multi-Theme Demo</h1>
            <p className="text-muted-foreground mt-2">Switch between blue and purple themes</p>
          </div>
          <ThemeSwitcher />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Primary Elements</CardTitle>
              <CardDescription>See how primary colors change with themes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full">Primary Button</Button>
              <Button variant="secondary" className="w-full">
                Secondary Button
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Outline Button
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Color Variants</CardTitle>
              <CardDescription>Different button and accent colors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-4 bg-primary rounded"></div>
              <div className="h-4 bg-secondary rounded"></div>
              <div className="h-4 bg-accent rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interactive Elements</CardTitle>
              <CardDescription>Focus rings and hover states</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                type="text"
                placeholder="Focus me to see ring color"
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button variant="ghost" className="w-full">
                Ghost Button
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
