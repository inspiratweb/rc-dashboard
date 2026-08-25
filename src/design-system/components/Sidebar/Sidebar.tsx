import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "../../utils";
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
  projects: { name: string; logoUrl?: string }[];
  mainNavItems: SidebarItemConfig[];
  bottomNavItems: SidebarItemConfig[];
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      className,
      currentProject,
      projects,
      mainNavItems,
      bottomNavItems,
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
          <li key={item.label} className="content-center p-1">
            <Tooltip open={open ? false : undefined}>
              <TooltipTrigger asChild>
                <Link
                  to={item.to}
                  className={cn(
                    "group flex w-full items-center gap-1 rounded-sm transition-colors cursor-pointer hover:fg-primary",
                    isItemActive ? "font-bold fg-primary" : "fg-secondary",
                  )}
                >
                  <div
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
                  </div>
                  <span
                    className={cn(
                      "flex-1 truncate text-left transition-all duration-300 ease-in-out origin-left",
                    )}
                  >
                    {item.label}
                  </span>
                  {item.subItems && item.subItems.length > 0 && (
                    <ChevronDownIcon
                      className={cn(
                        "select-none transition-all duration-300 ease-in-out",
                      )}
                      aria-hidden="true"
                      size={16}
                    />
                  )}
                </Link>
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
            "flex h-screen bg-surface-tertiary flex-col justify-between shrink-0 st-r st-surface-secondary transition-all duration-300 ease-in-out overflow-x-hidden text-left text-body-md font-medium fg-primary",
            open ? "w-29" : "w-7",
            className,
          )}
          {...props}
        >
          {/* Header */}
          {currentProject && (
            <div className="p-2 st-b st-surface-secondary">
              <button className="flex items-center justify-between gap-1 w-full text-left text-body-md font-medium fg-primary focus-visible:outline-none transition-all duration-300 ease-in-out cursor-pointer">
                <div className="flex items-center gap-1 min-w-0">
                  <div className="h-3 w-3 shrink-0 flex items-center justify-center overflow-hidden rounded-sm bg-neutral-100">
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
                  <span
                    className={cn(
                      "truncate transition-all duration-300 ease-in-out",
                    )}
                  >
                    {currentProject.name}
                  </span>
                </div>

                <ChevronDownIcon
                  aria-hidden="true"
                  className={cn(
                    "select-none transition-all duration-300 ease-in-out",
                    projects.length === 1 && "fg-action-disabled",
                  )}
                />
              </button>
            </div>
          )}

          {/* Content / Main Nav */}
          <div className="flex-1 overflow-y-auto p-1">
            <ul className="flex w-full flex-col">
              {renderNavItems(mainNavItems)}
            </ul>
          </div>

          {/* Footer Nav & Toggle */}
          <div className="relative">
            <div className="absolute -top-2 left-0 right-[1px] h-2 pointer-events-none shadow-scroll-footer" />
            <div className="p-1">
              <ul className="flex w-full flex-col">
                {renderNavItems(bottomNavItems, true)}
                <li className="content-center p-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={toggleSidebar}
                        className="group flex items-center gap-1 fg-secondary hover:fg-primary cursor-pointer text-left text-body-md font-medium focus-visible:outline-none transition-all duration-300 ease-in-out"
                      >
                        <div className="shrink-0 inline-flex items-center justify-center w-3 h-3">
                          {open ? <SidebarOutIcon /> : <SidebarInIcon />}
                        </div>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {open ? "Collapse navigation" : "Expand navigation"}
                    </TooltipContent>
                  </Tooltip>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </TooltipProvider>
    );
  },
);

Sidebar.displayName = "Sidebar";
