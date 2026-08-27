import { Layout } from "@/design-system";
import {
  BOTTOM_NAV_ITEMS,
  HEADER_NAV_ITEMS,
  MAIN_NAV_ITEMS,
  MOCK_PROJECTS,
} from "@/lib/mockData";
import { Overview } from "@/pages/Overview";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import avatarImage from "./assets/fran.png";

function DashboardLayout() {
  // Listen for global keyboard shortcut to toggle Dark Mode (Cmd/Ctrl + Shift + D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        document.documentElement.classList.toggle("dark");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Layout
      sidebarProps={{
        currentProject: MOCK_PROJECTS[0],
        mainNavItems: MAIN_NAV_ITEMS,
        bottomNavItems: BOTTOM_NAV_ITEMS,
      }}
      headerProps={{
        navItems: HEADER_NAV_ITEMS,
        avatar: {
          fallback: "Fran Sanchez",
          src: avatarImage,
          label: "Account",
        },
      }}
    >
      <Outlet />
    </Layout>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "overview",
        element: <Overview />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
