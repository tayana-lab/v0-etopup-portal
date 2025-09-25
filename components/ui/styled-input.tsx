import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export interface StyledInputProps extends React.ComponentProps<typeof Input> {
  variant?: "default" | "portal"
}

const StyledInput = React.forwardRef<React.ElementRef<typeof Input>, StyledInputProps>(
  ({ className, variant = "portal", ...props }, ref) => {
    return (
      <Input
        className={cn(
          variant === "portal" && "h-11 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
StyledInput.displayName = "StyledInput"

export { StyledInput }
