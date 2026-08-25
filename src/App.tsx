import { Header, Sidebar } from "@/design-system";
import {
  BOTTOM_NAV_ITEMS,
  HEADER_NAV_ITEMS,
  MAIN_NAV_ITEMS,
  MOCK_PROJECTS,
} from "@/lib/mockData";
import { Overview } from "@/pages/Overview";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import avatarImage from "./assets/fran.png";

function DashboardLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-surface-primary">
      <Sidebar
        currentProject={MOCK_PROJECTS[0]}
        projects={MOCK_PROJECTS}
        mainNavItems={MAIN_NAV_ITEMS}
        bottomNavItems={BOTTOM_NAV_ITEMS}
      />
      <div className="flex flex-1 flex-col overflow-y-auto">
        <Header
          navItems={HEADER_NAV_ITEMS}
          avatar={{
            fallback: "Fran Sanchez",
            src: avatarImage,
            label: "Account",
          }}
        />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
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
