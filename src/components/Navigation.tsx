import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import AuthModal from "./AuthModal"
import snapbillzLogo from "@/assets/snapbillz-logo.png"

const Navigation = () => {
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const location = useLocation()

  const handleLoginClick = () => {
    setAuthMode('login')
    setShowAuth(true)
  }

  const handleSignupClick = () => {
    setAuthMode('signup')
    setShowAuth(true)
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ]

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container-xl flex justify-between items-center py-4">
          {/* Logo and Brand Name */}
          <div className="flex-1">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-foreground hover:text-primary transition-smooth">
              <img 
                src={snapbillzLogo} 
                alt="Snapbillz Logo" 
                className="w-8 h-8"
              />
              SNAPBILLZ
            </Link>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-smooth hover:text-primary ${
                  location.pathname === link.href
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Auth Buttons */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <Button 
              variant="ghost" 
              onClick={handleLoginClick}
              className="text-foreground hover:text-primary"
            >
              Login
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSignupClick}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Sign Up
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-smooth hover:text-primary ${
                  location.pathname === link.href
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        mode={authMode}
        onSwitchMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
      />
    </>
  )
}

export default Navigation