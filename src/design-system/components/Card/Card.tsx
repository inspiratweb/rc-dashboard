import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../utils";

const cardVariants = cva("st select-none", {
  variants: {
    surface: {
      default: "st-surface-secondary fg-secondary",
      accent: "st-on-accent fg-on-accent",
    },
    size: {
      lg: "text-body-md p-2 rounded-xl",
      md: "text-body-md p-2 rounded-md",
      sm: "text-body-sm py-0.5 px-1.5 min-h-4 min-w-4 rounded-md",
    },
  },
  defaultVariants: {
    surface: "default",
    size: "md",
  },
});

export interface CardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, surface, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ surface, size, className }))}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

export { Card };
