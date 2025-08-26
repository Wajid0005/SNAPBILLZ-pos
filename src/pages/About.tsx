import { Card, CardContent } from "@/components/ui/card"
import Navigation from "@/components/Navigation"

const About = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="container-xl pt-32 pb-20">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-section text-foreground">
            About SnapBillz
          </h1>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
            Revolutionizing how small businesses manage their billing and inventory
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto space-y-12">
          <Card className="bg-primary/5 border-none">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Our Story</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  SnapBillz was born from a simple observation: small business owners were spending too much time on paperwork and not enough time growing their business. Traditional billing systems were either too complex or too expensive for the everyday retailer.
                </p>
                <p>
                  We witnessed shop owners struggling with manual calculations, losing track of inventory, and missing out on digital payment opportunities. That's when we decided to create a solution that would be simple enough for anyone to use, yet powerful enough to handle real business needs.
                </p>
                <p>
                  What started as a weekend project quickly evolved into a comprehensive platform that now serves thousands of businesses across India. Our mission remains the same: make business management effortless and affordable for everyone.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To democratize business technology and make powerful tools accessible to every small business owner, regardless of their technical expertise or budget constraints.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Empowering small businesses with intelligent, mobile-first solutions that simplify operations, increase efficiency, and drive growth in the digital economy.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-center text-foreground">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="font-semibold text-foreground">Simplicity First</h4>
                <p className="text-muted-foreground text-sm">
                  We believe technology should work for you, not against you. Every feature is designed with simplicity in mind.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">💰</span>
                </div>
                <h4 className="font-semibold text-foreground">Affordable Innovation</h4>
                <p className="text-muted-foreground text-sm">
                  Advanced features shouldn't break the bank. We make enterprise-grade tools accessible to everyone.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🤝</span>
                </div>
                <h4 className="font-semibold text-foreground">Customer Success</h4>
                <p className="text-muted-foreground text-sm">
                  Your success is our success. We're committed to helping every business reach its full potential.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-none">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Built by Entrepreneurs, for Entrepreneurs</h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
                Our team understands the challenges of running a business because we've been there. We combine technical expertise with real-world business experience to create solutions that actually work.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="bg-background rounded-xl p-6 shadow-soft">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👨‍💻</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Engineering Excellence</h4>
                  <p className="text-sm text-muted-foreground">Built with cutting-edge technology for reliability and performance</p>
                </div>

                <div className="bg-background rounded-xl p-6 shadow-soft">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Design Thinking</h4>
                  <p className="text-sm text-muted-foreground">User-centered design that prioritizes ease of use and accessibility</p>
                </div>

                <div className="bg-background rounded-xl p-6 shadow-soft">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📈</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Business Acumen</h4>
                  <p className="text-sm text-muted-foreground">Deep understanding of business needs and market dynamics</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center pt-8">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that have already discovered the power of effortless billing and inventory management.
            </p>
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary-hover transition-smooth shadow-soft hover:shadow-orange">
              Start Your Free Trial Today
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default About