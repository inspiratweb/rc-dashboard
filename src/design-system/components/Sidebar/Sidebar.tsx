import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "../../utils";
import { Button } from "../Button/Button";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { SidebarInIcon } from "../icons/SidebarInIcon";
import { SidebarOutIcon } from "../icons/SidebarOutIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Tooltip/Tooltip";

export interface SidebarItemConfig {
  label: string;
  to: string;
  isActive?: boolean;
  icon?: React.ComponentType | React.ReactNode;
  subItems?: SidebarItemConfig[];
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  currentProject: { name: string; logoUrl?: string };
  mainNavItems: SidebarItemConfig[];
  bottomNavItems: SidebarItemConfig[];
  mobileOpen?: boolean;
  onMenuToggle?: () => void;
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      className,
      currentProject,
      mainNavItems,
      bottomNavItems,
      mobileOpen,
      onMenuToggle,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(true);

    const toggleSidebar = React.useCallback(() => {
      setOpen((prev) => !prev);
    }, []);

    const renderNavItems = (items: SidebarItemConfig[]) => {
      return items.map((item) => {
        const isItemActive = !!item.isActive;
        return (
          <li key={item.label} className="px-1 py-0.5">
            <Tooltip open={open ? false : undefined}>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Link to={item.to} onClick={onMenuToggle}>
                    <span
                      className={cn(
                        "shrink-0 inline-flex items-center justify-center w-3 h-3",
                        isItemActive && "text-brand-primary",
                      )}
                    >
                      {item.icon &&
                        (typeof item.icon === "function" ? (
                          <item.icon />
                        ) : (
                          item.icon
                        ))}
                    </span>
                    <span
                      className={cn(
                        "flex-1 truncate text-left",
                        isItemActive && "font-semibold fg-primary",
                      )}
                    >
                      {item.label}
                    </span>
                    {item.subItems && item.subItems.length > 0 && (
                      <ChevronDownIcon
                        className="select-none"
                        aria-hidden="true"
                        size={16}
                      />
                    )}
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          </li>
        );
      });
    };

    return (
      <TooltipProvider>
        <aside
          ref={ref}
          className={cn(
            "sm:h-screen bg-surface-tertiary flex-col justify-between shrink-0 st-r st-surface-secondary transition-all duration-300 ease-in-out overflow-x-hidden text-left text-body-md font-medium fg-primary",
            "max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:z-40 max-sm:w-full max-sm:top-7 max-sm:transition-transform max-sm:duration-300 max-sm:ease-in-out",
            "sm:flex sm:static sm:translate-x-0 w-7 lg:w-29",
            !open && "lg:w-7",
            mobileOpen ? "max-sm:translate-x-0" : "max-sm:-translate-x-full",
            className,
          )}
          {...props}
        >
          {/* Header */}
          {currentProject && (
            <div className="flex px-2 py-1.5 st-b st-surface-secondary">
              <Button
                variant="ghost"
                className="w-full justify-start"
                aria-haspopup="listbox"
                aria-expanded={false}
              >
                <div className="shrink-0 inline-flex items-center justify-center w-3 h-3 overflow-hidden rounded-sm">
                  {currentProject.logoUrl ? (
                    <img
                      src={currentProject.logoUrl}
                      alt={currentProject.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-black" />
                  )}
                </div>
                <span className="truncate flex-1 text-left fg-primary">
                  {currentProject.name}
                </span>

                <ChevronDownIcon aria-hidden="true" className="select-none" />
              </Button>
            </div>
          )}

          {/* Content / Main Nav */}
          <nav
            aria-label="Main Navigation"
            className="flex-1 overflow-y-auto p-1"
          >
            <ul className="flex w-full flex-col">
              {renderNavItems(mainNavItems)}
            </ul>
          </nav>

          {/* Footer Nav & Toggle */}
          <div className="relative">
            <div className="absolute -top-2 left-0 right-[1px] h-2 pointer-events-none shadow-scroll-footer" />
            <nav aria-label="Secondary Navigation" className="p-1">
              <ul className="flex w-full flex-col">
                {renderNavItems(bottomNavItems)}
                <li className="hidden lg:block px-1 py-0.5">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className="justify-start"
                        onClick={toggleSidebar}
                        aria-label={
                          open ? "Collapse navigation" : "Expand navigation"
                        }
                      >
                        <span className="shrink-0 inline-flex items-center justify-center w-3 h-3">
                          {open ? <SidebarOutIcon /> : <SidebarInIcon />}
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {open ? "Collapse navigation" : "Expand navigation"}
                    </TooltipContent>
                  </Tooltip>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </TooltipProvider>
    );
  },
);

Sidebar.displayName = "Sidebar";
