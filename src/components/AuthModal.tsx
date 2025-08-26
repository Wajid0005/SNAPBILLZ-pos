import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { X, Eye, EyeOff } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'login' | 'signup'
  onSwitchMode: () => void
}

const AuthModal = ({ isOpen, onClose, mode, onSwitchMode }: AuthModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    occupation: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (mode === 'login') {
        // For login, we'll use name as identifier for now
        toast.success("Login functionality will be implemented with backend integration")
      } else {
        // For signup, insert data into our custom users table
        const { error } = await supabase
          .from('users')
          .insert([
            {
              name: formData.name,
              phone: formData.phone,
              email: formData.email || null,
              occupation: formData.occupation,
              password_hash: formData.password // In production, this should be properly hashed
            }
          ])

        if (error) throw error

        toast.success("Account created successfully! Welcome to SnapBillz!")
        
        // Reset form and close modal
        setFormData({
          name: '',
          phone: '',
          email: '',
          occupation: '',
          password: ''
        })
        onClose()
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-2xl font-semibold text-foreground">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Signup specific fields */}
          {mode === 'signup' && (
            <>
              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              {/* Email Field (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="Enter your email address"
                />
              </div>

              {/* Occupation Field */}
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Textarea
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => handleChange('occupation', e.target.value)}
                  placeholder="Describe your occupation or business"
                  rows={2}
                  maxLength={100}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  {formData.occupation.length}/100 characters
                </p>
              </div>
            </>
          )}

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="Enter your password"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            variant="hero"
            disabled={loading}
          >
            {loading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
          </Button>
        </form>

        {/* Switch Mode */}
        <div className="text-center text-sm text-muted-foreground">
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <Button
            variant="link"
            className="p-0 h-auto font-medium text-primary"
            onClick={onSwitchMode}
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal