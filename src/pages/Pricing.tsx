import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { useState } from "react"
import Navigation from "@/components/Navigation"

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false)
  const getPrice = (monthlyPrice: number) => {
    if (isAnnual) {
      const annualPrice = monthlyPrice * 12 * 0.88 // 12% discount
      return Math.round(annualPrice)
    }
    return monthlyPrice
  }

  const plans = [
    {
      name: "Starter",
      price: 299,
      popular: false,
      description: "Perfect for small businesses and individual retailers",
      features: [
        "Up to 100 bills per month",
        "Basic inventory tracking",
        "UPI QR code generation",
        "SMS receipts",
        "Basic analytics",
        "Single user access",
        "Email support"
      ]
    },
    {
      name: "Professional",
      price: 499,
      popular: true,
      description: "Ideal for growing businesses with multiple products",
      features: [
        "Up to 500 bills per month",
        "Advanced inventory management",
        "Dynamic QR codes",
        "SMS & WhatsApp receipts",
        "Advanced analytics dashboard",
        "Up to 3 user accounts",
        "Voice billing commands",
        "GST compliance tools",
        "Priority support"
      ]
    },
    {
      name: "Enterprise",
      price: 899,
      popular: false,
      description: "Complete solution for established businesses",
      features: [
        "Unlimited billing",
        "Smart inventory AI",
        "Multi-language interface",
        "White label branding",
        "Advanced reporting",
        "Unlimited user accounts",
        "API access",
        "Offline billing mode",
        "Dedicated account manager",
        "Custom integrations"
      ]
    }
  ]

  const handleChoosePlan = (planName: string) => {
    console.log(`Selected plan: ${planName}`)
    // Redirect to signup or payment
    window.open("https://snapbillz.lovable.app/", "_blank")
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="container-xl pt-32 pb-20">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-section text-foreground">
            Simple, Transparent Pricing
          </h1>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your business. All plans include core features with no hidden fees.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm ${!isAnnual ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
              Annual
            </span>
            {isAnnual && (
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Save 12%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-orange scale-105' : ''} hover:shadow-medium transition-smooth`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-foreground">
                  {plan.name}
                </CardTitle>
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    {isAnnual && (
                      <span className="text-lg text-muted-foreground line-through">₹{plan.price * 12}</span>
                    )}
                    <span className="text-4xl font-bold text-foreground">₹{getPrice(plan.price)}</span>
                    <span className="text-muted-foreground">/{isAnnual ? 'year' : 'month'}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full"
                  variant={plan.popular ? "hero" : "outline"}
                  size="lg"
                  onClick={() => handleChoosePlan(plan.name)}
                >
                  Choose {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-center text-foreground mb-12">
            Frequently Asked Questions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Can I upgrade my plan anytime?</h4>
              <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Is there a free trial?</h4>
              <p className="text-muted-foreground">Yes, we offer a 7-day free trial for all plans. No credit card required.</p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">What payment methods do you accept?</h4>
              <p className="text-muted-foreground">We accept all major credit cards, UPI, net banking, and digital wallets.</p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Do you offer refunds?</h4>
              <p className="text-muted-foreground">Yes, we offer a 30-day money-back guarantee if you're not satisfied.</p>
            </div>
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="text-center pt-20">
          <div className="bg-primary/5 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-muted-foreground mb-6">
              For large enterprises or specific requirements, we offer custom plans and dedicated support.
            </p>
            <Button variant="outline" size="lg">
              Contact Sales Team
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Pricing