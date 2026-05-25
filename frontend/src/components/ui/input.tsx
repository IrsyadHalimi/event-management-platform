import * as React from "react"
import { cn } from "@/lib/utils"

// 1. Wrap the component in React.forwardRef
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        data-slot="input"
        ref={ref} 
        className={cn(
          // Layout & Size (Disamakan dengan standard height react-select ~38px)
          "h-[38px] w-full min-w-0 rounded-md border bg-background px-3 py-2 text-sm transition-all outline-none",
          
          // Warna Border & Background saat Idle (React-select menggunakan warna border yang sedikit abu-abu netral)
          "border-muted-foreground/30 text-foreground placeholder:text-muted-foreground/60",
          
          // State: FOCUS (Ini kunci agar mirip dengan focus biru/primary khas react-select)
          "focus:border-primary focus:ring-1 focus:ring-primary",
          
          // State: HOVER (React-select agak menggelap bordernya saat di-hover)
          "hover:border-muted-foreground/50",
          
          // State: DISABLED
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted/40 disabled:opacity-60",
          
          // State: INVALID / ERROR
          "aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive",
          
          // File input reset (jika digunakan untuk file)
          "file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          
          className
        )}
        {...props}
      />
    )
  }
)

// 3. Set a display name for easier debugging
Input.displayName = "Input"

export { Input }