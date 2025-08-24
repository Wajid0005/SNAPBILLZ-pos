import { Zap, Smartphone, Receipt, BarChart3 } from "lucide-react"

const valueProps = [
  {
    icon: Zap,
    title: "Dynamic QR Per Invoice",
    description: "Generate unique QR codes for every transaction. No more fixed QR confusion.",
    highlight: "99.9% uptime"
  },
  {
    icon: Smartphone,
    title: "Unique Store Apps",
    description: "Every merchant gets their own branded app. Professional presence, zero effort.",
    highlight: "Custom branding"
  },
  {
    icon: Receipt,
    title: "Instant Receipts",
    description: "SMS & WhatsApp receipts sent automatically. Customer satisfaction guaranteed.",
    highlight: "Auto-delivery"
  },
  {
    icon: BarChart3,
    title: "Smart Reconciliation",
    description: "Track payments, manage inventory, export to Excel. Business insights made simple.",
    highlight: "Real-time sync"
  }
]

const ValueProps = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container-xl">
        <div className="text-center mb-16">
          <h2 className="text-section mb-4">
            Everything you need for{" "}
            <span className="text-orange-warm">modern billing</span>
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Built for Indian merchants who want professional UPI billing without the complexity
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valueProps.map((prop, index) => (
            <div 
              key={index}
              className="relative group"
            >
              <div className="glass p-8 rounded-2xl hover:shadow-medium transition-smooth h-full">
                <div className="relative mb-6">
                  <div className="w-12 h-12 bg-orange-light rounded-xl flex items-center justify-center group-hover:scale-110 transition-bounce">
                    <prop.icon className="w-6 h-6 text-orange-warm" />
                  </div>
                  
                  <div className="absolute -top-2 -right-2 px-2 py-1 bg-orange-warm text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-smooth">
                    {prop.highlight}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{prop.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{prop.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ValueProps