import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, Linkedin, MapPin, Clock, Coffee } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import Navigation from "@/components/Navigation"

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Here you would typically send the message via API
      toast.success("Message sent successfully! We'll get back to you soon.")
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: ["005wajid@gmail.com", "i.wajid@op.iitg.ac.in"],
      action: "mailto:005wajid@gmail.com"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: ["+91 6290409878"],
      action: "tel:+916290409878"
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      title: "LinkedIn",
      details: ["Wajid Iqbal"],
      action: "https://www.linkedin.com/in/wajid-iqbal-629770327/"
    }
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="container-xl pt-32 pb-20">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-section text-foreground">
            Get in Touch
          </h1>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Contact Information
                </h2>
                <p className="text-muted-foreground mb-8">
                  Ready to transform your business? Reach out to us through any of these channels.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="hover:shadow-medium transition-smooth cursor-pointer"
                        onClick={() => window.open(info.action, '_blank')}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                          {info.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-muted-foreground">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Special Office Card */}
              <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-none">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">Office</h3>
                      <p className="text-muted-foreground italic">
                        "A virtual office where innovation never sleeps, and neither does Wajid."
                      </p>
                      <div className="flex items-center space-x-2 mt-3 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Available 24/7 for urgent matters</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Send us a Message</CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                          First Name
                        </Label>
                        <Input 
                          id="firstName"
                          type="text" 
                          value={formData.firstName}
                          onChange={(e) => handleChange('firstName', e.target.value)}
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                          Last Name
                        </Label>
                        <Input 
                          id="lastName"
                          type="text" 
                          value={formData.lastName}
                          onChange={(e) => handleChange('lastName', e.target.value)}
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address
                      </Label>
                      <Input 
                        id="email"
                        type="email" 
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Subject
                      </Label>
                      <Input 
                        id="subject"
                        type="text" 
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        placeholder="How can we help you?"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message
                      </Label>
                      <Textarea 
                        id="message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder="Tell us more about your inquiry..."
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      variant="hero" 
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>

                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Coffee className="h-4 w-4" />
                    <span>We typically respond within 2-4 hours</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h3 className="text-2xl font-semibold text-center text-foreground mb-12">
              Quick Answers
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl">❓</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">General Inquiries</h4>
                  <p className="text-sm text-muted-foreground">
                    Questions about features, pricing, or how SnapBillz works
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl">🛠️</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Technical Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Need help with setup, troubleshooting, or technical issues
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl">🤝</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Partnerships</h4>
                  <p className="text-sm text-muted-foreground">
                    Interested in partnerships, integrations, or business opportunities
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Contact