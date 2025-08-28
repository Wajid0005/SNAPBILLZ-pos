import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

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
    password: '',
    otp: ''
  })
  const [countryCode, setCountryCode] = useState('91')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (mode === 'login') {
        // Format phone number with country code for login
        const fullPhone = `+${countryCode}${formData.phone}`
        
        // For login, we'll use phone and password
        const { error } = await supabase.auth.signInWithPassword({
          phone: fullPhone,
          password: formData.password,
        })
        
        if (error) throw error
        
        toast.success("Successfully logged in!")
        setFormData({
          name: '',
          phone: '',
          email: '',
          occupation: '',
          password: '',
          otp: ''
        })
        onClose()
      } else {
        if (!otpSent) {
          // Format phone number with country code
          const fullPhone = `+${countryCode}${formData.phone}`
          
          // Send OTP to phone number
          const { error } = await supabase.auth.signInWithOtp({
            phone: fullPhone,
          })
          
          if (error) throw error
          
          toast.success("OTP sent to your phone number!")
          setOtpSent(true)
        } else {
          // Format phone number with country code
          const fullPhone = `+${countryCode}${formData.phone}`
          
          // Verify OTP and create account
          const { error: verifyError } = await supabase.auth.verifyOtp({
            phone: fullPhone,
            token: formData.otp,
            type: 'sms'
          })

          if (verifyError) throw verifyError

          // Create user profile after successful verification
          const { error: insertError } = await supabase
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

          if (insertError) {
            console.warn('Profile creation failed:', insertError)
          }

          toast.success("Account created successfully! Welcome to SnapBillz!")
          
          // Reset form and close modal
          setFormData({
            name: '',
            phone: '',
            email: '',
            occupation: '',
            password: '',
            otp: ''
          })
          setOtpSent(false)
          onClose()
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error)
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
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-foreground text-center">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
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

          {/* Phone Field */}
          {mode === 'login' ? (
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="flex h-10 w-24 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="91">+91</option>
                  <option value="1">+1</option>
                  <option value="44">+44</option>
                  <option value="61">+61</option>
                  <option value="33">+33</option>
                  <option value="49">+49</option>
                  <option value="81">+81</option>
                  <option value="86">+86</option>
                </select>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '')
                    if (value.length <= 10) {
                      handleChange('phone', value)
                    }
                  }}
                  placeholder="Enter 10-digit number"
                  maxLength={10}
                  required
                  className="flex-1"
                />
              </div>
            </div>
          ) : (
            <>
              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="flex h-10 w-24 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={otpSent}
                  >
                    <option value="91">+91</option>
                    <option value="1">+1</option>
                    <option value="44">+44</option>
                    <option value="61">+61</option>
                    <option value="33">+33</option>
                    <option value="49">+49</option>
                    <option value="81">+81</option>
                    <option value="86">+86</option>
                  </select>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '')
                      if (value.length <= 10) {
                        handleChange('phone', value)
                      }
                    }}
                    placeholder="Enter 10-digit number"
                    maxLength={10}
                    required
                    disabled={otpSent}
                    className="flex-1"
                  />
                </div>
              </div>

              {otpSent && (
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    value={formData.otp}
                    onChange={(e) => handleChange('otp', e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    required
                  />
                </div>
              )}

              {/* Email Field (Optional) */}
              {!otpSent && (
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
              )}

              {/* Occupation Field */}
              {!otpSent && (
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
              )}
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
            {loading ? 'Processing...' : 
             mode === 'login' ? 'Sign In' : 
             !otpSent ? 'Send OTP' : 'Verify & Create Account'}
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