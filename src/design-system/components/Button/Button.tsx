import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../utils";

const buttonVariants = cva(
  "px-1 min-h-4 gap-1 inline-flex items-center justify-center transition-colors duration-300 ease-in-out cursor-pointer select-none",
  {
    variants: {
      variant: {
        filled: "font-semibold",
        outline: "st font-semibold",
        ghost: "font-medium px-0",
      },
      surface: {
        default: "",
        accent: "",
      },
      size: {
        lg: "text-body-md py-1.3 rounded-lg",
        md: "text-body-md py-1.3 rounded-md",
        sm: "text-body-sm py-1 rounded-md",
      },
    },
    compoundVariants: [
      // 1. Surface Default
      {
        surface: "default",
        variant: "filled",
        class: "bg-surface-secondary fg-secondary",
      },
      {
        surface: "default",
        variant: "outline",
        class: "st-surface-secondary fg-secondary hover:bg-surface-tertiary",
      },
      {
        surface: "default",
        variant: "ghost",
        class: "fg-secondary hover:fg-primary",
      },

      // 2. Surface Accent
      {
        surface: "accent",
        variant: "filled",
        class: "bg-on-accent fg-on-accent-inverted",
      },
      {
        surface: "accent",
        variant: "outline",
        class: "st-on-accent fg-on-accent hover:bg-on-accent-subdued",
      },
      {
        surface: "accent",
        variant: "ghost",
        class: "fg-on-accent",
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
