import * as React from "react";
import { Avatar } from "../Avatar/Avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../Tooltip/Tooltip";
import { cn } from "../../utils";

export interface HeaderNavItem {
  label: string;
  icon: React.ComponentType;
}

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  navItems: HeaderNavItem[];
  avatar: {
    src?: string;
    fallback: string;
    label?: string;
    onClick?: () => void;
  };
}

export const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, navItems, avatar, ...props }, ref) => {
    return (
      <TooltipProvider>
        <header
          ref={ref}
          className={cn(
            "flex w-full items-center justify-end p-2 st-b st-surface-secondary bg-surface-primary",
            className,
          )}
          {...props}
        >
        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <React.Fragment key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="flex items-center justify-center cursor-pointer fg-secondary hover:fg-primary transition-colors"
                    aria-label={item.label}
                  >
                    <div className="shrink-0 inline-flex items-center justify-center w-3 h-3">
                      <item.icon />
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">{item.label}</TooltipContent>
              </Tooltip>
            </React.Fragment>
          ))}
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar
                tabIndex={0}
                fallback={avatar.fallback}
                src={avatar.src}
                className="cursor-pointer"
                onClick={avatar.onClick}
              />
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {avatar.label || avatar.fallback}
            </TooltipContent>
          </Tooltip>
        </div>
      </header>
    </TooltipProvider>
  );
  },
);

Header.displayName = "Header";
