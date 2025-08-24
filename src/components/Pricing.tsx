import { Button } from "@/components/ui/button"
import { Check, Star, ArrowRight } from "lucide-react"
import { useState } from "react"

const plans = [
  {
    name: "Basic",
    price: 299,
    description: "Perfect for small shops getting started",
    features: [
      "Easy billing interface",
      "Menu/dashboard for item control", 
      "Customer checkout page",
      "Export sales reports to Excel"
    ],
    popular: false
  },
  {
    name: "Pro", 
    price: 499,
    description: "Most popular for growing businesses",
    features: [
      "Everything in Basic",
      "Dashboard with sales & trend charts",
      "QR code payment gateway integration", 
      "Optional customer data input form"
    ],
    popular: true
  },
  {
    name: "Advance",
    price: 899, 
    description: "Complete solution for busy merchants",
    features: [
      "Everything in Pro",
      "Auto-send bills via SMS",
      "Real-time WhatsApp/SMS notifications",
      "Inventory tracking & management"
    ],
    popular: false
  }
]

const addOns = [
  { name: "1000 SMS Package", price: 199, description: "Per bundle" },
  { name: "WhatsApp API Access", price: 99, description: "Per month" },
  { name: "Extra Device Access", price: 149, description: "Per device/month" },
  { name: "Priority Support", price: 249, description: "24/7 support" }
]

const Pricing = () => {
  const [billingType, setBillingType] = useState<'monthly' | 'annual'>('monthly')
  
  const handleStartTrial = (planName: string) => {
    // Track analytics event
    console.log('plan_selected', { plan_id: planName })
    console.log('checkout_started', { plan: planName, source: 'pricing_page' })
    window.open("https://snapbillz.lovable.app/", "_blank")
  }

  const getDiscountedPrice = (price: number) => {
    return billingType === 'annual' ? Math.round(price * 0.85) : price
  }

  const getSavings = (price: number) => {
    return billingType === 'annual' ? price * 12 - getDiscountedPrice(price) * 12 : 0
  }

  return (
    <section className="py-24 bg-marble">
      <div className="container-xl">
        <div className="text-center mb-16">
          <h2 className="text-section mb-4">
            Pricing made <span className="text-orange-warm">simple</span>
          </h2>
          <p className="text-body-lg text-muted-foreground mb-8">
            Monthly & annual billing. 5-day free trial. Switch anytime.
          </p>
          
          {/* Billing toggle */}
          <div className="inline-flex items-center gap-4 p-1 bg-background rounded-xl shadow-soft">
            <button
              onClick={() => setBillingType('monthly')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-smooth ${
                billingType === 'monthly' 
                  ? 'bg-orange-warm text-white shadow-soft' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingType('annual')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-smooth ${
                billingType === 'annual' 
                  ? 'bg-orange-warm text-white shadow-soft' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Annual
              <span className="ml-2 px-2 py-1 bg-orange-light text-orange-dark text-xs rounded-full">
                Save 15%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`relative glass rounded-2xl p-8 ${
                plan.popular 
                  ? 'ring-2 ring-orange-warm shadow-orange scale-105' 
                  : 'shadow-soft hover:shadow-medium'
              } transition-smooth`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-orange-warm text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Most popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-4xl font-bold">₹{getDiscountedPrice(plan.price)}</span>
                  <span className="text-muted-foreground">
                    /month
                  </span>
                </div>
                
                {billingType === 'annual' && getSavings(plan.price) > 0 && (
                  <p className="text-sm text-orange-warm font-medium">
                    Save ₹{getSavings(plan.price)} annually
                  </p>
                )}
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-orange-warm flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant={plan.popular ? "hero" : "heroOutline"}
                size="lg"
                className="w-full group"
                onClick={() => handleStartTrial(plan.name)}
              >
                Start free trial
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="glass rounded-2xl p-8 shadow-medium">
          <h3 className="text-2xl font-bold text-center mb-2">Add-ons & Extras</h3>
          <p className="text-muted-foreground text-center mb-8">
            Enhance your plan with these optional features
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addOn, index) => (
              <div key={index} className="border border-border rounded-xl p-6 hover:border-orange-warm/50 transition-smooth">
                <h4 className="font-semibold mb-2">{addOn.name}</h4>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl font-bold text-orange-warm">₹{addOn.price}</span>
                  <span className="text-sm text-muted-foreground">{addOn.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise */}
        <div className="text-center mt-16">
          <h3 className="text-xl font-semibold mb-2">Need something custom?</h3>
          <p className="text-muted-foreground mb-6">
            Enterprise plans with white-label options, custom integrations, and dedicated support
          </p>
          <Button variant="outline" size="lg">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Pricing