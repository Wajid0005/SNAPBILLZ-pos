import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/Navigation"
import VoiceCommandModal from "@/components/VoiceCommandModal"
import DynamicQRModal from "@/components/DynamicQRModal" 
import SmartUPISoundboxModal from "@/components/SmartUPISoundboxModal"

const Features = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  
  // Reordered features with Voice Commands, Dynamic QR, and Smart UPI Soundbox first
  const features = [
    {
      icon: "🎤",
      title: "Voice Commands",
      description: "Create bills using voice commands. Speak naturally and let AI handle the rest.",
      category: "AI",
      hasInteraction: true,
      modalType: "voice"
    },
    {
      icon: "📱",
      title: "Dynamic QR Codes", 
      description: "Generate instant QR codes for payments. UPI integration makes transactions seamless.",
      category: "Payment",
      hasInteraction: true,
      modalType: "qr"
    },
    {
      icon: "🔊",
      title: "Smart UPI Soundbox",
      description: "Audio notifications for UPI payments. Never miss a payment confirmation.",
      category: "Payment", 
      hasInteraction: true,
      modalType: "soundbox"
    },
    {
      icon: "🧾",
      title: "One-Tap Smart Billing",
      description: "Generate professional bills with just one tap. Smart templates save time and ensure accuracy.",
      category: "Core",
      hasInteraction: false
    },
    {
      icon: "🤖",
      title: "Smart Inventory AI",
      description: "AI-powered inventory tracking that learns your patterns and predicts stock needs.",
      category: "AI",
      hasInteraction: false
    },
    {
      icon: "🌍",
      title: "Multi-Language Interface",
      description: "Support for multiple languages. Your customers can interact in their preferred language.",
      category: "Core",
      hasInteraction: false
    },
    {
      icon: "🧮",
      title: "Auto GST Calculator",
      description: "Automatic GST calculation and compliance. Generate GST-ready invoices instantly.",
      category: "Finance",
      hasInteraction: false
    },
    {
      icon: "📊",
      title: "Analytics Dashboard", 
      description: "Real-time business insights. Track sales, inventory, and customer patterns.",
      category: "Analytics",
      hasInteraction: false
    },
    {
      icon: "📴",
      title: "Offline Billing",
      description: "Work without internet. Sync automatically when connection is restored.",
      category: "Core",
      hasInteraction: false
    },
    {
      icon: "👥",
      title: "Multi-User Access",
      description: "Team collaboration with role-based access. Manage permissions easily.",
      category: "Management",
      hasInteraction: false
    },
    {
      icon: "📲",
      title: "SMS & WhatsApp Receipts",
      description: "Send receipts instantly via SMS or WhatsApp. Keep customers engaged.",
      category: "Communication",
      hasInteraction: false
    },
    {
      icon: "🏷️",
      title: "White Label Branding",
      description: "Customize with your brand colors, logo, and business information.",
      category: "Branding",
      hasInteraction: false
    }
  ]

  const categories = ["All", "Core", "AI", "Payment", "Finance", "Analytics", "Management", "Communication", "Branding"]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="container-xl pt-32 pb-20">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-section text-foreground">
            Powerful Features for Modern Business
          </h1>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
            Everything you need to run your business efficiently. From smart billing to AI-powered insights.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-medium transition-smooth relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-2xl mb-4">
                    {feature.icon}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-smooth">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                
                {feature.hasInteraction && (
                  <div className="pt-2">
                    <Button
                      onClick={() => setActiveModal(feature.modalType)}
                      size="sm"
                      className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-smooth"
                    >
                      TAP
                    </Button>
                  </div>
                )}
              </CardContent>
              
              {!feature.hasInteraction && (
                <div className="absolute top-4 right-12">
                  <div className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-medium">
                    TAP
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center pt-20">
          <div className="bg-primary/5 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Ready to Experience These Features?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of businesses already using SnapBillz to streamline their operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary-hover transition-smooth">
                Start Free Trial
              </button>
              <button className="px-8 py-3 border border-primary text-primary rounded-xl font-medium hover:bg-primary hover:text-primary-foreground transition-smooth">
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Modals */}
      <VoiceCommandModal
        isOpen={activeModal === 'voice'}
        onClose={() => setActiveModal(null)}
      />
      
      <DynamicQRModal
        isOpen={activeModal === 'qr'}
        onClose={() => setActiveModal(null)}
      />
      
      <SmartUPISoundboxModal
        isOpen={activeModal === 'soundbox'}
        onClose={() => setActiveModal(null)}
      />
    </main>
  )
}

export default Features