"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useLanguage } from "@/lib/contexts/language-context"
import Autoplay from "embla-carousel-autoplay"

const carouselData = [
  {
    id: 1,
    image:
      "https://www.cwseychelles.com/system/home_carousel_banners/images/000/000/034/original/Roaming_Data_Booster_%281%29.png?1736417939",
    titleKey: "carousel.roaming-data",
    description: "Stay connected wherever you go with our roaming data packages",
    buttonText: "Learn More",
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    id: 2,
    image:
      "https://www.cwseychelles.com/system/home_carousel_banners/images/000/000/020/original/5G_Unlimited_Website_Banner.jpg?1728471750",
    titleKey: "carousel.5g-unlimited",
    description: "Experience lightning-fast 5G speeds with unlimited data",
    buttonText: "Get Started",
    gradient: "from-purple-600 to-blue-600",
  },
  {
    id: 3,
    image: "https://www.cwseychelles.com/system/home_carousel_banners/images/000/000/027/original/2.png?1733303933",
    titleKey: "carousel.special-offer",
    description: "Don't miss out on our exclusive limited-time offers",
    buttonText: "View Offers",
    gradient: "from-green-600 to-blue-600",
  },
]

export function HeroCarousel() {
  const { t } = useLanguage()
  const [api, setApi] = useState<any>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        className="w-full"
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {carouselData.map((slide) => (
            <CarouselItem key={slide.id}>
              <Card className="border-0 py-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className={`relative h-48 md:h-64 lg:h-72 bg-gradient-to-r ${slide.gradient} overflow-hidden`}>
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-20"
                      style={{ backgroundImage: `url(${slide.image})` }}
                    />

                    {/* Content Overlay */}
                    <div className="relative z-10 h-full flex items-center justify-between p-6 md:p-8 lg:p-12">
                      <div className="flex-1 text-white max-w-2xl">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">{t(slide.titleKey)}</h2>
                        <p className="text-sm md:text-base lg:text-lg text-white/90 mb-4 md:mb-6 leading-relaxed">
                          {slide.description}
                        </p>
                        <Button
                          variant="secondary"
                          className="bg-white text-gray-900 hover:bg-gray-100 font-medium px-6 py-2"
                        >
                          {slide.buttonText}
                        </Button>
                      </div>

                      {/* Decorative Image */}
                      <div className="hidden lg:block flex-shrink-0 ml-8">
                        <img
                          src={slide.image || "/placeholder.svg"}
                          alt={t(slide.titleKey)}
                          className="w-48 h-32 object-cover rounded-lg shadow-lg opacity-80"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <CarouselPrevious className="left-4 bg-white/20 border-white/30 text-white hover:bg-white/30" />
        <CarouselNext className="right-4 bg-white/20 border-white/30 text-white hover:bg-white/30" />
      </Carousel>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 gap-2">
        {carouselData.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current ? "bg-primary w-6" : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  )
}
