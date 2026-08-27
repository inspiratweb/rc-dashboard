import * as React from "react";
import { cn } from "../../utils";

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("animate-pulse bg-neutral-100 rounded-sm", className)}
        {...props}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";
