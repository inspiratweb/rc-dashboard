import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center transition-colors duration-300 ease-in-out cursor-pointer select-none",
  {
    variants: {
      variant: {
        filled: "font-bold",
        outline: "st font-bold",
        ghost: "font-medium",
      },
      surface: {
        default: "",
        inverted: "",
      },
      size: {
        md: "text-body-md py-1.3 px-1 min-h-4 gap-1 rounded-md",
        sm: "text-body-sm py-1 px-1.5 min-h-4 gap-1 rounded-md",
      },
    },
    compoundVariants: [
      // 1. Surface Default
      {
        surface: "default",
        variant: "filled",
        class: "bg-info fg-primary-inverted hover:bg-info-subdued",
      },
      {
        surface: "default",
        variant: "outline",
        class: "st-surface-secondary fg-secondary hover:bg-surface-tertiary",
      },
      {
        surface: "default",
        variant: "ghost",
        class: "fg-secondary hover:bg-surface-tertiary",
      },

      // 2. Surface Inverted
      {
        surface: "inverted",
        variant: "filled",
        class: "bg-surface-primary fg-primary hover:bg-surface-tertiary",
      },
      {
        surface: "inverted",
        variant: "outline",
        class: "st-info-subdued fg-primary-inverted hover:bg-info-subdued",
      },
      {
        surface: "inverted",
        variant: "ghost",
        class: "fg-primary-inverted hover:bg-info-subdued",
      },
    ],
    defaultVariants: {
      variant: "filled",
      surface: "default",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, surface, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, surface, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
