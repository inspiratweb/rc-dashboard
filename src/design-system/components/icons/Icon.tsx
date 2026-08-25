import * as React from "react";

import { cn } from "../../utils";

export interface IconProps extends React.ComponentPropsWithoutRef<"svg"> {
  size?: number | string;
  "aria-label"?: string;
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    { size = 16, className, "aria-label": ariaLabel, children, ...props },
    ref,
  ) => {
    const isDecorative = !ariaLabel;

    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 16 16"
        stroke="none"
        fill="currentColor"
        className={cn("shrink-0 select-none inline-block", className)}
        aria-hidden={isDecorative ? "true" : undefined}
        aria-label={ariaLabel}
        role={isDecorative ? undefined : "img"}
        {...props}
      >
        {children}
      </svg>
    );
  },
);

Icon.displayName = "Icon";
