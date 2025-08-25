import { Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const HonestMetrics = () => {
  const [hasTriedApp, setHasTriedApp] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  const handleTryApp = () => {
    console.log('app_trial_started', { source: 'honest_metrics' })
    setHasTriedApp(true)
    window.open("https://snapbillz.lovable.app/", "_blank")
  }

  const handleRating = (rating: number) => {
    if (hasTriedApp) {
      setUserRating(rating)
      console.log('user_rating_submitted', { rating, source: 'honest_metrics' })
    }
  }

  return (
    <section className="py-16 bg-background">
      <div className="container-xl text-center">
        <h2 className="text-section mb-6">
          Built for Merchants, Backed by Passion
        </h2>
        
        <p className="text-body-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Instead of big numbers, we stand by a bigger promise — solving real merchant problems affordably and honestly.
        </p>

        {/* Interactive Review Meter */}
        <div className="bg-card rounded-2xl p-8 max-w-md mx-auto mb-8 shadow-soft border">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Rate Your Experience</h3>
            <p className="text-sm text-muted-foreground">
              {hasTriedApp ? "How was your trial experience?" : "Try the app first to rate it"}
            </p>
          </div>

          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                disabled={!hasTriedApp}
                className="p-1 transition-colors disabled:opacity-40"
              >
                <Star 
                  className={`w-8 h-8 ${
                    (hoveredRating || userRating) >= star 
                      ? 'fill-orange-warm text-orange-warm' 
                      : 'text-muted-foreground'
                  }`}
                />
              </button>
            ))}
          </div>

          {userRating > 0 && (
            <div className="mb-4 p-3 bg-orange-light/20 rounded-lg">
              <p className="text-sm text-orange-dark font-medium">
                Thanks for your {userRating}-star rating! 🙏
              </p>
            </div>
          )}

          <Button 
            onClick={() => handleRating(userRating)}
            disabled={userRating === 0}
            variant="hero"
            size="sm"
            className="w-full mb-3"
          >
            Submit Rating
          </Button>

          <p className="text-xs text-center text-muted-foreground mb-3">
            Didn't tried the app yet?
          </p>

          <Button 
            onClick={handleTryApp}
            variant="outline"
            className="w-full group"
          >
            Go Try App
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            No fake stats, just real merchants and real solutions.
          </p>
        </div>
      </div>
    </section>
  )
}

export default HonestMetrics