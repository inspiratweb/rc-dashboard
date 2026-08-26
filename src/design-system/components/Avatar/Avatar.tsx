import { cn } from "../../utils";
import * as React from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, ...props }, ref) => {
    const [hasError, setHasError] = React.useState(false);

    const initials = fallback
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2);

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-3 w-3 shrink-0 overflow-hidden rounded-full select-none items-center justify-center text-body-xs font-medium fg-primary bg-brand-secondary",
          className,
        )}
        {...props}
      >
        {src && !hasError ? (
          <img
            src={src}
            alt={alt || fallback}
            onError={() => setHasError(true)}
            className="aspect-square h-full w-full object-cover"
          />
        ) : (
          <span className="uppercase">{initials}</span>
        )}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";

export { Avatar };
