import { Button } from "@/components/ui/button"

const Navigation = () => {
  const handleLoginClick = () => {
    console.log('login_clicked', { source: 'navigation' })
    // Will redirect when Supabase is connected
    window.open("https://snapbillz.lovable.app/", "_blank")
  }

  const handleSignupClick = () => {
    console.log('signup_clicked', { source: 'navigation' })
    // Will redirect when Supabase is connected
    window.open("https://snapbillz.lovable.app/", "_blank")
  }

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container-xl flex justify-between items-center py-4">
        <div className="text-2xl font-bold text-foreground">
          SNAPBILLZ
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={handleLoginClick}
            className="text-foreground hover:text-orange-warm"
          >
            Login
          </Button>
          <Button 
            variant="outline" 
            onClick={handleSignupClick}
            className="border-orange-warm text-orange-warm hover:bg-orange-warm hover:text-white"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation