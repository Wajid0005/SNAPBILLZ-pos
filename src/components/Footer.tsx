import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react"

const Footer = () => {
  const handleStartFreeClick = () => {
    window.open("https://snapbillz.lovable.app/", "_blank")
  }

  return (
    <footer className="bg-neutral-900 text-white">
      {/* CTA Section */}
      <div className="bg-marble py-16">
        <div className="container-xl text-center">
          <h2 className="text-section text-foreground mb-4">
            Ready to transform your{" "}
            <span className="text-orange-warm">billing process?</span>
          </h2>
          <p className="text-body-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of merchants who've already made the switch to smarter UPI billing
          </p>
          <Button 
            variant="hero" 
            size="xl" 
            onClick={handleStartFreeClick}
            className="group"
          >
            Start your free trial
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="container-xl">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold text-orange-warm mb-4">SnapBillz</h3>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                Making UPI billing simple, smart, and scalable for every Indian merchant.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-orange-warm/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-orange-warm" />
                </div>
                <span className="text-neutral-300">hello@snapbillz.com</span>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-neutral-300">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#integrations" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#api" className="hover:text-white transition-colors">API Docs</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-neutral-300">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#case-studies" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-3 text-neutral-300">
                <li><a href="#help" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#status" className="hover:text-white transition-colors">System Status</a></li>
                <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800 py-6">
        <div className="container-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neutral-400 text-sm">
              © 2024 SnapBillz. All rights reserved. Made with ❤️ for Indian merchants.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                All systems operational
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer