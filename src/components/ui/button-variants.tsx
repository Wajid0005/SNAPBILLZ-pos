import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-smooth focus-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-soft hover:bg-primary-hover hover:shadow-orange",
        destructive: "bg-destructive text-destructive-foreground shadow-soft hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-soft hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-soft hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Premium SnapBillz variants
        hero: "bg-primary text-primary-foreground shadow-orange hover:bg-primary-hover hover:shadow-medium hover:scale-105 transition-bounce",
        heroOutline: "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground shadow-soft hover:shadow-orange",
        glass: "glass text-foreground hover:bg-orange-warm/10 border-orange-warm/20",
        premium: "bg-gradient-to-r from-orange-warm to-orange-soft text-white shadow-orange hover:shadow-medium hover:scale-105 transition-bounce"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export { buttonVariants }
export type ButtonVariants = VariantProps<typeof buttonVariants>