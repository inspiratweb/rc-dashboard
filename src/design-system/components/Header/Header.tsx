import * as React from "react";
import { cn } from "../../utils";
import { Avatar } from "../Avatar/Avatar";
import { BurgerIcon } from "../icons/BurgerIcon";
import { CloseIcon } from "../icons/CloseIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Tooltip/Tooltip";

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
  mobileMenuOpen?: boolean;
  onMenuToggle?: () => void;
}

export const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (
    { className, navItems, avatar, mobileMenuOpen, onMenuToggle, ...props },
    ref,
  ) => {
    return (
      <TooltipProvider>
        <header
          ref={ref}
          className={cn(
            "flex w-full items-center justify-between p-2 st-b st-surface-secondary bg-surface-primary",
            className,
          )}
          {...props}
        >
          {/* Hamburger Icon - only visible below sm (mobile) */}
          <button
            onClick={onMenuToggle}
            className="sm:hidden flex items-center justify-center cursor-pointer fg-secondary hover:fg-primary transition-colors"
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
          >
            <div className="shrink-0 inline-flex items-center justify-center w-3 h-3">
              {mobileMenuOpen ? <CloseIcon /> : <BurgerIcon />}
            </div>
          </button>

          {/* Desktop spacer to keep user actions on the right */}
          <div className="hidden sm:block" />
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
                <button
                  onClick={avatar.onClick}
                  className="rounded-full cursor-pointer"
                  aria-label={avatar.label || avatar.fallback}
                >
                  <Avatar fallback={avatar.fallback} src={avatar.src} />
                </button>
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
