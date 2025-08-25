import { Button } from "@/components/ui/button"
import { Play, ArrowRight, CheckCircle } from "lucide-react"
import FeaturesCarousel from "@/components/FeaturesCarousel"

const Hero = () => {
  const handleDemoClick = () => {
    // Track demo event
    console.log('demo_taken', { source: 'hero_demo_button' })
    window.open("https://snapbillz.lovable.app/", "_blank")
  }

  const handleCreateStoreClick = () => {
    // Track signup intent
    console.log('signup_started', { source: 'hero_create_store' })
    window.open("https://snapbillz.lovable.app/", "_blank")
  }

  return (
    <section className="relative bg-hero min-h-screen flex items-center overflow-hidden">
      {/* Marble accent stripe */}
      <div className="absolute inset-0 bg-marble opacity-30" />
      
      <div className="container-xl relative z-10">
        {/* Top Tagline */}
        <div className="text-center mb-12">
          <h1 className="text-hero mb-2">SNAPBILLZ</h1>
          <p className="text-body-lg text-muted-foreground">
            <span className="text-orange-warm font-medium">simple</span> - <span className="text-orange-warm font-medium">fast</span> - <span className="text-orange-warm font-medium">affordable</span>
          </p>
          <p className="text-body text-muted-foreground mt-2">Your smart e-billing system inside your phone</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Hero Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-light/30 text-orange-dark text-sm font-medium mb-6 border border-orange-soft/20">
              <CheckCircle className="w-4 h-4" />
              Now live in India
            </div>
            
            <h2 className="text-section mb-6">
              UPI billing that{" "}
              <span className="text-orange-warm">just works</span>
            </h2>
            
            <p className="text-body-lg text-muted-foreground mb-8 max-w-lg lg:max-w-none">
              Create unique store apps, generate dynamic QR per invoice, and send instant receipts. 
              <span className="text-foreground font-medium"> No drama.</span>
            </p>
            
            <div className="mb-8">
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button 
                  variant="hero" 
                  size="xl"
                  onClick={handleCreateStoreClick}
                  className="group"
                >
                  Create free store
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  variant="heroOutline" 
                  size="xl"
                  onClick={handleDemoClick}
                  className="group"
                >
                  <Play className="group-hover:scale-110 transition-transform" />
                  Try Now
                </Button>
              </div>

            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-orange-warm" />
                5-day free trial
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-orange-warm" />
                No setup fees
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-orange-warm" />
                Cancel anytime
              </div>
            </div>
          </div>
          
          {/* Right Column - Features Carousel */}
          <div className="relative">
            <FeaturesCarousel />
            
            {/* Floating elements */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-orange-soft/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-orange-warm/10 rounded-full blur-xl animate-pulse delay-1000" />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-orange-warm/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-orange-warm rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}

export default Hero