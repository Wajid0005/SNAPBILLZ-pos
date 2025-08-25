import { useState, useEffect } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { useAutoplay } from "@/hooks/use-autoplay"

// Import all feature images
import oneTapSmartBillingImage from "@/assets/features/one-tap-smart-billing.png"
import floatingDynamicQrImage from "@/assets/features/floating-dynamic-qr.png"
import multiLanguageInterfaceImage from "@/assets/features/multi-language-interface.png"
import smartUpiSoundboxImage from "@/assets/features/smart-upi-soundbox.png"
import smartInventoryAiImage from "@/assets/features/smart-inventory-ai.png"
import autoGstTaxCalculatorImage from "@/assets/features/auto-gst-tax-calculator.png"
import snapAnalyticsDashboardImage from "@/assets/features/snap-analytics-dashboard.png"
import voiceToBillCommandImage from "@/assets/features/voice-to-bill-command.png"

const features = [
  {
    image: oneTapSmartBillingImage,
    title: "One-Tap Smart Billing",
    tagline: "Generate a bill in under 3 seconds with AI-assisted auto-fill of customer details"
  },
  {
    image: floatingDynamicQrImage,
    title: "Floating Dynamic QR Code",
    tagline: "A rotating QR system that changes every few seconds for enhanced payment security"
  },
  {
    image: multiLanguageInterfaceImage,
    title: "Multi-Language Interface",
    tagline: "Hinglish + Regional — No other billing app speaks like your customer base"
  },
  {
    image: smartUpiSoundboxImage,
    title: "Smart UPI Soundbox Simulation",
    tagline: "Payment confirmations with custom audio alerts (brand name or shop name announced)"
  },
  {
    image: smartInventoryAiImage,
    title: "Smart Inventory AI",
    tagline: "Predicts stock shortages and suggests reorder levels before you even notice"
  },
  {
    image: autoGstTaxCalculatorImage,
    title: "Auto GST & Tax Smart Calculator",
    tagline: "Automatically applies the correct GST slab and updates with government rules"
  },
  {
    image: snapAnalyticsDashboardImage,
    title: "Snap Analytics Dashboard",
    tagline: "AI-driven insights showing top-selling products, busiest times, and smart profit tips"
  },
  {
    image: voiceToBillCommandImage,
    title: "Voice-to-Bill Command",
    tagline: "Speak product names and quantities; SNAPBILLZ creates a bill in real time"
  }
]

const FeaturesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-advance slides every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length)
    }, 3500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Carousel className="w-full">
        <CarouselContent>
          {features.map((feature, index) => (
            <CarouselItem key={index}>
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="flex flex-col items-center p-0">
                  <div className="relative w-full max-w-md mx-auto">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-smooth"
                    />
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-sm">
                      <div className="glass rounded-xl p-4 text-center backdrop-blur-md bg-white/80 border border-orange-warm/20">
                        <p className="text-sm font-medium text-foreground">{feature.tagline}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation dots */}
        <div className="flex justify-center space-x-2 mt-16">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-smooth ${
                index === currentIndex 
                  ? 'bg-orange-warm' 
                  : 'bg-orange-warm/30 hover:bg-orange-warm/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  )
}

export default FeaturesCarousel