import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

const ReviewModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [positiveReview, setPositiveReview] = useState("")
  const [problems, setProblems] = useState("")
  const [missingFeatures, setMissingFeatures] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const hasShownReview = localStorage.getItem('reviewShown')
    
    if (!hasShownReview) {
      // First time - show after 20 seconds
      const firstTimer = setTimeout(() => {
        setIsOpen(true)
        localStorage.setItem('reviewShown', 'true')
      }, 20000)

      return () => clearTimeout(firstTimer)
    } else {
      // Subsequent times - show every 4 minutes
      const intervalTimer = setInterval(() => {
        setIsOpen(true)
      }, 240000) // 4 minutes

      return () => clearInterval(intervalTimer)
    }
  }, [])

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please provide a star rating")
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.functions.invoke('send-review', {
        body: {
          rating,
          positiveReview,
          problems,
          missingFeatures,
          timestamp: new Date().toISOString()
        }
      })

      if (error) throw error

      toast.success("Thank you for your review! 🙏")
      setIsOpen(false)
      
      // Reset form
      setRating(0)
      setPositiveReview("")
      setProblems("")
      setMissingFeatures("")
    } catch (error: any) {
      console.error('Review submission error:', error)
      toast.error("Failed to submit review. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center">
            Share Your Experience
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Star Rating */}
          <div className="text-center space-y-4">
            <h3 className="text-lg font-medium">Rate Your Experience</h3>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 transition-colors"
                >
                  <Star 
                    className={`w-8 h-8 ${
                      (hoveredRating || rating) >= star 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Positive Review */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              What do you love about the app? ❤️
            </label>
            <Textarea
              value={positiveReview}
              onChange={(e) => setPositiveReview(e.target.value)}
              placeholder="Share what you love about SnapBillz..."
              rows={3}
            />
          </div>

          {/* Problems */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Any problems we can fix? 🔧
            </label>
            <Textarea
              value={problems}
              onChange={(e) => setProblems(e.target.value)}
              placeholder="Let us know about any issues you've encountered..."
              rows={3}
            />
          </div>

          {/* Missing Features */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Features you'd like to see? 💡
            </label>
            <Textarea
              value={missingFeatures}
              onChange={(e) => setMissingFeatures(e.target.value)}
              placeholder="What features would make SnapBillz even better..."
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit}
            disabled={loading || rating === 0}
            className="w-full"
            variant="hero"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Your feedback helps us improve SnapBillz for everyone! 🚀
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ReviewModal