import { Button } from "@/components/ui/button"
import Navigation from "@/components/Navigation"
import snapbillzLogo from "@/assets/snapbillz-logo.png"

const Home = () => {
  const handleCreateStore = () => {
    window.open("https://snapbillz.lovable.app/", "_blank")
  }

  const handleTakeTrial = () => {
    window.open("https://snapbillz.lovable.app/dashboard", "_blank")
  }

  return (
    <main className="min-h-screen bg-hero">
      <Navigation />
      <div className="container-xl pt-32 pb-20">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-4">
              <img 
                src={snapbillzLogo} 
                alt="Snapbillz Logo" 
                className="w-16 h-16 md:w-20 md:h-20"
              />
              <h1 className="text-hero text-foreground">
                SNAPBILLZ
              </h1>
            </div>
            <p className="text-2xl md:text-3xl font-medium text-muted-foreground max-w-3xl mx-auto uppercase">
              Simple • Fast • Affordable
            </p>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Your Smart E-Billing System Inside Your Phone
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              variant="hero" 
              size="xl"
              onClick={handleCreateStore}
              className="min-w-[200px]"
            >
              Create Free Store
            </Button>
            <Button 
              variant="heroOutline" 
              size="xl"
              onClick={handleTakeTrial}
              className="min-w-[200px]"
            >
              Take Trial
            </Button>
          </div>

          {/* Features Preview */}
          <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Lightning Fast</h3>
              <p className="text-muted-foreground">Generate bills in seconds</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Mobile First</h3>
              <p className="text-muted-foreground">Works perfectly on your phone</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Affordable</h3>
              <p className="text-muted-foreground">Starting from just ₹299</p>
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}

export default Home