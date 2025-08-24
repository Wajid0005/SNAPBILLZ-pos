import { Shield, Users, Zap, Heart } from "lucide-react"

const trustMetrics = [
  {
    icon: Users,
    value: "10,000+",
    label: "Active merchants",
    color: "text-orange-warm"
  },
  {
    icon: Zap,
    value: "₹50L+",
    label: "Processed monthly",
    color: "text-green-600"
  },
  {
    icon: Shield,
    value: "99.9%",
    label: "Uptime guarantee",
    color: "text-blue-600"
  },
  {
    icon: Heart,
    value: "4.8/5",
    label: "Merchant rating",
    color: "text-red-500"
  }
]

const TrustLogos = () => {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container-xl">
        <div className="text-center mb-12">
          <p className="text-sm text-muted-foreground mb-8">
            Trusted by thousands of merchants across India
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {trustMetrics.map((metric, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-background rounded-xl shadow-soft group-hover:shadow-medium transition-smooth mb-4">
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Featured in
          </p>
          <div className="flex items-center justify-center gap-8 opacity-50">
            <div className="text-lg font-semibold text-neutral-400">YourStory</div>
            <div className="text-lg font-semibold text-neutral-400">Inc42</div>
            <div className="text-lg font-semibold text-neutral-400">Economic Times</div>
            <div className="text-lg font-semibold text-neutral-400">Business Standard</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustLogos