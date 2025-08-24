import { useState, useEffect } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { useAutoplay } from "@/hooks/use-autoplay"

// Import all feature images
import dynamicQrImage from "@/assets/features/dynamic-qr.jpg"
import uniqueStoreAppsImage from "@/assets/features/unique-store-apps.jpg"
import instantNotificationsImage from "@/assets/features/instant-notifications.jpg"
import offlineBillingImage from "@/assets/features/offline-billing.jpg"
import analyticsDashboardImage from "@/assets/features/analytics-dashboard.jpg"
import gstInvoicesImage from "@/assets/features/gst-invoices.jpg"
import multiUserAccessImage from "@/assets/features/multi-user-access.jpg"
import smsWhatsappReceiptsImage from "@/assets/features/sms-whatsapp-receipts.jpg"
import inventoryTrackingImage from "@/assets/features/inventory-tracking.jpg"
import whiteLabelBrandingImage from "@/assets/features/white-label-branding.jpg"

const features = [
  {
    image: dynamicQrImage,
    title: "Dynamic Per-Invoice QR",
    tagline: "Every invoice, its own QR — no repeats, no fraud."
  },
  {
    image: uniqueStoreAppsImage,
    title: "Unique Store Apps",
    tagline: "Every shop, its own app — personalised, professional."
  },
  {
    image: instantNotificationsImage,
    title: "Instant Payment Notifications",
    tagline: "No guessing. Instant UPI payment alerts like a soundbox."
  },
  {
    image: offlineBillingImage,
    title: "Offline Billing Mode",
    tagline: "No network? Still bill. Sync when back online."
  },
  {
    image: analyticsDashboardImage,
    title: "Advanced Analytics Dashboard",
    tagline: "Numbers that talk — track sales, trends, and growth."
  },
  {
    image: gstInvoicesImage,
    title: "GST-Ready Invoices",
    tagline: "Tax compliance? Auto-done. GST-ready receipts in one click."
  },
  {
    image: multiUserAccessImage,
    title: "Multi-User Staff Access",
    tagline: "One business, many hands. Secure role-based access."
  },
  {
    image: smsWhatsappReceiptsImage,
    title: "Real-time SMS/WhatsApp Receipts",
    tagline: "Your customer gets the bill before leaving the counter."
  },
  {
    image: inventoryTrackingImage,
    title: "Inventory Auto-Tracking",
    tagline: "Sell. Update. Repeat. Real-time inventory tracking made easy."
  },
  {
    image: whiteLabelBrandingImage,
    title: "White-Label Branding Option",
    tagline: "Your brand, our tech. White-label your billing app."
  }
]

const FeaturesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-advance slides every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length)
    }, 4000)

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