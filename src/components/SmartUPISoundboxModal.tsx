import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Volume2, Play } from "lucide-react"
import { toast } from "sonner"

interface SmartUPISoundboxModalProps {
  isOpen: boolean
  onClose: () => void
}

const SmartUPISoundboxModal = ({ isOpen, onClose }: SmartUPISoundboxModalProps) => {
  const [numbers, setNumbers] = useState<number[]>([0, 0, 0])
  const [sum, setSum] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // Generate random 3-digit numbers on modal open
  useEffect(() => {
    if (isOpen) {
      generateRandomNumbers()
    }
  }, [isOpen])

  const generateRandomNumbers = () => {
    const newNumbers = [
      Math.floor(Math.random() * 900) + 100, // 100-999
      Math.floor(Math.random() * 900) + 100,
      Math.floor(Math.random() * 900) + 100
    ]
    setNumbers(newNumbers)
    setSum(newNumbers.reduce((acc, num) => acc + num, 0))
  }

  const playPaymentSound = async () => {
    setIsPlaying(true)
    
    try {
      // Create a simple beep sound for payment received
      const audioContext = new AudioContext()
      
      // Success beep sequence
      const playBeep = (frequency: number, duration: number, delay: number) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()
          
          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)
          
          oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
          oscillator.type = 'sine'
          
          gainNode.gain.setValueAtTime(0, audioContext.currentTime)
          gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01)
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration)
          
          oscillator.start(audioContext.currentTime)
          oscillator.stop(audioContext.currentTime + duration)
        }, delay)
      }

      // Play success sound sequence
      playBeep(800, 0.1, 0)      // First beep
      playBeep(1000, 0.1, 100)   // Second beep
      playBeep(1200, 0.2, 200)   // Final beep

      // Use Web Speech API for voice announcement
      setTimeout(() => {
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(`Payment received rupees ${sum}`)
          utterance.rate = 0.8
          utterance.pitch = 1
          utterance.volume = 0.8
          speechSynthesis.speak(utterance)
        }
        
        toast.success(`🔊 Payment Received: ₹${sum}`)
        setIsPlaying(false)
      }, 500)
      
    } catch (error) {
      console.error('Audio playback error:', error)
      toast.error("Audio playback failed")
      setIsPlaying(false)
    }
  }

  const updateNumber = (index: number, value: string) => {
    const newNumbers = [...numbers]
    const numValue = parseInt(value) || 0
    newNumbers[index] = Math.max(0, Math.min(999, numValue)) // Clamp between 0-999
    setNumbers(newNumbers)
    setSum(newNumbers.reduce((acc, num) => acc + num, 0))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center">
            Smart UPI Soundbox
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Input Numbers */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-center">Amount Components</h4>
            <div className="grid grid-cols-3 gap-3">
              {numbers.map((number, index) => (
                <div key={index} className="text-center">
                  <label className="block text-sm text-muted-foreground mb-1">
                    Amount {index + 1}
                  </label>
                  <Input
                    type="number"
                    value={number}
                    onChange={(e) => updateNumber(index, e.target.value)}
                    className="text-center text-lg font-semibold"
                    min="0"
                    max="999"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Sum Display */}
          <div className="bg-primary/5 rounded-lg p-6 text-center">
            <h3 className="text-sm text-muted-foreground mb-2">Total Amount</h3>
            <div className="text-4xl font-bold text-primary">₹{sum}</div>
          </div>

          {/* Controls */}
          <div className="flex gap-3 justify-center">
            <Button
              onClick={generateRandomNumbers}
              variant="outline"
              className="flex items-center gap-2"
            >
              🎲 New Random
            </Button>
            
            <Button
              onClick={playPaymentSound}
              disabled={isPlaying}
              className="flex items-center gap-2"
            >
              {isPlaying ? (
                <>
                  <Volume2 className="w-4 h-4 animate-pulse" />
                  Playing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Play Sound
                </>
              )}
            </Button>
          </div>

          {/* Instructions */}
          <div className="text-sm text-muted-foreground text-center space-y-1">
            <p>• Edit amounts manually or generate random</p>
            <p>• Plays success sound + voice announcement</p>
            <p>• Simulates UPI payment confirmation</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SmartUPISoundboxModal