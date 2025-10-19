"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Star } from "lucide-react"
import { useState } from "react"

export default function FeedbackPage() {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Share Your Feedback</h1>
          <p className="text-muted-foreground">Help us improve by sharing your thoughts and suggestions</p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-foreground">We Value Your Opinion</CardTitle>
                <CardDescription>Your feedback helps us create a better experience for everyone</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" className="bg-background border-border" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Feedback Category</Label>
                <Select>
                  <SelectTrigger id="category" className="bg-background border-border">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="bug">Bug Report</SelectItem>
                    <SelectItem value="improvement">Improvement Suggestion</SelectItem>
                    <SelectItem value="general">General Feedback</SelectItem>
                    <SelectItem value="support">Support Issue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Overall Rating</Label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= (hoveredRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    </button>
                  ))}
                  {rating > 0 && <span className="ml-2 text-sm text-muted-foreground">{rating} out of 5 stars</span>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief summary of your feedback"
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Your Feedback</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about your experience, suggestions, or issues..."
                  className="min-h-[150px] bg-background border-border"
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Submit Feedback
                </Button>
                <Button type="button" variant="outline" className="border-border bg-transparent">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-900">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-2">Thank you for your feedback!</h3>
            <p className="text-sm text-foreground/80">
              We review all feedback carefully and use it to continuously improve our services. Your input directly
              influences our product roadmap and helps us serve you better.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
