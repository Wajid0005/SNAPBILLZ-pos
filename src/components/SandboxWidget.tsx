import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { QrCode, ArrowRight, IndianRupee } from "lucide-react"

const SandboxWidget = () => {
  const [amount, setAmount] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  
  const handleGenerateQR = () => {
    if (!amount || isNaN(Number(amount))) return
    
    setIsGenerating(true)
    
    // Simulate QR generation
    setTimeout(() => {
      setIsGenerating(false)
      // Redirect to demo app
      window.open("https://snapbillz.lovable.app/", "_blank")
    }, 1000)
  }

  return (
    <section className="py-16 bg-background">
      <div className="container-lg">
        <div className="text-center mb-12">
          <h2 className="text-section mb-4">
            Try it <span className="text-orange-warm">right now</span>
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Enter an amount and see how SnapBillz generates dynamic QR codes
          </p>
        </div>
        
        <div className="max-w-md mx-auto glass rounded-2xl p-8 shadow-medium">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-orange-light rounded-xl flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-8 h-8 text-orange-warm" />
            </div>
            <h3 className="text-xl font-semibold mb-2">QR Code Generator</h3>
            <p className="text-sm text-muted-foreground">
              Experience dynamic QR generation
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10 h-12 text-lg"
                min="1"
              />
            </div>
            
            <Button
              onClick={handleGenerateQR}
              disabled={!amount || isNaN(Number(amount)) || isGenerating}
              size="lg"
              className="w-full group"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating QR...
                </>
              ) : (
                <>
                  Generate QR & Try Demo
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-orange-light/20 rounded-xl">
            <p className="text-sm text-center text-muted-foreground">
              This will open our full demo where you can experience the complete SnapBillz workflow
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SandboxWidget