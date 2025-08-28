import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { QRCodeSVG } from 'qrcode.react'
import { RotateCcw } from "lucide-react"
import { toast } from "sonner"

interface DynamicQRModalProps {
  isOpen: boolean
  onClose: () => void
}

const DynamicQRModal = ({ isOpen, onClose }: DynamicQRModalProps) => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)
  const [qrValue, setQrValue] = useState("")
  
  // Generate 60 random numbers
  const randomNumbers = Array.from({length: 60}, () => 
    Math.floor(Math.random() * 999999) + 1
  )

  const startSpin = () => {
    setIsSpinning(true)
    setSelectedNumber(null)
    setQrValue("")

    // Simulate spinning for 3 seconds
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * randomNumbers.length)
      const number = randomNumbers[randomIndex]
      setSelectedNumber(number)
      
      // Generate UPI payment link
      const upiLink = `upi://pay?pa=6290409878@ybl&am=${number}&cu=INR&tn=Payment for Amount ${number}`
      setQrValue(upiLink)
      setIsSpinning(false)
      
      toast.success(`Generated QR for ₹${number}`)
    }, 3000)
  }

  const resetWheel = () => {
    setSelectedNumber(null)
    setQrValue("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center">
            Dynamic QR Generator
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Spinning Wheel */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className={`w-48 h-48 rounded-full border-4 border-primary flex items-center justify-center ${
                isSpinning ? 'animate-spin' : ''
              } bg-gradient-to-br from-primary/10 to-primary/30`}>
                <div className="text-center">
                  {isSpinning ? (
                    <div className="text-lg font-bold text-primary">
                      Spinning...
                    </div>
                  ) : selectedNumber ? (
                    <div className="text-3xl font-bold text-primary">
                      ₹{selectedNumber}
                    </div>
                  ) : (
                    <div className="text-lg text-muted-foreground">
                      Tap Spin
                    </div>
                  )}
                </div>
              </div>
              
              {/* Wheel pointer */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                <div className="w-4 h-4 bg-primary rotate-45"></div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-3">
              <Button
                onClick={startSpin}
                disabled={isSpinning}
                className="px-6 py-2"
              >
                {isSpinning ? 'Spinning...' : 'Spin Wheel'}
              </Button>
              
              {selectedNumber && (
                <Button
                  onClick={resetWheel}
                  variant="outline"
                  size="icon"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* QR Code Display */}
          {qrValue && (
            <div className="flex flex-col items-center space-y-4 p-4 bg-white rounded-lg border">
              <h4 className="font-medium text-lg">Payment QR Code</h4>
              <QRCodeSVG 
                value={qrValue} 
                size={200}
                bgColor="#ffffff"
                fgColor="#000000"
                level="M"
              />
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Scan to pay ₹{selectedNumber} to 6290409878@ybl
                </p>
                <Button 
                  onClick={onClose}
                  className="mt-3 px-6"
                >
                  Done
                </Button>
              </div>
            </div>
          )}

          {/* Random Numbers Preview */}
          <div className="text-xs text-muted-foreground text-center">
            <p>Wheel contains 60 random amounts</p>
            <p>Sample: ₹{randomNumbers.slice(0, 5).join(', ₹')}...</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DynamicQRModal