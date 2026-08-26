import * as React from "react";
import { useState } from "react";
import { cn } from "../../utils";
import { Header, type HeaderProps } from "../Header/Header";
import { Sidebar, type SidebarProps } from "../Sidebar/Sidebar";

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebarProps: Omit<SidebarProps, "mobileOpen" | "onMenuToggle">;
  headerProps: Omit<HeaderProps, "mobileMenuOpen" | "onMenuToggle">;
  children?: React.ReactNode;
}

export const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, sidebarProps, headerProps, children, ...props }, ref) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMenu = () => setMobileMenuOpen((prev) => !prev);

    return (
      <div
        ref={ref}
        className={cn(
          "flex h-screen w-screen overflow-hidden bg-surface-primary",
          className,
        )}
        {...props}
      >
        <Sidebar
          {...sidebarProps}
          mobileOpen={mobileMenuOpen}
          onMenuToggle={toggleMenu}
        />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header
            {...headerProps}
            mobileMenuOpen={mobileMenuOpen}
            onMenuToggle={toggleMenu}
          />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    );
  },
);

Layout.displayName = "Layout";
