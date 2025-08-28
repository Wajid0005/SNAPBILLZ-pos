import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Loader2 } from "lucide-react"
import { toast } from "sonner"

// Type declarations for Speech Recognition API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface VoiceCommandModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ParsedItem {
  item: string
  quantity: string
}

const VoiceCommandModal = ({ isOpen, onClose }: VoiceCommandModalProps) => {
  const [isListening, setIsListening] = useState(false)
  const [parsedItems, setParsedItems] = useState<ParsedItem[]>([])
  const [transcript, setTranscript] = useState("")

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error("Speech recognition not supported in this browser")
      return
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setIsListening(true)
      toast.success("Listening... Speak your list items")
    }

    recognition.onresult = (event) => {
      let finalTranscript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript
        }
      }
      if (finalTranscript) {
        setTranscript(finalTranscript)
        parseItems(finalTranscript)
      }
    }

    recognition.onerror = () => {
      toast.error("Speech recognition error. Please try again.")
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  const parseItems = (text: string) => {
    // Simple parsing logic - split by commas or "and"
    const items = text.toLowerCase()
      .split(/[,&]|and/)
      .map(item => item.trim())
      .filter(item => item.length > 0)

    const parsed: ParsedItem[] = items.map(item => {
      // Extract quantity and item using regex
      const match = item.match(/(\d+(?:\.\d+)?)\s*(kg|gram|g|liter|l|ml|pouch|pack|piece|pc|box|bottle)?\s*(.+)/)
      
      if (match) {
        const quantity = `${match[1]} ${match[2] || 'piece'}`
        const itemName = match[3] || item
        return { quantity, item: itemName.trim() }
      }
      
      // If no quantity found, assume 1 piece
      return { quantity: '1 piece', item: item.trim() }
    })

    setParsedItems(parsed)
  }

  const stopListening = () => {
    setIsListening(false)
  }

  const clearItems = () => {
    setParsedItems([])
    setTranscript("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Voice Command Billing</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Voice Controls */}
          <div className="flex gap-4 justify-center">
            <Button
              onClick={startListening}
              disabled={isListening}
              className="flex items-center gap-2"
              variant={isListening ? "secondary" : "default"}
            >
              {isListening ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Listening...
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  Start Recording
                </>
              )}
            </Button>
            
            {isListening && (
              <Button onClick={stopListening} variant="destructive">
                <MicOff className="w-4 h-4" />
                Stop
              </Button>
            )}

            {parsedItems.length > 0 && (
              <Button onClick={clearItems} variant="outline">
                Clear All
              </Button>
            )}
          </div>

          {/* Transcript Display */}
          {transcript && (
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">What you said:</h4>
              <p className="text-sm">{transcript}</p>
            </div>
          )}

          {/* Parsed Items Table */}
          {parsedItems.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium text-lg">Parsed Items:</h4>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3 font-medium">Item</th>
                      <th className="text-left p-3 font-medium">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedItems.map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-3 capitalize">{item.item}</td>
                        <td className="p-3">{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="text-center">
                <Button onClick={onClose} className="px-8">
                  Create Bill
                </Button>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="text-sm text-muted-foreground text-center">
            <p>Example: "1 kg sugar, 500 ml milk, 2 packets oil"</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default VoiceCommandModal